// qq music
import express from 'express'
import { qqMusicSearchMiddle, qqMusicSourceMiddle } from '../middlewares/qq_music'
const router = express.Router()

/*
	计划调用qq music的search api, 来获取网络音乐资源
	并尝试下载需要付费的音乐
	req: {
		q: string, 搜索字符串
	}
	res: {
		code,
		data: {
			song: {
				list: []
			}
		}
	}
*/
router.get('/search', qqMusicSearchMiddle, async (req, res, next) => {
	let { q } = req.query;
	let rst;
	if (q) {
		try {
			rst = await req.searchMusic(q);
		} catch (err) {
			rst = err
		}
	}
	res.send(rst);
});

/*
	歌曲源地址
	https://c.y.qq.com/v8/playsong.html?songmid=${songmid}=myqq&from=myqq&channel=10007100
	req: {
		id: string
	}
*/
router.get('/song', qqMusicSourceMiddle, async (req, res, next) => {
	let rst;
	try {
		rst = await req.getSource();
	} catch(err) {
		rst = err;
	}
	console.log(rst);
	res.send('ok');
});

export default router