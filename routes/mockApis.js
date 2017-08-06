import express from 'express'
import Mock from 'mockjs'

let router = express.Router();

// 使用mock模块生成对应契约的mock数据

/* mock apis */
router.all('/search', (req, res, next) => {
	let data = Mock.mock({
		'list|3-10': [{
			'id|+1': 1,
			'starttime': '@DATE(MM-dd)',
			'endtime': '@DATE(MM-dd)',
			'str': '@FIRST'
		}]
	});
	setTimeout(() => {
		res.send({
			code: 200,
			list: data.list
		});
	}, Math.random() * 300 + 300);
});

module.exports = router;
