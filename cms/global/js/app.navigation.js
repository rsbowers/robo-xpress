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