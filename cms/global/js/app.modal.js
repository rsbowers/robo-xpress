/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var Modal = (function(Modal) {
    return Modal = {
      $el: $('#l-modal'),
      config: {},
      videoPlayer: '',
      videoTitle: '',
      varTimeout: '',
      varTimeoutMove: '',

      init: function() {

        Modal.ui = {
          overlay : $('<div id="lean_overlay"></div>'),
          body : Modal.$el.find('.l-modal-body'),
          closeBtn: Modal.$el.find('.modal-close')
        };

        // add click event to trigger the modal
        $('[rel*=leanModal]').on('click', function(ev){

          ev.preventDefault();

          // if video modal
          if( $(this).data('type')==='video') {

          }
          // if social share modal
          else if( $(this).data('type')==='share' ) {
            Modal.appendSocialContent( $(this) );
          }
          // if standard modal
          else {
            Modal.appendModalContent( $(this).attr('href') );
          }

          if ($(this).data('type')==='share') {
            Modal.open(true);
          } else {
            Modal.open();
          }


        });
      },



      appendModalContent: function(modalContentID) {
        Modal.ui.body.html( $(modalContentID)[0].outerHTML );
        Modal.$el.find(modalContentID).show();
      },



      appendSocialContent: function() {
        Modal.appendModalContent( '.share-see-more' );
      },


      open: function(share){
        $('body').append(Modal.ui.overlay);

        Modal.ui.overlay.fadeTo(200, .5);

        var modal_width = Modal.ui.body.find('>:first-child').outerWidth();
        var modal_height = Modal.ui.body.find('>:first-child').outerHeight();

        if(share) {
          modal_width = $(Modal.$el).width();
          modal_height = $(Modal.$el).height();

          $('.social-share').removeClass('visible');
        }


        Modal.$el.css({
          'left' : 50 + '%',
          'margin-left' : -(modal_width/2) + 'px',
          'top' : 50 + '%',
          'margin-top' : -(modal_height/2) + 'px'
        });

        if(share && (APP.utils.getViewport().width <= APP.configs.views.small)){
          Modal.$el.css({
            'width': '100%',
            'height': '98%',
            'left': '0',
            'margin-left': '0px',
            'top': '0',
            'margin-top': '0'
          });
        }

        Modal.$el.fadeIn(200);

        // close from overlay
        Modal.ui.overlay.click(function(ev) {
          ev.preventDefault();
          Modal.close();
        });

        // close from button
        Modal.ui.closeBtn.click(function(ev) {
          ev.preventDefault();
          Modal.close();
        });
      },


      close: function(){
        Modal.$el.trigger('close');
        Modal.ui.overlay.fadeOut(200, function(){
          Modal.ui.overlay.remove();
        });

        Modal.$el.fadeOut(200, function(){
          Modal.ui.body.empty();
        });
      },


      appendShareContent: function() {
        Modal.ui.body.html( $('.social-share')[0].outerHTML );
        Modal.$el.find('.social-share').show();

        $('.share-see-more-button').on('click', function(){
          Modal.$el.find('.share-see-more').show(400);
          Modal.$el.find('.first-page').hide(400);
        });
      }

    };
  })(Modal || {}).init(); //Self Firing
})(jQuery);
