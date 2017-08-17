// nuxt works mock api
import express from 'express'
import request from 'request'
import GITHUB_CONFIG from '../config/github'
import cros from '../middlewares/cros'
import { githubTokenMiddleware, githubUserMiddleware } from '../middlewares/github'

const router = express.Router()

router.use(cros);

router.post('/', (req, res, next) => {
	res.send('async data from backend');
});

router.post('/todo', (req, res, next) => {
	let list = [
		'fetch data',
		'update head info',
		'layout',
		'middleware',
		'scrollToTop',
		'transition',
		'validate'
	];
	res.send({list});
})

router.post(
	'/github/auth',
	githubTokenMiddleware,
	githubUserMiddleware,
	async (req, res, next) => {
	let { code } = req.body;
	let { client_id, client_secret } = GITHUB_CONFIG;
	let tokenUrl, uInfo;
	try {
		tokenUrl = await req.getToken({code, client_id, client_secret});
	} catch (err) {
		res.send({err});
	}
	try {
		uInfo = await req.getUserInfo(tokenUrl);
		res.send(uInfo);
	} catch(err) {
		res.send({err});
	}
})

module.exports = router