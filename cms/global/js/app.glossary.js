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
