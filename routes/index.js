import express from 'express'

let router = express.Router();

/* GET home page. */
router.get('/detail/*', (req, res, next) => {
	console.log('x');
	res.render('detail', {});
});
router.get('/*', (req, res, next) => {
	console.log(req);
  res.render('index', { title: 'Express' });
});

module.exports = router;