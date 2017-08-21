import request from 'request'

const searchHost = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
const playHost = 'https://c.y.qq.com/v8/playsong.html';

// 搜索qq音乐中间件
export const qqMusicSearchMiddle = (req, res, next) => {
	req.searchMusic = async (
		search = ''
	) => new Promise((resolve, reject) => {
		search = encodeURIComponent(search);
		let url = `${searchHost}?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${search}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1503221906558`;
		console.log(url);
		request({
			url,
			method: 'get',
			timeout: 3000
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
		request({
			url: `${playHost}?songmid=${id}&ADTAG=myqq&from=myqq&channel=10007100`,
			method: 'get',
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