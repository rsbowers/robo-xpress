/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
;(function () {
  'use strict';



  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }

    var operator = options.hash.operator || '==';

    var operators = {
      '==':       function(l,r) { return l == r; },
      '===':      function(l,r) { return l === r; },
      '!=':       function(l,r) { return l != r; },
      '!==':       function(l,r) { return l !== r; },
      '<':        function(l,r) { return l < r; },
      '>':        function(l,r) { return l > r; },
      '<=':       function(l,r) { return l <= r; },
      '>=':       function(l,r) { return l >= r; },
      'typeof':   function(l,r) { return typeof l == r; },
      'contains': function(l,r) { return l.indexOf(r) != -1;},
      'hasVariable' : function(l,r) {
        if(l !== undefined && r  !== undefined) {
          for (var i = 0; i < l.length; i++) {
            if (l[i]['@N'] === r) {
              return true;
            }
          }
        }
        return false;
      },
      'hasValue' : function(l,r) {
        if(l && r){
          for(var i = 0; i < l.length; i++){
            if(l[i]['@V'] === r){
              return true;
            }
          }
        }

        return false;
      },
      '!hasVariable': function(l,r) {
        if(l !== undefined && r  !== undefined){
          for(var i = 0; i < l.length; i++){
            if(l[i]['@N'] === r){
              return false;
            }
          }
        }

        return true;
      },

      'htmlDecode' : function(l,r) {
        return $('<div/>').html(l).text();
      },
      'notEmpty': function(l,r) {
        if(l != undefined){
          return((l.length != 0 && l != ''));

        }

        return false;
      },
      'empty': function(l,r) {
        if(l != undefined){
          return(l.length == 0 || l == '');
        }

        return true;
      }
    };

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" does not know the operator '+operator);
    }

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

  Handlebars.registerHelper('replaceCommas', function(options) {
    return options.fn(this).replace(/,/g,', ');

  });

  Handlebars.registerHelper('raw', function(options) {
    return options.fn(this).replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
  });

  Handlebars.registerHelper('htmlDecode', function(options) {
    return $('<div/>').html(options.fn(this)).text();

  });

  Handlebars.registerHelper('removeBr', function(options) {
    return options.fn(this).replace(new RegExp('<br>', 'g'), '');

  });

  Handlebars.registerHelper('encodeSpaces', function(options) {
    return options.fn(this).replace(new RegExp(' ', 'g'), '%20');

  });

}());
