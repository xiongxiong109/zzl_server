import express from 'express'
import ssr from '../middlewares/ssr'
import { createRenderer } from 'vue-server-renderer'

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

export default router