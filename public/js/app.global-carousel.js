/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var CarouselComponent = (function(Carousel) {
    return Carousel = {
      $el: $('.carousel-group'),
      config: {
        'default': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: true,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'upcoming-events': {
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 2,
          slide: '.carousel-item',
          dots: false,
          arrows: true,
          infinite: true,
          centerMode: false,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'highlight': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: true,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: true,
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'hero': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          fade: true,
          slide: 'div',
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'hero-inline': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          fade: true,
          slide: 'div',
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'standard': {
          speed: 1000,
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 753,
            settings: {
              arrows: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }]
        },
        'video': {
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          slide: '.collection-item',
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
            {
              breakpoint: 753,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }]
        },
        'image': {
          dots: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20%',
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              centerPadding: '15%',
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
            {
              breakpoint: 753,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '10%  ',
                slidesToShow: 1
              }
            }]
        },
        'promo': {
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 2,
          responsive: [{
            breakpoint: 753,
            settings: {
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '30px',
              adaptiveHeight: false
            }

          }]
        },
        'faculty': {
          speed: 1000,
          dots: true,
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 2,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300
            }
          },{
            breakpoint: 753,
            settings: {
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '100px',
              adaptiveHeight: false,
              infinite: true
            }
          }]
        },
        'standard-mobile':  {
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          adaptiveHeight: false,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300
            }
          },{
            breakpoint: 753,
            settings: {
              speed: 300,
              dots: false
            }
          }]
        }
      },

      init: function() {
        Carousel.$el.each(Carousel.render);
      },

      render: function() {
        var $carousel = $(this),
            slickType = 'default',
            slickConfig = {};
        function buttonStyles() {
          var activeSlide = $carousel.find('.carousel-item.slick-active');
          if (($(activeSlide).find('.carousel-image').length <= 0) && (!$(activeSlide).hasClass('yellow')))
            $carousel.addClass('no-image');
          else
            $carousel.removeClass('no-image');
        }
        function highlightStyles (argument) {
          var slides = $carousel.find('.carousel-item'),
              noImageSlides = [];
          $.each(slides, function (index, slide) {
            if ($(slide).find('.carousel-image').length <= 0)
              noImageSlides.push(slide);
          })
          $.each(noImageSlides, function (index, slide) {
            switch (index % 4) {
              case 0 :
                $(slide).addClass('red');
                break;
              case 1 :
                $(slide).addClass('purple');
                break;
              case 2 :
                $(slide).addClass('blue');
                break;
              case 3 :
                $(slide).addClass('yellow');
                break;
            }
          })
        }

        if($carousel.is('.carousel-config-hero-inline')) {
          slickType = 'hero-inline';
        } else if($carousel.is('.carousel-config-hero')) {
          slickType = 'hero';
        } else if($carousel.is('.carousel-highlight')) {
          slickType = 'highlight';
          highlightStyles();
        } else if($carousel.is('.carousel-config-standard')) {
          if (APP.utils.getViewport().width <= APP.configs.views.small) {
            slickType = 'standard-mobile';
          } else{
            slickType = 'standard'
          }

        } else if($carousel.is('.carousel-config-promo')) {
          slickType = 'promo';
        }else if($carousel.is('.carousel-config-faculty')) {
          slickType = 'faculty';
        }else if($carousel.is('.carousel-config-video')) {
          slickType = 'video';
        }else if($carousel.is('.carousel-config-image')) {
          slickType = 'image';
        }else if($carousel.is('.carousel-upcoming-events')) {
          slickType = 'upcoming-events';

        }

        slickConfig = Carousel.merge(Carousel.config['default'], Carousel.config[slickType]);

        if ($carousel.attr('data-parallax-ratio')) {
          slickConfig.onAfterChange = function() {};
        }

        //render
        $carousel.slick(slickConfig);

        if($carousel.is('.carousel-upcoming-events')) {
          var $prevArrow = $carousel.find('.slick-prev').first().detach();
          var $nextArrow = $carousel.find('.slick-next').first();
          $carousel.prepend($prevArrow);

          var isShiftPressed = false;
          $(window).keydown(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            isShiftPressed = e.shiftKey;
          });
          $prevArrow.on('focus',function(){
            $prevArrow.addClass('active');
            $nextArrow.addClass('active');
          });
          $nextArrow.on('blur',function(){
            if(isShiftPressed){
              $carousel.find('.carousel-item.slick-active').last().find('a').focus();
            }
          });
          $carousel.find('.carousel-item').each(function(){
            var $carItem = $(this);
            $carItem.find('a').on('blur',function(ev){
              var isLastItem = $carousel.find('.carousel-item.slick-active').index($carItem) === 1;
              var isFirstItem = $carousel.find('.carousel-item.slick-active').index($carItem) === 0;

              if (isShiftPressed && isLastItem) {
                $carousel.find('.slick-active').first().find('a').focus();
              } else if(isShiftPressed && isFirstItem){
                ev.preventDefault();
                $prevArrow.focus();
              } else {
                if(isLastItem){
                  ev.preventDefault();
                  $nextArrow.focus();
                }
              }
            });
            $carItem.find('a').on('focus',function(e){
              if(!$carItem.hasClass('slick-active')){
                e.preventDefault();
                if($carItem.is($carousel.find('.carousel-item.slick-active').first().prev())){
                  $prevArrow.focus();
                } else if($carItem.is($carousel.find('.carousel-item.slick-active').last().next())){
                  $nextArrow.focus();
                } else{
                  $carousel.find('.slick-active').first().find('a').focus();
                }
              }
            })
          })
        }


        //Height of highlight carousel fix
        if (APP.utils.getViewport().width <= APP.configs.views['small'] && $carousel.hasClass('carousel-highlight')) {
          var $carouselItems = $carousel.find('.carousel-item');
          if($carousel.find('img').length === 0){
            Carousel.setHeight($carouselItems);
          } else{
            Carousel.getImageSize($carousel.find('img')[0], function(){
              Carousel.setHeight($carouselItems);
            });
          }
        }


        var carouselItems = $carousel.find('.carousel-item');
        var maxHeight = 200;
        carouselItems.each(function(){
          if($(this).height() > maxHeight){
            maxHeight = $(this).height();
          }
        });
        maxHeight = maxHeight - 30;
        carouselItems.each(function(){
          var $this = $(this);
          if($this.hasClass('dynamic') && $this.hasClass('no-img')){
            $this.css({'height': maxHeight+'px'});
          }
        });


        if(slickType === 'faculty' && (APP.utils.getViewport().width <= APP.configs.views.medium)) {
          var items = $carousel.find('.item-wrapper');
          $carousel.find('.slick-track').html('');

          $.each(items, function(){
            var $self = $(this);
            $self.addClass('carousel-item').addClass('slick-slide');
            $carousel.slickAdd($self);
          });

        }
        if(slickType === 'video'){
          $carousel.find()
        }
        if(APP.configs.isMobile.nullcheck()){
          $('.carousel-hero').find('.slick-prev').addClass('active');
          $('.carousel-hero').find('.slick-next').addClass('active');

        }

        $carousel.on('click', '> button', function () {
          buttonStyles();
        });
        $carousel.on('touchend', function () {
          setTimeout(function () {
            buttonStyles();
          },100);

        })
        buttonStyles();
      },

      merge: function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
          obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
          obj3[attrname] = obj2[attrname];
        }
        return obj3;
      },
      getImageSize: function(img, callback) {
        var $img = $(img);
        var wait = setInterval(function() {

          var w = $img[0].naturalWidth,
              h = $img[0].naturalHeight;
          if (w && h) {
            clearInterval(wait);
            callback.apply(this, [w, h]);
          }
        }, 30);
      },
      setHeight: function($carouselItems){
        var height = 250;
        var tempHeight = 0;
        var thisHeight = 0;
        $carouselItems.each(function () {
          var $thisItem = $(this);
          if($thisItem.find('img').length > 0){
            tempHeight = 100;
            if( $thisItem.find('img').first().outerHeight() > tempHeight){
              tempHeight = $thisItem.find('img').first().outerHeight(true);
            }
            thisHeight = $thisItem.find('.title').first().outerHeight(true) + $thisItem.find('.description').first().outerHeight(true) + $thisItem.find('.cta-container').first().outerHeight(true) + tempHeight;

          } else{
            thisHeight = $thisItem.find('.carousel-body').first().outerHeight(true);
          }

          if(thisHeight > height){
            height = thisHeight;
          }

          $thisItem.find('.cta-container').css({'position':'absolute'});
          if($thisItem.find('img').length > 0){
            $thisItem.find('.carousel-body').css({'height':'calc(100% - '+tempHeight+'px)'});
          } else{
            $thisItem.find('.carousel-body').css({'height':'calc(100% - 1px)'});
          }

        });
        $carouselItems.css({'height': height + 'px'});
      },

      mobileTabs: function() {
        var $tabCarousel = $('.mda-tabs > .collection-group').not('.video-collection');

        if ($tabCarousel.length) {
          if ($('html').width() < 752) {

            $tabCarousel.each(function() {
              if (!$(this).is('.tabs-carousel')) {
                $(this).addClass('tabs-carousel').addClass('carousel');
                Carousel.render.apply($(this));

                var $navtabs = $(this).parents().find('.nav-inner ul');
                $navtabs.addClass('navtabs-carousel').addClass('carousel');
                Carousel.render.apply($navtabs);
              }
            });

          } else {
            $tabCarousel.each(function() {
              if ($(this).is('.tabs-carousel')) {
                $(this).removeClass('tabs-carousel').removeClass('carousel')
                $(this).unslick();
              }
            });
          }
        }
      }
    };
  })(CarouselComponent || {}).init(); //Self Firing
})(jQuery);
