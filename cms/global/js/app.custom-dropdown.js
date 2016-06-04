/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var DropdownComponent = (function(Dropdown) {
    return Dropdown = {
      $el: $('.mda-custom-dd').not('.clinical-trial-filter'),

      init: function(){
        Dropdown.$el.each(Dropdown.render);
      },

      render: function(){
        var $dropdown = $(this),
            $ddLink   = $dropdown.find('.mda-custom-dd-link'),
            $ddList   = $dropdown.find('.mda-custom-dd-list');

        $ddLink.on('click', function(e){
          e.preventDefault();

          $dropdown.toggleClass('extended');
        });

        $ddList.on('click', 'a', function(e){
          e.preventDefault();

          var $clicked = $(this);
          $dropdown.removeClass('extended');
          if($ddLink.closest('.clinical-trials-search-filter').length === 0){
            $ddLink.find('span').text($clicked.text());

          }

          //  Delay the following actions to allow time for the dropdown to close
          setTimeout(function(){
            $ddList.find('li.selected').removeClass('selected');
            $clicked.parent('li').addClass('selected');
          }, 500);
        });
      }
    };
  })(DropdownComponent || {}).init();
})(jQuery);
