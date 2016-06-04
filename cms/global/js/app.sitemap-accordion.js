/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var AccordionComponent = (function(Accordion) {
    return Accordion = {
      $page: $('.mda-sitemap-accordion'),
      $firstTier: $('.ui-accordion-content .col4'),
      $secondTier: $('.col6 .ui-accordion-header'),

      init: function(){
        Accordion.$page.each(Accordion.render);

        Accordion.$firstTier.each(Accordion.render);

        Accordion.$secondTier.each(Accordion.render);

        $('.mda-custom-dd-list a').click(function(){
          var id = $(this).data('id');
          $('.mda-sitemap-accordion').find('.sitemap-group').hide();
          $('#'+id).show();
        });

        var findLinks = $('.ui-accordion-content').find('a');
        $(findLinks).on('click', function () {
          var hrefValue = $(this).attr('href');
          if (hrefValue === '#') {
            return false;
          }
          if (!($(this).attr('target') === '_blank'))
            window.location.href = window.location.origin + $(this).attr('href');
        });

        $('.mda-sitemap-accordion').find('.sitemap-group').hide().first().show();

        $('.mda-sitemap-accordion').find('.sitemap-group').unbind('click');
      },


      render: function(){
        var $accordion = $(this);
        $accordion.accordion({
          collapsible: true,
          heightStyle: 'content',
          autoHeight: true,
          animate: 300,

          beforeActivate: function(event, ui) {
            // The accordion believes a panel is being opened
            if (ui.newHeader[0]) {
              var currHeader  = ui.newHeader;
              var currContent = currHeader.next('.ui-accordion-content');

              // The accordion believes a panel is being closed
            } else {
              var currHeader  = ui.oldHeader;

              var currContent = currHeader.next('.ui-accordion-content');

            }
            // Since we've changed the default behavior, this detects the actual status
            var isPanelSelected = currHeader.attr('aria-selected') === 'true';

            // Toggle the panel's header
            currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('ui-accordion-header-active',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

            // Toggle the panel's content
            currContent.toggleClass('accordion-content-active',!isPanelSelected);
            if (isPanelSelected) {
              currContent.slideUp();
            }  else {
              currContent.slideDown();
            }
          // Cancel the default action
            return false;
          }
        });
        if (APP.utils.getViewport().width <= APP.configs.views.medium) {
          $accordion.accordion({
            active: false
          });
        }

      }
    };
  })(AccordionComponent || {}).init();
})(jQuery);
