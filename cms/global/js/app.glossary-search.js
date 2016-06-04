/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    APP.GlossarySearch = (function (GlossarySearch) {
        var $searchWrapper = $('.glossary-search-wrapper');
        var $resultsWrapper = $('.glossary-search-results');
        var $dropdownMenu = $searchWrapper.find('.menu');
        var $dataObject = $searchWrapper.find('.glossary-search');
        var predictiveSearchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var searchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1000&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var additionalFilters = '';
        var dropdownTags = 'diseases,cancer-topics';
        var displayTag = 'diseases';
        var pageType = 'publication';
        var $resultsSection = $('.glossary-search-results .result-section');
        return GlossarySearch = {
            init : function(){
                predictiveSearchUrl = $dataObject.data('predictivequery');
                searchUrl = $dataObject.data('resultsquery');
                if($dataObject.data('dropdowntags') !== undefined){
                    dropdownTags = $dataObject.data('dropdowntags');

                }

                if($dataObject.data('pagetype') !== undefined){
                    pageType = $dataObject.data('pagetype');
                }
                if(APP.configs.isLocal){
                    predictiveSearchUrl = 'http://dcsrlaemweb01.mdanderson.edu/' + predictiveSearchUrl;
                    searchUrl = 'http://dcsrlaemweb01.mdanderson.edu/' + searchUrl;
                }

                if($searchWrapper.length > 0){
                    GlossarySearch.initSearchBox();
                    GlossarySearch.fetchSearchResults('');
                    GlossarySearch.initBrowseLetters();
                }

            },
            initSearchBox : function(){
                if($dataObject.data('predictivequery')){

                    $.ajax({
                        url: searchUrl ,
                        contentType: 'xml',
                        dataType: 'xml',
                        success: function (result) {
                            //Convert the XML to JSON and parse it
                            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));
                            var dropdownValues = [];

                            //If the resutls are blank, show the no results text, otherwise show the results
                            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                                //Do nothing if we have no results
                            } else {
                                var resultSet = jsonResults.GSP.RES.PARM;
                                var shouldPush = true;
                                var allResults = jsonResults.GSP.RES.R;
                                for(var i = 0; i < allResults.length; i++){
                                    if (!allResults[i].MT.length) {
                                        var temp = allResults[i].MT;
                                        allResults[i].MT = [];
                                        allResults[i].MT.push(temp);

                                    }
                                    for (var j = 0; j < allResults[i].MT.length; j++) {
                                        if(allResults[i].MT[j]['@N'] === 'og:title'){
                                            dropdownValues.push('ogtitle:' + allResults[i].MT[j]['@V'])
                                        }
                                    }
                                }

                                if(resultSet) {
                                    if (!resultSet.length) {
                                        var temp = resultSet;
                                        resultSet = [];
                                        resultSet.push(temp);

                                    }
                                    for (var i = 0; i < resultSet.length; i++) {
                                        if (!resultSet[i].PMT.length) {
                                            var temp = resultSet[i].PMT;
                                            resultSet[i].PMT = [];
                                            resultSet[i].PMT.push(temp);

                                        }
                                        var tempDropDownVal = '';
                                        shouldPush = true;
                                        var pageTitle = resultSet[i].T;

                                        for (var j = 0; j < resultSet[i].PMT.length; j++) {

                                            for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                                tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                                shouldPush = true;
                                                for (var q = 0; q < dropdownValues.length; q++) {
                                                    if (dropdownValues[q] === tempDropDownVal) {
                                                        shouldPush = false;
                                                    }
                                                }
                                                if (dropdownTags.indexOf(resultSet[i].PMT[j]['@NM']) === -1) {
                                                    shouldPush = false;
                                                }
                                                if (shouldPush) {
                                                    dropdownValues.push(tempDropDownVal);
                                                }
                                            }

                                        }

                                    }
                                }

                                dropdownValues.sort(function(a,b){
                                    var firstVal = a.substring(a.indexOf(':') + 1, a.length);
                                    var secondVal = b.substring(b.indexOf(':') + 1, b.length);
                                    if ( firstVal < secondVal)
                                        return -1;
                                    if ( firstVal > secondVal)
                                        return 1;
                                    return 0;

                                });

                                for (var i = 0; i < dropdownValues.length; i++) {
                                    $('<div class="item" data-value="' + GlossarySearch.escapeHtml(dropdownValues[i]) + '">' + dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length) + '</div>').appendTo($dropdownMenu);
                                }

                                /* Initialize Semantic UI Type Ahead Dropdown Selection */
                                $('.ui.search-form').dropdown({
                                    direction : 'downward',
                                    match: 'text'
                                });
                                if ($('html').hasClass('ie9')) {
                                    $('.ui.search-form').unbind('click');
                                    $('.ui.search-form').on('click', function () {
                                        var $menu = $(this).find('.menu');
                                        if($menu.hasClass('show')){
                                            $menu.removeClass('show');
                                            $menu.removeClass('visible');
                                            $menu.css({'display':'none'});
                                        } else{
                                            $menu.addClass('show');
                                            $menu.addClass('visible');
                                            $('.ui.search-form').find('.menu').css({'display':'block'});
                                        }
                                    });
                                }

                                $searchWrapper.find('.search .search-field').change(function(){
                                    GlossarySearch.fetchSearchResults($(this).val());
                                    $searchWrapper.find('.clear').show();
                                });

                                $searchWrapper.find('.clear').on('click',function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $searchWrapper.find('.ui.search-form').dropdown('clear');
                                    $(this).hide();
                                })

                            }
                        },
                        error: function(){

                        }
                    });
                }
            },
            escapeHtml : function(text) {
                return text.replace(/\./g, "%2E")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/&/g,'%26')
                    .replace(/%/g, "%25")
                    .replace('ogtitle','og%253Atitle');
            },
            initBrowseLetters : function(){
                $resultsWrapper.find('.browse-letter').on('click',function(e){
                    var $this = $(this);
                    if($this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if($this.hasClass('switch-num') && !$this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                        $resultsWrapper.find('.switch-num').hide();
                        $resultsWrapper.find('.switch-abc').show();
                        $resultsWrapper.find('.numbers').removeClass('hide');
                        $resultsWrapper.find('.letters').addClass('hide');
                        $resultsWrapper.find('.browse-text-letters').addClass('hide');
                        $resultsWrapper.find('.browse-text-numbers').removeClass('hide');
                        $resultsWrapper.find('.numbers').find('a').not('disabled').first().focus();


                    } else if($this.hasClass('switch-abc') && !$this.hasClass('disabled')){
                        e.preventDefault();
                        e.stopPropagation();
                        $resultsWrapper.find('.switch-abc').hide();
                        $resultsWrapper.find('.switch-num').show();
                        $resultsWrapper.find('.numbers').addClass('hide');
                        $resultsWrapper.find('.letters').removeClass('hide');
                        $resultsWrapper.find('.browse-text-letters').removeClass('hide');
                        $resultsWrapper.find('.browse-text-numbers').addClass('hide');
                        $resultsWrapper.find('.letters').find('a').not('disabled').first().focus();

                    }
                })
            },
            fetchSearchResults : function(filterValue){

                var resultsSearchQuery = searchUrl;
                if(filterValue.length > 0){
                    resultsSearchQuery = resultsSearchQuery + '.' + filterValue;
                }
                var resultsByLetter = {};
                $.ajax({
                    url: resultsSearchQuery ,
                    contentType: 'xml',
                    dataType: 'xml',
                    success: function (result) {
                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            //Do nothing if we have no results
                        } else {
                            var resultSet = jsonResults.GSP.RES.R;
                            if (!resultSet.length) {
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);
                            }
                            resultSet.sort(function(a,b){
                                var firstVal = a.T;
                                var secondVal = b.T;


                                if (firstVal < secondVal)
                                    return -1;
                                if (firstVal > secondVal)
                                    return 1;


                                return 0;

                            });


                            for (var i = 0; i < resultSet.length; i++) {
                                var firstLetter = resultSet[i].T.trim().substring(0,1).toUpperCase();
                                if(resultsByLetter[firstLetter] === undefined){
                                    resultsByLetter[firstLetter] = [];
                                }
                                resultsByLetter[firstLetter].push(resultSet[i]);
                            }
                            $resultsSection.html('');
                            $resultsWrapper.find('.browse-letter').not('.switch-num,.switch-abc').addClass('disabled');
                            var patt = new RegExp('[a-zA-Z]');
                            var hasLetter = false;
                            for (var key in resultsByLetter) {
                                if (resultsByLetter.hasOwnProperty(key)) {
                                    if(patt.test(key)){
                                        hasLetter = true;
                                        $resultsWrapper.find('.'+key).removeClass('disabled');
                                        GlossarySearch.generateLetterSection(key, resultsByLetter[key]);
                                    }
                                }
                            }
                            if(hasLetter === false){
                                $('.browse-letter.switch-abc').addClass('disabled');
                            } else{
                                $('.browse-letter.switch-abc').removeClass('disabled');
                            }


                            var patt = new RegExp('[0-9]');
                            var hasNumber = false;
                            for (var key in resultsByLetter) {
                                if (resultsByLetter.hasOwnProperty(key)) {
                                    if(patt.test(key)){
                                        hasNumber = true;
                                        $resultsWrapper.find('.'+key).removeClass('disabled');
                                        GlossarySearch.generateLetterSection(key, resultsByLetter[key]);
                                    }
                                }
                            }
                            if(hasNumber === false){
                                $('.browse-letter.switch-num').addClass('disabled');
                            } else{
                                $('.browse-letter.switch-num').removeClass('disabled');
                            }

                            $('.scroll-trans').each(function () {
                                $(this).scrollTransition();
                            });


                        }
                    },
                    error: function(){

                    }
                });
            },
            generateLetterSection : function(letter, items){
                var $letterSectionTemplate =  APP.Templates.glossary_search_letter_section;
                var $resultTemplate =  APP.Templates.glossary_search_template;
                var $currentLetterSection = $($letterSectionTemplate({'letter' : letter}));
                var leftLimit = Math.ceil(items.length/2);
                if($dataObject.data('displaytag') !== undefined){
                    displayTag = $dataObject.data('displaytag');
                }
                if($resultsSection.length > 0){
                    var $leftSection = $currentLetterSection.find('.item-container-first');
                    var $rightSection = $currentLetterSection.find('.item-container-last');
                    var $currentResult;
                    for(var i = 0; i < items.length; i++){
                        items[i]['displaytag'] = displayTag;
                        if(items[i].MT && items[i].MT.length === undefined){
                            var temp = items[i].MT;
                            items[i].MT = [];
                            items[i].MT.push(temp);
                        }
                        $currentResult = $($resultTemplate(items[i]));
                        if(i%2 === 0){
                            $currentResult.appendTo($leftSection);
                        } else{
                            $currentResult.appendTo($rightSection);
                        }
                    }
                    $currentLetterSection.appendTo($resultsSection);
                }
            }
        }
    })(APP.GlossarySearch || {});


})(jQuery);
