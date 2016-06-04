/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
(function($) {
  'use strict';

  APP.Footer = (function(Footer) {
    return Footer = {
      $el: $('footer'),


      init: function() {
        Footer.settings = {
          display : 'desktop'
        };

        Footer.ui = {
          linkListTitles: Footer.$el.find('ul .title')
        };

        $(window).on('windowResize', function(){
          Footer.render();
        });

        Footer.render();
        $(window).scroll(function(){
          Footer.gotoTop();
        });
        $('.scrollToTop').click(function(){          
            $('html, body').animate({scrollTop : 0},800);
            return false;
          });
        if($(window).width() >= 1024){
         $('.sublinks-list-container ul li').each(function(i){
              var $txt = $($(this).find('a')).text().trim();
              var txtLength = $txt.length * 6.5 + 20;
              $(this).css('width',txtLength + 'px');      
          });
       }
      },      
  
      gotoTop : function(){ 
        if ($(document).scrollTop() > screen.height) {          
          $('.scrollToTop').fadeIn();
        } else {          
          $('.scrollToTop').fadeOut();
        }
      },

      render: function(){
        Footer.formatSocialLinks();

        // if viewport is mobile width...
        if( APP.utils.getViewport().width <= APP.configs.views.medium ){

          // if footer is in desktop view, render the mobile version
          if( Footer.settings.display !== 'mobile' ) {
            Footer.renderMobile();
          }
        }



        // if viewport is desktop width...
        if( APP.utils.getViewport().width > APP.configs.views.medium ){

          // if nav is in mobile view, render the desktop version
          if( Footer.settings.display !== 'desktop' ) {
            Footer.renderDesktop();
          }
        }
      },


      renderDesktop: function(){
        Footer.ui.linkListTitles.unbind('click');

        // set display flag to desktop
        Footer.settings.display = 'desktop';
        
      },


      renderMobile: function(){
        Footer.ui.linkListTitles.on('click', Footer.expandList);

        // set display flag to mobile
        Footer.settings.display = 'mobile';
      },


      formatSocialLinks: function(){
        var linksContainer = $('.social-links');
        var linksContainerWidth = linksContainer.outerWidth(true) - 70;
        var linkBoxes = linksContainer.find('.box');
        var linkBoxCount = linkBoxes.length;
        var linkBoxWidth = linkBoxes.outerWidth(true);
        var linksBoxWidthSum = linkBoxWidth * linkBoxCount;
        var maxLinkBoxes = Math.floor(linksContainerWidth / linkBoxWidth);


        // If social links won't fit, initialize carousel
        if( (linksContainerWidth) < linksBoxWidthSum) {
          var widthDiff = $('.social-links').outerWidth(true) - (linkBoxWidth * maxLinkBoxes);
          var padding = widthDiff/2;

          // add padding to keep carousel centered
          $('.social-links').css({
            'paddingLeft': padding + 'px',
            'paddingRight': padding + 'px'
          });

          // kill carousel if already exists, and reinitalize with new settings
          if(typeof $('.social-links-carousel').getSlick() !== undefined ) {
            $('.social-links-carousel').unslick();
          }
          $('.social-links-carousel').slick({
            infinite: false,
            slidesToShow: maxLinkBoxes,
            slidesToScroll: maxLinkBoxes,
            variableWidth: true,
            slide:'.box'
          });
        }

        // if the links will fit kill the carousel
        else {
          $('.social-links-carousel').unslick();
          $('.social-links').attr('style', '');
        }
      },


      expandList: function(ev) {
        ev.preventDefault();

        var list = $(this).parent(),
            listSection = list.parents('.footer-links'),
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

            // get-in-touch list is different because the list items are not stacked.
            // this will get the height of the title and then every other item in the list
            if(list.attr('id') === 'get-in-touch') {
              var title = list.find('.title');
              var otherLi = list.find('li:odd');

              height += title.outerHeight(true) + parseInt(title.css('borderTopWidth'), 10) + parseInt(title.css('borderBottomWidth'), 10);
              height += otherLi.outerHeight(true) + parseInt(otherLi.css('borderTopWidth'), 10) + parseInt(otherLi.css('borderBottomWidth'), 10);
            }

            // this will get the height of each item in the list
            else{
              li.each(function(){
                var liHeight = $(this).outerHeight(true) + parseInt($(this).css('borderTopWidth'), 10) + parseInt($(this).css('borderBottomWidth'), 10);
                height += liHeight;
              });
            }
            return height;
          };

          list.css( 'height', ulHeight() ).addClass('expand');

          $('body').animate({
            scrollTop: listSection.offset().top
          }, 400);
        }
      }

    };
  })(APP.Footer || {}); //Fired from APP
})(jQuery);
