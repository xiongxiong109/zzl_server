import express from 'express'

let router = express.Router();

/* GET home page. */
router.get('/detail', (req, res, next) => {
	res.render('details', {});
});
router.get('/*', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
