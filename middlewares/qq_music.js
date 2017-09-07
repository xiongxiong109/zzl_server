import request from 'request'

const searchHost = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
const playHost = 'https://c.y.qq.com/v8/playsong.html';

export const qqMusicGet = (url = '', headers = {}) => new Promise((resolve, reject) => {
	request({
		url,
		headers,
		method: 'get',
		timeout: 10000
	}, (err, rst, body) => {
		if (err) {
			console.log(err);
			reject(err);
		} else {
			resolve(body)
		}
	})
})

// 搜索qq音乐中间件
export const qqMusicSearchMiddle = (req, res, next) => {
	let { q, p } = req.body;
	let search = encodeURIComponent(q);
	let page = p || 1;
	let url = `${searchHost}?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${search}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=1503221906558`;
	console.log(url);
	req.searchMusic = async () => qqMusicGet(url); 
	next();
}

export const qqMusicSourceMiddle = (req, res, next) => {
	let { id } = req.query;
	let url = `${playHost}?songmid=${id}&ADTAG=myqq&from=myqq&channel=10007100`;
	console.log(url);
	req.getSource = async () => qqMusicGet(url, {
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
	});
	next();
}

// 排行查询
export const qqMusicRankMiddle = (req, res, next) => {
	let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=2090557760&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504487010048';
	req.queryRank = async () => qqMusicGet(url);
	next();
}