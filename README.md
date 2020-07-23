# book-shelf-app-frontend

## setup

```bash
# 初回だけ
npm install

# 起動
npm run serve
```

## settings

mock と heroku の接続先変更

:star: `src/main.js`

```js
const apolloClient = new ApolloClient({
	// mockの場合
	uri: 'http://localhost:8888/graphql',

	// herokuの場合
	// uri: 'https://book-shelf-backend.herokuapp.com/graphql',
});
```

## refs
