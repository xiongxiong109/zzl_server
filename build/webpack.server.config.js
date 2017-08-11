// webpack server
const path = require('path');
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
	entry: path.resolve('./', 'routes/ssr/entry-server'),
	target: 'node',
	output: {
		filename: 'entry-server.js', // 必须加name, 并且需要是js文件, 否则编译不通过
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