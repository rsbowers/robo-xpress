// jshint devel:true

(function($) {
  'use strict';

  APP.Welcome = (function(Welcome) {
    return Welcome = {
      $el: $('.welcome'),

      init: function() {
        console.log('I am Nav.');
      }

    };
  })(APP.Welcome || {}); //Fired from APP
})(jQuery);
