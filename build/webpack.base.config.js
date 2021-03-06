// webpack base
const path = require('path');

module.exports = {
	// entry: {
	// 	main: path.resolve('../', 'routes/ssr', 'app.js')
	// },
	// output: {
	// 	filename: '[name].[hash:7].js'
	// },
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
			// options: vueLoaderConfig
		}, {
			test: /\.js$/,
			loader: 'babel-loader'
			// include: [resolve('src'), resolve('test')]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000
				// name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000
				// name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	}
}