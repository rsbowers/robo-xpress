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

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 *
 * http://<servername>/content/dam/mdanderson/kitten.jpg' + suffix + '.param1.param2.param3.jpg=' + suffix + '
 * param1 - resize/crop
 * param2 - 570(width)/300.400(width.height)
 * param3 - high or medium or low
 *
 *
 */


var basic_content_media =  (function (window, undefined) {
    var init = function () {
        var $mediaImage = $('.basic-content-media-wrapper .media-image');

        //for use in prototype
        var template = ['<picture>',
                        '<!--[if IE 9]><video style="display: none;"><![endif]-->',
                        '<source srcset="" alt="" media="(min-width: 993px)">',
                        '<source srcset="" alt="" media="(min-width: 753px)">',
                        '<!--[if IE 9]></video><![endif]-->',
                        '<img src="" srcset="" alt="">',
                        '</picture>'].join('\r\n');

        //for use in prototype
        var renderImage = function($image, largeSrcSet, mediumSrcSet, smallSrcSet, smallSrc, imageAlt) {
            $image.html(template);
            $image.find('img').attr('srcset', smallSrcSet).attr('src', smallSrc).attr('alt', imageAlt);
            var largeSrcEle = $image.find('source').first();
            var mediumSrcEle = $image.find('source').last();
            largeSrcEle.attr('srcset', largeSrcSet).attr('alt', imageAlt);
            mediumSrcEle.attr('srcset', mediumSrcSet).attr('alt', imageAlt);
        };

        $mediaImage.each(function(){
          var imagePath = $(this).data('imagepath');
          var imageAlt = $(this).data('imagealt');
          var imageNoCrop = $(this).data('imagenocrop');
          var suffix = $(this).data('suffix');
          var heightParam = (imageNoCrop) ? false : true;
          var largeSrcSet = imagePath;
          var mediumSrcSet = imagePath;
          var smallSrcSet = imagePath;
          var smallSrc = imagePath;
           
            if(imagePath !== undefined && imagePath.length > 0){
                imagePath = imagePath.replace(new RegExp(' ', 'g'), '%20');
                if($(this).closest('section .table').length > 0) {

                    //use medium image
                    if(!APP.configs.isLocalImages) {
                      if(heightParam) {
                    	  largeSrcSet = imagePath + '.resize.450.254.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.900.508.high.jpg' + suffix + ' 2x';
                          mediumSrcSet = imagePath + '.resize.425.300.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.850.600.high.jpg' + suffix + ' 2x';
                          smallSrcSet = imagePath + '.resize.278.158.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.556.316.high.jpg' + suffix + ' 2x';
                          smallSrc = imagePath + '.resize.278.158.medium.jpg' + suffix + '';
                        } else {
                          largeSrcSet = imagePath + '.resize.450.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.900.0.high.jpg' + suffix + ' 2x';
                          mediumSrcSet = imagePath + '.resize.425.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.850.0.high.jpg' + suffix + ' 2x';
                          smallSrcSet = imagePath + '.resize.278.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.556.0.high.jpg' + suffix + ' 2x';
                          smallSrc = imagePath + '.resize.278.0.medium.jpg' + suffix + '';
                        }
                    } else {
                    	largeSrcSet = 'mda-web/images/adaptiveTest/large.jpg' + suffix + ' 1x, mda-web/images/adaptiveTest/large.jpg' + suffix + ' 2x';
                        mediumSrcSet ='mda-web/images/adaptiveTest/medium.jpg' + suffix + ' 1x, mda-web/images/adaptiveTest/medium.jpg' + suffix + ' 2x';
                        smallSrcSet ='mda-web/images/adaptiveTest/small.png' + suffix + ' 1x, mda-web/images/adaptiveTest/small.png' + suffix + ' 2x';
                        smallSrc = 'mda-web/images/adaptiveTest/small.png' + suffix + '';
                    }

                    renderImage($(this), largeSrcSet, mediumSrcSet, smallSrcSet, smallSrc, imageAlt);
                    picturefill();

                } else {

                    //use large image
                    if(!APP.configs.isLocalImages) {
                      if(heightParam) {
                        largeSrcSet = imagePath + '.resize.1400.601.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.2800.1202.high.jpg' + suffix + ' 2x';
                        mediumSrcSet = imagePath + '.resize.992.320.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.1984.640.high.jpg' + suffix + ' 2x';
                        smallSrcSet = imagePath + '.resize.360.202.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.702.404.high.jpg' + suffix + ' 2x';
                        smallSrc = imagePath + '.resize.360.202.medium.jpg' + suffix + '';
                      } else {
                        largeSrcSet = imagePath + '.resize.1400.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.2800.0.high.jpg' + suffix + ' 2x';
                        mediumSrcSet = imagePath + '.resize.992.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.1984.0.high.jpg' + suffix + ' 2x';
                        smallSrcSet = imagePath + '.resize.360.0.medium.jpg' + suffix + ' 1x,' + imagePath + '.resize.720.0.high.jpg' + suffix + ' 2x';
                        smallSrc = imagePath + '.resize.360.0.medium.jpg' + suffix + '';
                      }
                    } else{
                      largeSrcSet = 'mda-web/images/adaptiveTest/large.jpg' + suffix + ' 1x, mda-web/images/adaptiveTest/large.jpg' + suffix + ' 2x';
                      mediumSrcSet ='mda-web/images/adaptiveTest/medium.jpg' + suffix + ' 1x, mda-web/images/adaptiveTest/medium.jpg' + suffix + ' 2x';
                      smallSrcSet ='mda-web/images/adaptiveTest/small.png' + suffix + ' 1x, mda-web/images/adaptiveTest/small.png' + suffix + ' 2x';
                      smallSrc = 'mda-web/images/adaptiveTest/small.png' + suffix + '';
                    }

                    renderImage($(this), largeSrcSet, mediumSrcSet, smallSrcSet, smallSrc, imageAlt);
                    picturefill();
                }
            }

        });
    }
    return {
        init : init
    }
}(window, undefined));
basic_content_media.init();
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
(function($) {
    'use strict';

    APP.Nav = (function(Nav) {
        return Nav = {
            $el: $('.carousel-group'),

            init: function() {
                Nav.settings = {
                    display: 'desktop',
                    docElem: window.document.documentElement,
                    docscroll: 0,
                    clickevent: APP.configs.isMobile.any() ? 'touchstart' : 'click', // click event (if mobile use touchstart)
                    alreadyAdjusted: false,
                    // store ui elements
                    body: $('body'),
                    container: $('.page'),
                    topNav: $('#topnav'),
                    topNavList: $('#mobile-menu .topnav-list.mobile'),
                    utilityNav: $('#utilities-nav'),
                    primaryNav: $('#primary-nav'),
                    navSearch: $('#nav-search'),
                    navSearchMask: $('#nav-search-mask'),
                    navSearchWrapper: $('#nav-search .search-wrapper'),
                    navSearchField: $('#nav-search .search-field'),
                    closeSearch: $('#nav-search-close'),
                    clearSearch: $('#nav-search-clear'),
                    searchToggle: $('#nav-search-toggle'),
                    mobileMenuToggle: $('#mobile-menu-toggle'),
                    mobileMenu: $('<div id="mobile-menu"></div>'),
                    sidebarNav: $('#sidebar-nav'),
                    mobileChild: $('#mobile-menu .topnav-list.mobile'),
                    mobileSubChild: $('.primary-nav-list')
                };

                if (APP.utils.getViewport().width > APP.configs.views.medium) Nav.addNavEventHandlers();

                Nav.render();

                Nav.settings.mobileMenuToggle.on('click', Nav.toggleMenu);

                Nav.settings.searchToggle.on('click', Nav.toggleSearch);

                Nav.settings.closeSearch.on('click', Nav.toggleSearch);
                Nav.adjustNavigation();

                $(window).on('windowResize', function() {
                    Nav.render();
                    Nav.adjustNavigation();

                });

                Nav.hideNavArrow();
            },


            render: function() {

                if (APP.utils.getViewport().width <= APP.configs.views.medium) {

                    // if nav is in desktop view, render the mobile version
                    if (Nav.settings.display !== 'mobile') Nav.renderMobile();

                    // if sidebarNavScene exsts, remove scrolling/sticky detection
                    if (Nav.stickySidebarScene) Nav.removeSidebarNav();
                } else{
                    $('#primary-nav').find('.promo-item.image').each(function(){
                        $(this).closest('.subnav-section').addClass('image');
                    });

                    $('#primary-nav').find('.subnav-section ').each(function(){
                        var $this = $(this);
                        if($this.find('.subnav-subsection').length > 1){
                            $this.addClass('multiple');
                        }
                        if($this.find('.promo-item').length > 1){
                            $this.addClass('multiple-promo');
                        }
                    });

                    // if viewport is desktop width...
                    if (APP.utils.getViewport().width > APP.configs.views.medium) {

                        // if nav is in mobile view, render the desktop version
                        if (Nav.settings.display !== 'desktop') Nav.renderDesktop();
                        //Open up current active element
                        var currentPageElement = document.querySelector("meta[name='navurl']");
                        if(currentPageElement != null && currentPageElement.getAttribute('content') !== undefined){
                            var currentPage = currentPageElement.getAttribute('content');

                            if(currentPage.indexOf('http') > -1){
                                currentPage = currentPage.substring(7,currentPage.length);
                                currentPage = currentPage.substring(currentPage.indexOf('/'),currentPage.length);
                            }
                            currentPage = currentPage.replace('.html','');
                            var $navItems = $('#primary-nav-wrapper').find('a');
                            $navItems.each(function(){
                                var $this = $(this);
                                var thisHref = $this.attr('href');
                                if(thisHref) {
                                    if (thisHref.indexOf('http') > -1) {
                                        thisHref = thisHref.substring(7, thisHref.length);
                                        thisHref = thisHref.substring(thisHref.indexOf('/'), thisHref.length);
                                    }

                                    thisHref = thisHref.replace('.html', '');

                                    if (currentPage.indexOf(thisHref) > -1) {
                                        $this.addClass('active');
                                        $this.closest('.primary-nav-item').addClass('active');
                                    }
                                }
                            })


                        }

                    }

                }
            },

            adjustNavigation: function(){
                var $primaryNavItems = $('.primary-nav-item');
                $('.subnav-subsection.last').removeClass('last');
                if(APP.utils.getViewport().width <= 1200 && !Nav.settings.alreadyAdjusted && APP.utils.getViewport().width > APP.configs.views.medium){
                    Nav.settings.alreadyAdjusted = true;
                    $primaryNavItems.each(function(){
                        var $primaryNavItem = $(this);
                        $primaryNavItem.find('.subnav').addClass('small-breakpoint');
                        var $subNavItems = $primaryNavItem.find('.subnav-section');
                        var navItemArray;
                        if($subNavItems.length > 4){

                            navItemArray = $subNavItems.not('.promo').toArray();
                            navItemArray = navItemArray.slice(0,navItemArray.length-1);
                            navItemArray.sort(function(a,b){
                                var firstHeight = 0;
                                var secondHeight = 0;
                                $(a).find('.subnav-subsection').each(function(){
                                    firstHeight += $(this).height();
                                });
                                $(b).find('.subnav-subsection').each(function(){
                                    secondHeight += $(this).height();
                                });
                                if ( firstHeight > secondHeight)
                                    return -1;
                                if ( firstHeight < secondHeight)
                                    return 1;
                                return 0;
                            });
                            var $itemsToMove = $subNavItems.not('.promo').last();
                            $itemsToMove.find('.subnav-subsection').each(function(){
                                var destination = $(navItemArray.pop()).addClass('multiple');
                                $(this).appendTo(destination);
                            });
                            $itemsToMove.remove();
                        }
                    })
                }

                $primaryNavItems.each(function(){
                    var $primaryNavItem = $(this);
                    $primaryNavItem.find('.subnav .subnav-section.multiple').each(function(){
                        var $thisItem = $(this);
                        var $lastSubSection = $thisItem.find('.subnav-subsection').last().addClass('last');
                        var height = $thisItem.outerHeight();
                        $thisItem.find('.subnav-subsection').not('.last').each(function(){
                            height = height - $(this).outerHeight();
                        });
                        $lastSubSection.css({'height':height});
                    })
                });

            },

            renderDesktop: function() {

                Nav.closeMenu();

                // move primary nav items out of topnav list

                Nav.settings.topNavList.css({
                    '-webkit-transform': 'translate3d(0, 0, 0)',
                    '-ms-transition': 'translate3d(0, 0, 0)',
                    '-moz-transform': 'translate3d(0, 0, 0)',
                    '-o-transform': 'translate3d(0, 0, 0)',
                    'transform': 'translate3d(0, 0, 0)',
                });


                // destroy topnav carousel and associated events
                Nav.settings.topNavList.unslick();
                Nav.settings.topNavList.find('a').unbind('click');
                Nav.settings.primaryNav.attr('style', '').find('.primary-nav-item > a').unbind('click');

                // wrap grouped topNav items to display dropdown
                Nav.addNavEventHandlers();

                // remove container for mobile nav


                // remove mobile classes from body
                Nav.settings.body.removeClass('menuview animate');

                // set display flag to desktop
                Nav.settings.display = 'desktop';

                $('.topnav-scroll-container').css({'min-height': 'initial'});

            },




            renderMobile: function() {
                // add a container for the mobile menu
                //Nav.settings.body.prepend(Nav.settings.mobileMenu);

                Nav.unwrapTopNavGroups();
                var clickEvent = 'click';


                if($('#mobile-menu').find('.my-mda').length === 0){
                    var $mobileNav = $('#mobile-menu #topnav');
                    var $myMDAButton = $('#utilities-nav .my-mda')
                    var $giveNow = $('#utilities-nav #give-now-btn');
                    var $mdaClone = $myMDAButton.clone().addClass('mobile').appendTo($mobileNav);
                    var $giveNowClone = $giveNow.clone().addClass('cta').addClass('give-btn').appendTo($mobileNav);
                }



                //Reset mobile navigation to perform optimally
                $('.topnav-list.mobile').find('.topnav-list-item').show().removeClass('expand');
                Nav.settings.topNavList.css({
                    '-webkit-transform': 'translate3d(-' + 0 + '%, 0, 0)',
                    '-ms-transition': 'translate3d(-' + 0 + '%, 0, 0)',
                    '-moz-transform': 'translate3d(-' + 0 + '%, 0, 0)',
                    '-o-transform': 'translate3d(-' + 0 + '%, 0, 0)',
                    'transform': 'translate3d(-' + 0 + '%, 0, 0)'
                });



                //check if the topnav-list links have children and disable the + icon if not
                Nav.settings.mobileChild.find('.topnav-list-item').each(function() {
                    if ($(this).find("ul.primary-nav-list").length == 0) {
                        $(this).find('a').addClass("mobile-link");

                    }
                });

                //check if the primary-nav-item links have children and disable the > icon if not
                Nav.settings.mobileSubChild.find('.primary-nav-item').each(function() {
                    if ($(this).find(".subnav-mask").length == 0) {
                        $(this).find('a').addClass("mobile-sub-link");
                    }
                });



                //mobile settings functionality
                var settings = Nav.settings.utilityNav.find('.dropdown .topnav-sublist-toggle');

                settings.on('click', function(ev) {
                    ev.preventDefault();
                    settings.parent().toggleClass('expand');
                });

                Nav.settings.topNavList.on('click', function() {
                    settings.removeClass('expand');
                });

                settings.on('blur', function() {
                    if(APP.utils.getViewport().size === 'medium' || APP.utils.getViewport().size === 'small' || APP.utils.getViewport().size === 'xsmall' ){
                        settings.closest('.dropdown').removeClass('expand');
                    }
                });


                // expand accordion when topNav item is clicked
                Nav.settings.topNavList.find('.topnav-list-item > a').on(clickEvent, function(ev) {

                    if($(this).closest('.topnav-list-item').find('ul').length > 0) {
                        ev.preventDefault();


                        var btn = $(this),
                            list = btn.parent(),
                            isListOpen = list.hasClass('expand'),
                            openLists = list.siblings('.expand');

                        // close other open lists
                        openLists.attr('style', '').removeClass('expand');
                        settings.removeClass('expand');



                        // expand selected list
                        if (!isListOpen) {
                            var subList = btn.siblings('.primary-nav-list'),
                                liHeight = subList.find('>li').outerHeight(),
                                liCount = subList.find('>li').length,
                                listHeight = liCount * liHeight;

                            // set height of list for animation and set as expanded
                            list.css({
                                height: btn.outerHeight() + listHeight
                            });

                            list.addClass('expand');
                        }

                        // close selected list
                        else {
                            $('.topnav-scroll-container').css({'min-height': '100%'});
                            list.attr('style', '').removeClass('expand');
                        }

                    }

                });


                // show subnav when primary nav item is clicked
                var topnavListSlide = 100;
                var activeSublist = 0;
                var scrollPos = null;
                var prevHeight = [];

                Nav.settings.topNavList.find('.has-subnav > a').on(clickEvent, function(ev) {
                    ev.preventDefault();

                    // check if the subnav-mask div present inside the primary-nav-item and add expand
                    activeSublist++;

                    $(this).parent().css({'left':(topnavListSlide * activeSublist)+"%"});
                    $(this).parent().find('.subnav-mask').first().css({'overflow':'visible','display':'block'});



                    var navHeight = $(this).parent().find('.subnav-mask').first().outerHeight();
                    $('.topnav-scroll-container').css({'height': navHeight+'px'});
                    prevHeight.push($(this).closest('.subnav-mask').first().outerHeight());

                    Nav.settings.topNavList.css({
                        '-webkit-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-ms-transition': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-moz-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-o-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        'transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)'
                    });


                    $('#mobile-menu').scrollTop(0);
                    $(this).parent().addClass('open');
                    $(this).closest('ul').children('li').not('.open').hide();
                    $(this).closest('.expand').css({'height':'auto'});
                    $('.topnav-list.mobile').find('.topnav-list-item').not('.expand').hide();

                });

                // close current subnav menu
                Nav.settings.topNavList.find('.mobile-nav-back').on(clickEvent, function(ev) {
                    ev.preventDefault();
                    activeSublist--;


                    $(this).closest('.primary-nav-item').first().closest('ul').children('li').show().removeClass('open');
                    $(this).closest('.subnav-mask').first().css({'overflow':'hidden','display':'none'});

                    Nav.settings.topNavList.css({
                        '-webkit-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-ms-transition': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-moz-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        '-o-transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)',
                        'transform': 'translate3d(-' + (topnavListSlide * activeSublist) + '%, 0, 0)'
                    });
                    $(this).parents('.has-subnav').removeClass('expand');
                    var newHeight = prevHeight.pop();
                    if(newHeight && newHeight !== 0){
                        $('.topnav-scroll-container').css({'height': newHeight + 'px'});


                    } else{
                        $('.topnav-scroll-container').css({'height': 'initial'});
                        $('.topnav-list.mobile').find('.topnav-list-item').show();
                    }

                    $('#mobile-menu').scrollTop(0);


                    scrollPos = null;
                });




                //Open up current active element
                var currentPageElement = document.querySelector("meta[name='navurl']");
                if(currentPageElement != null && currentPageElement.getAttribute('content') !== undefined){
                    var currentPage = currentPageElement.getAttribute('content');

                    if(currentPage.indexOf('http') > -1){
                        currentPage = currentPage.substring(10,currentPage.length);
                        currentPage = currentPage.substring(currentPage.indexOf('/'),currentPage.length);
                    }
                    var $mobileNavElements = $('.topnav-scroll-container').find('.primary-nav-item > a');
                    $mobileNavElements.each(function(){
                        var $this = $(this);
                        if($this.closest('li.mobile-nav-back').length === 0){
                            if($this.attr('href') === currentPage){
                                if(!$this.closest('li').hasClass('has-subnav')) {
                                    $this.addClass('active');
                                    var $parents = $this.parents('.primary-nav-item.has-subnav');
                                    var $closestAccordion = $this.closest('.topnav-list-item');
                                    $closestAccordion.find('a').first().trigger('click');
                                    $parents = $($parents.get().reverse());
                                    $parents.each(function () {
                                        var $parent = $(this);
                                        $parent.find('a').first().trigger('click').addClass('active');
                                    });
                                }
                            }
                        }

                    })

                }

                // set display flag to mobile
                Nav.settings.display = 'mobile';
            },

            // for desktop view, find all possible groupings in the topnav and then wrap each group to form a dropdown
            addNavEventHandlers: function() {


                //Accessibility for Utility Nav
                var utilityNavItems = $('#utilities-nav .utilities-list');
                utilityNavItems.find('.dropdown a').on('blur',function(){
                    $(this).closest('.dropdown').removeClass('expand');
                }).on('focus',function(){
                    $(this).closest('.dropdown').addClass('expand');
                    if($('#utilities-nav .utilities-list').hasClass('hide')){
                        $('#nav-search-toggle').first().trigger('click');
                    }
                }).on('click',function(){
                    $(this).closest('.dropdown').toggleClass('expand');
                });

                //Navigation open delay
                var $navItems = $('#primary-nav .primary-nav-item');
                $navItems.on('mouseenter', function (ev) {
                    var $this = $(this);
                    if($this.hasClass('has-subnav')){
                        $navItems.removeClass('slide-out');
                        if($navItems.hasClass('appear') || $navItems.hasClass('slide-in')){
                            $navItems.addClass('disappear');
                            $navItems.removeClass('appear');
                            $navItems.removeClass('slide-in');
                            $this.removeClass('disappear');
                            $this.addClass('appear');
                        } else{
                            setTimeout(function(){
                                if($this.is(':hover')){
                                    $this.closest('.primary-nav-list.active').addClass('reveal');
                                    $this.removeClass('disappear');
                                    $this.addClass('slide-in');
                                }
                            }, 300);
                        }
                    } else{
                        $navItems.addClass('slide-out');
                        $navItems.removeClass('appear');
                        $navItems.removeClass('slide-in');
                        $this.closest('.primary-nav-list.active').removeClass('reveal');
                    }

                });

                var $firstNavItem = $navItems.first();
                $firstNavItem.find('a').on('focus',function(){
                    if($('#utilities-nav .utilities-list').hasClass('hide')){
                        $('#nav-search-toggle').first().trigger('click');
                    }
                });



                $navItems = $('#primary-nav .primary-nav-item.has-subnav');

                $('#primary-nav').on('mouseleave',function(){
                    var $this = $(this);
                    $navItems.addClass('slide-out');
                    $navItems.removeClass('appear');
                    $navItems.removeClass('slide-in');
                    $this.find('.primary-nav-list.active').removeClass('reveal');
                });

                $navItems.find('a').on('blur',function(){
                    $('.primary-nav-list.active').removeClass('reveal');
                    $(this).closest('.primary-nav-item.has-subnav').removeClass('appear');

                });
                $navItems.find('a').on('focus',function(){
                    $('.primary-nav-list.active').addClass('reveal');
                    $(this).closest('.primary-nav-item.has-subnav').removeClass('disappear').removeClass('slide-out').addClass('appear');
                });
                if(APP.configs.isMobile.nullcheck()){
                    $navItems.find('a').on('click',function(){
                        if($(this).closest('.primary-nav-item.has-subnav').hasClass('appear') || $(this).closest('.primary-nav-item.has-subnav').hasClass('slide-in')){
                            $('.primary-nav-list.active').removeClass('reveal');
                            $('.primary-nav-item.has-subnav').removeClass('appear').removeClass('slide-in').addClass('disappear');
                        } else{
                            $navItems.addClass('disappear');
                            $navItems.removeClass('appear');
                            $navItems.removeClass('slide-in');
                            if($('.primary-nav-list.active').hasClass('reveal')){
                                $(this).closest('.primary-nav-item.has-subnav').removeClass('disappear').addClass('appear');
                            } else{
                                $('.primary-nav-list.active').addClass('reveal');
                                $(this).closest('.primary-nav-item.has-subnav').removeClass('disappear').addClass('slide-in');

                            }
                        }

                    });

                }

                //Accessibility for navigation
                $('.primary-nav-item.has-subnav a').not('.subnav-mask a').on('blur',function(){
                    $(this).closest('.has-subnav').removeClass('reveal');
                });

                $('.primary-nav-item.has-subnav').find('a').on('focus', function (ev) {
                    if (Nav.settings.navSearchMask.hasClass('open')) {
                        Nav.settings.navSearchMask.removeClass('open');
                        Nav.settings.searchToggle.find('.mdicon-search').show();
                        Nav.settings.searchToggle.find('.close').hide();
                    }
                    $('.primary-nav-item.has-subnav.reveal').removeClass('reveal');
                    $(this).closest('.has-subnav').addClass('reveal');
                });

                $('.primary-nav-item.has-subnav').find('a').on('blur', function (ev) {
                    $(this).closest('.has-subnav').removeClass('reveal');
                });

                if(APP.configs.isMobile.nullcheck()){
                    $('.primary-nav-item.has-subnav').find('a').not('.subnav-mask a').on('click',function(e){
                        e.preventDefault();
                        if(!$(this).closest('li').hasClass('touched')){
                            $('.primary-nav-item.has-subnav.active').removeClass('active');
                            $('.primary-nav-item.has-subnav.touched').removeClass('touched');
                            $(this).closest('li').addClass('active');
                            $(this).closest('li').addClass('touched');
                        } else{
                            $('.primary-nav-item.has-subnav.active').removeClass('active');
                            $('.primary-nav-item.has-subnav.touched').removeClass('touched');
                        }
                    });
                }
            },

            // for mobile view, unwrap each grouping in
            unwrapTopNavGroups: function() {
                Nav.settings.topNav.find('.topnav-sublist-toggle').remove();
                Nav.settings.topNav.find('.topnav-sublist li').unwrap().unwrap().unwrap();
            },

            toggleMenu: function(ev) {
                if (Nav.settings.body.hasClass('menuview')){
                    Nav.closeMenu(ev);
                }
                else{
                    Nav.onShowMenu(ev);


                }
            },

            onShowMenu: function(ev) {
                if (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
                Nav.settings.docscroll = window.pageYOffset || Nav.settings.docElem.scrollTop;
                // mac chrome issue:
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // add menuview class
                Nav.settings.body.addClass('menuview');
                // animate..
                Nav.settings.body.addClass('animate');
                // Adding title attribute to hamburger menu icon
                $('#mobile-menu-toggle')
                    .attr('title', 'Close menu')
                    .find('.menu-title')
                    .text('Close')
                    .end()
                    .find('.fa')
                    .removeClass('mda-icon-menu')
                    .addClass('mda-icon-X');

                if($('#global-header').find('.alert-wrapper').length > 0){
                    $('.page').addClass('alert-lock');
                    $('#global-header').addClass('alert-lock');
                } else {
                    $('.page').addClass('lock');
                    $('#global-header').addClass('lock');
                }
                // when the page container is clicked, close menu
                $('.page').one('click', Nav.closeMenu);
                if (typeof Hammer != "undefined") Nav.enableSwipeToClose();


            },

            closeMenu: function(ev) {
                if (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
                if($('#global-header').find('.alert-wrapper').length > 0){
                    $('.page').removeClass('alert-lock');
                    $('#global-header').removeClass('alert-lock');
                } else {
                    $('.page').removeClass('lock');
                    $('#global-header').removeClass('lock');
                }


                if (Nav.settings.body.hasClass('animate')) {
                    // remove event listeners to close menu
                    $('.page').unbind('click');
                    Nav.toggleMenuSwipe.destroy();

                    // remove animate class and once trasition is complete remove the menuview class
                    var onEndTransFn = function(ev) {
                        if (Modernizr.csstransitions && (ev.target.className !== 'page' || ev.propertyName.indexOf('transform') == -1)) return;
                        this.removeEventListener(APP.utils.transEndEventName(), onEndTransFn);
                        Nav.settings.body.removeClass('menuview');
                        // mac chrome issue:
                        document.body.scrollTop = document.documentElement.scrollTop = Nav.settings.docscroll;
                    };
                    if (Modernizr.csstransitions) {
                        Nav.settings.body[0].addEventListener(APP.utils.transEndEventName(), onEndTransFn);
                    } else {
                        onEndTransFn.call();
                    }
                    Nav.settings.body.removeClass('animate');
                    // Adding title attribute to hamburger close icon
                    $('#mobile-menu-toggle')
                        .attr('title', 'Open menu')
                        .find('.menu-title')
                        .text('Menu')
                        .end()
                        .find('.fa')
                        .removeClass('mda-icon-X')
                        .addClass('mda-icon-menu');
                }
            },

            enableSwipeToClose: function() {
                // restrict items that already have a swipe event from closing the menu.
                var restrictedSelectors = '[class*=carousel], [class*=slick-]';

                // initialize hammer instance
                Nav.toggleMenuSwipe = new Hammer.Manager(Nav.settings.body[0], {
                    recognizers: [
                        [Hammer.Swipe, {
                            threshold: 80, //Minimal distance required before recognizing (default 10)
                            velocity: 0.2, //Minimal velocity required before recognizing, unit is in px per ms (default 0.65)
                            direction: Hammer.DIRECTION_HORIZONTAL
                        }]
                    ]
                });

                Nav.toggleMenuSwipe.on("swiperight", function(ev) {
                    // determine if swiped element or parents match restricted selectors
                    var isRestricted = $(ev.target).is(restrictedSelectors) ? true :
                        $(ev.target).parents(restrictedSelectors).length ? true : false;
                    // if not restricted, close the menu
                    if (!isRestricted) Nav.closeMenu();
                });
            },

            initSidebarNav: function() {
                // create scene for the sticky sidebar.
                // since the trigger point is the center of the screen, offset it by half the screen height to make it stick at the top of the screen
                if(!Nav.stickySidebarScene) {
                    Nav.stickySidebarScene = new ScrollScene({
                        triggerElement: "#sidebar-nav",
                        offset: APP.utils.getViewport().height / 2
                    }).setPin("#sidebar-nav").addTo(APP.scrollController);

                    // once the sidebar becomes sticky, set the duration based on the height of the content section
                    Nav.stickySidebarScene.on('enter', function () {
                        var sectionHeight = parseInt(Nav.settings.sidebarNav.parents('section').height());
                        var stickyDuration = sectionHeight - Nav.settings.sidebarNav.outerHeight();
                        if(stickyDuration <= 0){
                            stickyDuration = 1;
                        }
                        Nav.stickySidebarScene.duration(stickyDuration);
                    });
                }
            },

            removeSidebarNav: function() {
                Nav.stickySidebarScene.destroy(true);
            },

            toggleSearch: function(e) {
                e.preventDefault();
                $('#nav-search-form').trigger('clear');
                $('#nav-search.search-wrapper').removeClass('focus');
                $('#nav-search.search-wrapper').removeClass('focus');
                $('#utilities-nav .utilities-list').removeClass('hide');
                $('#give-now-btn').removeClass('hide');


                Nav.settings.searchToggle.removeClass('show');

            },

            hideNavArrow : function () {
                var primaryNav = $('.primary-nav-item.has-subnav');

            }

        };
    })(APP.Nav || {}); //Fired from APP
})(jQuery);
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

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    var TabsComponent = (function(Tabs) {
        return Tabs = {
            el: $('.blog-search-filter'),
            init: function () {
                Tabs.ui = {
                    searchMask : Tabs.el.find('.blog-search-mask'),
                    searchBox : Tabs.el.find('.search-field'),
                    showAll : Tabs.el.find('.blog-sort')
                };
                Tabs.ui.searchMask.hover(Tabs.toggleSearch);
                Tabs.ui.searchMask.click(Tabs.toggleSearch);
                Tabs.ui.searchMask.find('.search-icon').on('mousedown',function () {
                    Tabs.ui.searchMask.find('form').submit();
                });
                Tabs.ui.searchBox.on('blur', function(){
                    $('.blog-search.col6').removeClass('expand');
                    Tabs.ui.searchMask.removeClass('reveal');
                });
                Tabs.showAll();
                Tabs.updateShowAll();
            },

            toggleSearch : function () {
                $('.blog-search.col6').addClass('expand');
                Tabs.ui.searchMask.addClass('reveal');
                if ( Tabs.ui.searchMask.hasClass('reveal') ) {
                    Tabs.ui.searchBox.focus();
                } else {
                    Tabs.ui.searchMask.find('.search-wrapper').trigger('clear');
                }
            },
            showAll : function () {
                Tabs.ui.showAll.on('change', 'select', function (event) {
                    var selectedValue = $(this).val();
                    $.each($(this).find('option'), function (index, value) {
                        var findVal = $(this).attr('value');
                        if (findVal === selectedValue) {
                            if (!window.location.origin) {
                              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                            }
                            window.location.replace(window.location.origin + $(this).data('href'));
                        }
                    });

                });
            },
            getParameterByName : function (name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            updateShowAll : function () {
                var val = Tabs.getParameterByName('value') || '';
                if (val != '') {
                    $.each(Tabs.ui.showAll.find('select option'), function (index, value) {
                        var findVal = $(this).attr('value');
                        if (findVal === val) {
                            Tabs.ui.showAll.find('select').val($(this).val());
                        }
                    });
                }
            }
        };
    })(TabsComponent || {}).init();
})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';

    var TabsComponent = (function (Tabs) {
        return Tabs = {
            el: $('.news-article-search'),

            init: function () {
                Tabs.ui = {
                    searchMask: Tabs.el.find('.news-article-search-mask'),
                    searchBox: Tabs.el.find('.search-field'),
                    clickTarget: null
                };

                Tabs.ui.searchMask.hover(Tabs.toggleSearch);
                Tabs.ui.searchMask.click(Tabs.toggleSearch);

                $(document).mousedown(function (e) {
                    Tabs.ui.clickTarget = $(e.target);
                });

                Tabs.ui.searchBox.on('blur', function () {
                    if($('.news-article-search-mask').has(Tabs.ui.clickTarget).length < 1){
                        Tabs.ui.searchMask.removeClass('reveal');
                        Tabs.ui.searchBox.val('');
                    }
                });
            },

            toggleSearch: function () {

                if (Tabs.ui.searchMask.hasClass('reveal')) {
                    Tabs.ui.searchBox.focus();
                } else {
                    Tabs.ui.searchMask.addClass('reveal');
                    Tabs.ui.searchBox.focus();
                    Tabs.ui.searchMask.find('.search-wrapper').trigger('clear');
                }

            }

        };
    })(TabsComponent || {}).init();
})(jQuery);

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

