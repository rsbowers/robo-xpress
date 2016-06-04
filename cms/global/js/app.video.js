/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */


var videoManager = (function (window, undefined) {
    var $el = $('.media-player').not('.media-single-small');

    var _slickIt = function (selector) {
        $(selector).slick();
    }
    var _addClickHandlers = function (elem) {
        elem.find('.media-option').each(function(){
            if($(this).find('.video-play-button').length > 0){
                $(this).on('click',function(e){
                    e.preventDefault();
                });

                $(this).each(function(){
                    $(this).mdaJWPlayer( true );
                });
            }
        });
    }
    var _resetHeights = function (elem) {
        elem.find('.media-matrix').removeAttr('style');
        elem.find('.media-options').removeAttr('style');
    }
    var _resetControls = function (elem, slick) {
        elem.find('#mg-left').click(function (event) {
            event.preventDefault();
            $(slick).slickPrev();
        });

        elem.find('#mg-right').click(function (event) {
            event.preventDefault();
            $(slick).slickNext();
        });
    }
    var _clearVideoItems = function (elem) {
        elem.find('.media-options').unslick();
        elem.find('.media-matrix').unslick();
        elem.find('.media-option').remove();
        elem.find('.media-item').remove();
    }
    var _toggleClickHandler = function () {
        $el.on('click', '#mg-toggle-mg-type', function (event) {
            event.preventDefault();
            var slidesToShow = 3,
                slidesToScroll = 0;
            var self = $(this);
            var parent = self.parents('.media-player'),
                mediaMatrix = parent.find('.media-matrix'),
                mediaOptions = parent.find('.media-options');
                mediaList = parent.find('.media-option').not('.slick-cloned').clone();

            if (!mediaMatrix.hasClass('show')) {
                $('#mg-toggle-mg-type').addClass('grid');
                mediaMatrix.addClass('show');
                setTimeout(function () {
                    var count = 0;
                    var container;
                    mediaMatrix.addClass('show');
                    _clearVideoItems(parent);
                    for (var i = 0; i < mediaList.length; i++) {
                        var mediaOption = mediaList[i];
                        count++;
                        if (count === 1) {
                            container = $('<div />', {
                                'class': 'media-item'
                            });
                            container.append(mediaOption);
                        } else if (count === 2) {
                            count = 0;
                            container.append(mediaOption);
                            mediaMatrix.append(container);
                        }

                        if(count === 1 && i === mediaList.length -1){
                            container.append(mediaOption);
                            mediaMatrix.append(container);
                        }

                    }

                    mediaMatrix.slick({
                        slidesToShow: slidesToShow,
                        slidesToScroll: slidesToScroll,
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
                    });
                    _resetControls(parent, mediaMatrix);
                    mediaMatrix.addClass('matrixify');
                    mediaOptions.css({'display': 'none'});//removes arrows in grid view
                    _addClickHandlers(parent);
                }, 550);
            } else {
                $('#mg-toggle-mg-type').removeClass('grid')
                mediaMatrix.removeClass('show');
                _clearVideoItems(parent)
                mediaOptions.append(mediaList);
                _resetHeights(parent);
                _slickIt(mediaOptions);
                _addClickHandlers(parent);
                _resetControls(parent, mediaOptions);
            }

        })
    }
    var _initialize = function () {
        var playerMediaOptions = $el.find('.media-options');
        if ($(playerMediaOptions).length > 0) {
            _slickIt(playerMediaOptions);
            _resetControls($el, playerMediaOptions);
        }
        _toggleClickHandler();
    }
    var init = function (argument) {
        if ($el.length > 0) {
            _initialize();
        }
    }
    return {
        init : init
    }
}(window, undefined)).init();