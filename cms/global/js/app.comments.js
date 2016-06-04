/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  APP.Comments = (function(Comments) {
    return Comments = {
      $el: $('.blog-comments-mobile'),

      init: function() {
        Comments.$el.find('ul .title').on('click', Comments.expandList);
      },

      expandList: function(ev) {
        ev.preventDefault();

        var list = $(this).parent(),
            listSection = list.parents('.comments'),
            defaultListHeight = list.css('minHeight'),
            isTargetListOpen = list.hasClass('expand'),
            openLists = listSection.find('ul.expand'),
            delay = 0;

        if( openLists.length ){
          openLists.css('height', defaultListHeight).removeClass('expand');
          delay = 400;
        }

        if( !isTargetListOpen ){

          var li = list.find('li');

          var ulHeight = function(){
            var height = 0;

            // this will get the height of each item in the list
              li.each(function(){
                var liHeight = $(this).outerHeight(true) + parseInt($(this).css('borderTopWidth'), 15) + parseInt($(this).css('borderBottomWidth'), 15);
                height += liHeight;
              });
            return height;
          };

          list.css( 'height', ulHeight() ).addClass('expand');

          $('body').animate({
            scrollTop: listSection.offset().top
          }, 500);
        }
      }

    };
  })(APP.Comments || {}); //Fired from APP
})(jQuery);
