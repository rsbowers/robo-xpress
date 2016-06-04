/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {

  $.fn.scrollTransition = function( options ) {


    var section = $(this);
    var transitionType = section.data('transition') ? section.data('transition') : 'fadeIn';
    var transitionDelay = section.data('transition-delay') ? parseInt(section.data('transition-delay')) : 0;

    var runTransition = {

      fadeIn : function(){
        if( !APP.configs.isMobile.any() ){
          var scene = new ScrollScene({
            offset: -300
          })
          .triggerHook('onCenter')
          .triggerElement(section[0])
          .addTo(APP.scrollController);

          scene.on('enter', function(){
            setTimeout(function(){
              section.addClass('reveal');
            }, transitionDelay);
          });
        }

        // mobile backup
        else {
          section.addClass('reveal');
        }
      },



      // transition for the badge counter
      badgeCounter : function(){

        var counter = section.find('.badge-countup');
        var maxCount = parseInt(counter.data('max-count'));
        var count = parseInt(counter.text());
        count = 0;

        function timer(){
          count++;
          if (count > maxCount)
          {
            clearInterval(counter);
            return;
          }
          counter.text(count);
        }

        if( !APP.configs.isMobile.any() ){
          var scene = new ScrollScene({
            offset: -200
          })
          .triggerHook('onCenter')
          .triggerElement(section[0])
          .addTo(APP.scrollController);

          scene.on('enter', function(){
            setTimeout(function(){
              var counter=setInterval(timer, 100);
            }, transitionDelay);
          });


        }

        //mobile backup
        else {
          counter.text(maxCount);
        }
      }
    };

    //run the transition defined for the section or element
    runTransition[ transitionType ]();



    return this;
  };





}( jQuery ));


