/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var AccordionComponent = (function(Accordion) {
    return Accordion = {
      $el: $('.mda-accordion'),

      init: function(){
        Accordion.$el.each(Accordion.render);
      },

      render: function(){
        var $accordion = $(this);

        $accordion.accordion({
          collapsible: true,
          heightStyle: 'content',
          autoHeight: true,
          animate: 300,
          header: 'h3.panel-title',
          activate: function (event, ui) {
            if(ui.newHeader.length > 0) {
              $('html, body').animate({
                  scrollTop: $(ui.newHeader).offset().top
              }, 300);
            }
          },
          create: function() {
            if(APP.utils.getViewport().width <= APP.configs.views.small && $('.clinical-trials-header').length === 0){
              $accordion.accordion('option', 'active', 'false');
            }
          }
        });
      },

      expand: function(){
        var $expandLink = $(this),
            $linkContainer = $expandLink.closest('.ui-accordion-content').find('.panel-content');

        $expandLink.on('click', 'a', function(e){
          e.preventDefault();
          $linkContainer.toggleClass('expanded');
          $expandLink.toggleClass('expanded');
        });
      }
    };
  })(AccordionComponent || {}).init();
})(jQuery);
