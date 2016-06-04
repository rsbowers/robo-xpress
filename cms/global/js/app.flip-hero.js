;(function () {
	'use strict';

    var $flipTiles = $('.flip-tile');
    var $flipTilesNotVid = $('.flip-tile').not('.video-hover');
    function shouldFlip() {
        var b = true;
        $('.flip-tile').each(function() {
            if ($(this).is(':hover') || $('html').hasClass('applyflip')) {
                b = false;
            }
        });
        if(!b) {
            $flipTiles.removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
        }
        return b;
    }

    if($flipTiles.length > 0) {
        if($('html').hasClass('ie10') || $('html').hasClass('ie9') || $('html').hasClass('lt-ie9') || $('html').hasClass('ie11')) {
            var flipTimer = setTimeout(shorterFlipIE, 10000);
        } else {
            var flipTimer = setTimeout(shorterFlip, 10000);
        }
    }

    function shorterFlipIE(){
        var flipTimer = setInterval(randomFlipIE, 3000);
    }

    function shorterFlip(){
        var flipTimer = setInterval(randomFlip, 3000);
    }

    function randomFlip() {
        if(shouldFlip()) { 
            $flipTilesNotVid.removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');;
            $($flipTilesNotVid[Math.floor(Math.random()*$flipTilesNotVid.length)]).addClass('applyflip');
        }
        
    }

    $('.flip-hero .flip-tile').on('mouseenter',function(){ 
        $('.flip-hero .flip-tile').not($(this)).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
    });


    function randomFlipIE() {
        if(shouldFlip()) {
            $flipTilesNotVid.each(function() {
                if (!$(this).is(':hover')) {
                    $(this).removeClass('applyflip').removeClass('randactive');
                }
            });
            $($flipTilesNotVid[Math.floor(Math.random()*$flipTilesNotVid.length)]).addClass('applyflip').addClass('randactive');
        }
    }

    $flipTiles.each(function(){
        var $this = $(this);
        if($this.find('a').length > 0 && !APP.configs.isMobile.nullcheck()){
            $this.find('a').on('click',function(e){
                e.stopPropagation();
                if(!$this.hasClass('applyflip') && !$this.hasClass('touched') && !$this.hasClass('active') && (!$this.is(':hover') || APP.configs.isMobile.nullcheck() )){
                    e.preventDefault();
                    if($this.find('div.video-play-button').length > 0){
                        $this.mdaJWPlayer( true );
                    }
                    $(this).closest('.flip-tile').addClass('active');
                    $(this).closest('.flip-tile').addClass('touched');
                    $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                } else{
                    $this.find('div.video-play-button').trigger('customPlayer',["triggered"]);
                    $(this).closest('.flip-tile').removeClass('active');
                    $(this).closest('.flip-tile').removeClass('touched');
                }
            });
        } else{
            if($this.find('a').length > 0 ){
                $this.find('a').on('touchend',function(e){
                    if(!$this.hasClass('applyflip') && !$this.hasClass('touched') && !$this.hasClass('active')){
                        e.stopPropagation();
                        e.preventDefault();
                        if($this.find('div.video-play-button').length > 0){
                            $this.mdaJWPlayer( true );
                        }
                        $(this).closest('.flip-tile').addClass('active');
                        $(this).closest('.flip-tile').addClass('touched');
                        $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                    } else{
                        if($this.find('div.video-play-button').length > 0){
                            e.stopPropagation();
                            e.preventDefault();
                            $this.find('div.video-play-button').trigger('customPlayer',["triggered"]);
                        }
                        $(this).closest('.flip-tile').removeClass('active');
                        $(this).closest('.flip-tile').removeClass('touched');
                    }
                });
            } else{
                $(this).on('touchend',function(e){
                    if(!$(this).hasClass('applyflip') && !$(this).hasClass('touched') && !$(this).hasClass('active')){
                        e.stopPropagation();
                        e.preventDefault();
                        if($this.find('div.video-play-button').length > 0){
                            $this.mdaJWPlayer( true );
                        }
                        $(this).closest('.flip-tile').addClass('active');
                        $(this).closest('.flip-tile').addClass('touched');
                        $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                    } else{
                        e.stopPropagation();
                        e.preventDefault();
                        $this.find('.video-play-button').trigger('click',["triggered"]);
                        $(this).closest('.flip-tile').removeClass('active');
                        $(this).closest('.flip-tile').removeClass('touched');
                    }
                });
            }

        }

    });

    //--------------------------------------------------
    //  Flip hero IE
    //--------------------------------------------------
    if($('html').hasClass('ie9') || $('html').hasClass('lt-ie9') || $('html').hasClass('ie11')) {
        $('.flip-tile').on('mouseenter', function(){
            if(!$(this).hasClass('randactive') ||  !$(this).hasClass('applyflip')) {
                $(this).toggleClass('applyflip');
            }
        }).on('mouseleave', function(){
            if(!$(this).hasClass('randactive')) {
                $(this).toggleClass('applyflip');
            }
        });
    }

	//--------------------------------------------------
    //  Flip hero alternate color
    //--------------------------------------------------
    var paintFlipHero = function (item) {
        var patients_tile = item.find('.flip-row .patient');
    	var others_tile = item.find('.flip-row .other');
    	$.each($(patients_tile), function (rowIndex, rowValue) {
    		switch (rowIndex % 3) {
                case 0:
                    $(rowValue).addClass('tan');
                break;
                case 1:
                    $(rowValue).addClass('white');
                break;
                case 2:
                    $(rowValue).addClass('black');
                break;
            }
    	});
        $.each($(others_tile), function (rowIndex, rowValue) {
            switch (rowIndex % 2) {
                case 0:
                    $(rowValue).addClass('blue');
                    break;
                case 1:
                    $(rowValue).addClass('red');
                    break;
            }
        });

    }
    $.each($('.flip-hero'), function (index, value) {
    	var self = $(value);
        paintFlipHero(self);
    })
}());