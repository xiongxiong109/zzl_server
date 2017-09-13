// 永恒梦魇爬虫
import express from 'express'
import Nightmare from 'nightmare'

const router = express.Router()
const nightmare = Nightmare()

// go to m.y.qq.com
router.get('/', async (req, res) => {
	let url = 'https://y.qq.com';
	nightmare
	.goto(url)
	.evaluate(() => {
		let $item = document.querySelector('.footer_link_list__item');
		return $item.innerHTML
	})
	.then(text => {
		console.log(text)
	})
	.catch(err => {
		console.log(err)
	})
	res.send('ok');
});

module.exports = router