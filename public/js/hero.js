// jshint devel:true

(function($) {
	'use strict';

	APP.Hero = (function(Hero) {
		return Hero = {
			$el: $('.hero'),

			init: function() {
				Hero.settings = {};
				console.log('I am Hero.');
			}

		};
	})(APP.Hero || {}); //Fired from APP
})(jQuery);
