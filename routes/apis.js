import express from 'express'
import request from 'request'
import md5 from 'md5'
import CONFIG from '../config'

let router = express.Router();

// let { API_HOST } = CONFIG;

// 生成md5加密token
// function getToken() {
// 	var key = 'qUY4yusAWQdGhkAP4mp4tg4TAYvrmk6S';
// 	var date = new Date();
// 	var y = date.getFullYear();
// 	var m = date.getMonth() + 1;
// 	var d = date.getDate();
// 	m = m < 10 ? `0${m}`: `${m}`;
// 	d = d < 10 ? `0${d}`: `${d}`;
// 	var str = `${key}${y}${m}${d}`;
// 	return md5(str);
// }

// 解除跨域限制
router.all('*', (req, res, next) => {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();

});

// 上传接口中间件
router.post('/upload/**', (req, res, next) => {
	res.send({
    "code": 200,
    "msg": "OK",
    "data": {
    	"host": "http://fph-property.oss-cn-hangzhou.aliyuncs.com/",
    	"path": "other/20170321/616d565574d583d599612d09295f9e6c.png"
    }
	});
});

/* post apis await 必须出现在 async函数中*/
router.post('**', async (req, res, next) => {
	let rst = {};
	try {
		rst = await req.fetch(req.path, req.body);
	} catch (err) {
		rst = err;
	}
	res.send(rst);
});

module.exports = router;