/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function () {
    'use strict';

    //==================================================
    // "APP" NAMESPACE
    //--------------------------------------------------
    window.APP = (typeof APP !== 'undefined' && APP instanceof Object) ? APP : {

        //--------------------------------------------------
        // CONFIGS
        //--------------------------------------------------
        configs: {
            activeClass: 'app-active',
            views: { //from _site-settings.scss
                'large': 1200, // $width-large: 75em;  // 1200/16
                'medium': 992, // $width-medium: 62em; //  992/16
                'small': 752, // $width-small: 48em;  //  768/16
                'xsmall': 480
            },
            isMobile: {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (APP.configs.isMobile.Android() || APP.configs.isMobile.BlackBerry() || APP.configs.isMobile.iOS() || APP.configs.isMobile.Opera() || APP.configs.isMobile.Windows());
                },
                nullcheck: function () {
                    return (APP.configs.isMobile.Android()!=null || APP.configs.isMobile.BlackBerry()!=null || APP.configs.isMobile.iOS()!=null || APP.configs.isMobile.Opera()!=null || APP.configs.isMobile.Windows()!=null);

                }
            },
            isLocal: false,
            isLocalImages: false //only relates to loading local images for picturefill
        },
        templates: {

        },
        //--------------------------------------------------
        // UTILITY METHODS
        //--------------------------------------------------
        utils: {
            getIEVersion: function () {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return {
                        major: matches[1],
                        minor: matches[2]
                    };
                }
                return {
                    major: '-1',
                    minor: '-1'
                };
            },
            getViewport: function () {
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                var size;
                if ($('html').hasClass('lt-ie9')) {
                    size = 'large';
                } else {
                    size = (w <= APP.configs.views.xsmall) ? 'xsmall' : size;
                    size = (w > APP.configs.views.xsmall) ? 'small' : size;
                    size = (w > APP.configs.views.small) ? 'medium' : size;
                    size = (w > APP.configs.views.medium) ? 'large' : size;
                    size = (w > APP.configs.views.large) ? 'xlarge' : size;
                }

                APP.configs.viewport = {
                    size: size,
                    width: w,
                    height: h
                };

                return APP.configs.viewport;
            },
            aspectRatio: function () {
                $('.flipper').each(function () {
                    var w = $(this).width();
                    $(this).css('height', w);
                });
            },
            transEndEventName: function () {
                var transEndEventNames = { // transition end event name
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                };
                return transEndEventNames[Modernizr.prefixed('transition')];
            },
            getUrlParameter: function (sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1];
                    }
                }
            },

            truncateText: function(element,charCountObj){
                if(!charCountObj){
                    charCountObj = {xlarge: 60, large: 60, medium: 50, small: 40, xsmall: 40};
                }
                var charCount = charCountObj[APP.utils.getViewport().size];
                var elemText = $.trim(element.text());
                if(elemText.length > charCount){
                    var text = elemText.substring(0,charCount);
                    text = text.substring(0,text.lastIndexOf(' ')) + '...';
                    element.text(text);
                }
            }

        }
    };
    //--------------------------------------------------
    // end "APP" NAMESPACE
    //==================================================




    //==================================================
    // DOCUMENT READY...
    //--------------------------------------------------

    $(function () {

        //--------------------------------------------------
        // Init Fastclick
        //--------------------------------------------------
        FastClick.attach(document.body);


        APP.utils.getViewport();


        //--------------------------------------------------
        // Add IE10 Class
        //--------------------------------------------------
        if (APP.utils.getIEVersion().major === '10') {
            $('html').addClass('ie10');
        }
        var rv; var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
        if(rv === 11){ $('html').addClass('ie11'); }
        //--------------------------------------------------



        APP.utils.aspectRatio();



        //--------------------------------------------------
        // RESIZE EVENT
        // Fires "windowResize" on $(window)
        //--------------------------------------------------
        var resizeTimer;
        $(window).resize(function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                APP.utils.getViewport();
                APP.utils.aspectRatio();
                $(window).trigger('windowResize');
            }, 500);
        });
        //--------------------------------------------------

        //--------------------------------------------------
        //  ADJUST HEADLINE TEXT
        //  Adjust first char of headline if available
        //--------------------------------------------------
        $('.headline p.headline-content').html(function (i, html) {
            return html.replace(/^[^\s\S]*([\s\S])/g, '<span class="first-large">$1</span>');
        });

        //--------------------------------------------------

        //--------------------------------------------------
        //  ALTERNATE HIGHLIGHT ON SECTION
        //--------------------------------------------------
        // Prevent section titles in cell-d to have highlights
        $('.cell-d').find('.highlight').removeClass('highlight');
        $('.highlight').each(function (index) {
            if (index % 2 === 0) { /* we are even */ } else {
                $(this).addClass('apply');
            }
        });
        //--------------------------------------------------

         //--------------------------------------------------
        //  static hero functionality
        //--------------------------------------------------

        if($(".media-body-text h3").length == '' || $('.media-body-text h3').text() == ""){
          $('.media-body-text h3').addClass("hidden");
        }

        //--------------------------------------------------
        //  Alert bar close
        //--------------------------------------------------
        $('.alert-close').click(function () {
            $('.alerts').hide('slow');
        });

        //--------------------------------------------------
        //  Event details open/close
        //--------------------------------------------------
        $('.event-detail-title').click(function () {
            $(this).parent().find('.event-details').slideToggle('fast');
            $(this).find('.details-plus, .details-minus').toggle();
        });

        //--------------------------------------------------
        // Form Helper Dialog
        //--------------------------------------------------
        $('.field-helper').click(function () {
            $(this).siblings('.field-helper-dialog').css('opacity', 1);
        });

        $('.field-helper-dialog').click(function () {
            $(this).css('opacity', 0);
        });

        $('.md-field-toggle').click(function () {
            $(this).toggleClass('off');
        });

        $('html').on('touchmove', 'body.lg-on', function (event) {
            event.preventDefault();
        })

        //--------------------------------------------------
        //  INIT SCROLL MAGIC PLUGIN
        //  Create the controller to manage scrolling effects
        //--------------------------------------------------
        APP.scrollController = new ScrollMagic();


        //--------------------------------------------------
        //  INIT SCROLL MAGIC PLUGIN
        //  Create the controller to manage scrolling effects
        //--------------------------------------------------
        $('#iso-container').isotope({
            // options...
            itemSelector: '.iso-item',
            masonry: {
                columnWidth: '.iso-item'
            }
        });

        //--------------------------------------------------
        //  Left Navigation
        //--------------------------------------------------
        $('#sidebar-nav').find('.parent-link').each(function() {
            if ($(this).find('ul.child-level li').length === 0) {
                $(this).addClass('active-nochild');

            }
        });


        //--------------------------------------------------
        //  INIT MODULES
        //  Initialize the app's modules
        //--------------------------------------------------
        APP.Nav.init();
        APP.Footer.init();
        APP.Comments.init();
        APP.SearchResults.init();
        APP.GlossarySearch.init();


        $('#mobile-menu .search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));
        });

        $('#nav-search.search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));
        });

        $('#error-search-box-wrapper .search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));

        });

        /*
         * For each cancer type search, initialize the predictive search form
         */
        $('#search-cancer-types').each(function(){
            $(this).predictiveSearchForm( $(this).data('searchurl') );
        });


        $('#search-clinical-trials.search-form').closest('.search-wrapper').each(function(){
            $(this).clinicalTrialsSearch($(this).data('searchurl'));
        });

        $('.mda-publication-search, .mda-blog-search').each(function() {
            $(this).searchForm($(this).data('predictiveurl'), $(this).data('predictivetype'));
        });

        if (APP.configs.isLocal) {
            var publicationTypeAheadQuery = '/suggest?max=4&site=mda_aem&access=access&format=rich&client=blog_fe&q=';
            var blogTypeAheadQuery = '/suggest?max=4&site=mda_aem&access=access&format=rich&client=blog_fe&q=';
        }

        //--------------------------------------------------
        //  INIT SECTIONS
        //  Initialize the section transitions
        //  (APP.scrollController must be initialized first)
        //--------------------------------------------------
        $('.scroll-trans').each(function () {
            $(this).scrollTransition();
        });
        //--------------------------------------------------
        //  Title truncation
        //--------------------------------------------------
        var articleTitleOneCol = {xlarge: 42, large: 42, medium: 42, small: 42, xsmall: 42};
        var articleSummaryOneCol = {xlarge: 440, large: 440, medium: 440, small: 440, xsmall: 440};


        var articleTitleTwoColWithImage = {xlarge: 60, large: 60, medium: 60, small: 54, xsmall: 54};
        var articleSummaryTwoColWithImage = {xlarge: 135, large: 135, medium: 135, small: 135, xsmall: 135};

        var articleTitleTwoColNoImage = {xlarge: 67, large: 67, medium: 60, small: 54, xsmall: 54};
        var articleSummaryTwoColNoImage = {xlarge: 135, large: 135, medium: 135, small: 135, xsmall: 135};

        var blogSummaryWrapper = $('.blog-summary');
        blogSummaryWrapper.each(function(){
            var $this = $(this);
            if($this.closest('.cell-l,.cell-r').length === 0){
                APP.utils.truncateText($this.find('.blog-title a'),articleTitleOneCol);
                APP.utils.truncateText($this.find('.summary-text'),articleSummaryOneCol);
            } else{
                if($this.find('.blog-summary-img-wrapper').length > 0){
                    APP.utils.truncateText($this.find('.blog-title a'),articleTitleTwoColWithImage);
                    APP.utils.truncateText($this.find('.summary-text'),articleSummaryTwoColWithImage);
                } else{
                    APP.utils.truncateText($this.find('.blog-title a'),articleTitleTwoColNoImage);
                    APP.utils.truncateText($this.find('.summary-text'),articleSummaryTwoColNoImage);
                }
            }

        });


        //--------------------------------------------------
        //  Programatically adding m-bledd to certain modules
        //--------------------------------------------------
        $('.promo-with-background').closest('.module').addClass('m-bleed');
        $('.basic-content-media').closest('.module').addClass('m-bleed');


    });

    $('.alert-close').click(function () {
        $('.alerts').hide('slow');
    });

    //--------------------------------------------------
    //  SHARE SECTIONS
    //  Share functionality
    //--------------------------------------------------
    $('.share-btn').on('click', function (e) {
        e.preventDefault();
        var shareBox = $(this).siblings('.social-share'),
            shareBoxWidth = shareBox.width(),
            leftOffset = shareBox.offset().left,
            screenWidth = APP.utils.getViewport().width;

        if ((screenWidth - (leftOffset + shareBoxWidth)) <= 50) {
            shareBox.addClass('adjust-right');
        }

        shareBox.toggleClass('visible');
    });

    $('.social-close-btn').on('click', function (e) {
        e.preventDefault();
        var shareBox = $(this).closest('.social-share');

        shareBox.removeClass('visible');
    });
    //--------------------------------------------------
    //  JWPlayer
    //  JWPlayer functionality
    //--------------------------------------------------
    $('.media-option').each(function(){
        $(this).mdaJWPlayer( true );
    });

    $('.basic-content-media').each(function(){
        $(this).mdaJWPlayer( true );
    });

    $('.flip-tile').each(function(){
        var $this = $(this);
        if($this.find('.video-play-button').length > 0){
            $this.on('mouseenter',function(e){
                $this.mdaJWPlayer( true );
            });
            $this.on('click', 'a', function (event) {
                event.preventDefault();
            })
        }
    });

    $('.static-hero').each(function (index, value) {
        var container = $(value).find('.inner');
        if ($(container).find('.video-play-button').length > 0) {
            $(container).mdaJWPlayer( true );
            $(container).on('click', function (event) {
                event.preventDefault();
            })
        }
    });

    $('.carousel-item').each(function(){
        var inOverlay = false;
        if($(this).closest('cell-l').length > 0 || $(this).closest('cell-r').length > 0 || $(this).closest('cell-s').length > 0 || $(this).closest('cell-t').length > 0){
            inOverlay = true;
        }
        if($(this).find('.video-play-button').length > 0){

            $(this).find('.carousel-item-link').on('click',function(e){
                e.preventDefault();
            });
            $(this).each(function(){
                $(this).mdaJWPlayer( true );
            });
        }
    });


    $('.collection-item .inner').each(function(){
        if($(this).find('.video-play-button').length > 0 && $(this).closest('.video-collection').length === 0){
            $(this).on('click',function(e){
                e.preventDefault();
            });

            $(this).each(function(){
                $(this).mdaJWPlayer( true );
            });


        }
    });

	$('.flip-row').each(function() {
        var flipTile = $(this).find('.flip-tile');
        $.each(flipTile, function(index, value){
            if (index < 2) return;
            $(this).addClass("hide");
        });
    });
    //--------------------------------------------------
    //  Hero Carousel Brightness
    //--------------------------------------------------
    var brightnessClass = 'mda-media-brightness';
    var $heros = $('.static-hero');

    $heros.each(function(){

        var $body = $(this).find('.media-body');
        var $image = $(this).find('.hero-image.fullwidth-image');
        var $title = $body.find('h1').not('.hidden-header');
        var $bodyCopy = $body.find('h3');
        if($title.length !== 0 || $bodyCopy.length !== 0 ){
            $image.addClass(brightnessClass);
        }

    });
    //--------------------------------------------------
    //  IE9 Place Holder
    //--------------------------------------------------

    $('input').placeholder({ customClass: 'ie9-placeholder' });
    //--------------------------------------------------
    //  Verify breadcrumbs avaibility
    //--------------------------------------------------

    function addBreadcrumb () {
        var global_header = $('#global-header'),
            breadcrumb_wrapper = $('.breadcrumb-wrapper'),
            back_button = $('#sidebar-nav').find('.sidebar-back');
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
          breadcrumb_wrapper.addClass('hide');
        } else {
          breadcrumb_wrapper.removeClass('hide');
          if (breadcrumb_wrapper.length > 0) {
            back_button.addClass('hidden');
          } else {
            back_button.removeClass('hidden');
          }
        }
    }

    addBreadcrumb();



    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================


    //--------------------------------------------------
    // Image Carousel Item Count...
    //==================================================

    function imageSlides () {
        var slides = $('.image-carousel').find('.carousel-item');
        $.each(slides, function function_name (index, value) {
            var count = '<span class="slide-count">'+ (index+1) + '/'+slides.length+'</span>'
            $(value).append(count);
        })
    }
    imageSlides();
    //--------------------------------------------------
    // End Image Carousel Item Count...
    //==================================================


    //--------------------------------------------------
    // Right over left
    //==================================================
    if (APP.utils.getViewport().width <= APP.configs.views['small']) {
        var rolCandidates = $('.table.right-over-left');
        rolCandidates.each(function () {
            var $this = $(this);
            var bottom = $this.find('.last').detach();
            $this.prepend(bottom);
        });
    }


    //--------------------------------------------------
    // End Right over left
    //==================================================


    //--------------------------------------------------
    // Text With Border
    //==================================================

    var $textWithBorders = $('.text-border-container');

    $textWithBorders.each(function(){
        var $borderItems = $('.border-item-wrapper');
        var maxHeight = 270;
        if (APP.utils.getViewport().width <= APP.configs.views['medium']) {
            maxHeight = 220;
        }

        $borderItems.each(function(){
            if($(this).find('a').first().outerHeight() > maxHeight){
                maxHeight = $(this).find('a').first().outerHeight();
            }
            $(this).find('a').css({'height': '100%'});
        });

        $borderItems.css({'height': maxHeight + 'px'})

    });


    //--------------------------------------------------
    // Text With Border
    //==================================================






}());
