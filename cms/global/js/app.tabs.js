/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var TabsComponent = (function(Tabs) {
    return Tabs = {
      $el: $('.mda-tabs'),

      init: function(){
        Tabs.$el.each(Tabs.render);
        Tabs.$el.each(Tabs.mobileInitialize);
      },

      render: function(){
        var $tabsContainer = $(this);

        $tabsContainer.tabs({
          heightStyle: 'content',
          hide: { effect: 'fade', duration: 100},
          show: { effect: 'fade', duration: 100},
          beforeActivate: function(event, ui){

            //  Check to see if it is mobile view
            if (APP.utils.getViewport().width <= APP.configs.views.small) {
              var $newPanel = $(ui.newPanel);

              $newPanel.css('visibility', 'hidden');
            }
          },
          activate: function(event, ui){
            //  Check to see if it is mobile view
            if (APP.utils.getViewport().width <= APP.configs.views.small){
              var $newPanel = $(ui.newPanel);


              $newPanel.slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: '.collection-item',
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                adaptiveHeight: false
              });
              var height = 100;
              $newPanel.find('.collection-item').each(function(){
                var $this = $(this);
                var width = ($(window).width() - 80 )+ 'px';
                var tempHeight = 0;
                if($this.find('img').length > 0){
                  tempHeight =  $this.outerHeight();
                } else{
                  tempHeight = $this.outerHeight();

                }
                if(tempHeight > height){
                  height = tempHeight;
                }
                $this.css({'min-width' : width});
              });
              $newPanel.find('.collection-item').css({'height' : height});



              $newPanel.css('visibility', 'visible');
            }
          },
          create: function(event, ui){
            if (APP.utils.getViewport().width <= APP.configs.views.small) {
              var $newPanel = $(ui.panel);

              $newPanel.slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: '.collection-item',
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                adaptiveHeight: false
              });
              var height = 100;
              $newPanel.find('.collection-item').each(function(){
                var $this = $(this);
                var width = ($(window).width() - 80 )+ 'px';
                var tempHeight = 0;
                if($this.find('img').length > 0){
                  tempHeight =  $this.outerHeight();
                } else{
                  tempHeight = $this.outerHeight();

                }
                if(tempHeight > height){
                  height = tempHeight;
                }
                $this.css({'min-width' : width});
              });
              $newPanel.find('.collection-item').css({'height' : height});

              $newPanel.css('visibility', 'visible');
            }
          }
        });
      },

      mobileInitialize: function(){
        var $tabsContainer    = $(this),
            $mobileAnchor     = $tabsContainer.find('.tab-menu-mobile a'),
            $mobileMenu       = $tabsContainer.find('.tab-menu'),
            $mobileMenuItems  = $mobileMenu.find('li');

        if($mobileMenuItems[0]){
          $($mobileMenuItems[0]).addClass('active');
        }

        $mobileAnchor.on('click', function(e){
          e.preventDefault();

          $mobileMenu.toggleClass('active');
        });

        $mobileMenuItems.on('click', function(e){
          e.preventDefault();

          var $self = $(this);

          $mobileMenu.toggleClass('active');
          $mobileAnchor.text($self.text());

          //  Update the dropdown list after the list has closed.
          setTimeout(function(){
            $mobileMenu.find('li.active').removeClass('active');
            $self.addClass('active');
          }, 300);
        });
      }
    };
  })(TabsComponent || {}).init();
})(jQuery);