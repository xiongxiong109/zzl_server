var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/detail', function(req, res, next) {
	res.render('details', {});
});
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
