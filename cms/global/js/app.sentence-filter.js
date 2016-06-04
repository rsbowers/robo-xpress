/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var SentenceFilterComponent = (function(SentenceFilter) {
    return SentenceFilter = {
      $el: $('.sentence-filter'),

      init: function(){
        SentenceFilter.$el.each(SentenceFilter.render);
      },

      render: function(){

        //--------------------------------------------------
        //  Sentence Filter functionality
        //--------------------------------------------------
        var $self = $(this),
            $customSelectLink = $self.find('.sf-select-link'),
            $customSelectList = $self.find('.sf-select-list'),
            $sfMobileNextLink = $self.find('.sf-mobile-next');

        $self.focusout(function(){
          $self.find('.sf-select-wrapper').removeClass('extended');
        });

        $customSelectLink.on('click', function(e){
          e.preventDefault();

          var $clicked = $(this),
              $selectWrapper = $clicked.parent('.sf-select-wrapper'),
              $sentenceFilterWrapper = $selectWrapper.parents('.sentence-filter-wrapper');

          //  Remove the class from other dropdowns that might be open.
          $sentenceFilterWrapper.find('.sf-select-wrapper extended').removeClass('.extended');

          //  Add the extended class to the dropdown just clicked on.
          $selectWrapper.toggleClass('extended');
        });

        $customSelectList.on('click', 'li', function(e){
          e.preventDefault();

          var $clickedItem    = $(this),
              $parentWrapper  = $clickedItem.parents('.sf-select-wrapper'),
              $parentList     = $parentWrapper.find('.sf-select-list'),
              $parentLink     = $parentWrapper.find('.sf-select-link'),
              $hiddenInput    = $parentWrapper.find('.sf-hidden-input'),
              clickedValue    = $clickedItem.text();

          $parentWrapper.toggleClass('extended');

          setTimeout(function(){
            $parentList.find('li').removeClass('selected');
            $clickedItem.addClass('selected');
            $parentLink.text(clickedValue);
            $hiddenInput.val(clickedValue);

          }, 500);
        });

        //  Sentence Filter Mobile Functionality
        //    -- Advances the form to the second step
        $sfMobileNextLink.on('click', function(e){
          e.preventDefault();
          $(this).parents('.sentence-filter-wrapper').addClass('sf-mobile-step-two-active');
        });
      }
    };
  })(SentenceFilterComponent || {}).init();
})(jQuery);
