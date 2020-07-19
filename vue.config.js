module.exports = {
	configureWebpack: {
		devServer: {
			port: 8888,
			proxy: {
				'/graphql': {
					target: 'http://localhost:5000', // local api server
				},
			},
		},
	},
};
