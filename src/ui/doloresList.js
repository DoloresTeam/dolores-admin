import React, { Component } from 'react';
import { List, crudGetList as crudGetListAction } from 'admin-on-rest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Pagination from './pagination';
import DoloresTitle from './doloresTitle';

class DoloresList extends Component {

    render () {
        return (
            <List
                filter={{isUnit: false}}
                {...this.props}
                pagination={<Pagination />}
                perPage={100}
                title={<DoloresTitle title={this.props.title} resource={this.props.resource} onClick={(v) => {
                    this.props.crudGetList(this.props.resource, {page: 1, perPage: 100}, {field: {}}, {isUnit: v});
                }}/>}
            />
        )
    }
}

const mapStateToProps = (state, ownerProps) => {
    if (state.titleSwitched.resource === ownerProps.resource) {
        return {filter: {isUnit: state.titleSwitched.isDepartment}}
    }
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        crudGetList: crudGetListAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DoloresList)
