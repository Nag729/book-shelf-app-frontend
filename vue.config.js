module.exports = {
	configureWebpack: {
		devServer: {
			port: 8888,
			// proxy: {
			// 	'/graphql': {
			// 		target: 'http://localhost:4000', // local api server
			// 		// target: 'https://book-shelf-backend.herokuapp.com', // local api server
			// 	},
			// },
		},
	},
};
