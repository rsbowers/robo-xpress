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