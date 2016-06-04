/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {



    $.fn.predictiveSearchForm = function( url, options ) {
        var config = {
            page: 1,
            defaultPageSize: 4,
            searchResultTemplate : APP.templates.searchresult,
            predictiveValues : []
        };
        if(APP.configs.isLocal){
            config.predictiveSearchUrl = '/mda-web/images/cancertype-search_final.xml';

            config.searchResultsUrl = 'http://dcsrlaemweb01.mdanderson.edu/search?site=mda_aem_stage&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=diseases.(isPrimaryDiseasePage:true)&getfields=*&sort=meta:diseases';
        }else{
            config.predictiveSearchUrl = '/search?site=mda_aem&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=Diseases&inmeta:isPrimaryDiseasePage=true&getfields=isPrimaryDiseasePage.Diseases&sort==meta:Diseases';
            config.searchResultsUrl = '/search?site=mda_aem&client=cancertype_search&output=xml_no_dtd&num=1000&filter=0&requiredfields=Diseases&inmeta:isPrimaryDiseasePage=true&getfields=isPrimaryDiseasePage.Diseases&sort==meta:Diseases';
        }

        if(url != undefined){
            config.predictiveSearchUrl = url;
            if(APP.configs.isLocal){
                config.predictiveSearchUrl = 'http://dcsrlaemweb01.mdanderson.edu' + url;
            }
        }

        var settings = $.extend({}, options );

        var searchWrapper = $(this).parent(),
            searchForm = $(this),
            searchInput = searchWrapper.find('.search-field'),
            searchResults = searchWrapper.find('.search-results'),
            searchClear = $('.search-clear');
        searchWrapper.on('clear', clearSearch);


        searchWrapper.find('input').attr('autocomplete', 'off');


        searchForm.submit(function (event) {

            event.preventDefault();

            if(searchWrapper.find('.form-search-submit').data('linkurl') !== undefined && searchWrapper.find('.form-search-submit').data('linkurl') !== 'null' && searchWrapper.find('.form-search-submit').data('linkurl') !== null){
                window.location.href = searchWrapper.find('.form-search-submit').data('linkurl');
            }
        });
        searchClear.on('click',clearSearch);

        searchInput.focus(function(){
            searchWrapper.addClass('focus');

        });

        searchInput.blur(function(){
            searchWrapper.removeClass('focus');

            if( $(this).val().length > 0 ) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
        });


        //When typing, make a call for the values the first time. Otherwise get the predictive values
        searchInput.keyup(function(e){
            var length = $(this).val().length;
            if(length > 0) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
            // the below conditions are only used for demoing the predictive search
            if(e.keyCode < 38 || e.keyCode > 40){
                if(length>=2){
                    if(config.predictiveValues.length === 0){
                        getSuggestedQueries($(this).val());
                    } else{
                        getPredictiveValues($(this).val());
                    }
                } else {
                    clearSuggestions();
                }
            }
        });

        /*
         * Use regex to find the predictive values based on the query then add them to the results list
         */
        function getPredictiveValues(query){
            var regex = new RegExp(query, 'i');
            var noResults = false;
            var output = [];
            var j= 0;
            var tempResult;

            for(var i = 0; i < config.predictiveValues.length; i++){
                var item = config.predictiveValues[i];
                if(regex.test(item.label)){
                    output.push( {
                        label: item.label,
                        url: item.url
                    });
                    j++;
                }
            }
            if(output.length === 0){
                noResults = true;
                output.push( {
                    label: 'No Results Found',
                    url: 'null'
                });
            }

            for(var i = 0; i < 4; i++){
                var value = output[i];
                if(value !== undefined){

                    // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).html('<div role="option" class="option" id="' + value.label + '"><div class="suggestion-name" data-linkurl="'+value.url+'">' +value.label + '</div></div>');
                    }else{
                        tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" class="option" id="' + value.label + '"><div class="suggestion-name" data-linkurl="'+value.url+'">' + value.label + '</div></div></li>');
                        addPredictiveResult(tempResult);
                    }

                } else {
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).remove();
                    }
                }

            }

            if(noResults){
                searchWrapper.find('.search-result').unbind('click');
            } else{
                addResultClickHandler();
            }


        }

        /*
         * Get the suggested queries based with the provided URL
         */

        function getSuggestedQueries( query ){

            $.ajax({
                url: config.predictiveSearchUrl,
                contentType: "xml",
                dataType: "xml",
                success: function (result) {
                    var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                    if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0){

                    } else {

                        var resultTitle;
                        var url;
                        var metadata;
                        for(var i = 0; i < jsonResults.GSP.RES.R.length; i++){
                            metadata = resultTitle =jsonResults.GSP.RES.R[i].MT;
                            if (!metadata.length) {
                                var temp = metadata;
                                metadata = [];
                                metadata.push(temp);
                            }
                            for(var j = 0; j < metadata.length; j++){
                                if(metadata[j]['@N'] == 'Diseases' || metadata[j]['@N'] == 'diseases' ||  metadata[j]['@N'] == 'diseases_abbreviation'){
                                    resultTitle = metadata[j]['@V'];
                                    var resultTitleArray = resultTitle.split(',');
                                    for(var n = 0; n < resultTitleArray.length; n++){
                                        resultTitle = resultTitleArray[n];
                                        if(resultTitle.length > 60){
                                            resultTitle = resultTitle.substring(0,60);
                                            resultTitle = resultTitle.substring(0, resultTitle.lastIndexOf(' ')) + '...';
                                        }
                                        url = jsonResults.GSP.RES.R[i].U;

                                        if(checkForValue(resultTitle)){
                                            config.predictiveValues.push( {'label' : resultTitle, 'url' : url});
                                        }
                                    }

                                }
                            }
                        }

                        getPredictiveValues(query);
                    }
                }
            });
        }

        function checkForValue(resultTitle){
            for(var i = 0; i < config.predictiveValues.length; i++){
                if(config.predictiveValues[i].label == resultTitle){
                    return false;
                }
            }
            return true;
        }


        function addResultClickHandler(){
            if(APP.configs.isMobile.nullcheck()){
                searchWrapper.find('.search-result').on('click', function(){
                    var $this = $(this);
                    searchInput.val($this.text());
                    searchWrapper.find('.form-search-submit').data('linkurl',$this.find('.suggestion-name').data('linkurl'));
                    searchForm.submit();
                });
            } else{
                searchWrapper.find('.search-result').on('mousedown', function(){
                    var $this = $(this);
                    searchInput.val($this.text());
                    searchWrapper.find('.form-search-submit').data('linkurl',$this.find('.suggestion-name').data('linkurl'));
                    searchForm.submit();
                });
            }


        }

        function addPredictiveResult(result){
            result.appendTo(searchResults);
            setTimeout(function(){
                result.addClass('reveal');
            }, 80);
        }

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

        function clearSearch(){
            searchInput.val('');
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));
        }

        function clearSuggestions(searchTerm){
            if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
            if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
            if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
            if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
            if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));

        }


        /*
         * Key press events for up and down
         */

        searchInput.on('focus', function() {

        }).on('keydown', function(e) {
            var $selected = $('li.search-result.active');
            if (e.keyCode == 40) {
                if($selected == undefined || $selected.length == 0){
                    searchWrapper.find('li.search-result').first().addClass('active');
                    searchWrapper.find('.search-field').val($('li.search-result').first().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.next().addClass('active');
                    searchWrapper.find('.search-field').val($selected.next().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.next().find('.suggestion-name').data('linkurl'));
                }
                return false;
            } else if (e.keyCode == 38) {
                if($selected == undefined || $selected.length == 0){
                    searchWrapper.find('.search-field').val(searchWrapper.find('li.search-result').first().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.prev().addClass('active');
                    searchWrapper.find('.search-field').val($selected.prev().find('.suggestion-name').html());
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.prev().find('.suggestion-name').data('linkurl'));
                }
                return false;
            }
        });

        return this;
    };


}( jQuery ));