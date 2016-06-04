/*
 * Generated on 01-29-2015
 *
 * Copyright (c) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  $(window).on('load', function () {

  	function removeHover() {
		var $toolbox = $('.addthis_sharing_toolbox .at-svc-compact');

	  	$toolbox.on('mouseover', function() {
	    	return false;
	    });
  	};

  	setTimeout(removeHover, 1000);

  });

})(jQuery);
