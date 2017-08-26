import request from 'request'

const searchHost = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
const playHost = 'https://c.y.qq.com/v8/playsong.html';

// 搜索qq音乐中间件
export const qqMusicSearchMiddle = (req, res, next) => {
	req.searchMusic = async (
		search = '',
		page = 1, // 分页
	) => new Promise((resolve, reject) => {
		search = encodeURIComponent(search);
		let url = `${searchHost}?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${search}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=1503221906558`;
		console.log(url);
		request({
			url,
			method: 'get',
			timeout: 10000
		}, (err, rst, body) => {
			if (err) {
				reject(err);
			} else {
				resolve(body)
			}
		})
	})
	next();
}

export const qqMusicSourceMiddle = (req, res, next) => {
	let { id } = req.query;
	req.getSource = async () => new Promise((resolve, reject) => {
		let url = `${playHost}?songmid=${id}&ADTAG=myqq&from=myqq&channel=10007100`;
		console.log(url);
		request({
			headers: {
				// qq的m站点需要设置正确的host, *.qq.com (80以外的端口号并没有被屏蔽)
				// 同时需要设置mobile ua, 不然的话, 会被认为是错误的请求而跳转
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
			},
			url,
			method: 'GET',
			timeout: 10000
		}, (err, rst, body) => {
			if (err) {
				reject(err)
			} else { // 获取的是一个页面
				resolve(body);
			}
		})
	});
	next();
}