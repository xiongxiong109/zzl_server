import express from 'express'
import Mock from 'mockjs'
import _ from 'lodash'
import cros from '../middlewares/cros'
let router = express.Router();

// 解除跨域
router.use(cros);
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

// mock location
let mockI = -1;
router.post('/driverlocation', (req, res, next) => {
	const arrlat = [18.479392, 18.406437, 18.29434, 18.174342, 18.054261, 17.965452];
	const arrlng = [102.424258, 102.429751, 102.465457, 102.503909, 102.542361, 102.569827];
	mockI++;
	mockI > 5 && (mockI = 0);
	// 当前位置
	let gpspoi = {
		lng: '102.465457',
		lat: "18.406437"
	};
	// 司机位置
	let cpoi = {
		lat: arrlat[mockI],
		lng: arrlng[mockI],
		// desc: "司机正在赶来",
		desc: "司机正在赶往目的地",
		degree: 40
	};
	// 出发地
	let dpoi = {
		lat: arrlat[0],
		lng: arrlng[0]
	};
	// 目的地
	let apoi = {
		lat: arrlat[5],
		lng: arrlng[5]
	};
	let mockJSON = {
		gpspoi, // my pos
		apoi, // 目的地 pos
		dpoi, // 出发地 pos
		cpoi // driver pos
	};
	// setTimeout(() => {
	res.send(mockJSON)
	// }, 300);
});

function _getRandPos(arr) {
	let len = arr.length - 1;
	let randNum = _.random(len);
	return arr[randNum];
} 

module.exports = router;
