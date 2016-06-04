/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


    if(APP.utils.getViewport().size === 'small' ||  APP.utils.getViewport().size === 'xsmall'){
        $('.rte-container').each(function(){
            if($(this).closest('.highlighted-text-box').length === 0){

                var $container = $(this);
                var maxCharCount = 500;
                var runningCharCount = 0;
                var moreButton = $('<div class="more cta"><a href="#" class="cta-block">More</a></div>');
                var lessButton = $('<div class="less cta"><a href="#" class="cta-block">Less</a></div>');
                var buttonAdded = false;
                $container.find('*').each(function(index){

                    if(runningCharCount > maxCharCount){
                        if(!buttonAdded && $(this).is('p')){
                            $(this).before(moreButton);
                            $container.append(lessButton);
                            $container.find('.less.cta a').hide();
                            buttonAdded = true;
                            $(this).hide();
                            $(this).addClass('extra-text');
                        } else if(buttonAdded){
                            $(this).hide();
                            $(this).addClass('extra-text');
                        }
                    }
                    if($(this).is('p')){
                        runningCharCount = runningCharCount + $(this).text().length;
                    }
                });
                $container.find('.more.cta a').on('click',function(e){
                    e.preventDefault();
                    $container.find('*').show();
                    $(this).hide();
                    $container.find('.less.cta a').show();
                });
                $container.find('.less.cta a').on('click',function(e){
                    e.preventDefault();
                    $container.find('*').show();
                    $(this).hide();
                    $container.find('.more.cta a').show();

                    $container.find('.extra-text').hide();

                })
            }
        });

        $('.table .cell-r .bcm-standalone-image').first().each(function(){
            var $this = $(this).find('.media-image');
            var $paragraph = $this.closest('.table').find('.cell-l .rte-container p').first();

            if($paragraph.length > 0){
                if($this.data('placeimagebelowtext') === undefined){
                    $paragraph.prepend($this.closest('.module'));
                } else if($this.data('placeimagebelowtext') === 'false'){
                    $paragraph.prepend($this.closest('.module'));
                }
            }

        })

    }

    function imageProperties() {
        $('.basic-text-image').each(function(){
            var $this = $(this);
            if($this.find('img').length > 0 && $this.find('.media-caption').length > 0){
                var width = $this.find('img').width();
                $this.find('.media-caption').css({'max-width':width})
                $this.find('.media h2').css({'max-width':width})
            }
        })
    }
    window.onload = function () {
        imageProperties();
    }





}( jQuery ));