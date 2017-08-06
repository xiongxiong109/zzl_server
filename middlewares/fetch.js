// fetch apis
import request from 'request'
import md5 from 'md5'
import CONFIG from '../config'

// get md5 token
const _getToken = () => {
	let { TOKEN_KEY } = CONFIG;
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	m = m < 10 ? `0${m}`: `${m}`;
	d = d < 10 ? `0${d}`: `${d}`;
	var str = `${TOKEN_KEY}${y}${m}${d}`;
	return md5(str);
}

// export middleware
export default (req, res, next) => {
	req.fetch = async (
		path = '/',
		params = {},
		timeout = 5000
	) => new Promise((resolve, reject) => {

		let { API_HOST } = CONFIG;
		let { token } = params;
		let url = `${API_HOST}${path}`;
		let _token = _getToken();
		if (token != _token) {
			params.token = _token;
		}
		console.log(url);
		console.log(params);
		// 请求代理转发
		request({
			url,
			method: 'post',
			timeout,
			form: params,
		}, (err, response, body) => {
			if (err) {
				reject(err)
			} else {
				console.log(body)
				resolve(body)
			}
		});
	}) 
	next();
} 