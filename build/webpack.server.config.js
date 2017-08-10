// webpack server
const path = require('path');
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
	entry: path.join('../', 'routes/ssr/entry-server.js'),
	target: 'node',
	output: {
		libraryTarget: 'commonjs2'
	},
	plugins: [
		new VueSSRServerPlugin()
	]
});