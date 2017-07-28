
# step 1

```
git clone github.com/DoloresTeam/dolores-admin

```

# step 2

修改 `App.js` 中 `restClient` 为自己的服务器地址  
修改 `authClient.js` 中 `Request` 的地址为自己登录认证的服务器地址

# step 3

```
yarn build
```
然后复制 `./build` 下的内容到 `dolores-server` 的 `.／build/webroot`目录下
