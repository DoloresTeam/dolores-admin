import { fetchUtils } from 'admin-on-rest';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE
} from 'admin-on-rest';

var pagingControlCookieCache = {};

const fetchPagingCookie = (resource, page) => {
    let key = resource + (page - 1)
    return pagingControlCookieCache[key]
}

const savePagingCookie = (resource, page, cookie) => {
    let key = resource + page
    pagingControlCookieCache[key] = cookie
}

/**
 * Maps admin-on-rest queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        // 添加token 到header中
        options.headers = new Headers({ Authorization: 'Dolores ' + localStorage.getItem('token') });
        switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const query = {
                ...params.filter,
                page: page,
                pageSize: 100,
            };
            const pc = fetchPagingCookie(resource, page)
            if (pc !== undefined) {
                query[`pageCookie`] = pc;
            }
            url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            options.method = 'GET';
            break;
        }
        case GET_ONE:
            url = `${apiUrl}/${resource}/${params.id}`;
            break;
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const query = {
                ...params.filter,
                [params.target]: params.id,
                page: page,
                pageSize: 100,
            };
            const pc = fetchPagingCookie(resource, page)
            if (pc !== undefined) {
                query[`pageCookie`] = pc;
            }
            url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            break;
        }
        case GET_MANY: {
            const query = {
                ids: params.ids
            };
            url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            break;
        }
        case UPDATE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            url = `${apiUrl}/${resource}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { json } = response;
        switch (type) {
        case GET_LIST:
        case GET_MANY_REFERENCE:
            savePagingCookie(resource, json.page, json.cookie);
            return {
                data: json.data, // TODO 直接放在data 中是否可以读取到
                total: json.total,
            };
        case GET_MANY:
            return {data: json.data}
        case CREATE:
            return { data: { ...params.data, id: json.id } };
        default:
            return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};
