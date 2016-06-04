/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';



    ////////////////////////
    //Search Functionality//
    ////////////////////////

    APP.ResourceCenterResults = (function (ResourceCenterResults) {
        return ResourceCenterResults = {

            $el: $('#search-results-block'),

            /*
             * Initialize Search results URL and Handlebar variables
             *
             */
            init: function () {

                if ($('#resource-center-results') !== undefined && $('#resource-center-results').length > 0) {

                    //Get all handlebar templates required and establish query strings

                    /*
                     *
                     * searchResultsTemplate - The handlebar template required for each individual search results
                     * didYouMeanTemplate - The handlebar template used for the misspell text
                     * suggestedResultTemplate - The handlebar template used for the MDA Suggests section
                     * filterCheckboxTemplate - Handlebar template used for the checkbox facet filtering
                     * filterRadiobtnTemplate - Handlebar template for the radio button facet filtering
                     * relatedSearchTemplate - Handlebar template used for the suggested terms query
                     * radioBtnString - The string used for determining the radio button facet
                     *
                     */
                    ResourceCenterResults.config = {
                        page: 0,
                        publicationLocation : '.publication-articles .col-single',
                        patientEducationLocation : '.patient-education .col-single',
                        videoLocation: '.videos .col-single',
                        podcastsLocation: '.podcasts .col-single',
                        newsReleasesLocation: '.news-releases .col-single',
                        mediaHubApiUrl : '/api/publiccatalog/v1/',
                        defaultPageSize: 3,
                        resultsCount: '',
                        sortString: '',
                        filterString: '',
                        frontEndString: 'mda_aem',
                        baseFilterString: '&requiredfields=',
                        fullPageResults: false,
                        publicationQuery: '',
                        patientEducationQuery: '',
                        videoQuery : '',
                        podcastsQuery: '',
                        newsReleasesQuery: '',
                        largeResultTemplate: '',
                        smallResultTemplate: '',
                        moreResults : false,
                        moreResultsSection : '',
                        resultsTagQuery : '',
                        keywordResultsFilter : '',
                        landingPageUrl : '',
                        currentTagDepth : 0

                    };

                    var moreResults = APP.utils.getUrlParameter('moreResults');
                    ResourceCenterResults.addBackButtonHandler();

                    if(moreResults){
                        ResourceCenterResults.config.defaultPageSize = 18;
                        ResourceCenterResults.config.fullPageResults = true;
                        ResourceCenterResults.config.moreResults = true;
                        ResourceCenterResults.config.moreResultsSection = moreResults;
                        var $resultsSection = $('#resource-center-results');
                        $('.see-more').hide();
                    }

                    //Local configuration used for development
                    var $keywordWrapper = $('.resource-results-search');
                    if (APP.configs.isLocal) {
                        var numSearchResultsReturn = 3;
                        var searchResultsUrl = '/search?site=MD_Anderson&clientmda_diseases&output=xml_no_dtd&access=p&filter=0&getfields=*&tlen=160';
                        var searchResultClickAnalyticsUrl = '';
                        ResourceCenterResults.config.searchResultsUrl = 'https://www.mdanderson.org' + searchResultsUrl + '&num=' + ResourceCenterResults.config.defaultPageSize;
                        ResourceCenterResults.config.resultClickUrl = 'https://www.mdanderson.org' + searchResultClickAnalyticsUrl;
                        ResourceCenterResults.config.resultsTagQuery = 'https://www.mdanderson.org' + $keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery');
                        ResourceCenterResults.config.mediaHubApiUrl = 'https://www.mdanderson.org' + ResourceCenterResults.config.mediaHubApiUrl;
                        ResourceCenterResults.config.landingPageUrl = $keywordWrapper.find('.suggested-keywords').data('resourcelandingpage');
                    } else {
                        ResourceCenterResults.config.searchResultsUrl = searchResultsUrl + '&num=' + ResourceCenterResults.config.defaultPageSize;
                        ResourceCenterResults.config.resultClickUrl = $('<div/>').html(searchResultClickAnalyticsUrl).text();
                        ResourceCenterResults.config.resultsTagQuery = $keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery');
                        ResourceCenterResults.config.landingPageUrl = $keywordWrapper.find('.suggested-keywords').data('resourcelandingpage');
                    }

                    //If the number of search results has been authored, overwrite hardcoded value
                    if (numSearchResultsReturn !== undefined) {
                        ResourceCenterResults.config.defaultPageSize = numSearchResultsReturn;
                    }

                    if(ResourceCenterResults.config.fullPageResults){
                        ResourceCenterResults.config.defaultPageSize = 18;
                        $('.back-to-landing').removeClass('hidden');
                    }

                    // Get the URL Parameter for the search param and call render
                    var searchQuery = APP.utils.getUrlParameter('q');
                    if(!searchQuery){

                        ResourceCenterResults.errorProcedure(false);
                    }


                    $('.search-result-pagination .search-results-more').hide();

                    //Click event for more button in pagination
                    $('.search-result-pagination .search-results-more').on('click', function () {
                        var $nextPage = $('.search-result-pagination .pagination-number.active').next();
                        $('.search-result-pagination .pagination-number.active').removeClass('active');
                        $nextPage.addClass('active');
                        ResourceCenterResults.config.page++;
                        ResourceCenterResults.updateResults();
                        ResourceCenterResults.updatePaginationNumbers();

                    });

                    //Click event for previous button in pagination
                    $('.search-result-pagination .search-results-prev').on('click', function () {
                        var $nextPage = $('.search-result-pagination .pagination-number.active').prev();
                        $('.search-result-pagination .pagination-number.active').removeClass('active');
                        $nextPage.addClass('active');
                        ResourceCenterResults.config.page--;
                        ResourceCenterResults.updateResults();
                        ResourceCenterResults.updatePaginationNumbers();

                    });


                    ResourceCenterResults.addViewMoreHandlers();

                    //Handlebar template for the larger results

                    ResourceCenterResults.config.largeResultTemplate = APP.Templates.resource_center_large;


                    //Handlebar template for smaller results
                    ResourceCenterResults.config.smallResultTemplate = APP.Templates.resource_center_small;


                    var resourceCenterDefaultQuery = APP.utils.getUrlParameter('q');
                    if(resourceCenterDefaultQuery && $('.resource-results-search').length > 0){
                        resourceCenterDefaultQuery = decodeURIComponent(decodeURIComponent(resourceCenterDefaultQuery));
                        resourceCenterDefaultQuery = resourceCenterDefaultQuery.replace(new RegExp('%20', 'g'), ' ');
                        if(APP.ResourceCenterResults.config.moreResults || APP.utils.getUrlParameter('filters')){
                            ResourceCenterResults.addSelectedTerm(resourceCenterDefaultQuery, true, true);
                        } else{
                            ResourceCenterResults.addSelectedTerm(resourceCenterDefaultQuery, false, true);
                        }
                    }
                    if($(window).width() < 640){
                        if($('.term-block').width() > 150){
                            $('.term-block').addClass("term-block-mob");
                        }
                    }

                    if($('.selected-terms-container .term-block').length < 1){
                        $('.resource-results-search .search-bar').hide();
                    }


                    $('#resource-results-search-form .search-field').on('focus',function(){
                        var searchString = '';
                        var $this = $(this);
                        var selectedTerms = $('#resource-results-search-form .term-block');
                        selectedTerms.each(function(){
                            searchString = searchString + $(this).find('span').text() + ' ';
                        });
                        $this.val(searchString);
                        $('#selected-terms-container').hide();
                    });

                    $('#resource-results-search-form .search-field').on('blur',function(){
                        var $this = $(this);
                        $this.val('');
                        $('#selected-terms-container').show();
                    });


                    //Handler for adding  a selected filter
                    $('#resource-results-suggestions .term-block a').on('click',function(){
                        if($('.selected-terms-container .term-block').length < 1){
                            $('.resource-results-search .search-bar').slideDown('fast');
                        }
                        var $this = $(this);
                        ResourceCenterResults.addSelectedTerm($this.data('fullvalue'));
                        APP.ResourceCenterResults.config.keywordResultsFilter  = APP.ResourceCenterResults.config.keywordResultsFilter + '.' + $this.text();
                        $this.remove();
                    });

                }
            },
            updateResults: function () {
                var searchQuery = '';

                $('#selected-terms-container').find('.term-block span').each(function(){
                    searchQuery = searchQuery + ' ' +$(this).text();
                });

                //Call search for the individual sections if see more
                if(ResourceCenterResults.config.moreResults){
                    $('#resource-center-results .highlight').removeClass('highlight');

                    if(ResourceCenterResults.config.moreResultsSection.indexOf('publication') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.publicationLocation, ResourceCenterResults.config.largeResultTemplate, '(pagetype:publication|pagetype:blog).(-publication:Cancer Newsline)');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('patient') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.patientEducationLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:patient_education');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('video') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.videoLocation, ResourceCenterResults.config.largeResultTemplate, '(videotype:Youtube|videotype:Mediahub)');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('podcast') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.podcastsLocation, ResourceCenterResults.config.smallResultTemplate, 'videotype:podcast');
                    } else if(ResourceCenterResults.config.moreResultsSection.indexOf('news') > -1){
                        ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.newsReleasesLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:news articles');

                    } else{

                    }
                    ResourceCenterResults.initializeKeywords();


                } else{
                    //Call search for all sections
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.publicationLocation, ResourceCenterResults.config.largeResultTemplate, '(pagetype:publication|pagetype:blog).(-publication:Cancer Newsline)');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.patientEducationLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:patient_education');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.videoLocation, ResourceCenterResults.config.largeResultTemplate, '(videotype:Youtube|videotype:Mediahub)');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.podcastsLocation, ResourceCenterResults.config.smallResultTemplate, 'videotype:podcast');
                    ResourceCenterResults.getSearchResults(searchQuery, true, ResourceCenterResults.config.newsReleasesLocation, ResourceCenterResults.config.smallResultTemplate, 'pagetype:news articles');
                    ResourceCenterResults.initializeKeywords();

                }


            },


            /*
             *
             * Get the search results given a query param. Only runs of first load OR on change of sorting
             *
             *
             */
            getSearchResults: function (query, firstRun, location, template, type) {

                // Store the query sting in the config obkect
                ResourceCenterResults.config.queryString = query.replace(new RegExp('%20', 'g'), ' ');
                var searchResultsArea = $('#resource-center-results').find(location);
                var searchTemplate = template;
                var searchResult;
                var searchUrl = searchResultsArea.data('resourcesectionsearchquery');

                if(APP.configs.isLocal){
                    searchUrl = 'https://www.mdanderson.org' + searchUrl;
                }

                /*
                 *
                 * Configure the ajax call to GSA for search results
                 * start - The first record to be returned. This is calculated by multiplying the page number by the default page size
                 * q - the search parameter
                 * sortString - The specifying sory by relevance or date, blank by default
                 * filterString - Specifying the filtering, blank by default
                 *
                 */
                $.ajax({
                    url: searchUrl + '&num=' + ResourceCenterResults.config.defaultPageSize + '&start=' + (ResourceCenterResults.config.page * ResourceCenterResults.config.defaultPageSize) + ResourceCenterResults.config.sortString + ResourceCenterResults.config.filterString+ '.'+type ,
                    contentType: 'xml',
                    dataType: 'xml',
                    success: function (result) {
                        searchResultsArea.closest('.hidden').removeClass('hidden');

                        if(searchResultsArea.find('.table').length > 0){
                            searchResultsArea.find('section').remove();
                        } else{
                            searchResultsArea.find('.resource-collection').remove();
                        }

                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            searchResultsArea.closest('section').hide().removeClass('resource-highlight');
                            $('.search-result-pagination').hide();

                        } else {
                            var resultSet = jsonResults.GSP.RES.R;
                            searchResultsArea.closest('section').show().addClass('resource-highlight');
                            var addHighlight = false;
                            var totalResults = jsonResults.GSP.RES.M;
                            (totalResults == 1) ? searchResultsArea.closest('.col-single').find('.result-count').text(totalResults + ' Result') : searchResultsArea.closest('.col-single').find('.result-count').text(totalResults + ' Results');

                            if(ResourceCenterResults.config.moreResults && parseInt(totalResults)  > ResourceCenterResults.config.defaultPageSize){
                                $('.search-result-pagination').show();
                            }

                            $('.resource-center-results').find('.search-result-sort').show();

                            if(totalResults <= 3){
                                searchResultsArea.closest('.col-single').find('.see-more').hide();
                            } else{
                                searchResultsArea.closest('.col-single').find('.see-more').show();

                            }
                            var moreResults = APP.utils.getUrlParameter('moreResults');
                            if(moreResults){
                                searchResultsArea.closest('.col-single').find('.see-more').hide();

                            }

                            ResourceCenterResults.config.resultsCount = totalResults;
                            if(!resultSet.length){
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);

                            }

                            //For each result, pass it to the handlebar variable and append it to the search area
                            for (var i = 0; i < resultSet.length; i++) {
                                if(type.indexOf('patient') > -1){
                                    resultSet[i]['icon-color'] = 'purple';
                                    resultSet[i]['icon'] = 'fa-file-pdf-o';
                                } else if( type.indexOf('podcast') > -1){
                                    resultSet[i]['icon-color'] = 'green';
                                    resultSet[i]['icon'] = 'fa-microphone';
                                } else if(type.indexOf('news') > -1){
                                    resultSet[i]['icon-color'] = 'orange';
                                    resultSet[i]['icon'] = 'fa-file-o';

                                }

                                if(i % 3 === 0){
                                    if(i > 0){
                                        searchResultsArea = searchResultsArea.parent();
                                    }

                                    if(searchResultsArea.closest('.publication-articles').length > 0 || searchResultsArea.closest('.videos').length > 0){
                                        searchResultsArea = $('<section class="table"></section>').appendTo(searchResultsArea);
                                    } else{
                                        searchResultsArea = $('<section class="resource-collection"></section>').appendTo(searchResultsArea);
                                    }

                                    if(ResourceCenterResults.config.fullPageResults){
                                        addHighlight = true;
                                        searchResultsArea.addClass('highlight');
                                    }
                                }

                                searchResult = $(searchTemplate(resultSet[i]));
                                searchResult.appendTo(searchResultsArea);

                            }

                            if(resultSet.length%3 === 1){
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);

                            } else if(resultSet.length%3 === 2){
                                $('<div class="cell-inner-f cell-full-height"></div>').appendTo(searchResultsArea);
                            }


                            if(ResourceCenterResults.config.moreResults){
                                ResourceCenterResults.updatePaginationNumbers();
                            }

                        }

                        $('.resource-highlight').removeClass('apply');
                        $('.resource-highlight').each(function (index) {
                            if (index % 2 === 0) { /* we are even */ } else {
                                $(this).addClass('apply');
                            }
                        });

                        ResourceCenterResults.initializeVideoResults();
                    },
                    error: function(){
                        ResourceCenterResults.errorProcedure(ResourceCenterResults.config.searchType === 'vanilla');
                    }
                });

            },

            addViewMoreHandlers: function(){
                var $resultsSection = $('#resource-center-results');
                $resultsSection.find('.see-more').each(function(){
                    var $this = $(this);
                    $this.on('click',function(){
                        window.location.href = window.location.pathname + '?q=' +APP.utils.getUrlParameter('q') + '&moreResults=' + $this.data('section') + '&filters=' + ResourceCenterResults.config.filterString.substring(ResourceCenterResults.config.filterString.indexOf('(') , ResourceCenterResults.config.filterString.length);
                    });
                });
            },

            /*
             *
             * Click handlers for the pagination links.
             * Clicks will update the config.page variable to the new page and call the method to get pagination results
             *
             */
            addPaginationHandlers: function () {
                $('.search-result-pagination .pagination-number').on('click', function () {
                    var $this = $(this);
                    $('.search-result-pagination .pagination-number.active').removeClass('active');
                    $this.addClass('active');
                    ResourceCenterResults.config.page = parseInt($this.text()) - 1;
                    ResourceCenterResults.updateResults();
                    ResourceCenterResults.updatePaginationNumbers();

                });

            },
            /*
             *
             * Update the numbers for pagination after user has selected a new page. This is done to keep 9 numbers in the page list
             *
             */
            updatePaginationNumbers: function () {
                var $moreButton = $('.search-result-pagination .search-results-more');
                var $prevButton = $('.search-result-pagination .search-results-prev');
                $('.search-result-pagination').show();
                $moreButton.hide();
                var numPages = Math.ceil(ResourceCenterResults.config.resultsCount / ResourceCenterResults.config.defaultPageSize);
                var $page;
                var i = 0;
                if (numPages > (1000 / ResourceCenterResults.config.defaultPageSize)) {
                    numPages =  Math.ceil(1000 / ResourceCenterResults.config.defaultPageSize);

                }
                var upperBound = numPages;
                var $paginationLocation = $('.search-result-pagination .pagination');
                $paginationLocation.html('');
                $paginationLocation.show();


                if (ResourceCenterResults.config.page + 1 < 5) {
                    upperBound = 9;
                } else {
                    i = ResourceCenterResults.config.page - 4;
                    if (ResourceCenterResults.config.page + 5 < numPages) {
                        upperBound = ResourceCenterResults.config.page + 5;
                    }
                }

                if(numPages < 9){
                    upperBound = numPages;
                }
                if (i !== 0) {
                    $page = $('<a href="#resource-center-results" class="pagination-number">1</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#resource-center-results" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                }

                for (i; i < upperBound; i++) {
                    if (i === ResourceCenterResults.config.page) {
                        $page = $('<a href="#resource-center-results" class="pagination-number active">' + (i + 1) + '</a>');
                    } else {
                        $page = $('<a href="#resource-center-results" class="pagination-number" >' + (i + 1) + '</a>');
                    }
                    $page.appendTo($paginationLocation);
                }

                if (upperBound < numPages) {
                    $page = $('<a href="#resource-center-results" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#resource-center-results" class="pagination-number">' + numPages + '</a>');
                    $page.appendTo($paginationLocation);
                    $moreButton.show();

                } else {
                    $moreButton.hide();
                }

                if (ResourceCenterResults.config.page + 1 < numPages) {
                    $moreButton.show();
                } else{
                    $moreButton.hide();
                }

                if(numPages <= 1){
                    $moreButton.hide();
                    $paginationLocation.hide();
                }

                if(ResourceCenterResults.config.page === 0){
                    $prevButton.hide();
                } else{
                    $prevButton.show();
                }

                ResourceCenterResults.addPaginationHandlers();
            },

            //Add the keywords in for narrowing results
            initializeKeywords : function(){
                var $keywordWrapper = $('.resource-results-search');
                var initialQuery = APP.utils.getUrlParameter('q');
                var currentTagLevel = ResourceCenterResults.config.currentTagDepth;
                if(currentTagLevel === 0){
                    currentTagLevel = '';
                }

                initialQuery = decodeURIComponent(decodeURIComponent(initialQuery));

                if($keywordWrapper.find('.suggested-keywords').data('resourcekeywordquery')){
                    if(initialQuery){
                        var requiredFieldsString = 'requiredfields=' + initialQuery;
                        ResourceCenterResults.config.keywordResultsFilter = requiredFieldsString;
                    }

                    //Form the keyword string for the GSA query
                    var keywordString = '.(pagetype:publication|pagetype:blog|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
                    if(ResourceCenterResults.config.moreResults){
                        if(ResourceCenterResults.config.moreResultsSection.indexOf('publication') > -1){
                            keywordString =  '.(pagetype:publication|pagetype:blog)'
                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('patient') > -1){
                            keywordString =  '.(pagetype:patient_education)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('video') > -1){
                            keywordString =  '.(videotype:Youtube|videotype:Mediahub)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('podcast') > -1){
                            keywordString =  '.(videotype:podcast)'

                        } else if(ResourceCenterResults.config.moreResultsSection.indexOf('news') > -1){
                            keywordString =  '.(pagetype:news%20articles)'
                        }
                    }

                    var searchUrl = ResourceCenterResults.config.resultsTagQuery;
                    $.ajax({
                        url: searchUrl + ResourceCenterResults.config.filterString + keywordString,
                        contentType: 'xml',
                        dataType: 'xml',
                        success: function (result) {
                            //Convert the XML to JSON and parse it
                            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                            //If the resutls are blank, show the no results text, otherwise show the results
                            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                                $('.suggested-keywords').addClass('slide-up');

                            } else {
                                $('.suggested-keywords .term-block-container').html('');
                                var resultSet = jsonResults.GSP.RES.PARM;

                                if(!resultSet.length){
                                    var temp = resultSet;
                                    resultSet = [];
                                    resultSet.push(temp);

                                }

                                //For each result, pass it to the handlebar variable and append it to the search area
                                var dropdownValues = [];
                                var selectedContainer =  $('.search-wrapper #selected-terms-container');

                                var elementAdded = false;
                                var $selectedTerms = selectedContainer.find('.term-block');

                                var selectedTermArray = [];
                                var usedParents = [];
                                var selectedTag = '';
                                var currentFullVal = '';
                                $selectedTerms.each(function(){
                                    selectedTag = $(this).data('category');
                                    selectedTermArray.push(selectedTag);

                                    currentFullVal =  $(this).data('fullvalue');
                                    if(currentFullVal && currentFullVal.indexOf('___') > -1){
                                        var fullValArray = currentFullVal.substring(currentFullVal.indexOf(':') + 1, currentFullVal.length).split('___');
                                        usedParents = usedParents.concat(fullValArray);
                                    }

                                });



                                //Iterate through results, adding them to the predictive search
                                for (var i = 0; i < resultSet.length; i++) {
                                    if(!resultSet[i].PMT.length){
                                        var temp = resultSet[i].PMT;
                                        resultSet[i].PMT = [];
                                        resultSet[i].PMT.push(temp);
                                    }
                                    var tempDropDownVal = '';
                                    var shouldPush = true;
                                    for (var j = 0; j < resultSet[i].PMT.length; j++) {
                                        var toCheckChildren = true;
                                        for(var p = 0; p < selectedTermArray.length; p++){
                                            if(selectedTermArray[p] === resultSet[i].PMT[j]['@NM']){
                                                toCheckChildren = false;
                                            }
                                        }
                                        if(toCheckChildren) {
                                            if(!resultSet[i].PMT[j].PV.length){
                                                var temp = resultSet[i].PMT[j].PV;
                                                resultSet[i].PMT[j].PV = [];
                                                resultSet[i].PMT[j].PV.push(temp);
                                            }
                                            for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                                tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                                shouldPush = true;
                                                if (shouldPush) {
                                                    for (var q = 0; q < dropdownValues.length; q++) {
                                                        if (tempDropDownVal.indexOf(dropdownValues[q]) > -1){
                                                            shouldPush = false;
                                                        }
                                                    }
                                                    for(var p = 0; p < selectedTermArray.length; p++){
                                                        if(selectedTermArray[p].substring(0,selectedTermArray[p].indexOf(':')) === resultSet[i].PMT[j]['@NM']){
                                                            shouldPush = false;
                                                        }
                                                    }
                                                    if(resultSet[i].PMT[j].PV[m]['@V'].indexOf('___') > -1) {
                                                        var newTagArray = resultSet[i].PMT[j].PV[m]['@V'].split('___');
                                                        for (var p = 0; p < usedParents.length; p++) {
                                                            if (usedParents[p] === newTagArray[newTagArray.length - 1]){
                                                                shouldPush = false;
                                                            }
                                                        }
                                                    } else{
                                                        for (var p = 0; p < usedParents.length; p++) {
                                                            if (usedParents[p] === resultSet[i].PMT[j].PV[m]['@V']){
                                                                shouldPush = false;
                                                            }
                                                        }
                                                    }
                                                    if(shouldPush){
                                                        dropdownValues.push(tempDropDownVal);
                                                        elementAdded = true;

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
                                        var displayValue = '';
                                        if(dropdownValues[i].indexOf('___') > -1){
                                            var splitValue = dropdownValues[i].split('___');
                                            displayValue = splitValue[splitValue.length - 1];
                                        } else{
                                            displayValue = dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length);
                                        }
                                        $('<div class="term-block" data-fullvalue="'+dropdownValues[i]+'" data-category="'+ dropdownValues[i].substring(0,dropdownValues[i].indexOf(':') )+'"><a href="#"><span>'+displayValue+'</span></a></div>').appendTo( $('.suggested-keywords .resource-slick-container'));
                                    }

                                }
                                if(!elementAdded){
                                    $('.suggested-keywords').addClass('slide-up');
                                } else{
                                    $('.suggested-keywords').removeClass('slide-up');
                                }

                                $('#resource-results-suggestions .term-block a').on('click',function(e){
                                    e.preventDefault();
                                    if($('.selected-terms-container .term-block').length < 1){
                                        $('.resource-results-search .search-bar').slideDown('fast');
                                    }
                                    var $this = $(this).parent();
                                    ResourceCenterResults.addSelectedTerm($this.data('fullvalue'));
                                    ResourceCenterResults.config.keywordResultsFilter  = ResourceCenterResults.config.keywordResultsFilter + '.' + $this.data('fullvalue');
                                    $this.remove();
                                });
                                ResourceCenterResults.slickifyAllTerms();

                            }
                        },
                        error: function(){

                        }
                    });
                }

            },

            //Add slick carousel to the selected keywords and suggested keywords
            slickifyAllTerms : function(){

                $('.suggested-keywords .resource-slick-container').each(function(){
                    var $this = $(this);
                    if(typeof $this.getSlick() !== 'undefined' ){
                        $this.unslick();
                    }
                    $this.find('.fa-times').on('click',function(){
                        var $this = $(this);
                        $this.parent().remove();
                        ResourceCenterResults.updateResults();
                    });

                    var resourceSuggestionsConteiner =  $this;
                    var linksContainerWidth = resourceSuggestionsConteiner.outerWidth(true);
                    var linkBoxes = resourceSuggestionsConteiner.find('.term-block');
                    var linkBoxCount = linkBoxes.length;
                    var linkBoxWidth = linkBoxes.outerWidth(true);
                    linkBoxes.each(function(){
                        var $this = $(this);
                        if($this.outerWidth(true) > linkBoxWidth) {
                            linkBoxWidth = $this.outerWidth(true);
                        }
                    });
                    var maxLinkBoxes = Math.floor(linksContainerWidth / linkBoxWidth);
                    $this.slick({
                        dots: false,
                        infinite: false,
                        speed: 300,
                        slidesToShow: maxLinkBoxes,
                        centerMode: false,
                        variableWidth: true,
                        slidesToScroll: maxLinkBoxes
                    });

                });

            },

            addBackButtonHandler: function () {
                $('.back-to-landing').on('click', function (e) {
                    e.preventDefault();
                    window.location.href = window.location.pathname+'?q=' + APP.utils.getUrlParameter('q') + '&filters=' + APP.utils.getUrlParameter('filters');
                });


            },
            //For video resultsm we need to query Media Hub to get the necessary information
            initializeVideoResults : function(){

                //Initialize videos
                $('.blog-summary.video').each(function(){
                    var $this = $(this);

                    var outJson = {
                        id: '',
                        source : '',
                        sourceJson : ''
                    };
                    if($this.data('videotype') && $this.data('videoid')){
                        outJson.id = $this.data('videoid');
                        if($this.data('videotype') === 'Mediahub' || $this.data('videotype') === 'podcast'){
                            outJson.source = 'mediahub';
                            $.ajax({
                                url: ResourceCenterResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.summary-text').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });

                //Initialize podcasts
                $('.collection-item.video').each(function(){
                    var $this = $(this);

                    var outJson = {
                        id: '',
                        source : '',
                        sourceJson : ''
                    };
                    if($this.data('videotype') && $this.data('videoid')){
                        outJson.id = $this.data('videoid');
                        if($this.data('videotype') === 'Mediahub' || $this.data('videotype') === 'podcast'){
                            outJson.source = 'mediahub';
                            $.ajax({
                                url: ResourceCenterResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.summary-text').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('a').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.blog-summary-wrapper').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });
            },
            addSelectedTerm : function(termValue, batch){
                if($('.selected-terms-container .term-block').length < 1){
                    $('.resource-results-search .search-bar').slideDown('fast');
                }
                var selectedContainer =  $('.search-wrapper #selected-terms-container.resource-slick-container');
                if(selectedContainer.find('.slick-track').length > 1){
                    selectedContainer = selectedContainer.find('.slick-track');
                }

                var toAdd = true;
                var selectedTerms = selectedContainer.find('.term-block span');
                selectedTerms.each(function(){
                    if($(this).text() === termValue.substring(termValue.indexOf(':') + 1,termValue.length)){
                        toAdd = false;
                    }
                });

                if(toAdd){
                    termValue = termValue.trim();
                    if(batch){

                        var batchFilters = decodeURIComponent(APP.utils.getUrlParameter('filters').replace(new RegExp('\\+', 'g'), ' ')).trim();
                        batchFilters = batchFilters.replace('\)','');
                        var tempFilters = batchFilters.substring(1,batchFilters.length);
                        tempFilters = tempFilters.split('.');
                        var displayValue = '';
                        if(termValue.indexOf('___') > -1){
                            var splitValue = termValue.split('___');
                            displayValue = splitValue[splitValue.length - 1];
                        } else{
                            displayValue =termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                        }
                        var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');

                        if(termValue == decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q')))){
                            termBlock.appendTo(selectedContainer);
                        } else{
                            termBlock.appendTo(selectedContainer);
                        }
                        for(var i = 0; i < tempFilters.length; i++){
                            var termValue = tempFilters[i];
                            if(termValue.indexOf('___') > -1){
                                var splitValue = termValue.split('___');
                                displayValue = splitValue[splitValue.length - 1];
                            } else{
                                displayValue =termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                            }
                            var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');
                            if(decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q'))).indexOf(termValue) === -1 && APP.utils.getUrlParameter('q').indexOf(termValue) === -1){
                                termBlock.appendTo(selectedContainer);
                            }
                        }
                    } else{
                        if(termValue.indexOf('___') > -1){
                            var splitValue = termValue.split('___');
                            displayValue = splitValue[splitValue.length - 1];
                        } else{
                            displayValue = termValue.substring(termValue.indexOf(':') + 1, termValue.length);
                        }
                        var termBlock = $('<div class="term-block" data-fullvalue="'+termValue+'" data-category="'+termValue.substring(0,termValue.indexOf(':'))+'"><span>'+displayValue.replace(new RegExp('%20', 'g'), ' ')+'</span><a class="remove-term" href="#"><i class="fa fa-times"></i></a></div>');

                        if(termValue == decodeURIComponent(decodeURIComponent(APP.utils.getUrlParameter('q')))){
                            termBlock.appendTo(selectedContainer);
                        } else{
                            termBlock.appendTo(selectedContainer);
                        }

                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        selectedContainer.find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                    }
                    ResourceCenterResults.slickifySelectedTerms();

                    if(batch){
                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        selectedContainer.find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                        APP.ResourceCenterResults.updateResults();
                    } else{
                        APP.ResourceCenterResults.updateResults();
                    }
                }

            },
            slickifySelectedTerms : function(){
                $('.search-wrapper #selected-terms-container').each(function(){
                    var $this = $(this);
                    if(typeof $this.getSlick() !== 'undefined' ){
                        $this.unslick();
                    }
                    $this.find('.remove-term').on('click',function(e){
                        e.preventDefault();
                        var $this = $(this);
                        $this.parent().remove();
                        if(!$('.search-wrapper #selected-terms-container').find('.term-block').length || $('.search-wrapper #selected-terms-container').find('.term-block').length === 0 ){
                            if(APP.ResourceCenterResults.config.landingPageUrl !== undefined && APP.ResourceCenterResults.config.landingPageUrl !== ''){
                                window.location.href = APP.ResourceCenterResults.config.landingPageUrl;
                            }
                        }
                        APP.ResourceCenterResults.config.filterString = '&requiredfields=(';
                        $('.search-wrapper #selected-terms-container').find('.term-block').each(function(){
                            APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + $(this).data('fullvalue') + '.';
                        });
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString.substring(0,APP.ResourceCenterResults.config.filterString.lastIndexOf('.'));
                        APP.ResourceCenterResults.config.filterString = APP.ResourceCenterResults.config.filterString + ')';
                        APP.ResourceCenterResults.updateResults();

                    });

                    var linksContainerWidth = $('#selected-terms-container').outerWidth(true);
                    var linkBoxes = $('#selected-terms-container .term-block');

                    var linkBoxWidth = linkBoxes.outerWidth(true);
                    linkBoxes.each(function(){
                        var $this = $(this);
                        if($this.outerWidth(true) > linkBoxWidth) {
                            linkBoxWidth = $this.outerWidth(true);
                        }
                    });
                    var maxLinkBoxes = Math.floor(linksContainerWidth / linkBoxWidth);
                    $this.slick({
                        dots: false,
                        infinite: false,
                        speed: 300,
                        slidesToShow: maxLinkBoxes,
                        centerMode: false,
                        variableWidth: true,
                        slidesToScroll: maxLinkBoxes
                    });
                    var linkWidth = 0;
                    linkBoxes.each(function(){
                        linkWidth += $(this).outerWidth()
                    });

                    var toShowArrows = false;
                    if(linkWidth > $('#selected-terms-container').width()){
                        toShowArrows = true;
                    }

                    if(!toShowArrows){
                        $('.selected-terms-container button').hide();
                    } else{
                        $('.selected-terms-container button').show();
                    }
                });
            }

        };
    })(APP.ResourceCenterResults || {}); //Fired from APP





    ////////////////////////////////
    // Selected Terms Section
    ////////////////////////////////
    var resourceCenter = APP.ResourceCenterResults;

    resourceCenter.init();




    
    //Add a selected term
    //termValue is term to add
    //boolean batch is to add multiple filters


})(jQuery);
