var robo = require('../lib/robo');
var data  = robo.fetchPageData('index');

module.exports = {
	index: {
		get: function(req, res) {
			res.render('index', data);
		}
	}
};