var generatedList = (function (window, undefined) {
	var $el = $('.generated-link-list');
	var _initialize = function() {
		$.each($el, function (index, value) {
			var linkList = $(value).find('.link-list-body');
			var	lastElem = $(linkList)[$(linkList).length-1];
			$(lastElem).addClass('last');

		})
	}
	var init = function () {
		_initialize();
	}
	return {
		init : init
	}
}(window, undefined)).init();
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var glossary = (function  (window, undefined) {
    var pageURL = "";
    var ajaxResponse = function(jsonUrl) {
        $.ajax({
            url : jsonUrl,
            dataType: 'html',
            success : function (response) {
                domPrint(jsonUrl, response);
                $('.basic-content-media').each(function(){
                    $(this).mdaJWPlayer( true );
                });
                if(window.location.hash.length > 0 && $(window.location.hash).length > 0){
                    location.href = window.location.hash;
                }
            },
            error : function (response) {
                return response;
            }
        })
    }
    var domPrint = function (jsonUrl, res) {
        var container = $('.gallery-content');
        var htmlIndex = jsonUrl.indexOf('.html'),
            currentSelection = jsonUrl.slice(htmlIndex-1, htmlIndex);

        container.html('<p class="glossary_alphabet_title">' + currentSelection + '</p>');
        container.append(res);
        basic_content_media.init();
        container.find('section').addClass('reveal').removeClass('apply');
    }
    var initializeClick = function () {
        var isHashAvailabe = false;
        var letterlist = $('.glossary').find('.letter-list').find('a');
        $.each(letterlist, function (index, value) {
            if ($(value).data('letter') == '#') {
                isHashAvailabe = true;
            }
        })
        if (isHashAvailabe) {
            var aLink = $('.glossary').find('.letter-list').find('a').not('.disabled')[1];
        }
        else {
            var aLink = $('.glossary').find('.letter-list').find('a').not('.disabled')[0];
        }
        $(aLink).addClass('selected');

        $('.glossary').find('.letter-list, .number-list').on('click', 'a', function (e) {
            e.preventDefault();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var letterSection = $(this).data('letter');

            $('.glossary').find('.letter-list a, .number-list a').removeClass('selected');
            $(this).addClass('selected');
            $('.letter-contents').fadeOut(400);
            if (letterSection !== '#' && letterSection !== 'ABC') {
                var link = $(this).attr('href');
                (link == '#') ? ajaxResponse(pageURL) : ajaxResponse(link);
            } else if (letterSection === '#') {
                var aLink = $('.glossary').find('.number-list').find('a').not('.disabled')[1];
                $(aLink).addClass('selected');
                var link = $(aLink).attr('href');
                (link == '#') ? ajaxResponse(pageURL) : ajaxResponse(link);
                $('.letter-list').hide();
                $('.number-list').show();
            }
             else {
                var aLink = $('.glossary').find('.letter-list').find('a').not('.disabled')[1];
                $(aLink).addClass('selected');
                var link = $(aLink).attr('href');
                (link == '#') ? ajaxResponse(pageURL) : ajaxResponse(link);
                $('.number-list').hide();
                $('.letter-list').show();
            }


        });
        checkAnchor();



    }

    var checkAnchor = function(){
        if(window.location.hash.substring(1).length > 0){
            var firstLetter = window.location.hash.substring(1,2);
            var letterLists = $('.glossary').find('.letter-list, .number-list');
            var links = letterLists.find('a');
            links.each(function(){
                var $letter = $(this).text();
                if($letter.trim().indexOf(firstLetter.toUpperCase()) === 0 && !$(this).hasClass('selected')){
                    $(this).trigger('click');
                }
            })
        }
    };

    var _initialize = function () {
        if ($('#glossaryLink').length < 1) {
            return;
        }
        pageURL = ($('#glossaryLink').data('href') != '') ? $('#glossaryLink').data('href') : '';
        if (pageURL !== '' || pageURL !== undefined) {
            if ($('#glossaryLink').data('listing') === 'alphabet') {
                $('.letter-list').show();
            } else {
                $('.letter-list').hide();
                $('.number-list').show();
            }
            ajaxResponse(pageURL);
            initializeClick();
        }
    }
    var init = function () {
        _initialize();
    }
    return {
        init : init
    }
}(window, undefined)).init();

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
var collectionTab = (function (window, undefined) {
	var $el = $('.collection.tabbed');
	var _initialize = function () {
		$.each($el, function (index, value) {
			var $tabContainer = $(value).find('.ui-state-default'),
				$collectionGroup = $(value).find('.collection-group');
			var lastTab = $tabContainer[$tabContainer.length - 1]
			if ($(lastTab).hasClass('ui-tabs-active')) {
				return false;
			}
			$.each($collectionGroup, function (index, item) {
				var links = $(item).find('a');
				var lastLink = links[$(links).length - 1];
				$(lastLink).on('blur', function (event) {
					var $selectedTab = $(value).find('.ui-state-active');
					var $nextTab = $selectedTab.next().find('a');
					$nextTab.trigger('click');
                    $nextTab.focus();
				})
			})
		})
	}
	var init = function () {
		_initialize();
	}
	return {
		init: init
	}
}(window, undefined)).init();
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

