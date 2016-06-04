/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 *
 *
 *
 */

$(function () {
'use strict';

    var $mediaImage = $('.basic-content-media-wrapper').find('.media-image'),
        $textImage = $('.basic-text-image').find('.media');

    $($mediaImage).each(function () {
        showModal(this);
    });

    $($textImage).each(function () {
        showModal(this);
    });

    function showModal (that) {
        var $this = $(that);
        if ($this.data('showmodal') && $this.data('showmodal') === true) {
            var imagePath = $this.data('imagepath');
            if(imagePath.indexOf('.resize') <= -1) {
                imagePath += '.resize.jpg';
            }
            $this.on('click',function () {

                var $container = $('#yt-overlay-player');

                var elements = [{
                    'src': imagePath,
                    'subHtml': '<p class="lg-description">'+$this.closest('.basic-content-media-wrapper').find('.media-caption').first().text()+'</p>'
                }];

                $container.on('onCloseAfter.lg',function(event){
                    $container.removeData();
                }).lightGallery({
                    dynamic: true,
                    dynamicEl: elements,
                    appendSubHtmlTo: '.lg-img-wrap'
                });

            });
        }
    }
});