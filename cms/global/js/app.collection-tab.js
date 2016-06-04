/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
var collectionTab = (function (window, undefined) {
	var $el = $('.collection.tabbed');
	var _initialize = function () {
		$.each($el, function (index, value) {
			var $tabContainer = $(value).find('.ui-state-default'),
				$collectionGroup = $(value).find('.collection-group');
			var lastTab = $tabContainer[$tabContainer.length - 1]
			if ($(lastTab).hasClass('ui-tabs-active')) {
				return false;
			}
			$.each($collectionGroup, function (index, item) {
				var links = $(item).find('a');
				var lastLink = links[$(links).length - 1];
				$(lastLink).on('blur', function (event) {
					var $selectedTab = $(value).find('.ui-state-active');
					var $nextTab = $selectedTab.next().find('a');
					$nextTab.trigger('click');
                    $nextTab.focus();
				})
			})
		})
	}
	var init = function () {
		_initialize();
	}
	return {
		init: init
	}
}(window, undefined)).init();