$(function() {

    $('.comments-list').find('a.comment-reply.cta').on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $(this).next().show();
    });
     $('.comments-list').find('.comment-cancel').on('click', function (e) {
        e.preventDefault();
         $(this).parent().parent().hide();
         $(this).parent().parent().prev().show();
    });
    $('body').on('click','.more-blogs-link a', function (event) {
        var moreContainer = $(this).closest('section');
        var url = $(this).data('href');
        event.preventDefault();
        $.ajax({
            method: 'GET',
            url: url,
            success : function (res) {
                $(res).insertBefore(moreContainer);
                moreContainer.remove();
            },
            error : function (err) {
                console.log(err);
            }
        });
    });

});

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

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';



    APP.SearchResults = (function (SearchResults) {
        var $searchPageWrapper = $('#search-page');
        var $resultsSearchBar = $('.search-results-search-bar');
        var $searchResultsBlock = $('#search-result-block');
        var $searchResultsSort = $('.search-result-sort');
        var queryString = '';
        var $searchResultsPagination = $('.search-result-pagination');
        var $showingInsteadMessage = $searchPageWrapper.find('.showing-instead');
        var $noResultsMessage = $searchPageWrapper.find('.no-results');
        var $searchResultsCount = $('.search-result-count');
        var $suggestedContent = $('.search-content .suggested-content');
        var $commonSearchTerms = $('.common-search-terms');
        var $mobileCommonSearchTerms = $('.mobile-common-search-terms');
        var $paginationMoreButton = $searchResultsPagination.find('.search-results-more');
        var $paginationPrevButton = $searchResultsPagination.find('.search-results-prev');
        var $noResultsSuggestion = $('.no-results-suggestion');
        var $searchResultsSummary = $searchPageWrapper.find('.search-result-summary');
        var $suggestedResults = $('.suggested-content .suggested-results');
        var $navSearchWrapper = $('#nav-search-wrapper');
        var $searchInsteadText = $searchPageWrapper.find('.search-instead');


        return SearchResults = {

            $el: $('#search-results-block'),

            /*
             * Initialize Search results URL and Handlebar variables
             *
             */
            init: function () {



                if ($searchPageWrapper !== undefined && $searchPageWrapper.length > 0) {

                    //Get all handlebar templates required and establish query strings
                    /*
                     *
                     * searchResultsTemplate - The handlebar template required for each individual search results
                     * didYouMeanTemplate - The handlebar template used for the misspell text
                     * suggestedResultTemplate - The handlebar template used for the MDA Suggests section
                     * filterCheckboxTemplate - Handlebar template used for the checkbox facet filtering
                     * filterRadiobtnTemplate - Handlebar template for the radio button facet filtering
                     * relatedSearchTemplate - Handlebar template used for the suggested terms query
                     * radioBtnString - The string used for determining the radio button facet
                     *
                     */
                    SearchResults.config = {
                        page: 0,
                        defaultPageSize: 10,
                        searchResultTemplate: APP.Templates.search_results_template,
                        didYouMeanTemplate: APP.Templates.did_you_mean_template,
                        suggestedResultTemplate: APP.Templates.suggested_results_template,
                        filterCheckboxTemplate: APP.Templates.search_filter_checkbox_template,
                        filterRadiobtnTemplate: APP.Templates.search_filter_radio_template,
                        relatedSearchTemplate: APP.Templates.related_searches_template,
                        radioBtnString: 'gsaentity_Results Type',
                        showingResultsTemplate: APP.Templates.showing_results_template,
                        noResultsTemplate: APP.Templates.no_results_template,
                        searchInsteadTemplate: APP.Templates.search_instead_template,
                        mediaHubApiUrl : '/api/publiccatalog/v1/',
                        sortString: '',
                        filterString: '',
                        frontEndString: 'mda_aem_fe',
                        searchType: 'vanilla',
                        origin:'',
                        baseFilterString: '&requiredfields=',
                        initialSpelling: '',
                        misspellResultsFound: false,
                        mobileFilterText: 'None',
                        baseMobileFilterText: 'None',
                        usedFilters : '',
                        shouldAnchor : false,
                        hash : '',
                        lockHash : false

                    };

                    //If the number of search results has been authored, overwrite hardcoded value
                    if ($searchPageWrapper.data('numsearchresultsreturn') !== undefined) {
                        SearchResults.config.defaultPageSize = $searchPageWrapper.data('numsearchresultsreturn') ;
                    }

                    //Local configuration used for development
                    if (APP.configs.isLocal) {
                        SearchResults.config.searchResultsUrl = 'http://www.mdanderson.edu/search?site=mda_aem_prod&output=xml_no_dtd&getfields=*&filter=0&getfields=*&tlen=160&' + '&num=' + SearchResults.config.defaultPageSize;
                        SearchResults.config.resultClickUrl = 'http://explore.mdanderson.org' + searchResultClickAnalyticsUrl;
                        SearchResults.config.mediaHubApiUrl = 'https://www.mdanderson.edu' + SearchResults.config.mediaHubApiUrl;
                    } else {
                        SearchResults.config.searchResultsUrl = window.searchResultsUrl + '&num=' + SearchResults.config.defaultPageSize;
                        SearchResults.config.resultClickUrl = $('<div/>').html(searchResultClickAnalyticsUrl).text();
                    }

                    SearchResults.config.noResultsCopyData = decodeURIComponent($searchPageWrapper.data('noresultscopy'));
                    SearchResults.config.numResultsCopy = decodeURIComponent($searchPageWrapper.data('numresultscopy'));
                    SearchResults.config.numSearchResultsReturn = decodeURIComponent($searchPageWrapper.data('numsearchresultsreturn'));
                    SearchResults.config.didYouMeanTextCopy = decodeURIComponent($searchPageWrapper.data('didyoumeantextcopy'));
                    SearchResults.config.commonSearchedTerms = decodeURIComponent($searchPageWrapper.data('commonsearchedterms'));
                    SearchResults.config.relatedSearchLabel = decodeURIComponent($searchPageWrapper.data('relatedsearchlabel'));
                    SearchResults.config.searchInsteadText = decodeURIComponent($searchPageWrapper.data('searchinsteadtext'));
                    SearchResults.config.suggestionLabel = decodeURIComponent($searchPageWrapper.data('suggestionlabel'));
                    SearchResults.config.showingInsteadCopy = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));
                    SearchResults.config.noQuerySearchLabel = $resultsSearchBar.data('noquerysearchlabel');
                    SearchResults.config.querySearchLabel = $resultsSearchBar.data('searchlabel');

                    // Get the URL Parameter for the type
                    var searchType = APP.utils.getUrlParameter('searchType');
                    if(!searchType){
                        searchType = "allresults";
                        SearchResults.config.searchType = 'vanilla';
                    }

                    // Get the URL Parameter for the search param and call render
                    var searchQuery = APP.utils.getUrlParameter('q');
                    if(searchQuery === undefined){
                        searchQuery = '';

                    }

                    //Here we set the Front end string and base filter string depending on the type of search
                    if ($searchResultsBlock.length > 0) {
                        //If we have a specified search type, initialize the values for GSA
                        if(searchType){
                            var queryVal = APP.utils.getUrlParameter('q');
                            if(queryVal === undefined){
                                queryVal = '';
                            } else{
                                try{
                                    queryVal = decodeURIComponent(queryVal);
                                } catch(e){
                                    console.log('malformed queryVal');
                                }
                            }

                            //Update text in the placeholder with the query
                            if(queryVal === ''){
                                if(SearchResults.config.noQuerySearchLabel !== undefined){
                                    $resultsSearchBar.find('.placeholder').text((SearchResults.config.noQuerySearchLabel.replace('(dynquery)',queryVal)));
                                }
                            } else {
                                if(SearchResults.config.querySearchLabel !== undefined){
                                    $resultsSearchBar.find('.placeholder').text((SearchResults.config.querySearchLabel.replace('(dynquery)',queryVal)));
                                }
                            }

                            //GSA settings and stype changes for specific searches
                            if(searchType === 'clinical%20trials' || searchType === 'Clinical%20Trials' || searchType === 'clinical%20trial' || searchType === 'Clinical%20Trial' || searchType === 'clinical trials' || searchType === 'clinical trial'){
                                SearchResults.config.searchType = 'clinical trials';
                                SearchResults.config.frontEndString = 'clinical_trial_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:clinical trial';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = "Result Type";
                                SearchResults.config.noSearchQuery = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));
                                SearchResults.config.showingInsteadCopy = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));

                                $resultsSearchBar.each(function(){
                                    $(this).clinicalTrialsSearch($(this).data('clinicaltrialstypeaheadquery'));

                                });


                            } else if(searchType == 'blogs' || searchType == 'Blogs' || searchType == 'Blog' || searchType == 'blog'){
                                SearchResults.config.searchType = 'blogs';
                                SearchResults.config.frontEndString = 'blog_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:blog';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('blogtypeaheadquery'), 'blogs');
                                });


                            } else if(searchType === 'publications'  || searchType === 'Publications' || searchType === 'publication'  || searchType === 'Publication'){
                                SearchResults.config.searchType = 'publications';
                                SearchResults.config.frontEndString = 'publications_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:publication';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('publicationtypeaheadquery'), 'publication');
                                });

                            } else if(searchType == 'news'  || searchType == 'News' || searchType == 'news%20articles' || searchType == 'news articles'){
                                SearchResults.config.searchType = 'news';
                                SearchResults.config.frontEndString = 'news_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:news articles';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('newstypeaheadquery'), 'news');
                                });
                            } else if(searchType == 'patient-education'){
                                $('#global-header').hide();
                                $('.pre-footer').hide();
                                $('footer').find('.stay-connected').hide();
                                $('footer').find('.footer-links').hide();
                                $('footer').find('.sublink-container').hide();
                                $('.appointment-bar').hide();
                                $('.search-results-sort-relevant').removeClass('active');
                                $('.alphabet_sort').removeClass('hidden');

                                $searchResultsBlock.addClass('patient-education');

                                SearchResults.config.searchType = 'patient-education';
                                SearchResults.config.frontEndString = 'pe_aem_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'gsaentity_File%20Types:Pdf';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                SearchResults.config.sortString = '&sort=meta:title';
                                if($searchPageWrapper.data('patienteducationquery')){
                                    SearchResults.config.searchResultsUrl = decodeURIComponent($searchPageWrapper.data('patienteducationquery'));
                                    if(APP.configs.isLocal){
                                        SearchResults.config.searchResultsUrl = 'https://www.mdanderson.org' + SearchResults.config.searchResultsUrl;
                                    }
                                }
                                $('.search-results-search-bar').each(function(){
                                    $(this).searchForm($(this).data('patiendeducationtypeaheadquery'), 'patient-education#search-header');
                                });
                            } else{
                                $('#search-page').addClass('generic');

                                //Generic Search
                                if(searchType === 'allresults'){

                                } else{
                                    SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:'+searchType;
                                    SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                    $('#'+searchType).prop('checked','true')
                                }

                            }


                        } else {
                            SearchResults.config.searchType = 'vanilla';
                        }


                        try{
                             queryString = decodeURIComponent(searchQuery);
                        } catch(e){
                             queryString = searchQuery;
                        }

                        //Open the search tray by default on this page
                        if(SearchResults.config.searchType === 'vanilla'){
                            $('#nav-search-toggle').trigger('click');
                            SearchResults.showSpecificSearchHeader(queryString);
                        } else{
                            SearchResults.showSpecificSearchHeader(queryString);
                        }

                        // Get the URL Parameter for the origin
                        var origin = APP.utils.getUrlParameter('origin');
                        if ($searchResultsBlock.length > 0) {
                            if(origin && origin === 'filter'){
                                SearchResults.config.origin = origin;
                            } else {
                                SearchResults.config.origin = 'landing';
                            }
                        }

                        SearchResults.render(queryString);
                    }

                    // After everything has been built, add in the handlers for search
                    if ($searchResultsSort.length > 0) {
                        SearchResults.addSortingHandlers();
                    }
                }
            },


            render: function (query) {
                //Assign specific text for the current search string
                if(SearchResults.config.querySearchLabel != undefined){
                    $navSearchWrapper.find('.search-message').text((SearchResults.config.querySearchLabel.replace('(dynquery)',queryString)));
                    $('#nav-search .search-field').val(queryString);
                }

                //Assign the mobile display text
                $('.search-results-filters .mobile-filter-text').text(SearchResults.config.baseMobileFilterText);

                //Initialize the suggestion text with authored value
                $noResultsSuggestion.html(SearchResults.config.suggestionLabel);


                //Get the Search Results
                SearchResults.getSearchResults(query, true);
            },


            /*
             *
             * Get the search results given a query param. Only runs of first load OR on change of sorting
             *
             *
             */
            getSearchResults: function (query, firstRun) {
                var searchResult;
                var tempQuery = '';

                $searchResultsPagination.hide();

                // Store the query sting in the config obkect
                SearchResults.config.queryString = query;

                //Clear out any search results already there
                $searchResultsBlock.html('');

                if(!firstRun){
                    //Show the loading icon
                    SearchResults.showLoader();
                }


                tempQuery = '&q=' + query;
                if(query === ''){
                    tempQuery = '';
                    SearchResults.config.queryString = '';
                }
                SearchResults.parseHash();

                $.ajax({
                    url: SearchResults.config.searchResultsUrl + "&start=" + (SearchResults.config.page * SearchResults.config.defaultPageSize) + tempQuery + "&client="+SearchResults.config.frontEndString + SearchResults.config.sortString + SearchResults.config.filterString ,
                    contentType: "xml",
                    dataType: "xml",
                    success: function (result) {

                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            SearchResults.addFilters(jsonResults);
                            SearchResults.initFilterMenu().init();
                            SearchResults.addFilterListeners();

                            //If there are spelling suggestions, fire off a separate query to pull results
                            if (jsonResults.GSP.Spelling !== undefined && !APP.utils.getUrlParameter('forceSpelling')) {
                                $showingInsteadMessage.html('');
                                if(SearchResults.config.searchType === 'vanilla'){
                                    var showingResultsTemplate = SearchResults.config.showingInsteadCopy.replace('(dynquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+$('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text()+'">'+$('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()+'</a>').html())

                                } else{
                                    var showingResultsTemplate = SearchResults.config.showingInsteadCopy.replace('(dynquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+$('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text()+'&searchType='+SearchResults.config.searchType+'">'+$('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()+'</a>').html())

                                }
                                $showingInsteadMessage.html(showingResultsTemplate);
                                SearchResults.config.initialSpelling = query;
                                SearchResults.getSearchResults($('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text(), true);
                            } else {
                                $noResultsMessage.html('');
                                var noResultsTemplate = SearchResults.config.noResultsCopyData;
                                noResultsTemplate = noResultsTemplate.replace('(query)', query);
                                $('<p/>').text(noResultsTemplate).appendTo($noResultsMessage);
                                $noResultsSuggestion.show();
                                $searchResultsSummary.hide();
                                $('.search-sidebar').addClass('mobile-hidden');

                            }

                            //Hide pagination
                            $paginationMoreButton.hide();
                            $searchResultsCount.html('No Results');
                            $suggestedContent.addClass('hidden');


                            //Set the common search terms
                            var commonSearchTerms = $commonSearchTerms.data('terms');
                            if(APP.configs.isLocal){
                                commonSearchTerms = 'cancer,chemo,cancer2,chemo2,cancer3,chemo3';
                            }
                            //Add common search terms to the HTML
                            if(SearchResults.config.searchType !== 'patient-education'){
                                if(commonSearchTerms && $commonSearchTerms.html().indexOf('</a>') === -1){
                                    var terms = commonSearchTerms.split(',');
                                    var htmlEle = '';
                                    for(var i = 0; i < terms.length;i++){
                                        if(i%2 === 0){
                                            htmlEle += '<a class="even" href="'+window.location.pathname+'?q='+terms[i]+'">'+terms[i]+'</a> ';
                                        } else{
                                            htmlEle += '<a class="odd" href="'+window.location.pathname+'?q='+terms[i]+'">'+terms[i]+'</a> ';
                                        }

                                    }
                                    $('<div/>').html(htmlEle).appendTo($commonSearchTerms);
                                    $('<div/>').html(htmlEle).appendTo($mobileCommonSearchTerms);

                                    $commonSearchTerms.show();
                                    $mobileCommonSearchTerms.show();
                                    $('.search-filter-hide').hide();
                                }
                            }


                            SearchResults.initSuggestions(jsonResults);


                        } else {
                            $('.search-sidebar').removeClass('mobile-hidden');
                            $searchResultsSummary.css({'display':'table'});
                            $noResultsMessage.html('');
                            $commonSearchTerms.find('div').html('');
                            $commonSearchTerms.hide();
                            $mobileCommonSearchTerms.hide();
                            $('.search-filter-hide').show();
                            $noResultsSuggestion.hide();
                            $searchResultsSummary.removeClass('hidden');

                            //Set the number of results in the page
                            SearchResults.config.resultsCount = jsonResults.GSP.RES['M'];
                            var tempResultCount = SearchResults.config.resultsCount;
                            if (parseInt(tempResultCount) === 1) {
                                var text = $.trim(numResultsCopy.replace(new RegExp('\\(total\\)', 'g'), SearchResults.config.resultsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
                                text = text.substring(0, (text.length - 1));
                                $searchResultsCount.html(text);

                            } else {
                                $searchResultsCount.html(numResultsCopy.replace(new RegExp('\\(total\\)', 'g'), SearchResults.config.resultsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
                            }


                            var resultSet = jsonResults.GSP.RES.R;

                            //If we are forcing spelling, ignore any spelling mistakes
                            var forceSpelling = APP.utils.getUrlParameter('forceSpelling');
                            if(forceSpelling && forceSpelling === 'true'){
                                $('.did-you-mean').html('');
                                $showingInsteadMessage.html('');
                                if(SearchResults.config.misspellResultsFound){
                                    var searchInsteadTemplate = SearchResults.config.searchInsteadText;
                                    var $searchInsteadSection = $searchInsteadText;
                                    $searchInsteadSection.html('');
                                    searchInsteadTemplate = searchInsteadTemplate.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true">'+SearchResults.config.initialSpelling+'</a>').html());
                                    $searchInsteadSection.html(searchInsteadTemplate);
                                }
                            } else{

                                //Set the Search Instead text if there is a spelling mistake
                                if(SearchResults.config.initialSpelling !== '' && !SearchResults.config.misspellResultsFound){
                                    $noResultsMessage.html('');
                                    var searchInsteadText = SearchResults.config.searchInsteadText;
                                    searchInsteadText = searchInsteadText.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true"></a>').html());
                                    $('<div/>').html(searchInsteadText).appendTo($noResultsMessage);
                                    $noResultsMessage.find('a').text(SearchResults.config.initialSpelling);
                                } else if(SearchResults.config.initialSpelling !== '' && SearchResults.config.misspellResultsFound){
                                    var searchInsteadTemplate = SearchResults.config.searchInsteadText;
                                    $searchInsteadText.html('');
                                    searchInsteadTemplate = searchInsteadTemplate.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true">'+SearchResults.config.initialSpelling+'</a>').html());
                                    $searchInsteadText.html(searchInsteadTemplate);
                                }

                                if (jsonResults.GSP.Spelling !== undefined) {
                                    var didYouMeanSection = $('.did-you-mean');
                                    didYouMeanSection.html('');
                                    var didYouMeanTextCopy = SearchResults.config.didYouMeanTextCopy;
                                    var insertText = jsonResults.GSP.Spelling.Suggestion['@q'];
                                    didYouMeanTextCopy = didYouMeanTextCopy.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+jsonResults.GSP.Spelling.Suggestion['@q']+'&forceSpelling=true"></a>').html());
                                    var didYouMeanDiv = $('<div/>').html(didYouMeanTextCopy);
                                    didYouMeanDiv.find('a').text(insertText);
                                    didYouMeanDiv.appendTo(didYouMeanSection);

                                } else {
                                    $('.did-you-mean').html('');
                                }
                            }

                            //If there is only one result, turn it into an array
                            if(!resultSet.length){
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);
                            }

                            //For each result, pass it to the handlebar variable and append it to the search area
                            $searchResultsBlock.html('');
                            for (var i = 0; i < resultSet.length; i++) {
                                searchResult = $(SearchResults.config.searchResultTemplate(resultSet[i]));

                                if(SearchResults.config.queryString !== '' && searchResult.find('.search-result-details').html().indexOf('<b>') === -1){
                                    searchResult.find('.search-result-details .search-result-details').html(searchResult.find('.search-result-details .search-result-details').html().replace(new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g'), '<b>'+query+'</b>'));
                                    searchResult.find('.search-result-details .search-result-details').html(searchResult.find('.search-result-details .search-result-details').html().replace(new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").charAt(0).toUpperCase() + query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").slice(1), 'g'), '<b>'+query.charAt(0).toUpperCase() + query.slice(1)+'</b>'));
                                }
                                searchResult.appendTo($searchResultsBlock);

                            }

                            //On the first run, add filters and initialize all the handlers to ensure it is not done multiple times
                            if (firstRun) {
                                SearchResults.addSuggestionHandler();
                                SearchResults.addFilters(jsonResults);
                                SearchResults.initFilterMenu().init();
                                SearchResults.initSuggestions(jsonResults);
                                SearchResults.addFilterListeners();
                                SearchResults.addRelatedSearches(jsonResults);

                                //More button click event
                                $paginationMoreButton.on('click', function (e) {
                                    e.preventDefault();
                                    var $activeNumber = $('.search-result-pagination .pagination-number.active');
                                    var $nextPage = $activeNumber.next();
                                    $activeNumber.removeClass('active');
                                    $nextPage.addClass('active');
                                    SearchResults.config.page++;
                                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);
                                    SearchResults.getSearchResults(SearchResults.config.queryString, false);

                                });
                                $paginationPrevButton.on('click', function (e) {
                                    e.preventDefault();
                                    var $activeNumber = $('.search-result-pagination .pagination-number.active');
                                    var $nextPage = $activeNumber.prev();
                                    $activeNumber.removeClass('active');
                                    $nextPage.addClass('active');
                                    SearchResults.config.page--;
                                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);
                                    SearchResults.getSearchResults(SearchResults.config.queryString, false);
                                });

                                $(window).bind('hashchange', function(e) {
                                    if(!SearchResults.config.lockHash && SearchResults.config.hash !== '#_'){
                                        $('#search-filter .term-block.extra-filter').each(function(){
                                            $(this).remove();
                                        });
                                        SearchResults.setHash('',false);
                                    }
                                });

                                //If clinical trials, mark open as selected
                                if(SearchResults.config.searchType === 'clinical trials' && $('#open').length){
                                    $('.search-result-count').html('');
                                    $('#open').prop('checked','true');
                                    $('#open').trigger('click');
                                    $('.init-search-loader').addClass('hidden');
                                    return;
                                }

                            } else {
                                SearchResults.addFilters(jsonResults);
                                SearchResults.addFilterListeners();
                                SearchResults.initFilterMenu().init();

                                if(SearchResults.config.shouldAnchor && SearchResults.config.searchType !== 'patient-education'){
                                    //location.href = "#search-page";
                                } else{
                                    SearchResults.config.shouldAnchor = true;
                                }

                            }

                            SearchResults.updatePaginationNumbers();
                            SearchResults.updateDates();
                            SearchResults.addResultClickHandlers();
                            SearchResults.initializeVideoResults();
                        }
                        $('.search-filter-radio').attr('disabled', false);
                        SearchResults.hideLoader();
                        SearchResults.config.lockHash = false;
                    },
                    error: function(){
                        SearchResults.errorProcedure(SearchResults.config.searchType === 'vanilla');
                    }
                });

            },

            showLoader: function () {
                $('#search-page .loader').removeClass('hidden');
            },

            hideLoader: function () {
                $('#search-page .loader').addClass('hidden');
                $('.init-search-loader').addClass('hidden');
            },

            /*
             *
             * Pass the facet search object from GSA into the handlebar
             */
            addFilters: function (jsonResults) {
                var facet;
                var radioBtnTemplate = SearchResults.config.filterRadiobtnTemplate;
                var searchFilterContainer = $('.search-sidebar #search-filter');
                searchFilterContainer.find('.mda-custom-dd').each(function(){
                    $(this).remove();
                });
                if(SearchResults.config.origin === 'filter'){
                    if(SearchResults.config.searchType !== 'vanilla'){
                        $('.col-search-filter .term-block span').first().text(SearchResults.config.searchType);
                        $('.col-search-filter .term-block').show();
                    }
                }
                //Since we have converted to JSON, we must access the data using JSON notation
                if(jsonResults.GSP.RES && jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
                    if(!jsonResults.GSP.RES.PARM.PMT.length){
                        var temp = jsonResults.GSP.RES.PARM.PMT;
                        jsonResults.GSP.RES.PARM.PMT = [];
                        jsonResults.GSP.RES.PARM.PMT.push(temp);
                    }
                    for (var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {
                        facet = jsonResults.GSP.RES.PARM.PMT[i];
                        if(!facet.PV.length){
                            var temp = facet.PV;
                            facet.PV = [];
                            facet.PV.push(temp);
                        }
                        if(SearchResults.config.usedFilters.length === 0 || SearchResults.config.usedFilters.indexOf( '|' + facet['@NM']) === -1) {
                            //If this is a phase, switch out the lower case i and v for uppercase values.
                            if (facet['@NM'] === 'phase') {
                                for (var j = 0; j < facet.PV.length; j++) {
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace(new RegExp('i', 'g'), 'I');
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace(new RegExp('v', 'g'), 'V');
                                }
                            }

                            //For physicians, we must reorder the names and sort them alpha numeric
                            if (facet['@NM'] === 'physician') {
                                var physicianArray = [];
                                for(var j = 0; j < facet.PV.length; j++){
                                    physicianArray.push(SearchResults.convertPhysicianName(facet.PV[j]['@V']));
                                }
                                physicianArray.sort();
                                for (var j = 0; j < physicianArray.length; j++) {
                                    facet.PV[j]['@V'] = physicianArray[j]
                                }
                            }

                            if (facet['@NM'] === 'pagetype' || facet['@NM'] === 'pageType') {
                                for (var j = 0; j < facet.PV.length; j++) {
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace('_', ' ')
                                }
                                var $facet = $(radioBtnTemplate(facet));
                                $facet.addClass('result-types').addClass('extended').appendTo(searchFilterContainer);

                            } else {
                                var $facet = $(radioBtnTemplate(facet));
                                if (facet['@NM'] === SearchResults.config.radioBtnString || true) {
                                    $facet.appendTo(searchFilterContainer);
                                } else {
                                    $facet.appendTo(searchFilterContainer);
                                }
                            }
                        }
                    }

                    //If a section has more than 8 filters, add scrolling
                    $('#search-filter .mda-custom-dd-list').each(function(){
                        if($(this).find('li').length > 8){
                            $(this).addClass('scroll');
                        } else{
                            $(this).removeClass('scroll');
                        }
                    });

                    $('.mda-custom-dd.result-types').find('.search-filter-radio').each(function(){
                        $(this).data('facetname','pagetype');
                    })
                }

                //Close all filters if we are on mobile
                if(APP.utils.getViewport().size === 'medium' || APP.utils.getViewport().size === 'small' || APP.utils.getViewport().size === 'xsmall'){
                    $('#search-filter .mda-custom-dd').removeClass('extended');
                }

                if(SearchResults.config.searchType === 'clinical trials'){
                    $('#search-filter .mda-custom-dd').removeClass('extended');
                    $('#allresultsenrollment_status').closest('.mda-custom-dd').addClass('extended');
                }
            },


            /*
             *
             * Click handlers for the pagination links.
             * Clicks will update the config.page variable to the new page and call the method to get pagination results
             *
             */
            addPaginationHandlers: function () {
                $('.search-result-pagination .pagination-number').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    $('.search-result-pagination .pagination-number.active').removeClass('active');
                    $this.addClass('active');
                    SearchResults.config.page = parseInt($this.text()) - 1;
                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);


                });
            },

            /*
             *
             * Update the numbers for pagination after user has selected a new page. This is done to keep 9 numbers in the page list
             *
             */

            updatePaginationNumbers: function () {
                var numPages = Math.ceil(SearchResults.config.resultsCount / SearchResults.config.defaultPageSize);
                var $page;
                var i = 0;
                if (numPages > (1000 / SearchResults.config.defaultPageSize)) {
                    numPages = Math.ceil(1000 / SearchResults.config.defaultPageSize);

                }
                var upperBound = numPages;
                var $paginationLocation = $('.search-result-pagination .pagination');
                $paginationLocation.html('');

                if(APP.utils.getViewport().size !== 'small' && APP.utils.getViewport().size !== 'xsmall' && APP.utils.getViewport().size !== 'medium'){
                    $paginationLocation.show();
                }


                if (SearchResults.config.page + 1 < 5) {
                    upperBound = 9;
                } else {
                    i = SearchResults.config.page - 4;
                    if (SearchResults.config.page + 5 < numPages) {
                        upperBound = SearchResults.config.page + 5;
                    }
                }

                if(numPages < 9){
                    upperBound = numPages;
                }

                if (i !== 0) {
                    $page = $('<a href="#search-page" class="pagination-number">1</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#search-page" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                }

                for (i; i < upperBound; i++) {
                    if (i === SearchResults.config.page) {
                        $page = $('<a href="#search-page" class="pagination-number active">' + (i + 1) + '</a>');
                    } else {
                        $page = $('<a href="#search-page" class="pagination-number" >' + (i + 1) + '</a>');
                    }
                    $page.appendTo($paginationLocation);
                }

                if (upperBound < numPages) {
                    $page = $('<a href="#search-page" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#search-page" class="pagination-number">' + Math.floor(numPages) + '</a>');
                    $page.appendTo($paginationLocation);
                    $paginationMoreButton.show();

                } else {
                    $paginationMoreButton.hide();
                }

                if (SearchResults.config.page + 1 < numPages) {
                    $paginationMoreButton.show();

                }

                if(numPages === 1){
                    $('.search-result-pagination').hide();
                } else{
                    $('.search-result-pagination').show();
                }

                if(SearchResults.config.page === 0){
                    $paginationPrevButton.hide();
                } else{
                    $paginationPrevButton.show();
                }


                SearchResults.addPaginationHandlers();
            },


            /*
             *
             * Handlers for sorting will alter the config.sortString to change the way results are ordered
             *
             */
            addSortingHandlers: function () {
                $('.search-results-sort-date').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').addClass('active');
                    $('.search-results-sort-title').removeClass('active');
                    $('.search-results-sort-relevant').removeClass('active');
                    SearchResults.config.sortString = '&sort=date:D:S:d1';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                });

                $('.search-results-sort-title').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').removeClass('active');
                    $('.search-results-sort-relevant').removeClass('active');
                    $('.search-results-sort-title').addClass('active');
                    SearchResults.config.sortString = '&sort=meta:title';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                });

                $('.search-results-sort-relevant').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').removeClass('active');
                    $('.search-results-sort-title').removeClass('active');
                    $('.search-results-sort-relevant').addClass('active');
                    SearchResults.config.sortString = '';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                })

            },

            escapeHtml : function(text) {
                return text.replace(/\./g, "%2E")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/%/g, "%25");
            },

            /*
             * Add filter events to update the search results and the filterString variable
             *
             */

            addFilterListeners: function () {
                var $radioButtons = $('.search-filter-radio');

                $('.col-search-filter .term-block i').first().on('click',function(){
                    window.location.href = window.location.pathname + '?q=' + SearchResults.config.queryString;

                });

                $radioButtons.unbind('click');
                $radioButtons.on('click', function (ev) {
                    var facetName = $(ev.target).data('facetname');
                    var facetValue = $(ev.target).attr('value');

                    $('.search-result-pagination').hide();
                    var shouldReload = false;

                    //If we are changing the search type, we need to reload the page to show the specific headers
                    if($('.mda-custom-dd.result-types').find('.search-filter-radio:checked').length > 0) {
                        var searchType = $('.mda-custom-dd.result-types').find('.search-filter-radio:checked')[0].value;
                        shouldReload = searchType === 'clinical trials' || searchType === 'Clinical Trials' || searchType === 'clinical trial' || searchType === 'Clinical Trial' ||
                            searchType == 'blogs' || searchType == 'Blogs' || searchType == 'Blog' || searchType == 'blog' ||
                            searchType === 'publications' || searchType === 'Publications' || searchType === 'publication' || searchType === 'Publication' ||
                            searchType == 'news' || searchType == 'News' || searchType == 'news articles' || searchType == 'news article';
                    }

                    if($(this).closest('.result-types').length > 0 && shouldReload){
                        window.location.href = window.location.pathname + '?q=' + SearchResults.config.queryString + '&searchType=' + $('.mda-custom-dd.result-types').find('.search-filter-radio:checked')[0].value + '&origin=filter';

                    } else{
                        if(facetName.indexOf('physician') > -1){
                            facetValue = SearchResults.convertPhysicianName(facetValue);

                        }


                        SearchResults.addTermBlock(facetName,facetValue);

                        SearchResults.config.page = 0;

                        SearchResults.setHash('filter|' + facetName + ':' + facetValue, true);

                    }


                });

            },

            /*
             * On the click of a result, fire an event before redirecting the user
             */
            addResultClickHandlers: function () {

                $('#search-result-block .search-result:not(.video) a').on('click', function (event) {
                    var $this = this;
                    var $jqThis = $(this);
                    if($jqThis.attr('target') !== '_blank'){
                        event.preventDefault();
                    }
                    var ajaxURL = SearchResults.config.resultClickUrl + '&ct=c&q=' + SearchResults.config.queryString + '&url=' + $this.href + '&r='+$($this).closest('.search-result').data('index');
                    $.ajax({
                        url: ajaxURL,
                        success: function () {
                            if($jqThis.attr('target') !== '_blank'){
                                window.location.href = $this.href;
                            }
                        },
                        error: function(){
                            if($jqThis.attr('target') !== '_blank'){
                                window.location.href = $this.href;
                            }
                        }
                    });


                });
            },


            addSuggestionHandler: function () {
                $('#suggested-content-more').on('click', function (event) {
                    event.preventDefault();

                    if ($suggestedContent.hasClass('collapse')) {
                        $suggestedContent.removeClass('collapse');
                        $suggestedContent.addClass('extended');
                    } else if ($suggestedContent.hasClass('extended')) {
                        $suggestedContent.addClass('collapse');
                        $suggestedContent.removeClass('extended');
                    } else {
                        $suggestedContent.addClass('extended');
                    }

                });
            },

            initFilterMenu: function () {
                var Dropdown;
                return Dropdown = {
                    $el: $('.mda-custom-dd'),

                    init: function () {
                        Dropdown.$el.each(Dropdown.render);
                    },

                    render: function () {
                        var $dropdown = $(this),
                            $ddLink = $dropdown.find('.mda-custom-dd-link'),
                            $ddList = $dropdown.find('.mda-custom-dd-list');

                        $ddLink.unbind('click');
                        $ddLink.on('click', function (e) {
                            e.preventDefault();

                            $dropdown.toggleClass('extended');
                        });

                    }
                };
            },

            /*
             * Perform the necessary logic for keymatch
             * If the text has keymatch in the URL, request the HTML snippet, otherwise use the provided data
             */
            initSuggestions: function (jsonResults) {
                var suggestedTemplate = SearchResults.config.suggestedResultTemplate;
                if (jsonResults.GSP.GM !== undefined) {
                    var suggestions = jsonResults.GSP.GM;
                    var addedSuggestion = false;

                    if (suggestions.length > 1) {
                        for (var i = 0; i < suggestions.length; i++) {
                            if(suggestions[i].GL.indexOf('keymatch') > -1){
                                if(suggestions[i].GL.indexOf(window.location.host) > -1){
                                    addedSuggestion = true;
                                    SearchResults.getHtmlSnippet(suggestions[i].GL);
                                }
                            } else {
                                addedSuggestion = true;
                                $(suggestedTemplate(suggestions[i])).appendTo($suggestedResults);
                            }
                        }
                    } else {
                        if(suggestions.GL.indexOf('keymatch') > -1){
                            if(suggestions.GL.indexOf(window.location.host) > -1){
                                addedSuggestion = true;
                                SearchResults.getHtmlSnippet(suggestions.GL);
                            }
                        } else {
                            addedSuggestion = true;
                            $(suggestedTemplate(suggestions)).appendTo($suggestedResults);
                        }
                    }
                    if(addedSuggestion === true){
                        if($('#suggested-content-more').data('limit') === undefined){
                            $('#suggested-content-more').data('limit',3);
                        }

                        if($('#suggested-content-more').data('limit') > suggestions.length || suggestions.length === undefined){
                            $('#suggested-content-more').hide();
                        } else{
                            var maxHeight = 61 + 124 * $('#suggested-content-more').data('limit');
                            $suggestedContent.css({'max-height': maxHeight + 'px'})
                        }
                        $suggestedContent.removeClass('hidden');
                    }
                }
            },

            addRelatedSearches: function (jsonResults) {
                if (jsonResults.GSP.Synonyms !== undefined) {
                    var synonyms = jsonResults.GSP;
                    $(SearchResults.config.relatedSearchTemplate(synonyms)).appendTo($('.search-sidebar #search-filter'));
                }


            },


            /*
             * Request the new HTML Snippet for keymatch
             */
            getHtmlSnippet : function(url){
                $.get( url, function( data ) {
                    var re = /<a.*search-result(.|\n)*<\/a>/g;
                    var match = re.exec(data);
                    if(match !== null){
                        var temp = $( '<div/>' ).html( match );
                        temp.appendTo($suggestedResults);
                    }

                });
            },


            //This logic adds in the headers for blogs, publications, and clinical trials search
            showSpecificSearchHeader : function(queryString){
                var searchBar = $('.search-wrapper.search-results-search-bar');
                var pageHeader = $('.page-header');
                var header = '';
                var icon = 'fa-user-md';

                if(SearchResults.config.searchType === 'blogs'){
                    header = 'Blogs: ';
                    searchBar.addClass('blogs');
                    searchBar.find('.form-search-submit').addClass('blogs');
                    icon = 'mda-icon-blog';
                }else if(SearchResults.config.searchType === 'clinical trials'){
                    header = 'Clinical Trials: ';
                    searchBar.addClass('clinical-trials');
                    searchBar.find('.form-search-submit').addClass('clinical-trials');
                    icon = 'mda-icon-clinical_trials_new';

                }else if(SearchResults.config.searchType === 'publications'){
                    header = 'Publications: ';
                    searchBar.addClass('publications');
                    searchBar.find('.form-search-submit').addClass('publications');
                    icon = 'mda-icon-publications';
                }else if(SearchResults.config.searchType === 'news'){
                    header = 'News: ';
                    searchBar.addClass('news');
                    searchBar.find('.form-search-submit').addClass('news');
                    icon = 'mda-icon-news';
                }else if(SearchResults.config.searchType === 'patient-education'){
                    header = 'Patient Education: ';
                    searchBar.addClass('patient-education');
                    searchBar.find('.form-search-submit').addClass('patient-education');
                    icon = 'mda-icon-recommendedpages';
                } else{
                    header = "Search Results: ";
                    searchBar.addClass('vanilla');
                    searchBar.find('.form-search-submit').addClass('vanilla');
                    searchBar.addClass('mda-show-md');

                }

                searchBar.find('.search-field').on('focus',function() {
                    $(this).select();
                });

                $navSearchWrapper.find('.search-field').on('focus',function() {
                    $(this).select();
                });
                $navSearchWrapper.find('.search-field').blur();

                searchBar.find('.search-field').val(queryString);

                pageHeader.parent().css({'width':'100%'});
                pageHeader.addClass('search-results');
                pageHeader.find('.page-header-title').addClass('with-icon')
                $('<i class="fa fa-3x header-icon"></i>').addClass(icon).prependTo(pageHeader);
                $('<h1/>').text(header).appendTo(pageHeader.find('.page-header-title'));
                $('<span/>').text(queryString).appendTo(pageHeader.find('.page-header-title'));

                searchBar.removeClass('hidden');
                if(SearchResults.config.searchType !== 'vanilla'){
                    $('.search-page-header-wrapper').removeClass('hidden');
                }
                if(SearchResults.config.searchType === 'patient-education'){
                    $('.search-results-search-bar').find('.search-field').first().focus();
                }

            },

            errorProcedure: function(searchOpen){
                $('.searchError').removeClass('hidden');
                if(!searchOpen){
                    $('#nav-search-toggle').trigger('click');
                }
                $('#search-page').hide();
            },

            initializeVideoResults : function(){
                $('.search-result.video').each(function(){
                    var $this = $(this);
                    $this.find('a').on('click',function(event){
                        $(this).unbind('click');
                        event.preventDefault();
                        var ajaxURL = SearchResults.config.resultClickUrl + '&ct=c&q=' + SearchResults.config.queryString + '&url=' + $this.href + '&r='+$($this).data('index');
                        $.ajax({
                            url: ajaxURL,
                            success: function () {
                            }
                        });
                    });

                    var outJson = {
                        id: '',
                        source : '',
                        sourceJson : ''
                    };
                    if($this.data('videotype') && $this.data('videoid')){
                        outJson.id = $this.data('videoid');
                        if($this.data('videotype') === 'Mediahub' || $this.data('videotype') === 'podcast'){
                            outJson.source = 'mediahub';
                            $.ajax({
                                url: SearchResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.search-result-desc').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('.search-result-details').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.search-result-details').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });
            },

            updateDates : function(){
                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";
                var dateElement = $('.search-result-date');
                dateElement.each(function() {
                    var from = $(this).text().split("-");
                    if(from.length > 1)
                        $(this).html(month[from[1] - 1] + ' ' + from[2].trim() + ', ' + from[0])
                });
            },

            parseHash : function(){
                var hash = window.location.hash;
                var hashArray = hash.split(',');
                var maxPage = 0;
                var filterString = '';
                SearchResults.config.usedFilters = '';
                SearchResults.config.filterString = '';
                var addTermBlocks = ($('#search-filter').find('.term-block').length === 0 && SearchResults.config.searchType === 'vanilla') || ($('#search-filter').find('.term-block').length === 1 && SearchResults.config.searchType !== 'vanilla');
                for(var i = 0; i < hashArray.length; i++){
                    var hashItem = hashArray[i];
                    var hashType = hashItem.substring(0,hashItem.indexOf('|'));
                    var hashValue = hashItem.substring(hashItem.indexOf('|')+1,hashItem.length);
                    if(hashType.indexOf('page') > -1){
                        var page = parseInt(hashValue.substring(hashValue.indexOf(':') + 1,hashValue.length));
                        maxPage = page;

                    } else if(hashType.indexOf('filter') > -1){
                        var facetName = hashValue.substring(0,hashValue.indexOf(':'));
                        var facetValue = hashValue.substring(hashValue.indexOf(':') + 1,hashValue.length);
                        SearchResults.config.usedFilters = SearchResults.config.usedFilters + '|' + facetName;
                        filterString = filterString + SearchResults.escapeHtml(hashValue) + '.';
                        if(addTermBlocks){
                            SearchResults.addTermBlock(facetName,facetValue);
                        }
                    }
                }
                SearchResults.config.page = maxPage;
                if(filterString.length > 0){
                    if(SearchResults.config.baseFilterString === '&requiredfields='){
                        SearchResults.config.filterString = SearchResults.config.baseFilterString + filterString.substring(0,filterString.length -1)
                    } else{
                        SearchResults.config.filterString = SearchResults.config.baseFilterString + '.' + filterString.substring(0,filterString.length -1)

                    }
                } else{
                    if(SearchResults.config.baseFilterString !== '&requiredfields='){
                        SearchResults.config.filterString = SearchResults.config.baseFilterString;
                    }
                }

            },

            addTermBlock: function(facetName, facetValue){
                if(facetName.indexOf('physician') > -1){
                    facetValue = SearchResults.convertPhysicianName(facetValue);
                }
                $('#search-filter .term-block').last().after($('<div class="term-block extra-filter" data-facetname="'+facetName+'" data-index="1" style="display:block"><span>'+facetValue+'</span><i class="fa fa-times"></i></div>'));
                $('.term-block.extra-filter i').each(function(){
                    var $this = $(this);
                    $this.unbind('click');
                    $this.on('click',function(){
                        var removalFacetName = $this.closest('.term-block').data('facetname');
                        var removalFacetValue = $this.closest('.term-block').text();
                        $this.closest('.term-block').remove();
                        SearchResults.setHash('filter|' + removalFacetName + ':' + removalFacetValue, false, true);

                    })
                })
            },

            setHash : function(updateValue, isAdd, isTermBlock){
                SearchResults.config.lockHash = true;
                var hash = window.location.hash;

                if(isAdd){
                    if(hash.length > 0){
                        SearchResults.config.hash = (hash + ',' + updateValue).replace('#_,','#');
                        location.href = SearchResults.config.hash;
                    } else{
                        SearchResults.config.hash = '#' + updateValue;
                        location.href = SearchResults.config.hash;
                    }
                } else{
                    var tempHashString = '';
                    var hashArray = hash.split(',');
                    if(updateValue.indexOf('physician:') > -1){
                        var firstHalf = updateValue.substring(0,updateValue.indexOf(':'));
                        var secondHalf = updateValue.substring(updateValue.indexOf(':')+1, updateValue.length);
                        updateValue = firstHalf + ':' + SearchResults.convertPhysicianName(secondHalf)
                    }
                    for(var i = 0; i < hashArray.length; i++){
                        hashArray[i] = hashArray[i].replace('#','');
                        if(hashArray[i] === updateValue){

                        } else{
                            tempHashString = tempHashString + ',' + hashArray[i];
                        }
                    }
                    SearchResults.config.hash = '#' + tempHashString;
                    SearchResults.config.hash = SearchResults.config.hash.replace('#,','#').replace('#_,','#');
                    if(SearchResults.config.hash.length > 2){
                        location.href = SearchResults.config.hash;

                    } else {
                        if(isTermBlock){
                            location.href = '#_';
                        }
                    }
                }
                SearchResults.getSearchResults(SearchResults.config.queryString, false);

            },
            convertPhysicianName : function(name){
                var tempName = '';
                if(name.indexOf(',') > -1){

                    var valArray = name.split(' ');
                    for(var i = 1; i < valArray.length; i++){
                        if(valArray[i] !== ','){
                            tempName = tempName + valArray[i] + ' ';
                        }
                    }
                    tempName = tempName + valArray[0].replace(',','');
                    return tempName;

                } else{

                    var tempNameArr = [];
                    tempNameArr = name.split(' ');
                    tempName = tempNameArr[tempNameArr.length - 1] + ',';
                    for (var g = 0; g < tempNameArr.length - 1; g++) {
                        tempName = tempName + ' ' + tempNameArr[g];
                    }

                    return tempName;
                }

            }
        };
    })(APP.SearchResults || {}); //Fired from APP
})(jQuery);
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var alerts = (function (window, undefined) {
    var paintAlertDom = function (alerturl) {
        $.ajax({
            url : alerturl,
            method : 'get',
            dataType: 'html',
            success : function (response) {
                $('#global-header').prepend(response);
            }
        });
    };
    function initializeURL () {
    	if ($('html').width() < 752) {
        	var showURL = $('#alert-url-data').data('alert-device-url');
        } else {
        	var showURL = $('#alert-url-data').data('alert-url');
        }
        if (showURL !== undefined) {
            paintAlertDom(showURL);
        }
    }
    function init () {
        setTimeout(function () {
            verifyAlert();
        },1000);
        initializeURL();
    }
    function verifyAlert () {
        $(window).on('resize', function () {
            if ($('.alert-wrapper').length > 0) {
                $('#mobile-menu').addClass('mda-alert');
            }
            else {
                $('#mobile-menu').removeClass('mda-alert');
            }
        });
        if ($('.alert-wrapper').length > 0) {
            $('#mobile-menu').addClass('mda-alert');
        }
        else {
            $('#mobile-menu').removeClass('mda-alert');
        }
    }
    return {
        init : init,
        verifyAlert: verifyAlert
    };
}(window, undefined)).init();


