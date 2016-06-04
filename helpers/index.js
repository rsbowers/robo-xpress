'use strict';

//
var helpers = {
	moduleWrap: function(options) {
		var module = options.hash.module_data ? options.hash.module_data : this;

		if (module.render !== false) {
			var moduleClass = module.options ? module.options.className : '',
				moduleLayout = module.options ? module.options.layout : '',
				moduleData = '',
				modulePre = '',
				modulePost = '</div></div>';

			if (module.data) moduleData = module.data.attr && module.data.value ? ' data-' + module.data.attr + '=' + module.data.value : '';

			modulePre += '<div class="module ' + moduleLayout + '"><div class="' + moduleClass + '">';

			return modulePre + options.fn(module) + modulePost;
		}
	},
	helperStringify: function(options) {
		return JSON.stringify(options.fn(module));
	},
	withFirst: function(options) {
		return this;
	}
}

module.exports = {
	init: function(hbs) {
		for (var key in helpers) {
			if (!helpers.hasOwnProperty(key)) continue;
			hbs.registerHelper(key, helpers[key]);
		}
	},
	exphbs: function() {
		return helpers;
	}
};
