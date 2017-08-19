// github 请求中间件
import request from 'request'
import GITHUB_CONFIG from '../config/github'

export const githubTokenMiddleware = (req, res, next) => {
	req.getToken = async ({code, client_id, client_secret}) => 
	new Promise((resolve, reject) => {
		// 获取授权token
		request({
			url: 'https://github.com/login/oauth/access_token',
			method: 'post',
			timeout: 8000,
			form: {code, client_id, client_secret}
		}, (err, response, body) => {
			if (err) {
				reject(err)
			} else {
				// url
				console.log('access_token');
				if (/error/.test(body)) {
					reject(body);
				} else {
					resolve(body);
				}
			}
		});
	})
	next();
}
export const githubUserMiddleware = (req, res, next) => {
	req.getUserInfo = async(path) => new Promise((resolve, reject) => {
		// 根据access_token获取授权登录后的用户信息
		request({
			headers: {
				'User-Agent': GITHUB_CONFIG.app_nm
			},
			url: `https://api.github.com/user?${path}`,
			method: 'get',
			timeout: 8000
		}, (err, response, body) => {
			if (err) {
				reject(err)
			} else {
				console.log('user info')
				console.log(body);
				resolve(body)
			}
		});
	});
	next();
};

export const githubSearchRegiMiddleware = (req, res, next) => {
	req.queryRegistry = async (queryStr = '') =>
	new Promise((resolve, reject) => {
		request({
			headers: {
				'User-Agent': GITHUB_CONFIG.app_nm
			},
			url: `https://api.github.com/search/repositories?q=${queryStr}`,
			method: 'get',
			timeout: 8000,
		}, (err, rs, body) => {
			console.log(err);
			console.log(body);
			if (err) {
				reject(err)
			} else {
				resolve(body)
			}
		})
	});
	next();
}