/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {



    $.fn.predictiveSearchForm = function( url, options ) {
        var config = {
            page: 1,
            defaultPageSize: 4,
            searchResultTemplate : APP.templates.searchresult,
            predictiveValues : []
        };
        if(APP.configs.isLocal){
            config.predictiveSearchUrl = '/mda-web/images/cancertype-search_final.xml';

            config.searchResultsUrl = 'http://dcsrlaemweb01.mdanderson.edu/search?site=mda_aem_stage&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=diseases.(isPrimaryDiseasePage:true)&getfields=*&sort=meta:diseases';
        }else{
            config.predictiveSearchUrl = '/search?site=mda_aem&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=Diseases&inmeta:isPrimaryDiseasePage=true&getfields=isPrimaryDiseasePage.Diseases&sort==meta:Diseases';
            config.searchResultsUrl = '/search?site=mda_aem&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=Diseases&inmeta:isPrimaryDiseasePage=true&getfields=isPrimaryDiseasePage.Diseases&sort==meta:Diseases';
        }

        if(url != undefined){
            config.predictiveSearchUrl = url;
            if(APP.configs.isLocal){
                config.predictiveSearchUrl = 'http://dcsrlaemweb01.mdanderson.edu' + url;
            }
        }

        var settings = $.extend({}, options );

        var searchWrapper = $(this).parent(),
            searchForm = $(this),
            searchInput = searchWrapper.find('.search-field'),
            searchResults = searchWrapper.find('.search-results'),
            searchClear = $('.search-clear');
        searchWrapper.on('clear', clearSearch);


        searchWrapper.find('input').attr('autocomplete', 'off');


        searchForm.submit(function (event) {

            event.preventDefault();

            if(searchWrapper.find('.form-search-submit').data('linkurl') !== undefined && searchWrapper.find('.form-search-submit').data('linkurl') !== 'null' && searchWrapper.find('.form-search-submit').data('linkurl') !== null){
                window.location.href = searchWrapper.find('.form-search-submit').data('linkurl');
            }
        });
        searchClear.on('click',clearSearch);

        searchInput.focus(function(){
            searchWrapper.addClass('focus');

        });

        searchInput.blur(function(){
            searchWrapper.removeClass('focus');

            if( $(this).val().length > 0 ) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
        });


        //When typing, make a call for the values the first time. Otherwise get the predictive values
        searchInput.keyup(function(e){
            var length = $(this).val().length;
            if(length > 0) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
            // the below conditions are only used for demoing the predictive search
            if(e.keyCode < 38 || e.keyCode > 40){
                if(length>=2){
                    if(config.predictiveValues.length === 0){
                        getSuggestedQueries($(this).val());
                    } else{
                        getPredictiveValues($(this).val());
                    }
                } else {
                    clearSuggestions();
                }
            }
        });

        /*
         * Use regex to find the predictive values based on the query then add them to the results list
         */
        function getPredictiveValues(query){
            var regex = new RegExp(query, 'i');
            var noResults = false;
            var output = [];
            var j= 0;
            var tempResult;

            for(var i = 0; i < config.predictiveValues.length; i++){
                var item = config.predictiveValues[i];
                if(regex.test(item.label)){
                    output.push( {
                        label: item.label,
                        url: item.url
                    });
                    j++;
                }
            }
            if(output.length === 0){
                noResults = true;
                output.push( {
                    label: 'No Results Found',
                    url: 'null'
                });
            }

            for(var i = 0; i < 4; i++){
                var value = output[i];
                if(value !== undefined){

                    // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).html('<div role="option" class="option" id="' + value.label + '"><div class="suggestion-name" data-linkurl="'+value.url+'">' +value.label + '</div></div>');
                    }else{
                        tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" class="option" id="' + value.label + '"><div class="suggestion-name" data-linkurl="'+value.url+'">' + value.label + '</div></div></li>');
                        addPredictiveResult(tempResult);
                    }

                } else {
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).remove();
                    }
                }

            }

            if(noResults){
                searchWrapper.find('.search-result').unbind('click');
            } else{
                addResultClickHandler();
            }


        }

        /*
         * Get the suggested queries based with the provided URL
         */

        function getSuggestedQueries( query ){

            $.ajax({
                url: config.predictiveSearchUrl,
                contentType: "xml",
                dataType: "xml",
                success: function (result) {
                    var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                    if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0){

                    } else {

                        var resultTitle;
                        var url;
                        var metadata;
                        for(var i = 0; i < jsonResults.GSP.RES.R.length; i++){
                            metadata = resultTitle =jsonResults.GSP.RES.R[i].MT;
                            if (!metadata.length) {
                                var temp = metadata;
                                metadata = [];
                                metadata.push(temp);
                            }
                            for(var j = 0; j < metadata.length; j++){
                                if(metadata[j]['@N'] == 'Diseases' || metadata[j]['@N'] == 'diseases' ||  metadata[j]['@N'] == 'diseases_abbreviation'){
                                    resultTitle = metadata[j]['@V'];
                                    var resultTitleArray = resultTitle.split(',');
                                    for(var n = 0; n < resultTitleArray.length; n++){
                                        resultTitle = resultTitleArray[n];
                                        if(resultTitle.length > 60){
                                            resultTitle = resultTitle.substring(0,60);
                                            resultTitle = resultTitle.substring(0, resultTitle.lastIndexOf(' ')) + '...';
                                        }
                                        url = jsonResults.GSP.RES.R[i].U;

                                        if(checkForValue(resultTitle)){
                                            config.predictiveValues.push( {'label' : resultTitle, 'url' : url});
                                        }
                                    }

                                }
                            }
                        }

                        getPredictiveValues(query);
                    }
                }
            });
        }

        function checkForValue(resultTitle){
            for(var i = 0; i < config.predictiveValues.length; i++){
                if(config.predictiveValues[i].label == resultTitle){
                    return false;
                }
            }
            return true;
        }


        function addResultClickHandler(){
            if(APP.configs.isMobile.nullcheck()){
                searchWrapper.find('.search-result').on('click', function(){
                    var $this = $(this);
                    searchInput.val($this.text());
                    searchWrapper.find('.form-search-submit').data('linkurl',$this.find('.suggestion-name').data('linkurl'));
                    searchForm.submit();
                });
            } else{
                searchWrapper.find('.search-result').on('mousedown', function(){
                    var $this = $(this);
                    searchInput.val($this.text());
                    searchWrapper.find('.form-search-submit').data('linkurl',$this.find('.suggestion-name').data('linkurl'));
                    searchForm.submit();
                });
            }


        }

        function addPredictiveResult(result){
            result.appendTo(searchResults);
            setTimeout(function(){
                result.addClass('reveal');
            }, 80);
        }

        function removeResult(result){
            result.removeClass('reveal');

            var onEndTransFn = function( ev ) {
                this.removeEventListener( APP.utils.transEndEventName(), onEndTransFn );
                setTimeout(function(){
                    result.remove();
                }, 80);
            };

            if( Modernizr.csstransitions ) {
                result[0].addEventListener( APP.utils.transEndEventName(), onEndTransFn );
            }
            else {
                onEndTransFn.call();
            }
        }

        function clearSearch(){
            searchInput.val('');
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));
        }

        function clearSuggestions(searchTerm){
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));

        }


        /*
         * Key press events for up and down
         */

        searchInput.on('focus', function() {

        }).on('keydown', function(e) {
            var $selected = $('li.search-result.active');
            if (e.keyCode == 40) {
                if($selected == undefined || $selected.length == 0){
                    searchWrapper.find('li.search-result').first().addClass('active');
                    searchWrapper.find('.search-field').val($('li.search-result').first().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.next().addClass('active');
                    searchWrapper.find('.search-field').val($selected.next().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.next().find('.suggestion-name').data('linkurl'));
                }
                return false;
            } else if (e.keyCode == 38) {
                if($selected == undefined || $selected.length == 0){
                    searchWrapper.find('.search-field').val(searchWrapper.find('li.search-result').first().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.prev().addClass('active');
                    searchWrapper.find('.search-field').val($selected.prev().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.prev().find('.suggestion-name').data('linkurl'));
                }
                return false;
            }
        });

        return this;
    };


}( jQuery ));
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';



    ////////////////////////
    //Search Functionality//
    ////////////////////////

    APP.ResourceCenterResults = (function (ResourceCenterResults) {
        return ResourceCenterResults = {

            $el: $('#search-results-block'),

            /*
             * Initialize Search results URL and Handlebar variables
             *
             */
            init: function () {

                if ($('#resource-center-results') !== undefined && $('#resource-center-results').length > 0) {

                    //Get all handlebar templates required and establish query strings

                    /*
                     *
                     * searchResultsTemplate - The handlebar template required for each individual search results
                     * didYouMeanTemplate - The handlebar template used for the misspell text
                     * suggestedResultTemplate - The handlebar template used for the MDA Suggests section
                     * filterCheckboxTemplate - Handlebar template used for the checkbox facet filtering
                     * filterRadiobtnTemplate - Handlebar template for the radio button facet filtering
                     * relatedSearchTemplate - Handlebar template used for the suggested terms query
                     * radioBtnString - The string used for determining the radio button facet
                     *
                     */
                    ResourceCenterResults.config = {
                        page: 0,
                        publicationLocation : '.publication-articles .col-single',
                        patientEducationLocation : '.patient-education .col-single',
                        videoLocation: '.videos .col-single',
                        podcastsLocation: '.podcasts .col-single',
                        newsReleasesLocation: '.news-releases .col-single',
                        mediaHubApiUrl : '/api/publiccatalog/v1/',
                        defaultPageSize: 3,
                        resultsCount: '',
                        sortString: '',
                        filterString: '',
                        frontEndString: 'mda_aem',
                        baseFilterString: '&requiredfields=',
                        fullPageResults: false,
                        publicationQuery: '',
                        patientEducationQuery: '',
                        videoQuery : '',
                        podcastsQuery: '',
                        newsReleasesQuery: '',
                        largeResultTemplate: '',
                        smallResultTemplate: '',
                        moreResults : false,
                        moreResultsSection : '',
                        resultsTagQuery : '',
                        keywordResultsFilter : '',
                        landingPageUrl : '',
                        currentTagDepth : 0

                    };

                    var moreResults = APP.utils.getUrlParameter('moreResults');
                    ResourceCenterResults.addBackButtonHandler();

                    if(moreResults){
                        ResourceCenterResults.config.defaultPageSize = 18;
                        ResourceCenterResults.config.fullPageResults = true;
                        ResourceCenterResults.config.moreResults = true;
                        ResourceCenterResults.config.moreResultsSection = moreResults;
                        var $resultsSection = $('#resource-center-results');
                        $('.see-more').hide();
                    }

                    //Local configuration used for development
                    var $keywordWrapper = $('.resource-results-search');
                    if (APP.configs.isLocal) {
                        var numSearchResultsReturn = 3;
                        var searchResultsUrl = '/search?site=MD_Anderson&clientmda_diseases&output=xml_no_dtd&access=p&filter=0&getfields=*&tlen=160';
                        var searchResultClickAnalyticsUrl = '';
                        ResourceCenterResults.config.searchResultsUrl = 'https://www.mdanderson.org' + searchResultsUrl + '&num=' + ResourceCenterResults.config.defaultPageSize;
                        ResourceCenterResults.config.resultClickUrl = 'https://www.mdanderson.org' + searchResultClickAnalyticsUrl;
                        ResourceCenterResults.config.resultsTagQuery = 'https://www.mdanderson.org' + $keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery');
                        ResourceCenterResults.config.mediaHubApiUrl = 'https://www.mdanderson.org' + ResourceCenterResults.config.mediaHubApiUrl;
                        ResourceCenterResults.config.landingPageUrl = $keywordWrapper.find('.suggested-keywords').data('resourcelandingpage');
                    } else {
                        ResourceCenterResults.config.searchResultsUrl = searchResultsUrl + '&num=' + ResourceCenterResults.config.defaultPageSize;
                        ResourceCenterResults.config.resultClickUrl = $('<div/>').html(searchResultClickAnalyticsUrl).text();
                        ResourceCenterResults.config.resultsTagQuery = $keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery');
                        ResourceCenterResults.config.landingPageUrl = $keywordWrapper.find('.suggested-keywords').data('resourcelandingpage');
                    }

                    //If the number of search results has been authored, overwrite hardcoded value
                    if (numSearchResultsReturn !== undefined) {
                        ResourceCenterResults.config.defaultPageSize = numSearchResultsReturn;
                    }

                    if(ResourceCenterResults.config.fullPageResults){
                        ResourceCenterResults.config.defaultPageSize = 18;
                        $('.back-to-landing').removeClass('hidden');
                    }

                    // Get the URL Parameter for the search param and call render
                    var searchQuery = APP.utils.getUrlParameter('q');
                    if(!searchQuery){

                        ResourceCenterResults.errorProcedure(false);
                    }


                    $('.search-result-pagination .search-results-more').hide();

                    //Click event for more button in pagination
                    $('.search-result-pagination .search-results-more').on('click', function () {
                        var $nextPage = $('.search-result-pagination .pagination-number.active').next();
                        $('.search-result-pagination .pagination-number.active').removeClass('active');
                        $nextPage.addClass('active');
                        ResourceCenterResults.config.page++;
                        ResourceCenterResults.updateResults();
                        ResourceCenterResults.updatePaginationNumbers();

                    });

                    //Click event for previous button in pagination
                    $('.search-result-pagination .search-results-prev').on('click', function () {
                        var $nextPage = $('.search-result-pagination .pagination-number.active').prev();
                        $('.search-result-pagination .pagination-number.active').removeClass('active');
                        $nextPage.addClass('active');
                        ResourceCenterResults.config.page--;
                        ResourceCenterResults.updateResults();
                        ResourceCenterResults.updatePaginationNumbers();

                    });


                    ResourceCenterResults.addViewMoreHandlers();

                    //Handlebar template for the larger results

                    ResourceCenterResults.config.largeResultTemplate = APP.Templates.resource_center_large;


                    //Handlebar template for smaller results
                    ResourceCenterResults.config.smallResultTemplate = APP.Templates.resource_center_small;


                    var resourceCenterDefaultQuery = APP.utils.getUrlParameter('q');
                    if(resourceCenterDefaultQuery && $('.resource-results-search').length > 0){
                        resourceCenterDefaultQuery = decodeURIComponent(decodeURIComponent(resourceCenterDefaultQuery));
                        resourceCenterDefaultQuery = resourceCenterDefaultQuery.replace(new RegExp('%20', 'g'), ' ');
                        if(APP.ResourceCenterResults.config.moreResults || APP.utils.getUrlParameter('filters')){
                            ResourceCenterResults.addSelectedTerm(resourceCenterDefaultQuery, true, true);
                        } else{
                            ResourceCenterResults.addSelectedTerm(resourceCenterDefaultQuery, false, true);
                        }
                    }
                    if($(window).width() < 640){
                        if($('.term-block').width() > 150){
                            $('.term-block').addClass("term-block-mob");
                        }
                    }

                    if($('.selected-terms-container .term-block').length < 1){
                        $('.resource-results-search .search-bar').hide();
                    }


                    $('#resource-results-search-form .search-field').on('focus',function(){
                        var searchString = '';
                        var $this = $(this);
                        var selectedTerms = $('#resource-results-search-form .term-block');
                        selectedTerms.each(function(){
                            searchString = searchString + $(this).find('span').text() + ' ';
                        });
                        $this.val(searchString);
                        $('#selected-terms-container').hide();
                    });

                    $('#resource-results-search-form .search-field').on('blur',function(){
                        var $this = $(this);
                        $this.val('');
                        $('#selected-terms-container').show();
                    });


                    //Handler for adding  a selected filter
                    $('#resource-results-suggestions .term-block a').on('click',function(){
                        if($('.selected-terms-container .term-block').length < 1){
                            $('.resource-results-search .search-bar').slideDown('fast');
                        }
                        var $this = $(this);
                        ResourceCenterResults.addSelectedTerm($this.data('fullvalue'));
                        APP.ResourceCenterResults.config.keywordResultsFilter  = APP.ResourceCenterResults.config.keywordResultsFilter + '.' + $this.text();
                        $this.remove();
                    });

                }
            },
            updateResults: function () {
                var searchQuery = '';

                $('#selected-terms-container').find('.term-block span').each(function(){
                    searchQuery = searchQuery + ' ' +$(this).text();
                });

                //Call search for the individual sections if see more
                if(ResourceCenterResults.config.moreResults){
                    $('#resource-center-results .highlight').removeClass('highlight');

                    if(ResourceCenterResults.config.moreResultsSection.indexOf('publication') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.publicationLocation, ResourceCenterResults.config.largeResultTemplate, '(pagetype:publication|pagetype:blog).(-publication:Cancer Newsline)');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('patient') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.patientEducationLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:patient_education');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('video') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.videoLocation, ResourceCenterResults.config.largeResultTemplate, '(videotype:Youtube|videotype:Mediahub)');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('podcast') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.podcastsLocation, ResourceCenterResults.config.smallResultTemplate, 'videotype:podcast');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('news') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.newsReleasesLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:news articles');

                    } else{

                    }
                    ResourceCenterResults.initializeKeywords();


                } else{
                    //Call search for all sections
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.publicationLocation, ResourceCenterResults.config.largeResultTemplate, '(pagetype:publication|pagetype:blog).(-publication:Cancer Newsline)');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.patientEducationLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:patient_education');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.videoLocation, ResourceCenterResults.config.largeResultTemplate, '(videotype:Youtube|videotype:Mediahub)');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.podcastsLocation, ResourceCenterResults.config.smallResultTemplate, 'videotype:podcast');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.newsReleasesLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:news articles');
                    ResourceCenterResults.initializeKeywords();

                }


            },


            /*
             *
             * Get the search results given a query param. Only runs of first load OR on change of sorting
             *
             *
             */
            getSearchResults: function (query, firstRun, location, template, type) {

                // Store the query sting in the config obkect
                ResourceCenterResults.config.queryString = query.replace(new RegExp('%20', 'g'), ' ');
                var searchResultsArea = $('#resource-center-results').find(location);
                var searchTemplate = template;
                var searchResult;
                var searchUrl = searchResultsArea.data('resourcesectionsearchquery');

                if(APP.configs.isLocal){
                    searchUrl = 'https://www.mdanderson.org' + searchUrl;
                }

                /*
                 *
                 * Configure the ajax call to GSA for search results
                 * start - The first record to be returned. This is calculated by multiplying the page number by the default page size
                 * q - the search parameter
                 * sortString - The specifying sory by relevance or date, blank by default
                 * filterString - Specifying the filtering, blank by default
                 *
                 */
                $.ajax({
                    url: searchUrl + '&num=' + ResourceCenterResults.config.defaultPageSize + '&start=' + (ResourceCenterResults.config.page * ResourceCenterResults.config.defaultPageSize) + ResourceCenterResults.config.sortString + ResourceCenterResults.config.filterString+ '.'+type ,
                    contentType: 'xml',
                    dataType: 'xml',
                    success: function (result) {
                        searchResultsArea.closest('.hidden').removeClass('hidden');

                        if(searchResultsArea.find('.table').length > 0){
                            searchResultsArea.find('section').remove();
                        } else{
                            searchResultsArea.find('.resource-collection').remove();
                        }

                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            searchResultsArea.closest('section').hide().removeClass('resource-highlight');
                            $('.search-result-pagination').hide();

                        } else {
                            var resultSet = jsonResults.GSP.RES.R;
                            searchResultsArea.closest('section').show().addClass('resource-highlight');
                            var addHighlight = false;
                            var totalResults = jsonResults.GSP.RES.M;
                            (totalResults == 1) ? searchResultsArea.closest('.col-single').find('.result-count').text(totalResults + ' Result') : searchResultsArea.closest('.col-single').find('.result-count').text(totalResults + ' Results');

                            if(ResourceCenterResults.config.moreResults && parseInt(totalResults)  > ResourceCenterResults.config.defaultPageSize){
                                $('.search-result-pagination').show();
                            }

                            $('.resource-center-results').find('.search-result-sort').show();

                            if(totalResults <= 3){
                                searchResultsArea.closest('.col-single').find('.see-more').hide();
                            } else{
                                searchResultsArea.closest('.col-single').find('.see-more').show();

                            }
                            var moreResults = APP.utils.getUrlParameter('moreResults');
                            if(moreResults){
                                searchResultsArea.closest('.col-single').find('.see-more').hide();

                            }

                            ResourceCenterResults.config.resultsCount = totalResults;
                            if(!resultSet.length){
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);

                            }

                            //For each result, pass it to the handlebar variable and append it to the search area
                            for (var i = 0; i < resultSet.length; i++) {
                                if(type.indexOf('patient') > -1){
                                    resultSet[i]['icon-color'] = 'purple';
                                    resultSet[i]['icon'] = 'fa-file-pdf-o';
                                } else if( type.indexOf('podcast') > -1){
                                    resultSet[i]['icon-color'] = 'green';
                                    resultSet[i]['icon'] = 'fa-microphone';
                                } else if(type.indexOf('news') > -1){
                                    resultSet[i]['icon-color'] = 'orange';
                                    resultSet[i]['icon'] = 'fa-file-o';

                                }

                                if(i % 3 === 0){
                                    if(i > 0){
                                        searchResultsArea = searchResultsArea.parent();
                                    }

                                    if(searchResultsArea.closest('.publication-articles').length > 0 || searchResultsArea.closest('.videos').length > 0){
                                        searchResultsArea = $('<section class="table"></section>').appendTo(searchResultsArea);
                                    } else{
                                        searchResultsArea = $('<section class="resource-collection"></section>').appendTo(searchResultsArea);
                                    }

                                    if(ResourceCenterResults.config.fullPageResults){
                                        addHighlight = true;
                                        searchResultsArea.addClass('highlight');
                                    }
                                }

                                searchResult = $(searchTemplate(resultSet[i]));
                                searchResult.appendTo(searchResultsArea);

                            }

                            if(resultSet.length%3 === 1){
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);

                            } else if(resultSet.length%3 === 2){
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);
                            }


                            if(ResourceCenterResults.config.moreResults){
                                ResourceCenterResults.updatePaginationNumbers();
                            }

                        }

                        $('.resource-highlight').removeClass('apply');
                        $('.resource-highlight').each(function (index) {
                            if (index % 2 === 0) { /* we are even */ } else {
                                $(this).addClass('apply');
                            }
                        });

                        ResourceCenterResults.initializeVideoResults();
                    },
                    error: function(){
                        ResourceCenterResults.errorProcedure(ResourceCenterResults.config.searchType === 'vanilla');
                    }
                });

            },

            addViewMoreHandlers: function(){
                var $resultsSection = $('#resource-center-results');
                $resultsSection.find('.see-more').each(function(){
                    var $this = $(this);
                    $this.on('click',function(){
                        window.location.href = window.location.pathname + '?q=' +APP.utils.getUrlParameter('q') + '&moreResults=' + $this.data('section') + '&filters=' + ResourceCenterResults.config.filterString.substring(ResourceCenterResults.config.filterString.indexOf('(') , ResourceCenterResults.config.filterString.length);
                    });
                });
            },

            /*
             *
             * Click handlers for the pagination links.
             * Clicks will update the config.page variable to the new page and call the method to get pagination results
             *
             */
            addPaginationHandlers: function () {
                $('.search-result-pagination .pagination-number').on('click', function () {
                    var $this = $(this);
                    $('.search-result-pagination .pagination-number.active').removeClass('active');
                    $this.addClass('active');
                    ResourceCenterResults.config.page = parseInt($this.text()) - 1;
                    ResourceCenterResults.updateResults();
                    ResourceCenterResults.updatePaginationNumbers();

                });

            },
            /*
             *
             * Update the numbers for pagination after user has selected a new page. This is done to keep 9 numbers in the page list
             *
             */
            updatePaginationNumbers: function () {
                var $moreButton = $('.search-result-pagination .search-results-more');
                var $prevButton = $('.search-result-pagination .search-results-prev');
                $('.search-result-pagination').show();
                $moreButton.hide();
                var numPages = Math.ceil(ResourceCenterResults.config.resultsCount / ResourceCenterResults.config.defaultPageSize);
                var $page;
                var i = 0;
                if (numPages > (1000 / ResourceCenterResults.config.defaultPageSize)) {
                    numPages =  Math.ceil(1000 / ResourceCenterResults.config.defaultPageSize);

                }
                var upperBound = numPages;
                var $paginationLocation = $('.search-result-pagination .pagination');
                $paginationLocation.html('');
                $paginationLocation.show();


                if (ResourceCenterResults.config.page + 1 < 5) {
                    upperBound = 9;
                } else {
                    i = ResourceCenterResults.config.page - 4;
                    if (ResourceCenterResults.config.page + 5 < numPages) {
                        upperBound = ResourceCenterResults.config.page + 5;
                    }
                }

                if(numPages < 9){
                    upperBound = numPages;
                }
                if (i !== 0) {
                    $page = $('<a href="#resource-center-results" class="pagination-number">1</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#resource-center-results" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                }

                for (i; i < upperBound; i++) {
                    if (i === ResourceCenterResults.config.page) {
                        $page = $('<a href="#resource-center-results" class="pagination-number active">' + (i + 1) + '</a>');
                    } else {
                        $page = $('<a href="#resource-center-results" class="pagination-number" >' + (i + 1) + '</a>');
                    }
                    $page.appendTo($paginationLocation);
                }

                if (upperBound < numPages) {
                    $page = $('<a href="#resource-center-results" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#resource-center-results" class="pagination-number">' + numPages + '</a>');
                    $page.appendTo($paginationLocation);
                    $moreButton.show();

                } else {
                    $moreButton.hide();
                }

                if (ResourceCenterResults.config.page + 1 < numPages) {
                    $moreButton.show();
                } else{
                    $moreButton.hide();
                }

                if(numPages <= 1){
                    $moreButton.hide();
                    $paginationLocation.hide();
                }

                if(ResourceCenterResults.config.page === 0){
                    $prevButton.hide();
                } else{
                    $prevButton.show();
                }

                ResourceCenterResults.addPaginationHandlers();
            },

            //Add the keywords in for narrowing results
            initializeKeywords : function(){
                var $keywordWrapper = $('.resource-results-search');
                var initialQuery = APP.utils.getUrlParameter('q');
                var currentTagLevel = ResourceCenterResults.config.currentTagDepth;
                if(currentTagLevel === 0){
                    currentTagLevel = '';
                }

                initialQuery = decodeURIComponent(decodeURIComponent(initialQuery));

                if($keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery')){
                    if(initialQuery){
                        var requiredFieldsString = 'requiredfields=' + initialQuery;
                        ResourceCenterResults.config.keywordResultsFilter = requiredFieldsString;
                    }

                    //Form the keyword string for the GSA query
                    var keywordString = '.(pagetype:publication|pagetype:blog|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
                    if(ResourceCenterResults.config.moreResults){
                        if(ResourceCenterResults.config.moreResultsSection.indexOf('publication') > -1){
                            keywordString =  '.(pagetype:publication|pagetype:blog)'
                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('patient') > -1){
                            keywordString =  '.(pagetype:patient_education)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('video') > -1){
                            keywordString =  '.(videotype:Youtube|videotype:Mediahub)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('podcast') > -1){
                            keywordString =  '.(videotype:podcast)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('news') > -1){
                            keywordString =  '.(pagetype:news%20articles)'
                        }
                    }

                    var searchUrl = ResourceCenterResults.config.resultsTagQuery;
                    $.ajax({
                        url: searchUrl + ResourceCenterResults.config.filterString + keywordString,
                        contentType: 'xml',
                        dataType: 'xml',
                        success: function (result) {
                            //Convert the XML to JSON and parse it
                            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                            //If the resutls are blank, show the no results text, otherwise show the results
                            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                                $('.suggested-keywords').addClass('slide-up');

                            } else {
                                $('.suggested-keywords .term-block-container').html('');
                                var resultSet = jsonResults.GSP.RES.PARM;

                                if(!resultSet.length){
                                    var temp = resultSet;
                                    resultSet = [];
                                    resultSet.push(temp);

                                }

                                //For each result, pass it to the handlebar variable and append it to the search area
                                var dropdownValues = [];
                                var selectedContainer =  $('.search-wrapper #selected-terms-container');

                                var elementAdded = false;
                                var $selectedTerms = selectedContainer.find('.term-block');

                                var selectedTermArray = [];
                                var usedParents = [];
                                var selectedTag = '';
                                var currentFullVal = '';
                                $selectedTerms.each(function(){
                                    selectedTag = $(this).data('category');
                                    selectedTermArray.push(selectedTag);

                                    currentFullVal =  $(this).data('fullvalue');
                                    if(currentFullVal && currentFullVal.indexOf('___') > -1){
                                        var fullValArray = currentFullVal.substring(currentFullVal.indexOf(':') + 1, currentFullVal.length).split('___');
                                        usedParents = usedParents.concat(fullValArray);
                                    }

                                });



                                //Iterate through results, adding them to the predictive search
                                for (var i = 0; i < resultSet.length; i++) {
                                    if(!resultSet[i].PMT.length){
                                        var temp = resultSet[i].PMT;
                                        resultSet[i].PMT = [];
                                        resultSet[i].PMT.push(temp);
                                    }
                                    var tempDropDownVal = '';
                                    var shouldPush = true;
                                    for (var j = 0; j < resultSet[i].PMT.length; j++) {
                                        var toCheckChildren = true;
                                        for(var p = 0; p < selectedTermArray.length; p++){
                                            if(selectedTermArray[p] === resultSet[i].PMT[j]['@NM']){
                                                toCheckChildren = false;
                                            }
                                        }
                                        if(toCheckChildren) {
                                            if(!resultSet[i].PMT[j].PV.length){
                                                var temp = resultSet[i].PMT[j].PV;
                                                resultSet[i].PMT[j].PV = [];
                                                resultSet[i].PMT[j].PV.push(temp);
                                            }
                                            for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                                tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                                shouldPush = true;
                                                if (shouldPush) {
                                                    for (var q = 0; q < dropdownValues.length; q++) {
                                                        if (tempDropDownVal.indexOf(dropdownValues[q]) > -1){
                                                            shouldPush = false;
                                                        }
                                                    }
                                                    for(var p = 0; p < selectedTermArray.length; p++){
                                                        if(selectedTermArray[p].substring(0,selectedTermArray[p].indexOf(':')) === resultSet[i].PMT[j]['@NM']){
                                                            shouldPush = false;
                                                        }
                                                    }
                                                    if(resultSet[i].PMT[j].PV[m]['@V'].indexOf('___') > -1) {
                                                        var newTagArray = resultSet[i].PMT[j].PV[m]['@V'].split('___');
                                                        for (var p = 0; p < usedParents.length; p++) {
                                                            if (usedParents[p] === newTagArray[newTagArray.length - 1]){
                                                                shouldPush = false;
                                                            }
                                                        }
                                                    } else{
                                                        for (var p = 0; p < usedParents.length; p++) {
                                                            if (usedParents[p] === resultSet[i].PMT[j].PV[m]['@V']){
                                                                shouldPush = false;
                                                            }
                                                        }
                                                    }
                                                    if(shouldPush){
                                                        dropdownValues.push(tempDropDownVal);
                                                        elementAdded = true;

                                                    }
                                                }
                                            }
                                        }
                                    }

                                    dropdownValues.sort(function(a,b){
                                        var firstVal = a.substring(a.indexOf(':') + 1, a.length);
                                        var secondVal = b.substring(b.indexOf(':') + 1, b.length);
                                        if ( firstVal < secondVal)
                                            return -1;
                                        if ( firstVal > secondVal)
                                            return 1;
                                        return 0;

                                    });


                                    for (var i = 0; i < dropdownValues.length; i++) {
                                        var displayValue = '';
                                        if(dropdownValues[i].indexOf('___') > -1){
                                            var splitValue = dropdownValues[i].split('___');
                                            displayValue = splitValue[splitValue.length - 1];
                                        } else{
                                            displayValue = dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length);
                                        }
                                        $('<div class="term-block" data-fullvalue="'+dropdownValues[i]+'" data-category="'+ dropdownValues[i].substring(0,dropdownValues[i].indexOf(':') )+'"><a href="#"><span>'+displayValue+'</span></a></div>').appendTo( $('.suggested-keywords .resource-slick-container'));
                                    }

                                }
                                if(!elementAdded){
                                    $('.suggested-keywords').addClass('slide-up');
                                } else{
                                    $('.suggested-keywords').removeClass('slide-up');
                                }

                                $('#resource-results-suggestions .term-block a').on('click',function(e){
                                    e.preventDefault();
                                    if($('.selected-terms-container .term-block').length < 1){
                                        $('.resource-results-search .search-bar').slideDown('fast');
                                    }
                                    var $this = $(this).parent();
                                    ResourceCenterResults.addSelectedTerm($this.data('fullvalue'));
                                    ResourceCenterResults.config.keywordResultsFilter  = ResourceCenterResults.config.keywordResultsFilter + '.' + $this.data('fullvalue');
                                    $this.remove();
                                });
                                ResourceCenterResults.slickifyAllTerms();

                            }
                        },
                        error: function(){

                        }
                    });
                }

            },

            //Add slick carousel to the selected keywords and suggested keywords
            slickifyAllTerms : function(){

                $('.suggested-keywords .resource-slick-container').each(function(){
                    var $this = $(this);
                    if(typeof $this.getSlick() !== 'undefined' ){
                        $this.unslick();
                    }
                    $this.find('.fa-times').on('click',function(){
                        var $this = $(this);
                        $this.parent().remove();
                        ResourceCenterResults.updateResults();
                    });

                    var resourceSuggestionsConteiner =  $this;
                    var linksContainerWidth = resourceSuggestionsConteiner.outerWidth(true);
                    var linkBoxes = resourceSuggestionsConteiner.find('.term-block');
                    var linkBoxCount = linkBoxes.length;
                    var linkBoxWidth = linkBoxes.outerWidth(true);
                    linkBoxes.each(function(){
                        var $this = $(this);
                        if($this.outerWidth(true) > linkBoxWidth) {
                            linkBoxWidth = $this.outerWidth(true);
                        }
                    });
                    var maxLinkBoxes = Math.floor(linksContainerWidth / linkBoxWidth);
                    $this.slick({
                        dots: false,
                        infinite: false,
                        speed: 300,
                        slidesToShow: maxLinkBoxes,
                        centerMode: false,
                        variableWidth: true,
                        slidesToScroll: maxLinkBoxes
                    });

                });

            },

            addBackButtonHandler: function () {
                $('.back-to-landing').on('click', function (e) {
                    e.preventDefault();
                    window.location.href = window.location.pathname+'?q=' + APP.utils.getUrlParameter('q') + '&filters=' + APP.utils.getUrlParameter('filters');
                });


            },
            //For video resultsm we need to query Media Hub to get the necessary information
            initializeVideoResults : function(){

                //Initialize videos
                $('.blog-summary.video').each(function(){
                    var $this = $(this);

                    var outJson = {
                        id: '',
                        source : '',
                        sourceJson : ''
                    };
                    if($this.data('videotype') && $this.data('videoid')){
                        outJson.id = $this.data('videoid');
                        if($this.data('videotype') === 'Mediahub' || $this.data('videotype') === 'podcast'){
                            outJson.source = 'mediahub';
                            $.ajax({
                                url: ResourceCenterResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.summary-text').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });

                //Initialize podcasts
                $('.collection-item.video').each(function(){
                    var $this = $(this);

                    var outJson = {
                        id: '',
                        source : '',
                        sourceJson : ''
                    };
                    if($this.data('videotype') && $this.data('videoid')){
                        outJson.id = $this.data('videoid');
                        if($this.data('videotype') === 'Mediahub' || $this.data('videotype') === 'podcast'){
                            outJson.source = 'mediahub';
                            $.ajax({
                                url: ResourceCenterResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.summary-text').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('a').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });
            },
            addSelectedTerm : function(termValue, batch){
                if($('.selected-terms-container .term-block').length < 1){
                    $('.resource-results-search .search-bar').slideDown('fast');
                }
                var selectedContainer =  $('.search-wrapper #selected-terms-container.resource-slick-container');
                if(selectedContainer.find('.slick-track').length > 1){
                    selectedContainer = selectedContainer.find('.slick-track');
                }

                var toAdd = true;
                var selectedTerms = selectedContainer.find('.term-block span');
                selectedTerms.each(function(){
                    if($(this).text() === termValue.substring(termValue.indexOf(':') + 1,termValue.length)){
                        toAdd = false;
                    }
                });

                if(toAdd){
                    termValue = termValue.trim();
                    if(batch){

                        var batchFilters = decodeURIComponent(APP.utils.getUrlParameter('filters').replace(new RegExp('\\+', 'g'), ' ')).trim();
                        batchFilters = batchFilters.replace('\)','');
                        var tempFilters = batchFilters.substring(1,batchFilters.length);
                        tempFilters = tempFilters.split('.');
                        var displayValue = '';
                        if(termValue.indexOf('___') > -1){
                            var splitValue = termValue.split('___');
                            displayValue = splitValue[splitValue.length - 1];
                        } else{
                            displayValue =termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                        }
                        var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');

                        if(termValue == decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q')))){
                            termBlock.appendTo(selectedContainer);
                        } else{
                            termBlock.appendTo(selectedContainer);
                        }
                        for(var i = 0; i < tempFilters.length; i++){
                            var termValue = tempFilters[i];
                            if(termValue.indexOf('___') > -1){
                                var splitValue = termValue.split('___');
                                displayValue = splitValue[splitValue.length - 1];
                            } else{
                                displayValue =termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                            }
                            var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');
                            if(decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q'))).indexOf(termValue) === -1 && APP.utils.getUrlParameter('q').indexOf(termValue) === -1){
                                termBlock.appendTo(selectedContainer);
                            }
                        }
                    } else{
                        if(termValue.indexOf('___') > -1){
                            var splitValue = termValue.split('___');
                            displayValue = splitValue[splitValue.length - 1];
                        } else{
                            displayValue = termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                        }
                        var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');

                        if(termValue == decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q')))){
                            termBlock.appendTo(selectedContainer);
                        } else{
                            termBlock.appendTo(selectedContainer);
                        }

                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        selectedContainer.find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                    }
                    ResourceCenterResults.slickifySelectedTerms();

                    if(batch){
                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        selectedContainer.find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                        APP.ResourceCenterResults.updateResults();
                    } else{
                        APP.ResourceCenterResults.updateResults();
                    }
                }

            },
            slickifySelectedTerms : function(){
                $('.search-wrapper #selected-terms-container').each(function(){
                    var $this = $(this);
                    if(typeof $this.getSlick() !== 'undefined' ){
                        $this.unslick();
                    }
                    $this.find('.remove-term').on('click',function(e){
                        e.preventDefault();
                        var $this = $(this);
                        $this.parent().remove();
                        if(!$('.search-wrapper #selected-terms-container').find('.term-block').length || $('.search-wrapper #selected-terms-container').find('.term-block').length === 0 ){
                            if(APP.ResourceCenterResults.config.landingPageUrl !== undefined && APP.ResourceCenterResults.config.landingPageUrl !== ''){
                                window.location.href = APP.ResourceCenterResults.config.landingPageUrl;
                            }
                        }
                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        $('.search-wrapper #selected-terms-container').find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                        APP.ResourceCenterResults.updateResults();

                    });

                    var linksContainerWidth = $('#selected-terms-container').outerWidth(true);
                    var linkBoxes = $('#selected-terms-container .term-block');

                    var linkBoxWidth = linkBoxes.outerWidth(true);
                    linkBoxes.each(function(){
                        var $this = $(this);
                        if($this.outerWidth(true) > linkBoxWidth) {
                            linkBoxWidth = $this.outerWidth(true);
                        }
                    });
                    var maxLinkBoxes = Math.floor(linksContainerWidth / linkBoxWidth);
                    $this.slick({
                        dots: false,
                        infinite: false,
                        speed: 300,
                        slidesToShow: maxLinkBoxes,
                        centerMode: false,
                        variableWidth: true,
                        slidesToScroll: maxLinkBoxes
                    });
                    var linkWidth = 0;
                    linkBoxes.each(function(){
                        linkWidth += $(this).outerWidth()
                    });

                    var toShowArrows = false;
                    if(linkWidth > $('#selected-terms-container').width()){
                        toShowArrows = true;
                    }

                    if(!toShowArrows){
                        $('.selected-terms-container button').hide();
                    } else{
                        $('.selected-terms-container button').show();
                    }
                });
            }

        };
    })(APP.ResourceCenterResults || {}); //Fired from APP





    ////////////////////////////////
    // Selected Terms Section
    ////////////////////////////////
    var resourceCenter = APP.ResourceCenterResults;

    resourceCenter.init();




    
    //Add a selected term
    //termValue is term to add
    //boolean batch is to add multiple filters


})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    if($('.resource-center-search').length > 0){
        var $searchWrapper = $('.resource-center-search');
        var $dropdownMenu = $searchWrapper.find('.menu');
        var searchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var destinationUrl = '/resource-results.html';
        if($searchWrapper.data('resourcepredictivequery')){
            if($searchWrapper.data('destinationurl')){
                destinationUrl = $searchWrapper.data('destinationurl');
            }
            searchUrl = $searchWrapper.data('resourcepredictivequery');
            if(APP.configs.isLocal){
                searchUrl = 'http://dctrlaemweb01.mdanderson.edu/search?entqr=0&sort=meta:diseases:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=multi_level_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles|pagetype:blog).(-publication:Cancer%20Newsline)';
            }
            $.ajax({
                url: searchUrl ,
                contentType: 'xml',
                dataType: 'xml',
                success: function (result) {
                    //Convert the XML to JSON and parse it
                    var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                    //If the resutls are blank, show the no results text, otherwise show the results
                    if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                        //Do nothing if we have no results
                    } else {
                        var resultSet = jsonResults.GSP.RES.PARM;
                        if (!resultSet.length) {
                            var temp = resultSet;
                            resultSet = [];
                            resultSet.push(temp);

                        }

                        //For each result, pass it to the handlebar variable and append it to the search area
                        var dropdownValues = [];

                        for (var i = 0; i < resultSet.length; i++) {
                            if (!resultSet[i].PMT.length) {
                                var temp = resultSet[i].PMT;
                                resultSet[i].PMT = [];
                                resultSet[i].PMT.push(temp);

                            }
                            var tempDropDownVal = '';
                            var shouldPush = true;
                            for (var j = 0; j < resultSet[i].PMT.length; j++) {
                                for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                    tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                    shouldPush = true;
                                    for(var q = 0; q < dropdownValues.length;q++){
                                        if(dropdownValues[q] === tempDropDownVal){
                                            shouldPush = false;
                                        }
                                    }
                                    if(shouldPush){
                                        dropdownValues.push(tempDropDownVal);
                                    }
                                }

                            }

                        }

                        var displayValue = '';
                        var displayValueArray = [];

                        dropdownValues.sort(function(a,b){
                            var firstVal = a.substring(a.indexOf(':') + 1, a.length);
                            if(firstVal.indexOf('___') > -1){
                                displayValueArray = firstVal.split('___');
                                firstVal = displayValueArray[displayValueArray.length -1];
                            }
                            var secondVal = b.substring(b.indexOf(':') + 1, b.length);
                            if(secondVal.indexOf('___') > -1){
                                displayValueArray = secondVal.split('___');
                                secondVal = displayValueArray[displayValueArray.length -1];
                            }

                            if ( firstVal < secondVal)
                                return -1;
                            if ( firstVal > secondVal)
                                return 1;
                            return 0;

                        });




                        for (var i = 0; i < dropdownValues.length; i++) {

                            displayValue = dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length);
                            if(displayValue.indexOf('___') > -1){
                                displayValueArray = displayValue.split('___');
                                displayValue = displayValueArray[displayValueArray.length -1];
                            }

                            $('<div class="item" data-value="' + dropdownValues[i] + '">' + displayValue + '</div>').appendTo($dropdownMenu);
                        }

                        /* Initialize Semantic UI Type Ahead Dropdown Selection */
                        $('.ui.search-form').dropdown({
                            direction : 'downward',
                            match: 'text'
                        });
                        if ($('html').hasClass('ie9')) {
                            $('.ui.search-form').unbind('click');
                            $('.ui.search-form').on('click', function () {
                                var $menu = $(this).find('.menu');
                                if($menu.hasClass('show')){
                                    $menu.removeClass('show');
                                    $menu.removeClass('visible');
                                    $menu.css({'display':'none'});
                                } else{
                                    $menu.addClass('show');
                                    $menu.addClass('visible');
                                    $('.ui.search-form').find('.menu').css({'display':'block'});
                                }
                            });
                        }

                        $searchWrapper.find('.search .search-field').change(function(){
                            window.location.href = destinationUrl + '?q=' + $(this).val();
                        });

                    }
                },
                error: function(){

                }
            });
        }
    }
})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';

    $('.blog-sidebar-nav').each(function(){
        var $this = $(this);
        var $contentWrapper = $('.blog-sidebar-nav').find('ul');
        var landingUrl = $this.data('blogsidebarlandingurl');
        var query = $this.data('blogsidebarquery');
        var cancerTopicBase = $this.data('cancertopicbasetagstring');
        var diseaseBase = $this.data('diseasebasetagstring');

        if(cancerTopicBase === undefined){
            cancerTopicBase = "/category/etc/tags/md-anderson/cancer-topics/"
        }
        if(diseaseBase === undefined){
            diseaseBase = "/category/etc/tags/md-anderson/diseases/";
        }



        if(APP.configs.isLocal){
            query = 'http://www.mdanderson.org' + query;
        }

        $.ajax({
            url: query,
            contentType: "xml",
            dataType: "xml",
            success: function (result) {

                //Convert the XML to JSON and parse it
                var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                //If the resutls are blank, show the no results text, otherwise show the results
                if (jsonResults.GSP.RES != undefined &&  jsonResults.GSP.RES.length != 0) {
                    if(jsonResults.GSP.RES && jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
                        if (!jsonResults.GSP.RES.PARM.PMT.length) {

                            var temp = jsonResults.GSP.RES.PARM.PMT;
                            jsonResults.GSP.RES.PARM.PMT = [];
                            jsonResults.GSP.RES.PARM.PMT.push(temp);

                        }
                        for (var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {
                            if(!jsonResults.GSP.RES.PARM.PMT[i].PV.length){
                                var temp = jsonResults.GSP.RES.PARM.PMT[i].PV;
                                jsonResults.GSP.RES.PARM.PMT[i].PV = [];
                                jsonResults.GSP.RES.PARM.PMT[i].PV.push(temp);

                            }

                            if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'cancer-topics'){
                                var $parent = $('<li class="parent-link"><a href="'+landingUrl+'">'+jsonResults.GSP.RES.PARM.PMT[i]['@DN']+'<i class="fa fa-minus dd-extended-icon"></i><i class="fa fa-plus dd-collapsed-icon"></i></a></a></li>');
                                $parent.appendTo($contentWrapper);
                                var $child = $('<div><ul class="child-level"></ul></div>');
                                $child.appendTo($parent);
                                $child = $child.find('ul');
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    $('<li><a href="'+landingUrl+cancerTopicBase+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].replace(new RegExp('[ ]{2,}', 'g'), ' ').replace(new RegExp(' ', 'g'), '-').toLowerCase()+'">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+' ('+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@C']+')</a></li>').appendTo($child);

                                }
                            }
                            if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'diseases'){
                                var $diseaseParent = $('<li class="parent-link"><a href="'+landingUrl+'">'+jsonResults.GSP.RES.PARM.PMT[i]['@DN']+'<i class="fa fa-minus dd-extended-icon"></i><i class="fa fa-plus dd-collapsed-icon"></i></a></a></li>');
                                $diseaseParent.appendTo($contentWrapper);
                                var $diseaseChild = $('<div><ul class="child-level"></ul></div>');
                                $diseaseChild.appendTo($diseaseParent);
                                $diseaseChild = $diseaseChild.find('ul');
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    $('<li><a href="'+landingUrl+diseaseBase+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].replace(new RegExp('[ ]{2,}', 'g'), ' ').replace(new RegExp(' ', 'g'), '-').toLowerCase()+'">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+' ('+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@C']+')</a></li>').appendTo($diseaseChild);
                                }
                            }
                        }

                        var pageUrl = window.location.href;
                        $contentWrapper.find('.child-level li').each(function(){
                            var $this = $(this);
                            var $anchor = $this.find('a');
                            if($anchor.attr('href').indexOf(pageUrl) > -1){
                                $anchor.addClass('active');
                                $this.closest('.parent-link').addClass('expanded');
                            }
                        });


                        $contentWrapper.find('.parent-link > a').on('click',function(e){
                            e.preventDefault();
                            e.stopPropagation();
                            var $this = $(this);
                            $this.closest('.parent-link').toggleClass('expanded');
                        })
                    }
                }
            }
        });
    });

})(jQuery);
(function(){

    var $table = $('.rte-container table');

    $table.each(function(){
        var $this = $(this);
        var hasHeaders = $this.find('th').length !== 0;
        if($this.find('th').length === 0){
            $table.attr('data-sorting','false');
            $this.find('tbody tr').first().find('td').each(function(){
                $(this).attr('data-breakpoints', 'xs');
            });
            $this.addClass('no-header');
        } else {
            var $thead = $('<thead><tr></tr></thead>').prependTo($this);
            $table.attr('data-sorting','true');
            $thead = $this.find('thead tr');

            $this.find('th').each(function(index){
                $(this).appendTo($thead);
            });
            $this.find('tbody tr').first().remove();
            $this.find('th').each(function(index){
                $(this).attr('data-breakpoints', 'xs');
            });
        }



        $this.addClass('table');



        $this.find('tbody tr').each(function(index){
            $(this).attr('data-expanded', 'true');

        });

        $this.footable({
            'getWidth': function(ft){
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
        });
        function addStyles() {
            if(!hasHeaders && (APP.configs.viewport.size === 'small' || APP.configs.viewport.size === 'xsmall')){
                $this.find('.footable-detail-row').each(function(index){
                    if(index % 2 !== 0){
                        $(this).addClass('odd')
                    }
                });
            } else{
                $this.find('tbody tr').each(function(index){
                    if(index % 2 !== 0){
                        $(this).addClass('odd')
                    }
                });
            }
        }
        addStyles();
        $this.on('click', 'th', function (index, value) {
            $this.find('tr').removeClass('odd');
            addStyles();
        })
    });

})();


APP.utils.xml2json = function(xml, tab){
    if(xml) {
        var X = {
            toObj: function (xml) {
                var o = {};
                if (xml.nodeType == 1) {   // element node ..
                    if (xml.attributes.length)   // element with attributes  ..
                        for (var i = 0; i < xml.attributes.length; i++)
                            o["@" + xml.attributes[i].nodeName] = X.escape((xml.attributes[i].nodeValue || "").toString());
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild = 0, cdataChild = 0, hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1) hasElementChild = true;
                            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                            else if (n.nodeType == 4) cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (var n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3)  // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4)  // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) {  // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    }
                                    else  // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            }
                            else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        }
                        else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                        else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n = xml.firstChild; n; n = n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                }
                else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                }
                else
                    alert("unhandled node type: " + xml.nodeType);
                return o;
            },
            toJson: function (o, name, ind) {
                var json = name ? ("\"" + name + "\"") : "";
                if (o instanceof Array) {
                    for (var i = 0, n = o.length; i < n; i++)
                        o[i] = X.toJson(o[i], "", ind + "\t");
                    json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                }
                else if (o == null)
                    json += (name && ":") + "null";
                else if (typeof(o) == "object") {
                    var arr = [];
                    for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                    json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                }
                else if (typeof(o) == "string")
                    json += (name && ":") + "\"" + o.toString() + "\"";
                else
                    json += (name && ":") + o.toString();
                return json;
            },
            innerXml: function (node) {
                var s = ""
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    var asXml = function (n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling)
                                    s += asXml(c);
                                s += "</" + n.nodeName + ">";
                            }
                            else
                                s += "/>";
                        }
                        else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c = node.firstChild; c; c = c.nextSibling)
                        s += asXml(c);
                }
                return s;
            },
            escape: function (txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },
            removeWhite: function (e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) {  // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        }
                        else
                            n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) {  // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    }
                    else                      // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;

        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    }
};
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */


