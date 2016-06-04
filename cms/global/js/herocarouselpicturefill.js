/*
 * Adobe Systems Incorporated
 * Modified: October 30th, 2012
 *
 * Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs).
 * Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2
 *
 */

(function ($, w) {

    // Enable strict mode
    'use strict';

    w.herocarouselpicturefill = function (context) {
        var undefined;
        if (context === undefined) {
            context = $('body');
        }

        $('div[data-herocarouselpicture]', context).each(function () {
            var currentPicture = this;
            var matches = [];
            var retina = false;
            
            if (w.matchMedia) {
                var rt = w.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                retina = (rt && rt.matches || (w.devicePixelRatio > 1)); 
            }

            $('div[data-media]', currentPicture).each(function () {
                var media = $(this).attr('data-media');
                var src = $(this).attr('data-src');
                var src2x = $(this).attr('data-src-2x');
                if(retina && typeof src2x !== typeof undefined && src2x !== false) {
                    src = src2x;
                }
                if (!media || ( w.matchMedia && w.matchMedia(media).matches )) {
                    matches.push(src);
                }
            });

            var $picImg = $('div.carousel-image', currentPicture).first();

            if (matches.length) {
                if ($picImg.size() === 0) {
                    var $currentPicture = $(currentPicture);
                }
                $picImg.attr('style', matches.pop());
            } else {
                $picImg.remove();
            }
        });
    };

    // Run on debounced resize and domready
    $(function () {
        w.herocarouselpicturefill();
    });

    $(w).on('debouncedresize', function () {
        w.herocarouselpicturefill();
    });

}(jQuery, this));