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

