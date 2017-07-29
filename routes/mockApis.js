var express = require('express');
var router = express.Router();

var Mock = require('mockjs');
// 使用mock模块生成对应契约的mock数据

/* mock apis */
router.all('/search', function(req, res, next) {
	let data = Mock.mock({
		'list|3-10': [{
			'id|+1': 1,
			'starttime': '@DATE(MM-dd)',
			'endtime': '@DATE(MM-dd)',
			'str': '@FIRST'
		}]
	});
	setTimeout(() => {
		res.send(data);
	}, Math.random() * 300 + 300);
});

module.exports = router;
