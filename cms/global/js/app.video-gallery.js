/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    $('.video-carousel').each(function(){
        var $container = $(this);
        var $moreButton = $container.find('.more.cta');
        var $lessButton = $container.find('.less.cta');
        var $groups = $container.find('.collection-group');
        var collapsedItems = 3;



        if(!$container.closest('.tabbed').length && APP.utils.getViewport().width <= APP.configs.views.small){
            $groups.slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: '.collection-item',
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                adaptiveHeight: false
            });
        }

        if($container.closest('.tabbed')){
            $container.find('.tab-menu li').each(function(){
                $(this).attr('tabindex',0);
            });
        }
        if(APP.utils.getViewport().width > APP.configs.views.small){
            $groups.each(function(){
                var $items =$(this).find('.collection-item');
                $items.each(function(index){
                    if(index >= collapsedItems){
                        $(this).addClass('hidden');
                    }
                });
            });

            $moreButton.find('a').on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                $groups.each(function(){
                    var $group = $(this);
                    var $items =  $group.find('.collection-item');
                    $items.each(function(index){
                        if(index >= collapsedItems){
                            $(this).removeClass('hidden');
                        }
                    });

                });
                $moreButton.addClass('hidden');
                $lessButton.removeClass('hidden');
                var $nextTab = $container.find('.ui-state-active').find('a');
                var nextTabId = $nextTab.attr('href');
                if($(nextTabId).find('.collection-item')[3]){
                    $($(nextTabId).find('.collection-item')[3]).find('a').focus();
                }else if($container.find('.collection-item')[3]){
                    $($container.find('.collection-item')[3]).find('a').focus();
                }



            });

            $lessButton.find('a').on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                $groups.each(function(){
                    var $group = $(this);
                    var $items =  $group.find('.collection-item');
                    $items.each(function(index){
                        if(index >= collapsedItems){
                            $(this).addClass('hidden');
                        }
                    });

                });
                $moreButton.removeClass('hidden');
                $lessButton.addClass('hidden');
                var $nextTab = $container.find('.ui-state-active').find('a');
                var nextTabId = $nextTab.attr('href');
                if($(nextTabId).find('.collection-item')[2]){
                    $($(nextTabId).find('.collection-item')[2]).find('a').focus();
                } else if($container.find('.collection-item')[2]){
                    $($container.find('.collection-item')[2]).find('a').focus();
                }


            });
        }

        $groups.each(function(){
            var $this = $(this);
            if($this.find('.collection-item').length && $this.find('.collection-item').length <=3){
                $this.find('.more.cta').hide();
                $this.find('.less.cta').hide();
            }

            var $collectionItems = $this.find('.collection-item');
            var $collectionImages = $this.find('.collection-item a');
            $collectionItems.each(function(){
                var $item = $(this);
                var $title = $item.find('.body-title');
                var $desc = $item.find('.body-text');
                $item.data('fulltitle',$title.text());
                $item.data('fulldesc',$desc.text());

                APP.utils.truncateText($title,{xlarge: 50, large: 50, medium: 50, small: 50, xsmall: 50});
                APP.utils.truncateText($desc,{xlarge: 80, large: 80, medium: 80, small: 80, xsmall: 80});
            });

            $collectionImages.on('blur',function(){
                var $thisItem = $(this);
                var $itemContainer = $thisItem.closest('.collection-item');
                if($itemContainer.index() === $collectionItems.length - 1){
                    if($container.closest('.tabbed').length){
                        if($container.find('.ui-state-active').next()){
                            var $nextTab = $container.find('.ui-state-active').next().find('a');
                            var nextTabId = $nextTab.attr('href');
                            $nextTab.trigger('click');
                            $nextTab.focus();

                        }


                    }
                }
            });

            $collectionImages.on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                var $clickedItem = $(this);

                var videoAttributes = [];
                var videoTitles = [];
                var videoDescriptions = [];
                var galleryObjects = [];
                var startingIndex = 0;
                var foundStart = false;
                $collectionItems.not('.slick-cloned').each(function(index){
                    var data1 = $(this).find('.video-play-button').data('video-data')
                    var data2 = $clickedItem.find('.video-play-button').data('video-data');
                    if($(this).find('.video-play-button').data('video-data') === $clickedItem.find('.video-play-button').data('video-data') && !foundStart){
                        startingIndex = index;
                        foundStart = true;
                    }
                    if(!$(this).hasClass('slick-cloned')){
                        videoAttributes.push($(this).find('.video-play-button').data('video-data'));
                        videoTitles.push($(this).find('.body-title').text());
                        videoDescriptions.push($(this).find('.body-text').text());
                    }

                });
                var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                if(APP.configs.isLocal){
                    imageLocation = '/mda-web/images/MDACC_wide.jpg';
                }
                for(var i = 0; i < videoAttributes.length; i++){
                    if(videoAttributes[i].source === 'mediahub'){
                        galleryObjects.push({
                            src : imageLocation
                        })
                    } else{
                        galleryObjects.push({
                            src : imageLocation
                        })
                    }
                }

                if( APP.utils.getViewport().width > APP.configs.views.small){
                    startingIndex = $clickedItem.closest('.collection-item').index();
                }

                if(startingIndex === -1){
                    startingIndex = 0;
                } else if(startingIndex >= videoAttributes.length){
                    startingIndex = videoAttributes.length - 1;
                }

                var lightGallery = $('#yt-overlay-player');
                var hasDoneOpen = false;
                var currentIndex = 0;
                lightGallery.on('onCloseAfter.lg',function(event){
                    lightGallery.removeData();
                    lightGallery.unbind('onAfterOpen.lg');
                    $clickedItem.focus();
                    hasDoneOpen = false;
                }).on('onAfterOpen.lg',function(event){
                    $('.lg-close.lg-icon').focus();
                    if(videoAttributes[startingIndex].source === 'mediahub'){
                        insertMediahubVideo(startingIndex,getMediaHubObject(videoAttributes[startingIndex].sourceJson), videoTitles[startingIndex],videoDescriptions[startingIndex]);
                    } else{
                        insertYoutubeVideo(startingIndex,videoAttributes[startingIndex].id, videoTitles[startingIndex],videoDescriptions[startingIndex]);
                    }
                    hasDoneOpen = true;
                    var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                    $('.lg-outer').find('.lg').prepend(toolbar);

                    var prevButton = $('.lg-prev').wrap('<div class="lg-actions"></div>');
                    prevButton = prevButton.closest('.lg-actions');
                    prevButton = prevButton.detach();
                    $('.lg-toolbar').after(prevButton);
                    $('.lg-close').focus();

                }).on('onBeforeSlide.lg ',function(event,prevIndex,index){

                    if(videoAttributes[prevIndex].source === 'youtube'){
                        if(window.videoplayer !== undefined && window.videoplayer.getCurrentTime !== undefined){
                            utag.link({
                                time_viewed:window.videoplayer.getCurrentTime(),
                                video_name:window.videoplayer.getVideoData().title
                            })
                        }
                    }
                    $($('.lg-item')[index]).css({'opacity' : '0'});
                    if(hasDoneOpen){
                        if(videoAttributes[index].source === 'mediahub'){
                            insertMediahubVideo(index,getMediaHubObject(videoAttributes[index].sourceJson), videoTitles[index],videoDescriptions[index]);
                        } else{
                            insertYoutubeVideo(index,videoAttributes[index].id, videoTitles[index],videoDescriptions[index]);
                        }
                        if(videoAttributes[prevIndex].source === 'mediahub'){
                            var videoDiv = 'mediahubholder'+prevIndex;
                            jwplayer(videoDiv).stop();
                        }
                    }


                }).on('onAfterSlide.lg ',function(event,prevIndex,index){
                    currentIndex = index;
                    $($('.lg-item')[prevIndex]).find('iframe').remove();
                    $($('.lg-item')[prevIndex]).find('.jwplayer.lg-object').remove();

                    if(videoAttributes[index].source === 'mediahub'){
                    } else{
                        $($('.lg-item')[index]).css({'opacity' : '1'});
                    }

                }).on('onSlideItemLoad.lg',	function(event,index){
                    if(index === currentIndex){
                        if(videoAttributes[index].source === 'youtube'){
                            if($($('.lg-item')[index]).find('iframe').length === 0){
                                insertYoutubeVideo(index,videoAttributes[index].id, videoTitles[index],videoDescriptions[index]);
                            }
                        }
                    }

                }).lightGallery({
                    dynamic: true,
                    index: startingIndex,
                    preload: 10,
                    dynamicEl: galleryObjects,
                    counter : true
                });


            });


        });
    });

    function insertMediahubVideo(index, videoData, title, description){
        var $currentItem = $($('.lg-item')[index]);
        $currentItem.css({'opacity' : '0'});
        var width = '768';
        var height = '432';
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
            height = height/width * APP.utils.getViewport().width;
        }
        if($currentItem.find('.lg-img-wrap').length){

        } else{
            $currentItem.html('<div class="lg-img-wrap"></div>');
        }
        $currentItem.find('.lg-img-wrap').attr('id','mediahubholder'+index);
        var videoDiv = 'mediahubholder'+index;
        jwplayer(videoDiv).setup(videoData);
        var topOffSet = -1 * height/2;

        jwplayer(videoDiv).onReady(function(){
            $currentItem.first().find('.vid-title').remove();
            $currentItem.first().find('.vid-description').remove();
            $currentItem.first().append($('<p class="vid-title">'+title+'</p>'));
            $('<p class="vid-description">'+description+'</div>').appendTo($currentItem.first());
            $currentItem.first().find('.vid-title').css({'margin-top':(height/2 + 5)+'px'})

            $currentItem.find('.jwplayer').addClass('lg-object').css({ 'transform':'none','margin': topOffSet+'px auto','max-width' : $( window ).width()+'px', 'max-height':height, 'opacity':1});
            setTimeout(function(){
                $currentItem.find('.jwplayer').addClass('show-controls');
            }, 1000);
            $('#'+videoDiv+'_wrapper').addClass('lg-object').css({'transform':'none', 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px', 'max-height':height});
            $currentItem.find('.lg-object').css({'transform':'none'});
            $currentItem.css({'opacity' : '1'});
            $('#'+videoDiv).css({'opacity' : '1'});
            $('#'+videoDiv+'_wrapper').css({'opacity' : '1'});
            jwplayer(videoDiv).play();

        });


    }
    function insertYoutubeVideo(index, videoData, title, description){
        var $currentItem = $($('.lg-item')[index]);
        var width = '768';
        var height = '432';
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
            height = height/width * APP.utils.getViewport().width;
        }
        var topOffSet = -1 * height/2;
        $currentItem.find('.lg-img-wrap').html('<iframe id="player" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+videoData+'?enablejsapi=1&autoplay=1" frameborder="0" allowfullscreen></iframe>')

        $currentItem.first().find('.vid-title').remove();
        $currentItem.first().find('.vid-description').remove();
        $currentItem.find('.lg-img-wrap').first().find('iframe').first().after($('<p class="vid-description">'+description+'</div>'));
        $currentItem.find('.lg-img-wrap').first().find('iframe').first().after($('<p class="vid-title">'+title+'</p>'));
        $currentItem.find('.lg-img-wrap').first().find('.vid-title').css({'margin-top':(height/2 + 5)+'px'})


        if(window.onPlayerStateChange !== undefined && window.onPlayerReady !== undefined){
            window.videoplayer;
            for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;) {
                if (/youtube.com\/embed/.test(e[x].src)) {
                    window.videoplayer = new YT.Player(e[x], {
                        events: {
                            onStateChange: window.onPlayerStateChange,
                            onReady: window.onPlayerReady
                        }
                    });
                    YT.gtmLastAction = "p";
                }
            }
        }
        $currentItem.find('#player').css({'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
        $currentItem.css({'opacity' : '1'});

    }

    function getMediaHubObject(videoData){
        var description = '';
        var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
        var volume = '60';
        var videoSourcesPreferred = [];
        var videoSourcesBackup = [];
        var videoCaption = "";
        var manifestCount = 0;
        var width = '768';
        var height = '432';
        var aspectratio = '16:9';
        var videoSources;

        // Get description
        if(videoData.description !== undefined) {
            description = videoData.description
        }

        // Get poster
        if(videoData.poster !== undefined) {
            poster = videoData.poster
        }

        // Get volume
        if(videoData.audio_level !== undefined) {
            volume = videoData.audio_level
        }

        var hasVideos = false;


        // Get sources
        if(videoData.media) {
            var media = videoData.media;



            // Get preferred and backup sources
            for (var vid in media) {
                if(media[vid]['url']) {
                    var v_a = media[vid]['url'].split('.');
                    var v_ext = v_a[v_a.length - 1];
                    if (v_ext == 'mov' || v_ext == 'm4v' || v_ext == 'mp4' || v_ext == 'flv') {
                        hasVideos = true;
                    }
                    if (media.hasOwnProperty(vid)) {


                        if (media[vid].preferred) {
                            // Preferred source
                            videoSourcesPreferred.push({
                                'file': 'http://' + media[vid].url
                            });
                        } else {
                            // Backup source
                            var a = media[vid].url.split('.');
                            var ext = a[a.length - 1];
                            if (ext !== 'mp3') {
                                videoSourcesBackup.push({
                                    'file': 'http://' + media[vid].url
                                });
                            }
                        }
                    }
                }
            }

            if(!hasVideos){
                videoSourcesPreferred = []
                for (var vid in media) {
                    if (media[vid]['media_type'] === 'Encodedaudio' || media[vid]['media_type'] === 'Encoded audio') {
                        //To be replaced with global value
                        var isProd = true;
                        var v_url = '';

                        if (media[vid]['url'].indexOf('/mp3:') === -1 && media[vid].url.indexOf('/audio/') > -1) {
                            v_url =  media[vid]['url'].replace('/audio/', '/mp3:audio/').replace('.mp3', '');
                        } else {
                            v_url = media[vid]['url'].replace('/media/', '/mp3:media/').replace('.mp3', '');
                        }

                        if(isProd){
                            v_url = v_url.replace('dcswlflash.mdanderson.edu','media.mdanderson.org');
                        }
                        if(v_url.indexOf('stream-public') > -1){
                            videoSourcesPreferred.push({
                                'file': 'rtmp://' + v_url
                            });
                        } else{
                            videoSourcesPreferred.push({
                                'file': 'http://' + v_url.replace('mp3:','') + '.mp3'
                            });
                        }
                    }
                }
            }

            for (var vid in media) {
                // Check for Encoded Video
                if(media[vid]['media_type'] === 'Encoded video' || media[vid]['media_type'] === 'Encodedvideo') {
                    var v_a = media[vid].url.split('.');
                    var v_ext = v_a[v_a.length-1];
                    var r_ext = '';
                    if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                        r_ext = 'mp4:';
                    } else if(v_ext = 'flv') {
                        r_ext = 'flv:';
                    }

                    var v_url = '';

                    if(media[vid].url.indexOf('/vod/') > -1) {
                        v_url = 'rtmp://'+media[vid].url.replace('/media/','/'+r_ext+'media/');
                    } else {
                        var vv_url = 'rtmp://'+media[vid].url.replace('/video/','/'+r_ext+'video/');
                        v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                    }

                    videoSourcesPreferred.push({
                        'file':v_url
                    });
                    videoSourcesPreferred.push({
                        'file':'http://'+media[vid].url
                    });
                }

            }

            // Check for Encoded HLS Media
            if(media['Encoded HLS media']) {
                if(media['Manifest HLS'] && manifestCount < 1) {
                    videoSourcesPreferred.push({
                        'file':'http://'+media['Manifest HLS'].url
                    });
                    manifestCount++;
                }
                var m_a = media['Encoded HLS media'].url.split('.');
                var m_ext = m_a[m_a.length-1];
                if(m_ext === 'mov' || m_ext === 'm4v' || m_ext === 'mp4') {
                    m_ext = 'mp4'
                }
                var m_url = 'rtmp://'+media['Encoded HLS media'].url.replace('/media/','/'+m_ext+':media/');
                videoSourcesPreferred.push({
                    'file':m_url
                });
            }

            // Check for Encoded Video
            if(media['Encoded video']) {
                var v_a = media['Encoded video'].url.split('.');
                var v_ext = v_a[v_a.length-1];
                var r_ext = '';
                if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                    r_ext = 'mp4:';
                } else if(v_ext = 'flv') {
                    r_ext = 'flv:';
                }

                var v_url = '';

                if(media['Encoded video'].url.indexOf('/vod/') > -1) {
                    v_url = 'rtmp://'+media['Encoded video'].url.replace('/media/','/'+r_ext+'media/');
                } else {
                    var vv_url = 'rtmp://'+media['Encoded video'].url.replace('/video/','/'+r_ext+'video/');
                    v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                }

                videoSourcesPreferred.push({
                    'file':v_url
                });
                videoSourcesPreferred.push({
                    'file':'http://'+media['Encoded video'].url
                });
            }
            //Check for Caption

            for(var k in media) {
                if(media[k].media_type === 'Caption') {
                    videoCaption = "http://" + media[k].url;
                }
            }

        }

        videoSources = videoSourcesPreferred.concat(videoSourcesBackup);


        // If no sources
        if(videoSources.length < 1) {
            poster = 'http://media.mdanderson.org/poster/NotAvaliable_Default.jpg';
        }
        var base = '/etc/designs/mda/mda-web/jwplayer/';
        if(APP.configs.isLocal){
            base = '/mda-web/jwplayer/';
        }

        var outObject = {
            base: base,
            width: width,
            height: height,
            autoplay: true,
            aspectratio: aspectratio,
            skin: '/mdaSkin.xml',
            fallback: 'true',
            abouttext: 'MD Anderson Cancer Center',
            aboutlink: 'http://www.mdanderson.org/', sharing: { heading: 'Share MD Anderson Video'} ,
            logo: {
                file: '/etc/designs/mda/mda-web/images/spacer.png',
                hide: true
            },
            playlist: [{
                image: poster,
                description: description,
                tracks: [{
                    file: videoCaption,
                    label: "English",
                    kind: "captions",
                    "default": true
                }],
                sources: videoSources
            }],
            events: {
                onComplete: function() {
                    $('#video-overlay-player_wrapper').removeClass('fade-in');
                    $('#video-overlay-player_wrapper').addClass('fade-out');
                    $('#video-overlay').removeClass('fade-in');
                    $('#video-overlay').addClass('fade-out');
                    clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                }
            }

        }

        return outObject;
    }

})(jQuery);
