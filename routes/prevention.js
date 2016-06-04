var robo = require('../lib/robo');
var data  = robo.fetchPageData('prevention');

module.exports = {
	index: {
		get: function(req, res) {
			res.render('prevention', data);
		}
	}
};
