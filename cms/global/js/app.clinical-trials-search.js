/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
(function ($) {
    'use strict';

    $.fn.clinicalTrialsSearch = function(query, options) {
        var config = {
            page: 1,
            defaultPageSize: 4,
            searchResultTemplate : APP.templates.searchresult,
            predictiveValues : [],
            gotValues : false
        };
        var searchWrapper = $(this),
            searchForm = $(this),
            searchInput = searchWrapper.find('.search-field'),
            searchResults = searchWrapper.find('.search-results'),
            searchClear = $('.search-clear');

        searchWrapper.find('input').attr('autocomplete', 'off');
        if(APP.configs.isLocal){
            config.predictiveSearchUrl = 'http://dcdrlaemweb01.mdanderson.edu/' + searchWrapper.data('predictiveurl');
            config.dropdownUrl = 'http://dcdrlaemweb01.mdanderson.edu/' +searchWrapper.data('dropdownurl');
            window.searchResultsPageUrl = "/search-results.html?q="
        }else{
            config.predictiveSearchUrl = searchWrapper.data('predictiveurl');
            config.dropdownUrl = searchWrapper.data('dropdownurl');
            var searchResultsPageUrl = searchWrapper.data('searchresultspageurl');
        }

        if(query){
            config.predictiveSearchUrl = query;
            if(APP.configs.isLocal) {
                config.predictiveSearchUrl = 'http://dcdrlaemweb01.mdanderson.edu' + config.predictiveSearchUrl;
            }
        }

        //Clear the search results
        searchWrapper.on('clear', clearSearch);

        searchForm.submit(function (event) {
            event.preventDefault(); // stop the actual submit
            var searchTerm = searchForm.find('.search-field').val();
            if(searchTerm.length > 0 && (/[\S]+/g.test(searchTerm))){
                window.location.href = window.searchResultsPageUrl + searchTerm + '&searchType=' + 'clinical trials';
            } else{
                var errorCopy = 'Please enter a Physician, Treatment, or Cancer Type';
                if(searchWrapper.data('errorcopy')){
                    errorCopy = searchWrapper.data('errorcopy');
                }
                searchWrapper.find('.clinical-trials-search p').first().html(errorCopy);
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

        searchInput.keyup(function(e){
            var length = $.trim($(this).val()).length;
            if(length > 0) searchWrapper.addClass('hasVal');
            else searchWrapper.removeClass('hasVal');
            // the below conditions are only used for demoing the predictive search
            if(e.keyCode < 38 || e.keyCode > 40){
                if(length>=3){
                    getSuggestedQueries($(this).val());
                } else {
                    clearSuggestions();
                }
            }
        });

        //Initialize dropdowns if they are on the page
        if(!searchWrapper.hasClass('search-results-search-bar') && searchWrapper.closest('.search-block').length === 0){
            initializeDropDowns();
        }

        /*
         * Get the suggested queries based with the provided URL
         */
        function getSuggestedQueries( query ){
            var suggestion = '&requiredfields=pagetype:clinical%20trial.diseases:*'+query+'*|Treatment:*'+query+'*|Physician:*'+query+'*|NCT_Number*'+query+'*';
            var facet;
            if(config.predictiveValues.length === 0 && config.gotValues === false){
                config.gotValues = true;
                $.ajax({
                    url: config.predictiveSearchUrl + suggestion,
                    contentType: "xml",
                    dataType: "xml",
                    success: function (result) {

                        var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                        if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0 || jsonResults.GSP.RES.PARM === undefined ||jsonResults.GSP.RES.PARM.PMT === undefined  ){
                            config.gotValues = false;
                        } else {
                            config.predictiveValues = [];
                            if(!jsonResults.GSP.RES.PARM.PMT.length){

                                var temp = jsonResults.GSP.RES.PARM.PMT;
                                jsonResults.GSP.RES.PARM.PMT = [];
                                jsonResults.GSP.RES.PARM.PMT.push(temp);

                            }

                            for (var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {

                                facet = jsonResults.GSP.RES.PARM.PMT[i];
                                if(!facet.PV.length){
                                    var temp = facet.PV;
                                    facet.PV = [];
                                    facet.PV.push(temp);

                                }

                                for(var j = 0; j < facet.PV.length; j++){
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace('_',' ');
                                    config.predictiveValues.push(facet.PV[j]['@V']);
                                }
                            }

                            getPredictiveValues(query);

                        }

                    }

                });
            } else{
                getPredictiveValues(query);

            }


        }


        function getPredictiveValues(query){
            var regex = new RegExp(query, 'i');
            var output = [];
            var j= 0;
            var tempResult;
            for(var i = 0; i < config.predictiveValues.length; i++){
                var item = config.predictiveValues[i];
                if(regex.test(item)){
                    output.push( {
                        label: item
                    });

                    j++;
                }
            }
            for(var i = 0; i < 4; i++){
                var value = output[i];


                if(value !== undefined){
                    value = value.label;

                    // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).html('<div role="option" id="' + value + '"><div data-actualval="'+value+'" class="suggestion-name">' + value + '</div></div>');
                    }else{
                        tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" id="' + value + '"><div data-actualval="'+value+'" class="suggestion-name">' + value + '</div></div></li>');
                        addPredictiveResult(tempResult);
                    }

                } else {
                    if(searchWrapper.find('.search-result-'+i).length > 0){
                        searchWrapper.find('.search-result-'+i).remove();
                    }
                }

            }
            addResultClickHandler();
        }

        function initializeDropDowns(){
            var types = 'Treatment|diseases|Physician';
            getDropDownValues(types);
        }


        function getDropDownValues(type){
            $.ajax({
                url: config.dropdownUrl + '&getfields=*&requiredfields=pagetype:clinical trial',
                contentType: "xml",
                dataType: "xml",
                success: function (result) {
                    var jsonResults = JSON.parse(APP.utils.xml2json(result,'\t'));
                    if(jsonResults.GSP.RES == undefined || jsonResults.GSP.RES.length == 0){

                    } else {
                        if(!jsonResults.GSP.RES.PARM.PMT.length){
                            var temp =jsonResults.GSP.RES.PARM.PMT;
                            jsonResults.GSP.RES.PARM.PMT = [];
                            jsonResults.GSP.RES.PARM.PMT.push(temp);
                        }
                        var physicianArray = [];

                        if(jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
                            for(var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'diseases'){
                                        $('<li><a href="#">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+'</a></li>').appendTo(searchWrapper.find('.cancer-type .mda-custom-dd-list').first());
                                    } else if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'physician'){
                                        //We must sort physicians based on last name
                                        var tempName = '';
                                        var tempNameArr = [];
                                        tempName = '';
                                        tempNameArr = jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].split(' ');
                                        tempName = tempNameArr[tempNameArr.length -1] + ',';
                                        for(var g = 0; g < tempNameArr.length -1; g++){
                                            tempName = tempName + ' ' + tempNameArr[g];
                                        }
                                        physicianArray.push(tempName);


                                    }else if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'treatment'){
                                        $('<li><a href="#">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+'</a></li>').appendTo(searchWrapper.find('.treatment .mda-custom-dd-list'));
                                    }
                                }
                            }
                            physicianArray.sort();
                            for(var i = 0; i < physicianArray.length; i++){
                                $('<li><a href="#">'+physicianArray[i]+'</a></li>').appendTo(searchWrapper.find('.physicians .mda-custom-dd-list'));
                            }

                            $('.cancer-type .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    searchInput.val($(this).text());
                                    searchForm.submit();
                                })
                            });

                            $('.treatment .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    searchInput.val($(this).text());
                                    searchForm.submit();
                                })
                            });

                            $('.physicians .mda-custom-dd-list li a').each(function(){
                                $(this).unbind('click');
                                $(this).on('click',function(){
                                    var filterValue = '';
                                    var val = $(this).text();
                                    var valArray = val.split(' ');
                                    for(var i = 1; i < valArray.length; i++){
                                        if(valArray[i] !== ','){
                                            filterValue = filterValue + valArray[i] + ' ';
                                        }
                                    }
                                    filterValue = filterValue + valArray[0].replace(',','');
                                    searchInput.val(filterValue);
                                    searchForm.submit();
                                })
                            });
                        }
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
                    searchWrapper.find('.search-field').val($('li.search-result').first().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.next().addClass('active');
                    $('.search-field').val($selected.next().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.next().find('.suggestion-name').data('linkurl'));
                }
                return false;
            } else if (e.keyCode == 38) {
                if($selected == undefined || $selected.length == 0){
                    $('.search-field').val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$('li.search-result').first().find('.suggestion-name').data('linkurl'));
                } else{
                    $selected.removeClass('active');
                    $selected.prev().addClass('active');
                    $('.search-field').val($selected.prev().find('.suggestion-name').data('actualval'));
                    searchWrapper.find('.form-search-submit').data('linkurl',$selected.prev().find('.suggestion-name').data('linkurl'));
                }
                return false;
            }
        });

        return this;
    };



    $('.clinical-trials-search-wrapper').each(function(){
        $(this).clinicalTrialsSearch();
    });

    $('.mda-custom-dd.clinical-trial-filter').each(function(){
        var $dropdown = $(this),
            $ddLink   = $dropdown.find('.mda-custom-dd-link'),
            $ddList   = $dropdown.find('.mda-custom-dd-list');
        $ddLink.on('click', function(e){
            e.preventDefault();
            var parent = $(e.target).parents('.clinical-trial-filter');
            $(parent).parent().siblings().find('.clinical-trial-filter').removeClass('extended');
            ($(parent).hasClass('extended'))  ? $(parent).removeClass('extended') : $(parent).addClass('extended');

        });
        $('body').on('click', function(e){
            if (!($(e.target).parents('.clinical-trial-filter').length > 0 || $(e.target).hasClass('.clinical-trial-filter'))) {
                $('.clinical-trial-filter').removeClass('extended');
            }
        })

    });


})(jQuery);