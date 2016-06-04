
(function ( $ ) {

    $.fn.mdaJWPlayer = function( displayInOverlay, buttonClickOnly, options ) {

        var videoWrapper = $(this);

        var clickObject = $(this);

        var dataObject = videoWrapper.find('.video-play-button');

        if(buttonClickOnly) {
            clickObject = dataObject;
        }

        var videoPlayButton = videoWrapper.find('.video-play-button');

        if(displayInOverlay){
            videoPlayButton = videoWrapper.find('.mdicon-videoplay');
        }

        var hasFlash = true;
        // Flash Test
        if(!swfobject.hasFlashPlayerVersion('9.0.115'))
        {
            hasFlash = false;
        }

        //Assign poster image in collection or carousel
        if((dataObject.closest('.collection-item').length > 0 || dataObject.closest('.carousel-item').length > 0) && !dataObject.closest('.carousel-image').hasClass('mediahub-poster')){

            var imageContainer = videoWrapper.find('img');
            var videoAttr = (dataObject.data('video-data')) ? dataObject.data('video-data') : {};
            var videoData = (videoAttr.sourceJson) ? videoAttr.sourceJson : {};
            if(dataObject.closest('.carousel-item').length > 0 && videoAttr.source !== 'youtube'){
                imageContainer = dataObject.closest('.carousel-image');
                imageContainer.find('picture').remove();
                imageContainer = $('<img src=""/>').appendTo(imageContainer);;
            }

            var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
            if(videoData.poster !== undefined) {
                poster = videoData.poster;
            }
            if(videoAttr.source !== 'youtube'){
                imageContainer.attr('src',poster);
                dataObject.closest('.carousel-image').addClass('mediahub-poster')
            }

        }

        clickObject.unbind('click');
        clickObject.unbind('customPlayer');
        clickObject.on('click customPlayer', function (e, triggerParam) {
            e.stopPropagation();
            clickObject.unbind('click');
            if(clickObject.closest('.flip-tile').length > 0 && triggerParam !== 'triggered' && APP.configs.isMobile.nullcheck()){


            } else{
                e.preventDefault();



                // Data attributes
                var videoDiv = dataObject.data('video-div');
                var videoAttr = (dataObject.data('video-data')) ? dataObject.data('video-data') : {};
                var videoData = videoAttr.sourceJson;
                var mediaHub = false;
                var youTube = false;


                if (videoAttr.source === 'youtube') {
                    youTube = true;
                } else if (videoAttr.source === 'mediahub') {
                    mediaHub = true;
                }

                var width = '768';
                var height = '432';
                var aspectratio = '16:9';

                if(videoDiv){
                    videoDiv = videoDiv.replace('#','');
                }
                if(videoDiv == undefined || videoDiv == ''){
                    displayInOverlay = true;
                }
                if(displayInOverlay){
                    videoDiv = 'video-overlay-player';                    
                }

                if(mediaHub){

                    // Video properties
                    var description = '';
                    var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
                    var volume = '60';
                    var videoSources = [];
                    var videoSourcesPreferred = [];
                    var videoSourcesBackup = [];
                    var videoCaptions = [];
                    var videoCaption = "";
                    var manifestCount = 0;

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
                            if(media[vid]['media_type'] === 'Encoded video' || media[vid]['media_type'] === 'Encodedvideo' || media[vid]['media_type'] === 'Encoded HLS media') {
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
                                    v_url = v_url.replace('.mp4','.mov')
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

                    if($('#'+videoDiv).closest('.media-player').length > 0){
                        width = '100%';
                    }

                    jwplayer(videoDiv).setVolume(volume);
                    var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                    if(APP.configs.isLocal){
                        imageLocation = '/mda-web/images/MDACC_wide.jpg';
                    }
                    var elements = [{
                        'src': imageLocation

                    }];
                    var lightGallery = $('#yt-overlay-player');
                    lightGallery.on('onAfterOpen.lg',function(event){
                        $('.lg-item').first().find('.lg-img-wrap').first().attr('id','mediahubholder');
                        videoDiv = 'mediahubholder';
                        $('.lg-close.lg-icon').focus();
                        var base = '/etc/designs/mda/mda-web/jwplayer/';
                        if(APP.configs.isLocal){
                            base = '/mda-web/jwplayer/';
                        }
                        var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                        $('.lg-outer').find('.lg').prepend(toolbar);
                        $('.lg-close').focus();


                        jwplayer(videoDiv).setup({
                            base: base,
                            width: width,
                            height: height,
                            aspectratio: aspectratio,
                            skin: '/mdaSkin.xml',
                            'controlbar': 'bottom',
                            fallback: 'true',
                            abouttext: 'MD Anderson Cancer Center',
                            aboutlink: 'http://www.mdanderson.org/',
                            sharing: { heading: 'Share MD Anderson Video'},
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

                        });
                        var topOffSet = -1 * height/2;
                        $('#'+videoDiv+'_wrapper').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});

                        $('.lg-item').first().css({'opacity' : '0'});

                        jwplayer(videoDiv).onReady(function(){
                            var topOffSet = -1 * height/2;
                            $('.lg-item').first().find('.jwplayer').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                            $('.lg-item').first().find('.lg-object').css({'transform':'none'});

                            $('#'+videoDiv+'_wrapper').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                            $('.lg-item').first().css({'opacity' : '1'});
                            clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                            setTimeout(function(){
                                $('.lg-item').first().find('.jwplayer').addClass('show-controls');
                            }, 1000);
                            if(!displayInOverlay){
                                $('#'+videoDiv + '_wrapper').css({'width':'100%','height':'100%','position':'absolute'}).addClass('fade-in');
                                videoWrapper.find('#basic-video-container').addClass('fade-in');
                                if(videoPlayButton.closest('.carousel-body-content').length > 0){
                                    videoPlayButton.hide();
                                }

                                if(videoWrapper.closest('.carousel-hero').length > 0){
                                    var $carousel = videoWrapper.closest('.carousel-hero');
                                    $carousel.find('button').on('click',function(){
                                        jwplayer(videoDiv).stop();
                                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                                    });
                                }

                            }
                            jwplayer(videoDiv).play();
                        });
                    }).on('onCloseAfter.lg',function(event){
                        lightGallery.removeData();
                        lightGallery.unbind('onAfterOpen.lg');
                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                        clickObject.focus();
                    }).lightGallery({
                        dynamic: true,
                        dynamicEl: elements,
                        counter : false
                    });
                    $('.lg-icon.lg-close').focus();


                } else if(youTube) {
                    if (APP.utils.getViewport().width < APP.configs.views['medium']) {
                        height = height/width * APP.utils.getViewport().width;
                    }
                    var topOffSet = -1 * height/2;
                    $('.lg-item').first().css({'opacity' : '0'});
                    var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                    if(APP.configs.isLocal){
                        imageLocation = '/mda-web/images/MDACC_wide.jpg';
                    }
                    var elements = [{
                        src : imageLocation

                    }];
                    var lightGallery = $('#yt-overlay-player');
                    lightGallery.on('onAfterOpen.lg',function(event) {
                        $('.lg-item').first().find('.lg-img-wrap').first().html('<iframe id="player" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+videoAttr.id+'?enablejsapi=1&autoplay=1" frameborder="0" allowfullscreen></iframe>')
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
                        var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                        $('.lg-outer').find('.lg').prepend(toolbar);

                        var prevButton = $('.lg-prev').wrap('<div class="lg-actions"></div>');
                        prevButton = prevButton.closest('.lg-actions');
                        prevButton = prevButton.detach();
                        $('.lg-toolbar').after(prevButton);

                        $('.lg-close').focus();

                        $('.lg-item').find('#player').css({'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                        $('.lg-item').first().css({'opacity' : '1'});
                        $('.lg-close.lg-icon').focus();
                    }).on('onCloseAfter.lg',function(event){
                        lightGallery.removeData();
                        lightGallery.unbind('onAfterOpen.lg');
                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                        clickObject.focus();
                        if(window.videoplayer !== undefined){
                            utag.link({
                                "time_viewed" : window.videoplayer.getCurrentTime()
                            })
                        }
                    }).lightGallery({
                        dynamic: true,
                        dynamicEl: elements,
                        counter : false
                    });
                    $('.lg-icon.lg-close').focus();

                }
            }


        });

        return this;
    };

}( jQuery ));