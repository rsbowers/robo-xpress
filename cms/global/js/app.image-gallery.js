/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    $('.image-gallery').each(function(){
        var $container = $(this);
        var $moreButton = $container.find('.more.cta');
        var $lessButton = $container.find('.less.cta');
        var $items = $container.find('.image-gallery-item');
        var collapsedItems = 3;
        if(APP.utils.getViewport().width <= APP.configs.views.small){
            collapsedItems = 4;
        }
        $items.each(function(index){
            if(index >= collapsedItems){
                $(this).addClass('hidden');
            }
        });

        if($items.length <= collapsedItems){
            $moreButton.addClass('hidden');
            $lessButton.addClass('hidden');
        } else{
            $moreButton.find('a').on('click',function(e){
                e.preventDefault();
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).removeClass('hidden');
                    }
                });
                $moreButton.addClass('hidden');
                $lessButton.removeClass('hidden');
                if($container.find('.image-gallery-item')[3]){
                    $($container.find('.image-gallery-item')[3]).focus();
                }


            });

            $lessButton.find('a').on('click',function(e){
                e.preventDefault();
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).addClass('hidden');
                    }
                });
                $moreButton.removeClass('hidden');
                $lessButton.addClass('hidden');
                if($container.find('.image-gallery-item')[2]){
                    $($container.find('.image-gallery-item')[2]).focus();
                }

            });

        }


        $items.on('click',function(e){
            e.preventDefault();
            var elements = [];
            var $clickedItem = $(this);
            var clickedIndex = $clickedItem.index();
            $items.each(function(index){
                var $thisItem = $(this);
                elements.push({
                    'src': $thisItem.data('imagepath'),
                    'subHtml': '<p class="lg-description">'+$thisItem.find('p').text()+'</p>'
                });
            });


            $container.on('onCloseAfter.lg',function(event){
                $container.removeData();
                $clickedItem.focus();
            }).on('onAfterOpen.lg',function(event){
                $('.lg-close.lg-icon').focus();
            }).lightGallery({
                dynamic: true,
                dynamicEl: elements,
                index: clickedIndex,
                appendSubHtmlTo: '.lg-img-wrap'
            });

        });

    });

})(jQuery);
