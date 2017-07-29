var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('md5');

const host = 'http://81.fangpinhui.com/1.0.0/web';
// const host = 'http://www.dev.api3.com/1.0.0/web';
// const host = 'http://localhost:3000/1.1.0/web/';

// 生成md5加密token
function getToken() {
	var key = 'qUY4yusAWQdGhkAP4mp4tg4TAYvrmk6S';
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	m = m < 10 ? `0${m}`: `${m}`;
	d = d < 10 ? `0${d}`: `${d}`;
	var str = `${key}${y}${m}${d}`;
	return md5(str);
}

// 解除跨域限制
router.all('*', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();

});

// 上传接口中间件
router.post('/upload/**', function(req, res, next) {
	res.send({
    "code": 200,
    "msg": "OK",
    "data": {
    	"host": "http://fph-property.oss-cn-hangzhou.aliyuncs.com/",
    	"path": "other/20170321/616d565574d583d599612d09295f9e6c.png"
    }
	});
});

/* GET home page. */
router.post('**', function(req, res, next) {
	var url = `${host}${req.path}`;
	// var url = `${host}test`;
	// 自动生成token
	if (req.body.token != getToken()) {
		req.body.token = getToken();
	}
	console.log(url);
	console.log(req.body);
	// 请求代理转发
	request.post({
		url,
		form: req.body
	}, function(err,httpResponse,body){
		console.log(body);
		res.send(body);
	});
});

// router.post('/test', function(req, res, next) {
// 	console.log(req.body);
// 	res.send({status: 'ok'});
// });

module.exports = router;