(function($) {
    'use strict';

    $('.publication-subscribe .subscribe-cta').not('.external').on('click', function (event) {
        var formContainer = $(this).parent().parent().find('.subscribe-form-container');
        event.preventDefault();

        if (formContainer.hasClass('collapse')) {
            formContainer.slideDown('slow');

            formContainer.removeClass('collapse');
            formContainer.addClass('extended');
            $(this).find('.fa-minus').removeClass('hidden');
            $(this).find('.fa-plus').addClass('hidden');

        } else if (formContainer.hasClass('extended')) {
            formContainer.slideUp('slow');
            formContainer.addClass('collapse');
            formContainer.removeClass('extended');

            $(this).find('.fa-minus').addClass('hidden');
            $(this).find('.fa-plus').removeClass('hidden');

        } else {
            formContainer.slideDown('slow');
            formContainer.addClass('extended');
            formContainer.removeClass('collapse');


        }

    });

    $('.publication-subscribe-bar').each(function () {
        var formContainer = $(this);
        formContainer.find('.subscribe-cta').on('click',function(event){    
          
            event.preventDefault();

            if (formContainer.hasClass('collapse')) {
                formContainer.removeClass('collapse');
                formContainer.addClass('extended');
                $(this).find('.fa-minus').removeClass('hidden');
                $(this).find('.fa-plus').addClass('hidden');
                $('.subscribe-form-container').show();

            } else if (formContainer.hasClass('extended')) {
                formContainer.addClass('collapse');
                $('.subscribe-form-container').hide();
                formContainer.removeClass('extended');
                $(this).find('.fa-minus').addClass('hidden');
                $(this).find('.fa-plus').removeClass('hidden');
            } else {
                formContainer.addClass('extended');
                $('.subscribe-form-container').show();
                $(this).find('.fa-minus').removeClass('hidden');
                $(this).find('.fa-plus').addClass('hidden');
            }
        });


    });

    var submitToBronto = function(form) {
        var posted = $.post(form.attr('action'), form.serialize());
        var $formContainer = form.parent();
        posted.done(function(response){
            var error = $($.parseHTML(response)).filter('.warning');
            console.log(error);
            if (error.length) {
                $formContainer.find('.error-message').text($(error).text().trim());
                $formContainer.find('.error-message').show();
            } else {
                $formContainer.find('.success-message').show();
                $formContainer.addClass('success');
                form.hide();
                $formContainer.find('.error-message').hide();
            }
        });
    };

    $('.pub-subscribe-form').each(function(){
        $(this).submit(function(event) {
            event.preventDefault();
            submitToBronto($(this));

        });
    });

    $('.subscribe-form-container .input-group input').on('focus',function(){

        $(this).closest('.input-group').addClass('has-value');

    });

    $('.subscribe-form-container .input-group label').on('click',function(){

        $(this).closest('.input-group').addClass('has-value');
        $(this).closest('.input-group').find('input').focus();

    });

    $('.subscribe-form-container .input-group input').on('blur',function(){

        var text_val = $(this).val();

        if(text_val === "") {

            $(this).closest('.input-group').removeClass('has-value');

        } else {

            $(this).closest('.input-group').addClass('has-value');

        }

    });
    

})(jQuery);





