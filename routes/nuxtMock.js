// nuxt works mock api
import express from 'express'
import cros from '../middlewares/cros'

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

module.exports = router