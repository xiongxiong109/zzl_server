// qq music
import express from 'express'
import cheerio from 'cheerio'
import request from 'request'
import cros from '../middlewares/cros'
import { createReadStream } from 'fs'
import {
	qqMusicGet,
	qqMusicSearchMiddle,
	qqMusicSourceMiddle,
	qqMusicRankMiddle
} from '../middlewares/qq_music'

const router = express.Router()

router.use(cros)
/*
	计划调用qq music的search api, 来获取网络音乐资源
	并尝试下载需要付费的音乐
	req: {
		q: string, 搜索字符串
		p: number, 搜索分页
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
router.post('/search', qqMusicSearchMiddle, async (req, res, next) => {
	let { q, p } = req.body;
	let rst;
	if (q) {
		try {
			rst = await req.searchMusic();
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
	// 在页面中注入自己的js脚本
	let injectScript = `<script src="/qq_music/js/pulldown_music.js"></script>`;
	let $ = cheerio.load(rst);
	$('body').append($(injectScript));
	res.end($.html());
});

// 排行列表查询
router.get('/rank', qqMusicRankMiddle, async (req, res, next) => {
	let rst = await req.queryRank();
	res.send(rst);
});

// 排行详情 toplist
router.get('/toplist', async (req, res, next) => {
	let rst;
	let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
	let {id} = req.query;
	try {
		rst = await qqMusicGet(`${url}?type=top&topid=${id}`);
	} catch (err) {
		rst = err;
	}
	res.send(rst);
});

export default router