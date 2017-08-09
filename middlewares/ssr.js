// server side render
import path from 'path'
import fs from 'fs'
import Vue from 'vue'

const viewDir = path.join(__dirname, '../views/ssr')
const ssrRouteDir = path.join(__dirname, '../routes/ssr');

export default (req, res, next) => {

	res.ssr = async () => new Promise((resolve, reject) => {
		let pathUrl = req.path;
		let viewNm = path.join(viewDir, pathUrl);
		let routeNm = path.join(ssrRouteDir, pathUrl);
		let subRoute = require(ssrRouteDir).default;
		fs.readFile(`${viewNm}.ejs`, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve({subRoute, viewContent: data})
			}
		});
	})

	next()

}