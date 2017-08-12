// webpack config
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
	entry: path.resolve('./', 'routes/ssr/entry-client.js'),
	output: {
		filename: '[name].[hash:7].js',
		path: path.resolve('./', 'public', 'dist')
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, '../', 'views/ssr/server_bundle.ejs'),
			filename: 'index.html',
			inject: true
		})
	]
});