/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var social_feed = (function (window, undefined) {
    var paintSocialFeedDom = function (json, that) {        
        var jsonData = JSON.parse(json),
            jsonData = jsonData['social-feed-example'].data;
        if (jsonData.items < 1) return;
        $(that).find('.social-feed-heading').find('h3').text(jsonData.title);
        var listContainer = $(that).find('.social-feed-body').find('ul');
        $.each(jsonData.items, function (index, value) {
            var newList = '<li class="feed">' +
                                '<a target="_blank" href="'+value.url+'">' +
                                    '<img src="'+value.image+'" class="mda-hide-sm">' +
                                    '<i class="fa fa-'+value.feed_icon+' feed-icon"></i>' +
                                    '<h4 class="feed-title">'+value.title+'</h4>' +
                                    '<p class="feed-body">'+value.description+'</p>' +
                                '</a>' +
                            '</li>';
            $(listContainer).append(newList);
        });
        var ctaLink = $(that).find('.social-feed-cta').find('.cta a');
        $(ctaLink).attr({
            'href' : jsonData.cta.cta_url,
            'target': jsonData.cta.cta_target
        }).text(jsonData.cta.cta_text).append('<i class="fa">'); 
        if ( $(ctaLink).attr('target') == '_blank')  {
            $(ctaLink).find('i').addClass('mda-icon-linkout').removeClass('mdicon-arrow');
         }
         else{
            $(ctaLink).find('i').addClass('mdicon-arrow').removeClass('mda-icon-linkout');
         }
    };
    var getJSON = function (feedUrl, that) {
        $.ajax({
            url : feedUrl,
            method : 'get',
            dataType: 'text',
            success : function (response) {
                if(response){
                  paintSocialFeedDom(response, that);
                }
            }
        });
    };
    function init() {
        var socialFeedComponents = '' || $('.social-feed');
        if (socialFeedComponents == '') return;
        $.each(socialFeedComponents, function(index, value) {
            $(value).parent().removeClass('hidden');
            getJSON($(value).data('url'), this);
        });
    };
    return {
        init : init
    };
}(window, undefined)).init();