/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
(function ($) {
    'use strict';

    $.fn.clinicalTrialsSearch = function(query, options) {
        var config = {
            page: 1,
            defaultPageSize: 4,
            searchResultTemplate : APP.templates.searchresult,
            predictiveValues : [],
            gotValues : false
        };
        var searchWrapper = $(this),
            searchForm = $(this),
            searchInput = searchWrapper.find('.search-field'),
            searchResults = searchWrapper.find('.search-results'),
            searchClear = $('.search-clear');

        searchWrapper.find('input').attr('autocomplete', 'off');
        if(APP.configs.isLocal){
            config.predictiveSearchUrl = 'http://dcdrlaemweb01.mdanderson.edu/' + searchWrapper.data('predictiveurl');
            config.dropdownUrl = 'http://dcdrlaemweb01.mdanderson.edu/' +searchWrapper.data('dropdownurl');
            window.searchResultsPageUrl = "/search-results.html?q="
        }else{
            config.predictiveSearchUrl = searchWrapper.data('predictiveurl');
            config.dropdownUrl = searchWrapper.data('dropdownurl');
            var searchResultsPageUrl = searchWrapper.data('searchresultspageurl');
        }

        if(query){
            config.predictiveSearchUrl = query;
            if(APP.configs.isLocal) {
                config.predictiveSearchUrl = 'http://dcdrlaemweb01.mdanderson.edu' + config.predictiveSearchUrl;
            }
        }

        //Clear the search results
        searchWrapper.on('clear', clearSearch);

        searchForm.submit(function (event) {
            event.preventDefault(); // stop the actual submit
            var searchTerm = searchForm.find('.search-field').val();
            if(searchTerm.length > 0 && (/[\S]+/g.test(searchTerm))){
                window.location.href = window.searchResultsPageUrl + searchTerm + '&searchType=' + 'clinical trials';
            } else{
                var errorCopy = 'Please enter a Physician, Treatment, or Cancer Type';
                if(searchWrapper.data('errorcopy')){
                    errorCopy = searchWrapper.data('errorcopy');
                }
                searchWrapper.find('.clinical-trials-search p').first().html(errorCopy);
            }

        });

        searchClear.on('click',clearSearch);

        searchInput.focus(function(){
            searchWrapper.addClass('focus');
        });

        searchInput.blur(function(){
            searchWrapper.removeClass('focus');
            if( $(this).val().length > 0 ) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
        });

        searchInput.keyup(function(e){
            var length = $.trim($(this).val()).length;
            if(length > 0) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
            // the below conditions are only used for demoing the predictive search
            if(e.keyCode < 38 || e.keyCode > 40){
                if(length>=3){
                    getSuggestedQueries($(this).val());
                } else {
                    clearSuggestions();
                }
            }
        });

        //Initialize dropdowns if they are on the page
        if(!searchWrapper.hasClass('search-results-search-bar') && searchWrapper.closest('.search-block').length === 0){
            initializeDropDowns();
        }

        /*
         * Get the suggested queries based with the provided URL
         */
        function getSuggestedQueries( query ){
            var suggestion = '&requiredfields=pagetype:clinical%20trial.diseases:*'+query+'*|Treatment:*'+query+'*|Physician:*'+query+'*|NCT_Number*'+query+'*';
            var facet;
            if(config.predictiveValues.length === 0 && config.gotValues === false){
                config.gotValues = true;
                $.ajax({
                    url: config.predictiveSearchUrl + suggestion,
                    contentType: "xml",
                    dataType: "xml",
                    success: function (result) {

                        var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                        if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0 || jsonResults.GSP.RES.PARM === undefined ||jsonResults.GSP.RES.PARM.PMT === undefined  ){
                            config.gotValues = false;
                        } else {
                            config.predictiveValues = [];
                            if(!jsonResults.GSP.RES.PARM.PMT.length){

                                var temp = jsonResults.GSP.RES.PARM.PMT;
                                jsonResults.GSP.RES.PARM.PMT = [];
                                jsonResults.GSP.RES.PARM.PMT.push(temp);

                            }

                            for (var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {

                                facet = jsonResults.GSP.RES.PARM.PMT[i];
                                if(!facet.PV.length){
                                    var temp = facet.PV;
                                    facet.PV = [];
                                    facet.PV.push(temp);

                                }

                                for(var j = 0; j < facet.PV.length; j++){
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace('_',' ');
                                    config.predictiveValues.push(facet.PV[j]['@V']);
                                }
                            }

                            getPredictiveValues(query);

                        }

                    }

                });
            } else{
                getPredictiveValues(query);

            }


        }


        function getPredictiveValues(query){
            var regex = new RegExp(query, 'i');
            var output = [];
            var j= 0;
            var tempResult;
            for(var i = 0; i < config.predictiveValues.length; i++){
                var item = config.predictiveValues[i];
                if(regex.test(item)){
                    output.push( {
                        label: item
                    });

                    j++;
                }
            }
            for(var i = 0; i < 4; i++){
                var value = output[i];


                if(value !== undefined){
                    value = value.label;

                    // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).html('<div role="option" id="' + value + '"><div data-actualval="'+value+'" class="suggestion-name">' + value + '</div></div>');
                    }else{
                        tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" id="' + value + '"><div data-actualval="'+value+'" class="suggestion-name">' + value + '</div></div></li>');
                        addPredictiveResult(tempResult);
                    }

                } else {
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).remove();
                    }
                }

            }
            addResultClickHandler();
        }

        function initializeDropDowns(){
            var types = 'Treatment|diseases|Physician';
            getDropDownValues(types);
        }


        function getDropDownValues(type){
            $.ajax({
                url: config.dropdownUrl + '&getfields=*&requiredfields=pagetype:clinical trial',
                contentType: "xml",
                dataType: "xml",
                success: function (result) {
                    var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                    if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0){

                    } else {
                        if(!jsonResults.GSP.RES.PARM.PMT.length){
                            var temp =jsonResults.GSP.RES.PARM.PMT;
                            jsonResults.GSP.RES.PARM.PMT = [];
                            jsonResults.GSP.RES.PARM.PMT.push(temp);
                        }
                        var physicianArray = [];

                        if(jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
                            for(var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'diseases'){
                                        $('<li><a href="#">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+'</a></li>').appendTo(searchWrapper.find('.cancer-type .mda-custom-dd-list').first());
                                    } else if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'physician'){
                                        //We must sort physicians based on last name
                                        var tempName = '';
                                        var tempNameArr = [];
                                        tempName = '';
                                        tempNameArr = jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].split(' ');
                                        tempName = tempNameArr[tempNameArr.length -1] + ',';
                                        for(var g = 0; g < tempNameArr.length -1; g++){
                                            tempName = tempName + ' ' + tempNameArr[g];
                                        }
                                        physicianArray.push(tempName);


                                    }else if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'treatment'){
                                        $('<li><a href="#">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+'</a></li>').appendTo(searchWrapper.find('.treatment .mda-custom-dd-list'));
                                    }
                                }
                            }
                            physicianArray.sort();
                            for(var i = 0; i < physicianArray.length; i++){
                                $('<li><a href="#">'+physicianArray[i]+'</a></li>').appendTo(searchWrapper.find('.physicians .mda-custom-dd-list'));
                            }

                            $('.cancer-type .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    searchInput.val($(this).text());
                                    searchForm.submit();
                                })
                            });

                            $('.treatment .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    searchInput.val($(this).text());
                                    searchForm.submit();
                                })
                            });

                            $('.physicians .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    var filterValue = '';
                                    var val = $(this).text();
                                    var valArray = val.split(' ');
                                    for(var i = 1; i < valArray.length; i++){
                                        if(valArray[i] !== ','){
                                            filterValue = filterValue + valArray[i] + ' ';
                                        }
                                    }
                                    filterValue = filterValue + valArray[0].replace(',','');
                                    searchInput.val(filterValue);
                                    searchForm.submit();
                                })
                            });
                        }
                    }
                }
            });
        }



        function addResultClickHandler(){
            if(APP.configs.isMobile.nullcheck()){
                searchWrapper.find('.suggestion-name').on('click', function(){
                    var $this = $(this);
                    searchInput.val($this.data('actualval'));
                    searchForm.submit();
                });
            } else{
                searchWrapper.find('.suggestion-name').on('mousedown', function(){
                    var $this = $(this);
                    searchInput.val($this.data('actualval'));
                    searchForm.submit();
                });
            }

        }

        function addPredictiveResult(result){
            result.appendTo(searchResults);
            setTimeout(function(){
                result.addClass('reveal');
            }, 80);
        }

        function removeResult(result){
            result.removeClass('reveal');

            var onEndTransFn = function( ev ) {
                this.removeEventListener( APP.utils.transEndEventName(), onEndTransFn );
                setTimeout(function(){
                    result.remove();
                }, 80);
            };

            if( Modernizr.csstransitions ) {
                result[0].addEventListener( APP.utils.transEndEventName(), onEndTransFn );
            }
            else {
                onEndTransFn.call();
            }
        }

        function clearSearch(){
            searchInput.val('');
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));
        }

        function clearSuggestions(searchTerm){
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));

        }


        /*
         * Key press events for up and down
         */

        searchInput.on('focus', function() {

        }).on('keydown', function(e) {
            var $selected = $('li.search-result.active');
            if (e.keyCode == 40) {
                if($selected == undefined || $selected.length == 0){
                    searchWrapper.find('li.search-result').first().addClass('active');
                    searchWrapper.find('.search-field').val($('li.search-result').first().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.next().addClass('active');
                    $('.search-field').val($selected.next().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.next().find('.suggestion-name').data('linkurl'));
                }
                return false;
            } else if (e.keyCode == 38) {
                if($selected == undefined || $selected.length == 0){
                    $('.search-field').val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.prev().addClass('active');
                    $('.search-field').val($selected.prev().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.prev().find('.suggestion-name').data('linkurl'));
                }
                return false;
            }
        });

        return this;
    };



    $('.clinical-trials-search-wrapper').each(function(){
        $(this).clinicalTrialsSearch();
    });

    $('.mda-custom-dd.clinical-trial-filter').each(function(){
        var $dropdown = $(this),
            $ddLink   = $dropdown.find('.mda-custom-dd-link'),
            $ddList   = $dropdown.find('.mda-custom-dd-list');
        $ddLink.on('click', function(e){
            e.preventDefault();
            var parent = $(e.target).parents('.clinical-trial-filter');
            $(parent).parent().siblings().find('.clinical-trial-filter').removeClass('extended');
            ($(parent).hasClass('extended'))  ? $(parent).removeClass('extended') : $(parent).addClass('extended');

        });
        $('body').on('click', function(e){
            if (!($(e.target).parents('.clinical-trial-filter').length > 0 || $(e.target).hasClass('.clinical-trial-filter'))) {
                $('.clinical-trial-filter').removeClass('extended');
            }
        })

    });


})(jQuery);
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


    $.fn.relatedResults = function(  options ) {
      var relatedResultsMostRecentQuery = $(this).attr('relatedResultsMostRecentQuery');
      var relatedStoryQueryString = $(this).attr('relatedStoryQueryString');
      if(APP.configs.isLocal){
        relatedResultsMostRecentQuery = 'https://www.mdanderson.org/search?site=mda_aem_prod&getfields=*&output=xml_no_dtd&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&client=publications_fe&requiredfields=pagetype:publication&num=5&partialfields';
      }

      var relatedResultsWrapper = $(this);

      var getRelatedResults = function (queryString, firstRun) {
        $.ajax({
          url: queryString,
          contentType: 'xml',
          dataType: 'xml',
          success: function (result) {
            //Convert the XML to JSON and parse it
            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

            //If the results are blank, fire a query for most recent, else fire a query
            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
              //If this is the first time we have checked, look for the most recent, otherwise there are no results for either scenario
              if(firstRun){
                getRelatedResults(relatedResultsMostRecentQuery, false);
              } else{
                //No results for related or most recent
                var $relatedResultsWrapper = relatedResultsWrapper.find('ul');
                $relatedResultsWrapper.empty();
              }
            } else {
              var relatedResultsTemplate;


              if(relatedResultsWrapper.data('relatedresultslisttype')){
                if(relatedResultsWrapper.data('relatedresultslisttype') == 'publication'){
                  relatedResultsTemplate = APP.Templates.related_posts_publication;
                } else if (relatedResultsWrapper.data('relatedresultslisttype') == 'blogs'){
                  relatedResultsTemplate =APP.Templates.related_posts_blogs;
                } else if(relatedResultsWrapper.data('relatedresultslisttype') == 'news'){
                  relatedResultsTemplate =APP.Templates.related_posts_news;
                } else{
                  relatedResultsTemplate =APP.Templates.related_posts_news;
                }
              } else{
                relatedResultsTemplate = APP.Templates.related_posts_publication;
              }
              var $relatedResultsWrapper = relatedResultsWrapper.find('ul');

              var resultSet = jsonResults.GSP.RES.R;
              var searchResult;
              if(!resultSet.length){
                var temp = resultSet;
                resultSet = [];
                resultSet.push(temp);
              }
              //clear placeholders from area
              $relatedResultsWrapper.empty();
              //For each result, pass it to the handlebar variable and append it to the search area
              var minResultLength = 1;
              for (var i = resultSet.length-1; i >= minResultLength; i--) {
                if (resultSet[i].U === window.location.href) {
                  minResultLength = 0;
                  continue;
                }
                searchResult = $(relatedResultsTemplate(resultSet[i]));
                searchResult.appendTo($relatedResultsWrapper);
              }

              var dateElement = $('.related-posts .publish-date');
              dateElement.each(function(){
                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";
                var from = $(this).text().split("-");
                $(this).text(month[from[1]-1] + ' ' + from[2].trim() + ', ' + from[0])
              });

              var titleElements = $('.related-posts .link-title');
              titleElements.each(function(){
                APP.utils.truncateText($(this),{xlarge: 50, large: 50, medium: 50, small: 50, xsmall: 50});
              });

              $('.related-posts .link-body').each(function(){
                var $this = $(this);
                $this.text($this.text().replace('Skip to Content. ...',''));
                $this.text($this.text().replace('Skip to Content.',''));
              });

            }

          }
        });
      };

      var getMetaData = function (metaName) {
        var metaResult = '';
        if ($("meta[name='" + metaName + "']").length > 0) {
          var metaContent = $("meta[name='" + metaName + "']").attr('content');
          if (metaContent.indexOf(',') >= 0 ) {
            metaContent = metaContent.split(',');
            $.each(metaContent, function (index, value) {
              metaResult += metaName + ':' + value + '|';
            })
          } else {
            metaResult = metaName + ':' + metaContent + '|';
          }
        }
        return metaResult;
      };

      var showRelatedPost = function () {
        var relatedResultsPageTag = '',
            publicationMetaDataValue = getMetaData('publication');
        relatedResultsPageTag += $.trim('partialfields=' + getMetaData('audience') + getMetaData('cancer-topics') +  getMetaData('diseases') + getMetaData('publication'));



        if (relatedResultsPageTag !== '') {
          relatedStoryQueryString += '&' + relatedResultsPageTag.slice(0, relatedResultsPageTag.length - 1);
          if(window.otherPostFilter !== undefined) {
            relatedStoryQueryString += window.otherPostFilter;
          }
          getRelatedResults(relatedStoryQueryString, true);
        } else {
          //load most recent
          if(window.otherPostFilter !== undefined)
            relatedResultsMostRecentQuery += window.otherPostFilter;

          getRelatedResults(relatedResultsMostRecentQuery, false);
        }
      };
      showRelatedPost();
      return this;
    };

    //Blog related-posts functionality
    $('.link-list.related-posts').each(function(){
      $(this).relatedResults();
    });


}( jQuery ));



