// webpack server
const path = require('path');
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
	entry: path.resolve('./', 'routes/ssr/entry-server.js'),
	target: 'node',
	output: {
		filename: 'vue-ssr-server-bundle.json',
		path: path.resolve('./', 'bundle/'),
		libraryTarget: 'commonjs2'
	},
	plugins: [
		// 这是将服务器的整个输出
  	// 构建为单个 JSON 文件的插件。
  	// 默认文件名为 `vue-ssr-server-bundle.json`
  	new VueSSRServerPlugin()
	]
});