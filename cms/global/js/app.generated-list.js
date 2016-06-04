var generatedList = (function (window, undefined) {
	var $el = $('.generated-link-list');
	var _initialize = function() {
		$.each($el, function (index, value) {
			var linkList = $(value).find('.link-list-body');
			var	lastElem = $(linkList)[$(linkList).length-1];
			$(lastElem).addClass('last');

		})
	}
	var init = function () {
		_initialize();
	}
	return {
		init : init
	}
}(window, undefined)).init();