/*
 * Generated on 01-29-2015
 *
 * Copyright (c) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  $(window).on('load', function () {

  	function removeHover() {
		var $toolbox = $('.addthis_sharing_toolbox .at-svc-compact');

	  	$toolbox.on('mouseover', function() {
	    	return false;
	    });
  	};

  	setTimeout(removeHover, 1000);

  });

})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


    if(APP.utils.getViewport().size === 'small' ||  APP.utils.getViewport().size === 'xsmall'){
        $('.rte-container').each(function(){
            if($(this).closest('.highlighted-text-box').length === 0){

                var $container = $(this);
                var maxCharCount = 500;
                var runningCharCount = 0;
                var moreButton = $('<div class="more cta"><a href="#" class="cta-block">More</a></div>');
                var lessButton = $('<div class="less cta"><a href="#" class="cta-block">Less</a></div>');
                var buttonAdded = false;
                $container.find('*').each(function(index){

                    if(runningCharCount > maxCharCount){
                        if(!buttonAdded && $(this).is('p')){
                            $(this).before(moreButton);
                            $container.append(lessButton);
                            $container.find('.less.cta a').hide();
                            buttonAdded = true;
                            $(this).hide();
                            $(this).addClass('extra-text');
                        } else if(buttonAdded){
                            $(this).hide();
                            $(this).addClass('extra-text');
                        }
                    }
                    if($(this).is('p')){
                        runningCharCount = runningCharCount + $(this).text().length;
                    }
                });
                $container.find('.more.cta a').on('click',function(e){
                    e.preventDefault();
                    $container.find('*').show();
                    $(this).hide();
                    $container.find('.less.cta a').show();
                });
                $container.find('.less.cta a').on('click',function(e){
                    e.preventDefault();
                    $container.find('*').show();
                    $(this).hide();
                    $container.find('.more.cta a').show();

                    $container.find('.extra-text').hide();

                })
            }
        });

        $('.table .cell-r .bcm-standalone-image').first().each(function(){
            var $this = $(this).find('.media-image');
            var $paragraph = $this.closest('.table').find('.cell-l .rte-container p').first();

            if($paragraph.length > 0){
                if($this.data('placeimagebelowtext') === undefined){
                    $paragraph.prepend($this.closest('.module'));
                } else if($this.data('placeimagebelowtext') === 'false'){
                    $paragraph.prepend($this.closest('.module'));
                }
            }

        })

    }

    function imageProperties() {
        $('.basic-text-image').each(function(){
            var $this = $(this);
            if($this.find('img').length > 0 && $this.find('.media-caption').length > 0){
                var width = $this.find('img').width();
                $this.find('.media-caption').css({'max-width':width})
                $this.find('.media h2').css({'max-width':width})
            }
        })
    }
    window.onload = function () {
        imageProperties();
    }





}( jQuery ));
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    $('.video-carousel').each(function(){
        var $container = $(this);
        var $moreButton = $container.find('.more.cta');
        var $lessButton = $container.find('.less.cta');
        var $groups = $container.find('.collection-group');
        var collapsedItems = 3;



        if(!$container.closest('.tabbed').length && APP.utils.getViewport().width <= APP.configs.views.small){
            $groups.slick({
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
        }

        if($container.closest('.tabbed')){
            $container.find('.tab-menu li').each(function(){
                $(this).attr('tabindex',0);
            });
        }
        if(APP.utils.getViewport().width > APP.configs.views.small){
            $groups.each(function(){
                var $items =$(this).find('.collection-item');
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).addClass('hidden');
                    }
                });
            });

            $moreButton.find('a').on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                $groups.each(function(){
                    var $group = $(this);
                    var $items =  $group.find('.collection-item');
                    $items.each(function(index){
                        if(index >= collapsedItems){
                            $(this).removeClass('hidden');
                        }
                    });

                });
                $moreButton.addClass('hidden');
                $lessButton.removeClass('hidden');
                var $nextTab = $container.find('.ui-state-active').find('a');
                var nextTabId = $nextTab.attr('href');
                if($(nextTabId).find('.collection-item')[3]){
                    $($(nextTabId).find('.collection-item')[3]).find('a').focus();
                }else if($container.find('.collection-item')[3]){
                    $($container.find('.collection-item')[3]).find('a').focus();
                }



            });

            $lessButton.find('a').on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                $groups.each(function(){
                    var $group = $(this);
                    var $items =  $group.find('.collection-item');
                    $items.each(function(index){
                        if(index >= collapsedItems){
                            $(this).addClass('hidden');
                        }
                    });

                });
                $moreButton.removeClass('hidden');
                $lessButton.addClass('hidden');
                var $nextTab = $container.find('.ui-state-active').find('a');
                var nextTabId = $nextTab.attr('href');
                if($(nextTabId).find('.collection-item')[2]){
                    $($(nextTabId).find('.collection-item')[2]).find('a').focus();
                } else if($container.find('.collection-item')[2]){
                    $($container.find('.collection-item')[2]).find('a').focus();
                }


            });
        }

        $groups.each(function(){
            var $this = $(this);
            if($this.find('.collection-item').length && $this.find('.collection-item').length <=3){
                $this.find('.more.cta').hide();
                $this.find('.less.cta').hide();
            }

            var $collectionItems = $this.find('.collection-item');
            var $collectionImages = $this.find('.collection-item a');
            $collectionItems.each(function(){
                var $item = $(this);
                var $title = $item.find('.body-title');
                var $desc = $item.find('.body-text');
                $item.data('fulltitle',$title.text());
                $item.data('fulldesc',$desc.text());

                APP.utils.truncateText($title,{xlarge: 50, large: 50, medium: 50, small: 50, xsmall: 50});
                APP.utils.truncateText($desc,{xlarge: 80, large: 80, medium: 80, small: 80, xsmall: 80});
            });

            $collectionImages.on('blur',function(){
                var $thisItem = $(this);
                var $itemContainer = $thisItem.closest('.collection-item');
                if($itemContainer.index() === $collectionItems.length - 1){
                    if($container.closest('.tabbed').length){
                        if($container.find('.ui-state-active').next()){
                            var $nextTab = $container.find('.ui-state-active').next().find('a');
                            var nextTabId = $nextTab.attr('href');
                            $nextTab.trigger('click');
                            $nextTab.focus();

                        }


                    }
                }
            });

            $collectionImages.on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                var $clickedItem = $(this);

                var videoAttributes = [];
                var videoTitles = [];
                var videoDescriptions = [];
                var galleryObjects = [];
                var startingIndex = 0;
                var foundStart = false;
                $collectionItems.not('.slick-cloned').each(function(index){
                    var data1 = $(this).find('.video-play-button').data('video-data')
                    var data2 = $clickedItem.find('.video-play-button').data('video-data');
                    if($(this).find('.video-play-button').data('video-data') === $clickedItem.find('.video-play-button').data('video-data') && !foundStart){
                        startingIndex = index;
                        foundStart = true;
                    }
                    if(!$(this).hasClass('slick-cloned')){
                        videoAttributes.push($(this).find('.video-play-button').data('video-data'));
                        videoTitles.push($(this).find('.body-title').text());
                        videoDescriptions.push($(this).find('.body-text').text());
                    }

                });
                var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                if(APP.configs.isLocal){
                    imageLocation = '/mda-web/images/MDACC_wide.jpg';
                }
                for(var i = 0; i < videoAttributes.length; i++){
                    if(videoAttributes[i].source === 'mediahub'){
                        galleryObjects.push({
                            src : imageLocation
                        })
                    } else{
                        galleryObjects.push({
                            src : imageLocation
                        })
                    }
                }

                if( APP.utils.getViewport().width > APP.configs.views.small){
                    startingIndex = $clickedItem.closest('.collection-item').index();
                }

                if(startingIndex === -1){
                    startingIndex = 0;
                } else if(startingIndex >= videoAttributes.length){
                    startingIndex = videoAttributes.length - 1;
                }

                var lightGallery = $('#yt-overlay-player');
                var hasDoneOpen = false;
                var currentIndex = 0;
                lightGallery.on('onCloseAfter.lg',function(event){
                    lightGallery.removeData();
                    lightGallery.unbind('onAfterOpen.lg');
                    $clickedItem.focus();
                    hasDoneOpen = false;
                }).on('onAfterOpen.lg',function(event){
                    $('.lg-close.lg-icon').focus();
                    if(videoAttributes[startingIndex].source === 'mediahub'){
                        insertMediahubVideo(startingIndex,getMediaHubObject(videoAttributes[startingIndex].sourceJson), videoTitles[startingIndex],videoDescriptions[startingIndex]);
                    } else{
                        insertYoutubeVideo(startingIndex,videoAttributes[startingIndex].id, videoTitles[startingIndex],videoDescriptions[startingIndex]);
                    }
                    hasDoneOpen = true;
                    var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                    $('.lg-outer').find('.lg').prepend(toolbar);

                    var prevButton = $('.lg-prev').wrap('<div class="lg-actions"></div>');
                    prevButton = prevButton.closest('.lg-actions');
                    prevButton = prevButton.detach();
                    $('.lg-toolbar').after(prevButton);
                    $('.lg-close').focus();

                }).on('onBeforeSlide.lg ',function(event,prevIndex,index){

                    if(videoAttributes[prevIndex].source === 'youtube'){
                        if(window.videoplayer !== undefined && window.videoplayer.getCurrentTime !== undefined){
                            utag.link({
                                time_viewed:window.videoplayer.getCurrentTime(),
                                video_name:window.videoplayer.getVideoData().title
                            })
                        }
                    }
                    $($('.lg-item')[index]).css({'opacity' : '0'});
                    if(hasDoneOpen){
                        if(videoAttributes[index].source === 'mediahub'){
                            insertMediahubVideo(index,getMediaHubObject(videoAttributes[index].sourceJson), videoTitles[index],videoDescriptions[index]);
                        } else{
                            insertYoutubeVideo(index,videoAttributes[index].id, videoTitles[index],videoDescriptions[index]);
                        }
                        if(videoAttributes[prevIndex].source === 'mediahub'){
                            var videoDiv = 'mediahubholder'+prevIndex;
                            jwplayer(videoDiv).stop();
                        }
                    }


                }).on('onAfterSlide.lg ',function(event,prevIndex,index){
                    currentIndex = index;
                    $($('.lg-item')[prevIndex]).find('iframe').remove();
                    $($('.lg-item')[prevIndex]).find('.jwplayer.lg-object').remove();

                    if(videoAttributes[index].source === 'mediahub'){
                    } else{
                        $($('.lg-item')[index]).css({'opacity' : '1'});
                    }

                }).on('onSlideItemLoad.lg',	function(event,index){
                    if(index === currentIndex){
                        if(videoAttributes[index].source === 'youtube'){
                            if($($('.lg-item')[index]).find('iframe').length === 0){
                                insertYoutubeVideo(index,videoAttributes[index].id, videoTitles[index],videoDescriptions[index]);
                            }
                        }
                    }

                }).lightGallery({
                    dynamic: true,
                    index: startingIndex,
                    preload: 10,
                    dynamicEl: galleryObjects,
                    counter : true
                });


            });


        });
    });

    function insertMediahubVideo(index, videoData, title, description){
        var $currentItem = $($('.lg-item')[index]);
        $currentItem.css({'opacity' : '0'});
        var width = '768';
        var height = '432';
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
            height = height/width * APP.utils.getViewport().width;
        }
        if($currentItem.find('.lg-img-wrap').length){

        } else{
            $currentItem.html('<div class="lg-img-wrap"></div>');
        }
        $currentItem.find('.lg-img-wrap').attr('id','mediahubholder'+index);
        var videoDiv = 'mediahubholder'+index;
        jwplayer(videoDiv).setup(videoData);
        var topOffSet = -1 * height/2;

        jwplayer(videoDiv).onReady(function(){
            $currentItem.first().find('.vid-title').remove();
            $currentItem.first().find('.vid-description').remove();
            $currentItem.first().append($('<p class="vid-title">'+title+'</p>'));
            $('<p class="vid-description">'+description+'</div>').appendTo($currentItem.first());
            $currentItem.first().find('.vid-title').css({'margin-top':(height/2 + 5)+'px'})

            $currentItem.find('.jwplayer').addClass('lg-object').css({ 'transform':'none','margin': topOffSet+'px auto','max-width' : $( window ).width()+'px', 'max-height':height, 'opacity':1});
            setTimeout(function(){
                $currentItem.find('.jwplayer').addClass('show-controls');
            }, 1000);
            $('#'+videoDiv+'_wrapper').addClass('lg-object').css({'transform':'none', 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px', 'max-height':height});
            $currentItem.find('.lg-object').css({'transform':'none'});
            $currentItem.css({'opacity' : '1'});
            $('#'+videoDiv).css({'opacity' : '1'});
            $('#'+videoDiv+'_wrapper').css({'opacity' : '1'});
            jwplayer(videoDiv).play();

        });


    }
    function insertYoutubeVideo(index, videoData, title, description){
        var $currentItem = $($('.lg-item')[index]);
        var width = '768';
        var height = '432';
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
            height = height/width * APP.utils.getViewport().width;
        }
        var topOffSet = -1 * height/2;
        $currentItem.find('.lg-img-wrap').html('<iframe id="player" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+videoData+'?enablejsapi=1&autoplay=1" frameborder="0" allowfullscreen></iframe>')

        $currentItem.first().find('.vid-title').remove();
        $currentItem.first().find('.vid-description').remove();
        $currentItem.find('.lg-img-wrap').first().find('iframe').first().after($('<p class="vid-description">'+description+'</div>'));
        $currentItem.find('.lg-img-wrap').first().find('iframe').first().after($('<p class="vid-title">'+title+'</p>'));
        $currentItem.find('.lg-img-wrap').first().find('.vid-title').css({'margin-top':(height/2 + 5)+'px'})


        if(window.onPlayerStateChange !== undefined && window.onPlayerReady !== undefined){
            window.videoplayer;
            for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;) {
                if (/youtube.com\/embed/.test(e[x].src)) {
                    window.videoplayer = new YT.Player(e[x], {
                        events: {
                            onStateChange: window.onPlayerStateChange,
                            onReady: window.onPlayerReady
                        }
                    });
                    YT.gtmLastAction = "p";
                }
            }
        }
        $currentItem.find('#player').css({'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
        $currentItem.css({'opacity' : '1'});

    }

    function getMediaHubObject(videoData){
        var description = '';
        var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
        var volume = '60';
        var videoSourcesPreferred = [];
        var videoSourcesBackup = [];
        var videoCaption = "";
        var manifestCount = 0;
        var width = '768';
        var height = '432';
        var aspectratio = '16:9';
        var videoSources;

        // Get description
        if(videoData.description !== undefined) {
            description = videoData.description
        }

        // Get poster
        if(videoData.poster !== undefined) {
            poster = videoData.poster
        }

        // Get volume
        if(videoData.audio_level !== undefined) {
            volume = videoData.audio_level
        }

        var hasVideos = false;


        // Get sources
        if(videoData.media) {
            var media = videoData.media;



            // Get preferred and backup sources
            for (var vid in media) {
                if(media[vid]['url']) {
                    var v_a = media[vid]['url'].split('.');
                    var v_ext = v_a[v_a.length - 1];
                    if (v_ext == 'mov' || v_ext == 'm4v' || v_ext == 'mp4' || v_ext == 'flv') {
                        hasVideos = true;
                    }
                    if (media.hasOwnProperty(vid)) {


                        if (media[vid].preferred) {
                            // Preferred source
                            videoSourcesPreferred.push({
                                'file': 'http://' + media[vid].url
                            });
                        } else {
                            // Backup source
                            var a = media[vid].url.split('.');
                            var ext = a[a.length - 1];
                            if (ext !== 'mp3') {
                                videoSourcesBackup.push({
                                    'file': 'http://' + media[vid].url
                                });
                            }
                        }
                    }
                }
            }

            if(!hasVideos){
                videoSourcesPreferred = []
                for (var vid in media) {
                    if (media[vid]['media_type'] === 'Encodedaudio' || media[vid]['media_type'] === 'Encoded audio') {
                        //To be replaced with global value
                        var isProd = true;
                        var v_url = '';

                        if (media[vid]['url'].indexOf('/mp3:') === -1 && media[vid].url.indexOf('/audio/') > -1) {
                            v_url =  media[vid]['url'].replace('/audio/', '/mp3:audio/').replace('.mp3', '');
                        } else {
                            v_url = media[vid]['url'].replace('/media/', '/mp3:media/').replace('.mp3', '');
                        }

                        if(isProd){
                            v_url = v_url.replace('dcswlflash.mdanderson.edu','media.mdanderson.org');
                        }
                        if(v_url.indexOf('stream-public') > -1){
                            videoSourcesPreferred.push({
                                'file': 'rtmp://' + v_url
                            });
                        } else{
                            videoSourcesPreferred.push({
                                'file': 'http://' + v_url.replace('mp3:','') + '.mp3'
                            });
                        }
                    }
                }
            }

            for (var vid in media) {
                // Check for Encoded Video
                if(media[vid]['media_type'] === 'Encoded video' || media[vid]['media_type'] === 'Encodedvideo') {
                    var v_a = media[vid].url.split('.');
                    var v_ext = v_a[v_a.length-1];
                    var r_ext = '';
                    if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                        r_ext = 'mp4:';
                    } else if(v_ext = 'flv') {
                        r_ext = 'flv:';
                    }

                    var v_url = '';

                    if(media[vid].url.indexOf('/vod/') > -1) {
                        v_url = 'rtmp://'+media[vid].url.replace('/media/','/'+r_ext+'media/');
                    } else {
                        var vv_url = 'rtmp://'+media[vid].url.replace('/video/','/'+r_ext+'video/');
                        v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                    }

                    videoSourcesPreferred.push({
                        'file':v_url
                    });
                    videoSourcesPreferred.push({
                        'file':'http://'+media[vid].url
                    });
                }

            }

            // Check for Encoded HLS Media
            if(media['Encoded HLS media']) {
                if(media['Manifest HLS'] && manifestCount < 1) {
                    videoSourcesPreferred.push({
                        'file':'http://'+media['Manifest HLS'].url
                    });
                    manifestCount++;
                }
                var m_a = media['Encoded HLS media'].url.split('.');
                var m_ext = m_a[m_a.length-1];
                if(m_ext === 'mov' || m_ext === 'm4v' || m_ext === 'mp4') {
                    m_ext = 'mp4'
                }
                var m_url = 'rtmp://'+media['Encoded HLS media'].url.replace('/media/','/'+m_ext+':media/');
                videoSourcesPreferred.push({
                    'file':m_url
                });
            }

            // Check for Encoded Video
            if(media['Encoded video']) {
                var v_a = media['Encoded video'].url.split('.');
                var v_ext = v_a[v_a.length-1];
                var r_ext = '';
                if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                    r_ext = 'mp4:';
                } else if(v_ext = 'flv') {
                    r_ext = 'flv:';
                }

                var v_url = '';

                if(media['Encoded video'].url.indexOf('/vod/') > -1) {
                    v_url = 'rtmp://'+media['Encoded video'].url.replace('/media/','/'+r_ext+'media/');
                } else {
                    var vv_url = 'rtmp://'+media['Encoded video'].url.replace('/video/','/'+r_ext+'video/');
                    v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                }

                videoSourcesPreferred.push({
                    'file':v_url
                });
                videoSourcesPreferred.push({
                    'file':'http://'+media['Encoded video'].url
                });
            }
            //Check for Caption

            for(var k in media) {
                if(media[k].media_type === 'Caption') {
                    videoCaption = "http://" + media[k].url;
                }
            }

        }

        videoSources = videoSourcesPreferred.concat(videoSourcesBackup);


        // If no sources
        if(videoSources.length < 1) {
            poster = 'http://media.mdanderson.org/poster/NotAvaliable_Default.jpg';
        }
        var base = '/etc/designs/mda/mda-web/jwplayer/';
        if(APP.configs.isLocal){
            base = '/mda-web/jwplayer/';
        }

        var outObject = {
            base: base,
            width: width,
            height: height,
            autoplay: true,
            aspectratio: aspectratio,
            skin: '/mdaSkin.xml',
            fallback: 'true',
            abouttext: 'MD Anderson Cancer Center',
            aboutlink: 'http://www.mdanderson.org/', sharing: { heading: 'Share MD Anderson Video'} ,
            logo: {
                file: '/etc/designs/mda/mda-web/images/spacer.png',
                hide: true
            },
            playlist: [{
                image: poster,
                description: description,
                tracks: [{
                    file: videoCaption,
                    label: "English",
                    kind: "captions",
                    "default": true
                }],
                sources: videoSources
            }],
            events: {
                onComplete: function() {
                    $('#video-overlay-player_wrapper').removeClass('fade-in');
                    $('#video-overlay-player_wrapper').addClass('fade-out');
                    $('#video-overlay').removeClass('fade-in');
                    $('#video-overlay').addClass('fade-out');
                    clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                }
            }

        }

        return outObject;
    }

})(jQuery);

var archive = (function (window, undefined) {
    'use strict';
    var $el = $('.conquest-archive');
    $(".sorting select").each(function(){
            $(this).wrap("<span class='select-wrapper'></span>");
            $(this).after("<span class='holder'></span>");
        });
    $(".sorting select").change(function(){
            var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
    }).trigger('change');
    var onSort = function () {
        var resultRow = $el.find('.archive-body');
        $el.find('.sorting').on('change', 'select', function (event) {
            var selectedValue = $(this).val();
            switch(selectedValue) {
                case 'showall':
                    resultRow.removeClass('hide');
                break;
                default :
                    $.each(resultRow, function (index, value) {
                        ($(value).hasClass(selectedValue)) ? $(value).removeClass('hide') : $(value).addClass('hide');
                    });
                break;
            }
        });
    }
    var init = function () {
        onSort();
    }
    return {
        init : init
    }
}(window, undefined)).init();
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    $('.image-gallery').each(function(){
        var $container = $(this);
        var $moreButton = $container.find('.more.cta');
        var $lessButton = $container.find('.less.cta');
        var $items = $container.find('.image-gallery-item');
        var collapsedItems = 3;
        if(APP.utils.getViewport().width <= APP.configs.views.small){
            collapsedItems = 4;
        }
        $items.each(function(index){
            if(index >= collapsedItems){
                $(this).addClass('hidden');
            }
        });

        if($items.length <= collapsedItems){
            $moreButton.addClass('hidden');
            $lessButton.addClass('hidden');
        } else{
            $moreButton.find('a').on('click',function(e){
                e.preventDefault();
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).removeClass('hidden');
                    }
                });
                $moreButton.addClass('hidden');
                $lessButton.removeClass('hidden');
                if($container.find('.image-gallery-item')[3]){
                    $($container.find('.image-gallery-item')[3]).focus();
                }


            });

            $lessButton.find('a').on('click',function(e){
                e.preventDefault();
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).addClass('hidden');
                    }
                });
                $moreButton.removeClass('hidden');
                $lessButton.addClass('hidden');
                if($container.find('.image-gallery-item')[2]){
                    $($container.find('.image-gallery-item')[2]).focus();
                }

            });

        }


        $items.on('click',function(e){
            e.preventDefault();
            var elements = [];
            var $clickedItem = $(this);
            var clickedIndex = $clickedItem.index();
            $items.each(function(index){
                var $thisItem = $(this);
                elements.push({
                    'src': $thisItem.data('imagepath'),
                    'subHtml': '<p class="lg-description">'+$thisItem.find('p').text()+'</p>'
                });
            });


            $container.on('onCloseAfter.lg',function(event){
                $container.removeData();
                $clickedItem.focus();
            }).on('onAfterOpen.lg',function(event){
                $('.lg-close.lg-icon').focus();
            }).lightGallery({
                dynamic: true,
                dynamicEl: elements,
                index: clickedIndex,
                appendSubHtmlTo: '.lg-img-wrap'
            });

        });

    });

})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var breadCrumb = (function (window, undefined) {
    var $el = $('ul.breadcrumbs'),
        $searchType = '';
    var getParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        url = url.toLowerCase(); // This is just to avoid case sensitiveness
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var _paintBreadCrumb = function () {
        var resultJSON = $el.find('.breadcrumb-json').data('attribute-breadcrumbjson'),
            list = '';

        $.each(resultJSON.breadCrumbInfo, function (index, value) {
            $.each(value.page, function (index, page) {
                if (page === $searchType) {
                    $.each($.parseJSON(value.data), function (key, data) {
                        list +="<li><a href="+data+" class='breadcrumb_arrow'>"+key+"</a></li>";
                    })
                }
            })
        });
        $el.html(list);
        $el.find('li:last-child a').replaceWith($('ul.breadcrumbs li:last-child a').text());
    };
    function init () {
        if ($el.length < 1 || $el.find('.breadcrumb-json').length < 1) {
            return;
        }
        $searchType = getParameterByName('searchtype');
        _paintBreadCrumb();

    }
    return {
        init : init
    };
}(window, undefined)).init();


/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    APP.GlossarySearch = (function (GlossarySearch) {
        var $searchWrapper = $('.glossary-search-wrapper');
        var $resultsWrapper = $('.glossary-search-results');
        var $dropdownMenu = $searchWrapper.find('.menu');
        var $dataObject = $searchWrapper.find('.glossary-search');
        var predictiveSearchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var searchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1000&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var additionalFilters = '';
        var dropdownTags = 'diseases,cancer-topics';
        var displayTag = 'diseases';
        var pageType = 'publication';
        var $resultsSection = $('.glossary-search-results .result-section');
        return GlossarySearch = {
            init : function(){
                predictiveSearchUrl = $dataObject.data('predictivequery');
                searchUrl = $dataObject.data('resultsquery');
                if($dataObject.data('dropdowntags') !== undefined){
                    dropdownTags = $dataObject.data('dropdowntags');

                }

                if($dataObject.data('pagetype') !== undefined){
                    pageType = $dataObject.data('pagetype');
                }
                if(APP.configs.isLocal){
                    predictiveSearchUrl = 'http://dcsrlaemweb01.mdanderson.edu/' + predictiveSearchUrl;
                    searchUrl = 'http://dcsrlaemweb01.mdanderson.edu/' + searchUrl;
                }

                if($searchWrapper.length > 0){
                    GlossarySearch.initSearchBox();
                    GlossarySearch.fetchSearchResults('');
                    GlossarySearch.initBrowseLetters();
                }

            },
            initSearchBox : function(){
                if($dataObject.data('predictivequery')){

                    $.ajax({
                        url: searchUrl ,
                        contentType: 'xml',
                        dataType: 'xml',
                        success: function (result) {
                            //Convert the XML to JSON and parse it
                            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));
                            var dropdownValues = [];

                            //If the resutls are blank, show the no results text, otherwise show the results
                            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                                //Do nothing if we have no results
                            } else {
                                var resultSet = jsonResults.GSP.RES.PARM;
                                var shouldPush = true;
                                var allResults = jsonResults.GSP.RES.R;
                                for(var i = 0; i < allResults.length; i++){
                                    if (!allResults[i].MT.length) {
                                        var temp = allResults[i].MT;
                                        allResults[i].MT = [];
                                        allResults[i].MT.push(temp);

                                    }
                                    for (var j = 0; j < allResults[i].MT.length; j++) {
                                        if(allResults[i].MT[j]['@N'] === 'og:title'){
                                            dropdownValues.push('ogtitle:' + allResults[i].MT[j]['@V'])
                                        }
                                    }
                                }

                                if(resultSet) {
                                    if (!resultSet.length) {
                                        var temp = resultSet;
                                        resultSet = [];
                                        resultSet.push(temp);

                                    }
                                    for (var i = 0; i < resultSet.length; i++) {
                                        if (!resultSet[i].PMT.length) {
                                            var temp = resultSet[i].PMT;
                                            resultSet[i].PMT = [];
                                            resultSet[i].PMT.push(temp);

                                        }
                                        var tempDropDownVal = '';
                                        shouldPush = true;
                                        var pageTitle = resultSet[i].T;

                                        for (var j = 0; j < resultSet[i].PMT.length; j++) {

                                            for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                                tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                                shouldPush = true;
                                                for (var q = 0; q < dropdownValues.length; q++) {
                                                    if (dropdownValues[q] === tempDropDownVal) {
                                                        shouldPush = false;
                                                    }
                                                }
                                                if (dropdownTags.indexOf(resultSet[i].PMT[j]['@NM']) === -1) {
                                                    shouldPush = false;
                                                }
                                                if (shouldPush) {
                                                    dropdownValues.push(tempDropDownVal);
                                                }
                                            }

                                        }

                                    }
                                }

                                dropdownValues.sort(function(a,b){
                                    var firstVal = a.substring(a.indexOf(':') + 1, a.length);
                                    var secondVal = b.substring(b.indexOf(':') + 1, b.length);
                                    if ( firstVal < secondVal)
                                        return -1;
                                    if ( firstVal > secondVal)
                                        return 1;
                                    return 0;

                                });

                                for (var i = 0; i < dropdownValues.length; i++) {
                                    $('<div class="item" data-value="' + GlossarySearch.escapeHtml(dropdownValues[i]) + '">' + dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length) + '</div>').appendTo($dropdownMenu);
                                }

                                /* Initialize Semantic UI Type Ahead Dropdown Selection */
                                $('.ui.search-form').dropdown({
                                    direction : 'downward',
                                    match: 'text'
                                });
                                if ($('html').hasClass('ie9')) {
                                    $('.ui.search-form').unbind('click');
                                    $('.ui.search-form').on('click', function () {
                                        var $menu = $(this).find('.menu');
                                        if($menu.hasClass('show')){
                                            $menu.removeClass('show');
                                            $menu.removeClass('visible');
                                            $menu.css({'display':'none'});
                                        } else{
                                            $menu.addClass('show');
                                            $menu.addClass('visible');
                                            $('.ui.search-form').find('.menu').css({'display':'block'});
                                        }
                                    });
                                }

                                $searchWrapper.find('.search .search-field').change(function(){
                                    GlossarySearch.fetchSearchResults($(this).val());
                                    $searchWrapper.find('.clear').show();
                                });

                                $searchWrapper.find('.clear').on('click',function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $searchWrapper.find('.ui.search-form').dropdown('clear');
                                    $(this).hide();
                                })

                            }
                        },
                        error: function(){

                        }
                    });
                }
            },
            escapeHtml : function(text) {
                return text.replace(/\./g, "%2E")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/&/g,'%26')
                    .replace(/%/g, "%25")
                    .replace('ogtitle','og%253Atitle');
            },
            initBrowseLetters : function(){
                $resultsWrapper.find('.browse-letter').on('click',function(e){
                    var $this = $(this);
                    if($this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if($this.hasClass('switch-num') && !$this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                        $resultsWrapper.find('.switch-num').hide();
                        $resultsWrapper.find('.switch-abc').show();
                        $resultsWrapper.find('.numbers').removeClass('hide');
                        $resultsWrapper.find('.letters').addClass('hide');
                        $resultsWrapper.find('.browse-text-letters').addClass('hide');
                        $resultsWrapper.find('.browse-text-numbers').removeClass('hide');
                        $resultsWrapper.find('.numbers').find('a').not('disabled').first().focus();


                    } else if($this.hasClass('switch-abc') && !$this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                        $resultsWrapper.find('.switch-abc').hide();
                        $resultsWrapper.find('.switch-num').show();
                        $resultsWrapper.find('.numbers').addClass('hide');
                        $resultsWrapper.find('.letters').removeClass('hide');
                        $resultsWrapper.find('.browse-text-letters').removeClass('hide');
                        $resultsWrapper.find('.browse-text-numbers').addClass('hide');
                        $resultsWrapper.find('.letters').find('a').not('disabled').first().focus();

                    }
                })
            },
            fetchSearchResults : function(filterValue){

                var resultsSearchQuery = searchUrl;
                if(filterValue.length > 0){
                    resultsSearchQuery = resultsSearchQuery + '.' + filterValue;
                }
                var resultsByLetter = {};
                $.ajax({
                    url: resultsSearchQuery ,
                    contentType: 'xml',
                    dataType: 'xml',
                    success: function (result) {
                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            //Do nothing if we have no results
                        } else {
                            var resultSet = jsonResults.GSP.RES.R;
                            if (!resultSet.length) {
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);
                            }
                            resultSet.sort(function(a,b){
                                var firstVal = a.T;
                                var secondVal = b.T;


                                if (firstVal < secondVal)
                                    return -1;
                                if (firstVal > secondVal)
                                    return 1;


                                return 0;

                            });


                            for (var i = 0; i < resultSet.length; i++) {
                                var firstLetter = resultSet[i].T.trim().substring(0,1).toUpperCase();
                                if(resultsByLetter[firstLetter] === undefined){
                                    resultsByLetter[firstLetter] = [];
                                }
                                resultsByLetter[firstLetter].push(resultSet[i]);
                            }
                            $resultsSection.html('');
                            $resultsWrapper.find('.browse-letter').not('.switch-num,.switch-abc').addClass('disabled');
                            var patt = new RegExp('[a-zA-Z]');
                            var hasLetter = false;
                            for (var key in resultsByLetter) {
                                if (resultsByLetter.hasOwnProperty(key)) {
                                    if(patt.test(key)){
                                        hasLetter = true;
                                        $resultsWrapper.find('.'+key).removeClass('disabled');
                                        GlossarySearch.generateLetterSection(key, resultsByLetter[key]);
                                    }
                                }
                            }
                            if(hasLetter === false){
                                $('.browse-letter.switch-abc').addClass('disabled');
                            } else{
                                $('.browse-letter.switch-abc').removeClass('disabled');
                            }


                            var patt = new RegExp('[0-9]');
                            var hasNumber = false;
                            for (var key in resultsByLetter) {
                                if (resultsByLetter.hasOwnProperty(key)) {
                                    if(patt.test(key)){
                                        hasNumber = true;
                                        $resultsWrapper.find('.'+key).removeClass('disabled');
                                        GlossarySearch.generateLetterSection(key, resultsByLetter[key]);
                                    }
                                }
                            }
                            if(hasNumber === false){
                                $('.browse-letter.switch-num').addClass('disabled');
                            } else{
                                $('.browse-letter.switch-num').removeClass('disabled');
                            }

                            $('.scroll-trans').each(function () {
                                $(this).scrollTransition();
                            });


                        }
                    },
                    error: function(){

                    }
                });
            },
            generateLetterSection : function(letter, items){
                var $letterSectionTemplate =  APP.Templates.glossary_search_letter_section;
                var $resultTemplate =  APP.Templates.glossary_search_template;
                var $currentLetterSection = $($letterSectionTemplate({'letter' : letter}));
                var leftLimit = Math.ceil(items.length/2);
                if($dataObject.data('displaytag') !== undefined){
                    displayTag = $dataObject.data('displaytag');
                }
                if($resultsSection.length > 0){
                    var $leftSection = $currentLetterSection.find('.item-container-first');
                    var $rightSection = $currentLetterSection.find('.item-container-last');
                    var $currentResult;
                    for(var i = 0; i < items.length; i++){
                        items[i]['displaytag'] = displayTag;
                        if(items[i].MT && items[i].MT.length === undefined){
                            var temp = items[i].MT;
                            items[i].MT = [];
                            items[i].MT.push(temp);
                        }
                        $currentResult = $($resultTemplate(items[i]));
                        if(i%2 === 0){
                            $currentResult.appendTo($leftSection);
                        } else{
                            $currentResult.appendTo($rightSection);
                        }
                    }
                    $currentLetterSection.appendTo($resultsSection);
                }
            }
        }
    })(APP.GlossarySearch || {});


})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var generated_link_list = (function (window, undefined) {
    var $el = $('.link-list-body');

    var generateQuery = function (linkListBody) {
        var searchQuery = new Array();

        if(APP.configs.isLocal){
             $(linkListBody).each(function(i){
                searchQuery.push('http://d1prlaemweb01.mdanderson.edu'+ $(linkListBody).eq(i).data('attribute-query'));
            })
        }else {
            $(linkListBody).each(function(i){
                searchQuery.push($(linkListBody).eq(i).data('attribute-query'));
            })
        }
        for (var i = 0; i <= searchQuery.length; i++) {
            if($(linkListBody).eq(i).data('attribute-style') !=undefined){
                 getGSAResults(linkListBody, searchQuery[i], i, true);
            }
            else{
                 getGSAResults(linkListBody, searchQuery[i], i, null);
            }
        }
    }
    var getGSAResults = function (linkListBody, queryString, queryLenth, queryStyle ) {
        $.ajax({
            url: queryString,
            contentType: 'xml',
            dataType: 'xml',
            success: function (result) {
                var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {

                } else {
                    var handleBarTemplate = APP.Templates.generated_linked_list;
                    var $domWrapper = '';

                    if(queryStyle) {
                        $(linkListBody).eq(queryLenth).find('ul').addClass('linked-list-border');
                        $domWrapper = $(linkListBody).find('ul.linked-list-border')

                    }
                     else {

                         $domWrapper = $(linkListBody).find('ul').eq(queryLenth);
                     }

                    var resultSet = jsonResults.GSP.RES.R;
                    var searchResult;
                    if(!resultSet.length){
                        var temp = resultSet;
                        resultSet = [];
                        resultSet.push(temp);
                    }
                    $domWrapper.empty();

                    for (var i = 0; i < resultSet.length; i++) {
                        searchResult = $(handleBarTemplate(resultSet[i]));
                        searchResult.appendTo($domWrapper);
                    }
                }

            }
        });
    };
    var init = function (argument) {
        $.each($el, function (index, value) {
            generateQuery(value);
        })
    }
    return {
        init : init
    }
}(window, undefined)).init();
