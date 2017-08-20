// qq music
import express from 'express'
import { qqMusicSearchMiddle } from '../middlewares/qq_music'
const router = express.Router()

/*
	计划调用qq music的search api, 来获取网络音乐资源
	并尝试下载需要付费的音乐
*/
router.get('/', qqMusicSearchMiddle, async (req, res, next) => {
	let { search } = req.query;
	let rst;
	if (search) {
		try {
			rst = await req.searchMusic(search);
		} catch (err) {
			rst = err
		}
	}
	res.send(rst);
});

export default router