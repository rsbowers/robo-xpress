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

