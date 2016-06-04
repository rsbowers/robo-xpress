/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


  $.fn.searchForm = function( url , searchfilter, options ) {
    var config = {
      page: 1,
      defaultPageSize: 25
    };

    /*
     * Setting for local configuration used in development of the prototype
     *
     */
    if(APP.configs.isLocal){
      var generalPredictiveSearchUrl = '/suggest?max=4&site=my_collection&access=access&format=rich&client=my_collection&q=';
      config.predictiveSearchUrl ='http://explore.mdanderson.org' +  generalPredictiveSearchUrl;
      if(url){
        config.predictiveSearchUrl ='http://explore.mdanderson.org' +  url;

      }
      var searchResultsPageUrl = '/search-results.html?q=';

    }else{
      if(url){
        config.predictiveSearchUrl = url;
      }else{
        config.predictiveSearchUrl = '/suggest?max=4&site=my_collection&access=access&format=rich&client=my_collection&q=';
      }

      if($(this).data('searchresultspageurl')){
        var searchResultsPageUrl = $(this).data('searchresultspageurl');
      } else{
        var searchResultsPageUrl = '/search-results.html?q=';
      }
    }

    var settings = $.extend({}, options );


    /*
     * Establishing variables specific to this instance of a search field
     *
     */

    var searchWrapper = $(this),
        searchForm = searchWrapper.find('form.search-form'),
        searchInput = searchWrapper.find('.search-field'),
        searchResults = searchWrapper.find('.search-results'),
        searchClear = searchWrapper.parent().find('.search-clear'),
        searchIcon = searchWrapper.find('.mda-icon-search'),
        searchText = searchForm.find('.search-field').attr('placeholder');

    searchWrapper.on('clear', clearSearch);

    /*
     * On the submit of a form, redirect to the authored search results page
     *
     */
    searchForm.submit(function (event) {

      event.preventDefault(); // stop the actual submit
      var searchTerm = searchForm.find('.search-field').val();

      //Ensure that there is a value in the box, otherwise show an error message
      if(searchTerm.length > 0 && (/[\S]+/g.test(searchTerm)) && searchTerm !== searchForm.find('.search-field').attr('placeholder')){
        if(searchfilter){
          searchTerm = searchTerm.trim() + '&searchType='+searchfilter;
        }
        window.location.href = searchResultsPageUrl+searchTerm.trim();
      } else{
        var errorCopy = 'Please enter a search term';
        if(searchWrapper.data('errorcopy')){
          errorCopy = searchWrapper.data('errorcopy');
        }
        searchForm.find('.search-field').attr('placeholder', errorCopy);
        $('input').placeholder({ customClass: 'ie9-placeholder' });
        searchForm.find('.search-field').val('');
      }

    });

    //On click of any search icon, do the submit
    searchIcon.on('click',function(){
      searchForm.submit();
    });

    //On click of the clear text, clear the box
    searchClear.on('click',clearSearch);

    //Do a clear on the nav clear button click
    $('#nav-search-wrapper').find('.search-clear a').on('click',clearSearch);

    //For mobile, when we focus we should lock scrolling to prevent swiping issues
    searchInput.focus(function(){
      searchWrapper.addClass('focus');
      if(searchWrapper.closest('#utilities-nav').length){
        searchWrapper.closest('#utilities-nav').find('.utilities-list').addClass('hide');
        searchWrapper.closest('#utilities-nav').find('#give-now-btn').addClass('hide');
        $('#nav-search-toggle').addClass('show');
      }
      $('.topnav-scroll-container').addClass('lock');
    });


    //When we blur away for mobile, we should allow scrolling again
    searchInput.blur(function(){

      if(!searchWrapper.closest('#utilities-nav').length){
        searchWrapper.removeClass('focus');
      }
      if($(this).val().length > 0 ){
        searchWrapper.addClass('hasVal');
      }
      else {
        searchWrapper.removeClass('hasVal');
      }

      $('.topnav-scroll-container').removeClass('lock');
    });



    /*
     * When a user is typing, after the 3rd character, get predictive search words
     *
     */
    searchInput.keyup(function(e){
      var length = $(this).val().length;
      if(length > 0) {
        searchWrapper.addClass('hasVal');
      }
      else {
        searchWrapper.removeClass('hasVal');
      }

      //If we are typing number characters, get suggested queries from GSA
      if(e.keyCode < 38 || e.keyCode > 40){
        if(length>=3){
          getSuggestedQueries($(this).val());
        } else {
          clearSuggestions();
        }
      }


    });


    /*
     * Get suggested queried based off of a specific query sting
     *
     */
    function getSuggestedQueries( query){
      $.ajax({
        url: config.predictiveSearchUrl + query,
        contentType: "json",
        dataType: "json",
        success: function (result) {
          var tempResult;
          var resultTitle;

          for(var i = 0; i < 4; i++){
            resultTitle = result.results[i];

            if(resultTitle !== undefined){
              resultTitle = resultTitle.name;
              var longTitle = resultTitle;
              // If the string length is greater than 60 characters, concat it at without cutting off a word.
              if(resultTitle.length > 60){
                resultTitle = resultTitle.substring(0,50);
                resultTitle = resultTitle.substring(0, resultTitle.lastIndexOf(' ')) + '...';
              }

              // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
              if(searchWrapper.find('.search-result-'+i).length > 0){
                searchWrapper.find('.search-result-'+i).html('<div role="option" id="' + resultTitle + '"><div data-actualval="'+longTitle+'" class="suggestion-name">' + resultTitle + '</div></div>');
              }else{
                tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" id="' + resultTitle + '"><div data-actualval="'+longTitle+'" class="suggestion-name">' + resultTitle + '</div></div></li>');
                addPredictiveResult(tempResult);
              }

            } else {
              if(searchWrapper.find('.search-result-'+i).length > 0){
                searchWrapper.find('.search-result-'+i).remove();
              }
            }
            resultTitle = undefined;

            addResultClickHandler();
          }
        }
      });
    }

    function addResultClickHandler(){
      if(APP.configs.isMobile.nullcheck()){
        searchWrapper.find('.suggestion-name').on('click', function(){

          var $this = $(this);
          searchInput.val($this.data('actualval'));
          searchForm.submit();
        });
      } else{
        searchWrapper.find('.suggestion-name').on('mousedown', function(){

          var $this = $(this);
          searchInput.val($this.data('actualval'));
          searchForm.submit();
        });
      }

    }


    /*
     * To add a predictive result to the div with animation
     *
     */
    function addPredictiveResult(result){
      result.appendTo(searchResults);
      setTimeout(function(){
        result.addClass('reveal');
      }, 80);
    }



    /*
     * To remove a specific result with animation
     *
     */
    function removeResult(result){
      result.removeClass('reveal');

      var onEndTransFn = function( ev ) {
        this.removeEventListener( APP.utils.transEndEventName(), onEndTransFn );
        setTimeout(function(){
          result.remove();
        }, 80);
      };

      if( Modernizr.csstransitions ) {
        result[0].addEventListener( APP.utils.transEndEventName(), onEndTransFn );
      }
      else {
        onEndTransFn.call();
      }
    }


    /*
     * Clear the entire search form and remove the suggestions
     *
     */
    function clearSearch(){
      searchInput.val('');
      searchForm.find('.search-field').attr('placeholder',searchText);
      if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
      if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
      if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
      if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
      if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));
    }


    /*
     * Remove only the suggestions
     *
     */
    function clearSuggestions(searchTerm){
      if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
      if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
      if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
      if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
      if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));

    }


    /*
     * This is the logic for the up and down arrow key events required for accesibility.
     *
     */

    searchInput.on('focus', function() {

    }).on('keydown', function(e) {
      var $selected = searchWrapper.find('li.search-result.active');
      if (e.keyCode == 40) {
        if($selected == undefined || $selected.length == 0){
          searchWrapper.find('li.search-result').first().addClass('active');
          searchInput.val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
        } else{
          $selected.removeClass('active');
          $selected.next().addClass('active');
          searchInput.val($selected.next().find('.suggestion-name').data('actualval'));
        }
        return false;
      } else if (e.keyCode == 38) {
        if($selected == undefined || $selected.length == 0){
          searchInput.val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
        } else{
          $selected.removeClass('active');
          $selected.prev().addClass('active');
          searchInput.val($selected.prev().find('.suggestion-name').data('actualval'));
        }
        return false;
      }
    });



    return this;
  };




}( jQuery ));