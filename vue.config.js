const webpack = require('webpack');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    // devServer: {
    // 	port: 8888,
    // 	proxy: {
    // 		'/graphql': {
    // 			target: 'http://localhost:4000', // local api server
    // 		},
    // 	},
    // },

    plugins: [
      // load `moment/locale/ja.js` and `moment/locale/it.js`
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja/)
    ]
  }
};
