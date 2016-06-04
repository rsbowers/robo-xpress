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
