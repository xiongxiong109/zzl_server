import express from 'express'
import ssr from '../middlewares/ssr'
import { createRenderer, createBundleRenderer } from 'vue-server-renderer'
// 打包后的服务端bundle
/*
 热更新之前的操作, 需要手动通过webpack --config 编译entry-server.js
 打包后生成的vue-ssr-server-bundle, 是将所有文件打包成了一个json或js
 然后传入createBundleRenderer中
 .vue文件需要配置vue-loader和style-loader, 编译后会自动内联到页面中
*/
import serverBundle from '../bundle/vue-ssr-server-bundle'

const router = express.Router()

router.use(ssr)

router.get('/', (req, res, next) => {
	res.redirect('/ssr/index')
});

router.get('/index', async (req, res, next) => {
	let { subRoute, viewContent } = await res.ssr();
	let renderer = createRenderer({template: viewContent});
	// 模板插值
	let context = {
		title: 'vue ssr node',
		path: req.path
	}
	renderer.renderToString(subRoute, context, (err, html) => {
		if (err) {
			res.end('error');
		} else {
			res.end(html);
		}
	});
	// res.render('ssr/index', {title: 'vue_ssr'});
});

router.get('/server_bundle', async (req, res, next) => {
	// bundle 构造器
	let context = {}; // 上下文渲染
	let { viewContent } = await res.ssr();

	// 配置server render的选项
	const renderer = createBundleRenderer(serverBundle, {
		runInNewContext: false,
		template: viewContent // 通过给出template, 可以实现vue页面的模板嵌入
	});
	// 填充context上下文和vue模板内容
	renderer.renderToString({
		title: 'ssr bundle',
		path: req.path
	}, (err, html) => {
		if (err) {
			res.end(err);
		} else {
			// console.log(html)
			res.end(html);
		}
	});
	// res.send('ok');
});

export default router