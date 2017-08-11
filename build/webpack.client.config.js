// webpack config
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
	entry: path.resolve('./', 'routes/ssr/entry-client.js'),
	output: {
		filename: '[name].[hash:7].js',
		path: path.resolve('./', 'public', 'dist')
	}
});