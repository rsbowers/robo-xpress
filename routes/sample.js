var config = require('../roboconfig.json');
// TODO add exception handling
var dataUrl = config.pages['sample'];
var data = dataUrl.data ? require('../data/' + dataUrl.data) : {};

module.exports = {
	index: {
		get: function(req, res) {
			res.render('sample', data);
		}
	}
};
