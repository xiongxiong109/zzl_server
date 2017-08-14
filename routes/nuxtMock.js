// nuxt works mock api
import express from 'express'
import cros from '../middlewares/cros'

const router = express.Router()

router.use(cros);

router.post('/', (req, res, next) => {
	res.send('async data from backend');
});

module.exports = router