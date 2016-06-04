/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */


(function($) {
  'use strict';

  var $searchHide = $('.search-filter-hide');
  $searchHide.on('click', function(e){
    $searchHide = $('.search-results-filters');
    e.preventDefault();

    if($searchHide.find('#search-filter').css('display') && $searchHide.find('#search-filter').css('display') === 'none'){
      $searchHide.find('.search-filter-hide .dd-extended-icon').css({'display':'inline-block'});
      $searchHide.find('.search-filter-hide .dd-collapsed-icon').hide();

      $searchHide.find('#search-filter').slideDown( 'slow', function() {

      });
    } else{
      $searchHide.find('.search-filter-hide .dd-extended-icon').hide();
      $searchHide.find('.search-filter-hide .dd-collapsed-icon').css({'display':'inline-block'});
      $searchHide.find('#search-filter').slideUp( 'slow', function() {

      });
    }



  });
})(jQuery);
