/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';



    APP.SearchResults = (function (SearchResults) {
        var $searchPageWrapper = $('#search-page');
        var $resultsSearchBar = $('.search-results-search-bar');
        var $searchResultsBlock = $('#search-result-block');
        var $searchResultsSort = $('.search-result-sort');
        var queryString = '';
        var $searchResultsPagination = $('.search-result-pagination');
        var $showingInsteadMessage = $searchPageWrapper.find('.showing-instead');
        var $noResultsMessage = $searchPageWrapper.find('.no-results');
        var $searchResultsCount = $('.search-result-count');
        var $suggestedContent = $('.search-content .suggested-content');
        var $commonSearchTerms = $('.common-search-terms');
        var $mobileCommonSearchTerms = $('.mobile-common-search-terms');
        var $paginationMoreButton = $searchResultsPagination.find('.search-results-more');
        var $paginationPrevButton = $searchResultsPagination.find('.search-results-prev');
        var $noResultsSuggestion = $('.no-results-suggestion');
        var $searchResultsSummary = $searchPageWrapper.find('.search-result-summary');
        var $suggestedResults = $('.suggested-content .suggested-results');
        var $navSearchWrapper = $('#nav-search-wrapper');
        var $searchInsteadText = $searchPageWrapper.find('.search-instead');


        return SearchResults = {

            $el: $('#search-results-block'),

            /*
             * Initialize Search results URL and Handlebar variables
             *
             */
            init: function () {



                if ($searchPageWrapper !== undefined && $searchPageWrapper.length > 0) {

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
                    SearchResults.config = {
                        page: 0,
                        defaultPageSize: 10,
                        searchResultTemplate: APP.Templates.search_results_template,
                        didYouMeanTemplate: APP.Templates.did_you_mean_template,
                        suggestedResultTemplate: APP.Templates.suggested_results_template,
                        filterCheckboxTemplate: APP.Templates.search_filter_checkbox_template,
                        filterRadiobtnTemplate: APP.Templates.search_filter_radio_template,
                        relatedSearchTemplate: APP.Templates.related_searches_template,
                        radioBtnString: 'gsaentity_Results Type',
                        showingResultsTemplate: APP.Templates.showing_results_template,
                        noResultsTemplate: APP.Templates.no_results_template,
                        searchInsteadTemplate: APP.Templates.search_instead_template,
                        mediaHubApiUrl : '/api/publiccatalog/v1/',
                        sortString: '',
                        filterString: '',
                        frontEndString: 'mda_aem_fe',
                        searchType: 'vanilla',
                        origin:'',
                        baseFilterString: '&requiredfields=',
                        initialSpelling: '',
                        misspellResultsFound: false,
                        mobileFilterText: 'None',
                        baseMobileFilterText: 'None',
                        usedFilters : '',
                        shouldAnchor : false,
                        hash : '',
                        lockHash : false

                    };

                    //If the number of search results has been authored, overwrite hardcoded value
                    if ($searchPageWrapper.data('numsearchresultsreturn') !== undefined) {
                        SearchResults.config.defaultPageSize = $searchPageWrapper.data('numsearchresultsreturn') ;
                    }

                    //Local configuration used for development
                    if (APP.configs.isLocal) {
                        SearchResults.config.searchResultsUrl = 'http://www.mdanderson.edu/search?site=mda_aem_prod&output=xml_no_dtd&getfields=*&filter=0&getfields=*&tlen=160&' + '&num=' + SearchResults.config.defaultPageSize;
                        SearchResults.config.resultClickUrl = 'http://explore.mdanderson.org' + searchResultClickAnalyticsUrl;
                        SearchResults.config.mediaHubApiUrl = 'https://www.mdanderson.edu' + SearchResults.config.mediaHubApiUrl;
                    } else {
                        SearchResults.config.searchResultsUrl = window.searchResultsUrl + '&num=' + SearchResults.config.defaultPageSize;
                        SearchResults.config.resultClickUrl = $('<div/>').html(searchResultClickAnalyticsUrl).text();
                    }

                    SearchResults.config.noResultsCopyData = decodeURIComponent($searchPageWrapper.data('noresultscopy'));
                    SearchResults.config.numResultsCopy = decodeURIComponent($searchPageWrapper.data('numresultscopy'));
                    SearchResults.config.numSearchResultsReturn = decodeURIComponent($searchPageWrapper.data('numsearchresultsreturn'));
                    SearchResults.config.didYouMeanTextCopy = decodeURIComponent($searchPageWrapper.data('didyoumeantextcopy'));
                    SearchResults.config.commonSearchedTerms = decodeURIComponent($searchPageWrapper.data('commonsearchedterms'));
                    SearchResults.config.relatedSearchLabel = decodeURIComponent($searchPageWrapper.data('relatedsearchlabel'));
                    SearchResults.config.searchInsteadText = decodeURIComponent($searchPageWrapper.data('searchinsteadtext'));
                    SearchResults.config.suggestionLabel = decodeURIComponent($searchPageWrapper.data('suggestionlabel'));
                    SearchResults.config.showingInsteadCopy = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));
                    SearchResults.config.noQuerySearchLabel = $resultsSearchBar.data('noquerysearchlabel');
                    SearchResults.config.querySearchLabel = $resultsSearchBar.data('searchlabel');

                    // Get the URL Parameter for the type
                    var searchType = APP.utils.getUrlParameter('searchType');
                    if(!searchType){
                        searchType = "allresults";
                        SearchResults.config.searchType = 'vanilla';
                    }

                    // Get the URL Parameter for the search param and call render
                    var searchQuery = APP.utils.getUrlParameter('q');
                    if(searchQuery === undefined){
                        searchQuery = '';

                    }

                    //Here we set the Front end string and base filter string depending on the type of search
                    if ($searchResultsBlock.length > 0) {
                        //If we have a specified search type, initialize the values for GSA
                        if(searchType){
                            var queryVal = APP.utils.getUrlParameter('q');
                            if(queryVal === undefined){
                                queryVal = '';
                            } else{
                                try{
                                    queryVal = decodeURIComponent(queryVal);
                                } catch(e){
                                    console.log('malformed queryVal');
                                }
                            }

                            //Update text in the placeholder with the query
                            if(queryVal === ''){
                                if(SearchResults.config.noQuerySearchLabel !== undefined){
                                    $resultsSearchBar.find('.placeholder').text((SearchResults.config.noQuerySearchLabel.replace('(dynquery)',queryVal)));
                                }
                            } else {
                                if(SearchResults.config.querySearchLabel !== undefined){
                                    $resultsSearchBar.find('.placeholder').text((SearchResults.config.querySearchLabel.replace('(dynquery)',queryVal)));
                                }
                            }

                            //GSA settings and stype changes for specific searches
                            if(searchType === 'clinical%20trials' || searchType === 'Clinical%20Trials' || searchType === 'clinical%20trial' || searchType === 'Clinical%20Trial' || searchType === 'clinical trials' || searchType === 'clinical trial'){
                                SearchResults.config.searchType = 'clinical trials';
                                SearchResults.config.frontEndString = 'clinical_trial_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:clinical trial';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = "Result Type";
                                SearchResults.config.noSearchQuery = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));
                                SearchResults.config.showingInsteadCopy = decodeURIComponent($searchPageWrapper.data('showinginsteadcopy'));

                                $resultsSearchBar.each(function(){
                                    $(this).clinicalTrialsSearch($(this).data('clinicaltrialstypeaheadquery'));

                                });


                            } else if(searchType == 'blogs' || searchType == 'Blogs' || searchType == 'Blog' || searchType == 'blog'){
                                SearchResults.config.searchType = 'blogs';
                                SearchResults.config.frontEndString = 'blog_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:blog';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('blogtypeaheadquery'), 'blogs');
                                });


                            } else if(searchType === 'publications'  || searchType === 'Publications' || searchType === 'publication'  || searchType === 'Publication'){
                                SearchResults.config.searchType = 'publications';
                                SearchResults.config.frontEndString = 'publications_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:publication';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('publicationtypeaheadquery'), 'publication');
                                });

                            } else if(searchType == 'news'  || searchType == 'News' || searchType == 'news%20articles' || searchType == 'news articles'){
                                SearchResults.config.searchType = 'news';
                                SearchResults.config.frontEndString = 'news_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:news articles';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                $resultsSearchBar.each(function(){
                                    $(this).searchForm($(this).data('newstypeaheadquery'), 'news');
                                });
                            } else if(searchType == 'patient-education'){
                                $('#global-header').hide();
                                $('.pre-footer').hide();
                                $('footer').find('.stay-connected').hide();
                                $('footer').find('.footer-links').hide();
                                $('footer').find('.sublink-container').hide();
                                $('.appointment-bar').hide();
                                $('.search-results-sort-relevant').removeClass('active');
                                $('.alphabet_sort').removeClass('hidden');

                                $searchResultsBlock.addClass('patient-education');

                                SearchResults.config.searchType = 'patient-education';
                                SearchResults.config.frontEndString = 'pe_aem_fe';
                                SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'gsaentity_File%20Types:Pdf';
                                SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                SearchResults.config.baseMobileFilterText = 'Result Type';
                                SearchResults.config.sortString = '&sort=meta:title';
                                if($searchPageWrapper.data('patienteducationquery')){
                                    SearchResults.config.searchResultsUrl = decodeURIComponent($searchPageWrapper.data('patienteducationquery'));
                                    if(APP.configs.isLocal){
                                        SearchResults.config.searchResultsUrl = 'https://www.mdanderson.org' + SearchResults.config.searchResultsUrl;
                                    }
                                }
                                $('.search-results-search-bar').each(function(){
                                    $(this).searchForm($(this).data('patiendeducationtypeaheadquery'), 'patient-education#search-header');
                                });
                            } else{
                                $('#search-page').addClass('generic');

                                //Generic Search
                                if(searchType === 'allresults'){

                                } else{
                                    SearchResults.config.baseFilterString = SearchResults.config.baseFilterString+'pagetype:'+searchType;
                                    SearchResults.config.filterString = SearchResults.config.baseFilterString;
                                    $('#'+searchType).prop('checked','true')
                                }

                            }


                        } else {
                            SearchResults.config.searchType = 'vanilla';
                        }


                        try{
                             queryString = decodeURIComponent(searchQuery);
                        } catch(e){
                             queryString = searchQuery;
                        }

                        //Open the search tray by default on this page
                        if(SearchResults.config.searchType === 'vanilla'){
                            $('#nav-search-toggle').trigger('click');
                            SearchResults.showSpecificSearchHeader(queryString);
                        } else{
                            SearchResults.showSpecificSearchHeader(queryString);
                        }

                        // Get the URL Parameter for the origin
                        var origin = APP.utils.getUrlParameter('origin');
                        if ($searchResultsBlock.length > 0) {
                            if(origin && origin === 'filter'){
                                SearchResults.config.origin = origin;
                            } else {
                                SearchResults.config.origin = 'landing';
                            }
                        }

                        SearchResults.render(queryString);
                    }

                    // After everything has been built, add in the handlers for search
                    if ($searchResultsSort.length > 0) {
                        SearchResults.addSortingHandlers();
                    }
                }
            },


            render: function (query) {
                //Assign specific text for the current search string
                if(SearchResults.config.querySearchLabel != undefined){
                    $navSearchWrapper.find('.search-message').text((SearchResults.config.querySearchLabel.replace('(dynquery)',queryString)));
                    $('#nav-search .search-field').val(queryString);
                }

                //Assign the mobile display text
                $('.search-results-filters .mobile-filter-text').text(SearchResults.config.baseMobileFilterText);

                //Initialize the suggestion text with authored value
                $noResultsSuggestion.html(SearchResults.config.suggestionLabel);


                //Get the Search Results
                SearchResults.getSearchResults(query, true);
            },


            /*
             *
             * Get the search results given a query param. Only runs of first load OR on change of sorting
             *
             *
             */
            getSearchResults: function (query, firstRun) {
                var searchResult;
                var tempQuery = '';

                $searchResultsPagination.hide();

                // Store the query sting in the config obkect
                SearchResults.config.queryString = query;

                //Clear out any search results already there
                $searchResultsBlock.html('');

                if(!firstRun){
                    //Show the loading icon
                    SearchResults.showLoader();
                }


                tempQuery = '&q=' + query;
                if(query === ''){
                    tempQuery = '';
                    SearchResults.config.queryString = '';
                }
                SearchResults.parseHash();

                $.ajax({
                    url: SearchResults.config.searchResultsUrl + "&start=" + (SearchResults.config.page * SearchResults.config.defaultPageSize) + tempQuery + "&client="+SearchResults.config.frontEndString + SearchResults.config.sortString + SearchResults.config.filterString ,
                    contentType: "xml",
                    dataType: "xml",
                    success: function (result) {

                        //Convert the XML to JSON and parse it
                        var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                        //If the resutls are blank, show the no results text, otherwise show the results
                        if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                            SearchResults.addFilters(jsonResults);
                            SearchResults.initFilterMenu().init();
                            SearchResults.addFilterListeners();

                            //If there are spelling suggestions, fire off a separate query to pull results
                            if (jsonResults.GSP.Spelling !== undefined && !APP.utils.getUrlParameter('forceSpelling')) {
                                $showingInsteadMessage.html('');
                                if(SearchResults.config.searchType === 'vanilla'){
                                    var showingResultsTemplate = SearchResults.config.showingInsteadCopy.replace('(dynquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+$('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text()+'">'+$('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()+'</a>').html())

                                } else{
                                    var showingResultsTemplate = SearchResults.config.showingInsteadCopy.replace('(dynquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+$('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text()+'&searchType='+SearchResults.config.searchType+'">'+$('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()+'</a>').html())

                                }
                                $showingInsteadMessage.html(showingResultsTemplate);
                                SearchResults.config.initialSpelling = query;
                                SearchResults.getSearchResults($('<div/>').html($('<div/>').html(jsonResults.GSP.Spelling.Suggestion['#text']).text()).text(), true);
                            } else {
                                $noResultsMessage.html('');
                                var noResultsTemplate = SearchResults.config.noResultsCopyData;
                                noResultsTemplate = noResultsTemplate.replace('(query)', query);
                                $('<p/>').text(noResultsTemplate).appendTo($noResultsMessage);
                                $noResultsSuggestion.show();
                                $searchResultsSummary.hide();
                                $('.search-sidebar').addClass('mobile-hidden');

                            }

                            //Hide pagination
                            $paginationMoreButton.hide();
                            $searchResultsCount.html('No Results');
                            $suggestedContent.addClass('hidden');


                            //Set the common search terms
                            var commonSearchTerms = $commonSearchTerms.data('terms');
                            if(APP.configs.isLocal){
                                commonSearchTerms = 'cancer,chemo,cancer2,chemo2,cancer3,chemo3';
                            }
                            //Add common search terms to the HTML
                            if(SearchResults.config.searchType !== 'patient-education'){
                                if(commonSearchTerms && $commonSearchTerms.html().indexOf('</a>') === -1){
                                    var terms = commonSearchTerms.split(',');
                                    var htmlEle = '';
                                    for(var i = 0; i < terms.length;i++){
                                        if(i%2 === 0){
                                            htmlEle += '<a class="even" href="'+window.location.pathname+'?q='+terms[i]+'">'+terms[i]+'</a> ';
                                        } else{
                                            htmlEle += '<a class="odd" href="'+window.location.pathname+'?q='+terms[i]+'">'+terms[i]+'</a> ';
                                        }

                                    }
                                    $('<div/>').html(htmlEle).appendTo($commonSearchTerms);
                                    $('<div/>').html(htmlEle).appendTo($mobileCommonSearchTerms);

                                    $commonSearchTerms.show();
                                    $mobileCommonSearchTerms.show();
                                    $('.search-filter-hide').hide();
                                }
                            }


                            SearchResults.initSuggestions(jsonResults);


                        } else {
                            $('.search-sidebar').removeClass('mobile-hidden');
                            $searchResultsSummary.css({'display':'table'});
                            $noResultsMessage.html('');
                            $commonSearchTerms.find('div').html('');
                            $commonSearchTerms.hide();
                            $mobileCommonSearchTerms.hide();
                            $('.search-filter-hide').show();
                            $noResultsSuggestion.hide();
                            $searchResultsSummary.removeClass('hidden');

                            //Set the number of results in the page
                            SearchResults.config.resultsCount = jsonResults.GSP.RES['M'];
                            var tempResultCount = SearchResults.config.resultsCount;
                            if (parseInt(tempResultCount) === 1) {
                                var text = $.trim(numResultsCopy.replace(new RegExp('\\(total\\)', 'g'), SearchResults.config.resultsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
                                text = text.substring(0, (text.length - 1));
                                $searchResultsCount.html(text);

                            } else {
                                $searchResultsCount.html(numResultsCopy.replace(new RegExp('\\(total\\)', 'g'), SearchResults.config.resultsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
                            }


                            var resultSet = jsonResults.GSP.RES.R;

                            //If we are forcing spelling, ignore any spelling mistakes
                            var forceSpelling = APP.utils.getUrlParameter('forceSpelling');
                            if(forceSpelling && forceSpelling === 'true'){
                                $('.did-you-mean').html('');
                                $showingInsteadMessage.html('');
                                if(SearchResults.config.misspellResultsFound){
                                    var searchInsteadTemplate = SearchResults.config.searchInsteadText;
                                    var $searchInsteadSection = $searchInsteadText;
                                    $searchInsteadSection.html('');
                                    searchInsteadTemplate = searchInsteadTemplate.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true">'+SearchResults.config.initialSpelling+'</a>').html());
                                    $searchInsteadSection.html(searchInsteadTemplate);
                                }
                            } else{

                                //Set the Search Instead text if there is a spelling mistake
                                if(SearchResults.config.initialSpelling !== '' && !SearchResults.config.misspellResultsFound){
                                    $noResultsMessage.html('');
                                    var searchInsteadText = SearchResults.config.searchInsteadText;
                                    searchInsteadText = searchInsteadText.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true"></a>').html());
                                    $('<div/>').html(searchInsteadText).appendTo($noResultsMessage);
                                    $noResultsMessage.find('a').text(SearchResults.config.initialSpelling);
                                } else if(SearchResults.config.initialSpelling !== '' && SearchResults.config.misspellResultsFound){
                                    var searchInsteadTemplate = SearchResults.config.searchInsteadText;
                                    $searchInsteadText.html('');
                                    searchInsteadTemplate = searchInsteadTemplate.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+SearchResults.config.initialSpelling+'&forceSpelling=true">'+SearchResults.config.initialSpelling+'</a>').html());
                                    $searchInsteadText.html(searchInsteadTemplate);
                                }

                                if (jsonResults.GSP.Spelling !== undefined) {
                                    var didYouMeanSection = $('.did-you-mean');
                                    didYouMeanSection.html('');
                                    var didYouMeanTextCopy = SearchResults.config.didYouMeanTextCopy;
                                    var insertText = jsonResults.GSP.Spelling.Suggestion['@q'];
                                    didYouMeanTextCopy = didYouMeanTextCopy.replace('(dymquery)',$('<div/>').html('<a href="'+window.location.pathname+'?q='+jsonResults.GSP.Spelling.Suggestion['@q']+'&forceSpelling=true"></a>').html());
                                    var didYouMeanDiv = $('<div/>').html(didYouMeanTextCopy);
                                    didYouMeanDiv.find('a').text(insertText);
                                    didYouMeanDiv.appendTo(didYouMeanSection);

                                } else {
                                    $('.did-you-mean').html('');
                                }
                            }

                            //If there is only one result, turn it into an array
                            if(!resultSet.length){
                                var temp = resultSet;
                                resultSet = [];
                                resultSet.push(temp);
                            }

                            //For each result, pass it to the handlebar variable and append it to the search area
                            $searchResultsBlock.html('');
                            for (var i = 0; i < resultSet.length; i++) {
                                searchResult = $(SearchResults.config.searchResultTemplate(resultSet[i]));

                                if(SearchResults.config.queryString !== '' && searchResult.find('.search-result-details').html().indexOf('<b>') === -1){
                                    searchResult.find('.search-result-details .search-result-details').html(searchResult.find('.search-result-details .search-result-details').html().replace(new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g'), '<b>'+query+'</b>'));
                                    searchResult.find('.search-result-details .search-result-details').html(searchResult.find('.search-result-details .search-result-details').html().replace(new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").charAt(0).toUpperCase() + query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").slice(1), 'g'), '<b>'+query.charAt(0).toUpperCase() + query.slice(1)+'</b>'));
                                }
                                searchResult.appendTo($searchResultsBlock);

                            }

                            //On the first run, add filters and initialize all the handlers to ensure it is not done multiple times
                            if (firstRun) {
                                SearchResults.addSuggestionHandler();
                                SearchResults.addFilters(jsonResults);
                                SearchResults.initFilterMenu().init();
                                SearchResults.initSuggestions(jsonResults);
                                SearchResults.addFilterListeners();
                                SearchResults.addRelatedSearches(jsonResults);

                                //More button click event
                                $paginationMoreButton.on('click', function (e) {
                                    e.preventDefault();
                                    var $activeNumber = $('.search-result-pagination .pagination-number.active');
                                    var $nextPage = $activeNumber.next();
                                    $activeNumber.removeClass('active');
                                    $nextPage.addClass('active');
                                    SearchResults.config.page++;
                                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);
                                    SearchResults.getSearchResults(SearchResults.config.queryString, false);

                                });
                                $paginationPrevButton.on('click', function (e) {
                                    e.preventDefault();
                                    var $activeNumber = $('.search-result-pagination .pagination-number.active');
                                    var $nextPage = $activeNumber.prev();
                                    $activeNumber.removeClass('active');
                                    $nextPage.addClass('active');
                                    SearchResults.config.page--;
                                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);
                                    SearchResults.getSearchResults(SearchResults.config.queryString, false);
                                });

                                $(window).bind('hashchange', function(e) {
                                    if(!SearchResults.config.lockHash && SearchResults.config.hash !== '#_'){
                                        $('#search-filter .term-block.extra-filter').each(function(){
                                            $(this).remove();
                                        });
                                        SearchResults.setHash('',false);
                                    }
                                });

                                //If clinical trials, mark open as selected
                                if(SearchResults.config.searchType === 'clinical trials' && $('#open').length){
                                    $('.search-result-count').html('');
                                    $('#open').prop('checked','true');
                                    $('#open').trigger('click');
                                    $('.init-search-loader').addClass('hidden');
                                    return;
                                }

                            } else {
                                SearchResults.addFilters(jsonResults);
                                SearchResults.addFilterListeners();
                                SearchResults.initFilterMenu().init();

                                if(SearchResults.config.shouldAnchor && SearchResults.config.searchType !== 'patient-education'){
                                    //location.href = "#search-page";
                                } else{
                                    SearchResults.config.shouldAnchor = true;
                                }

                            }

                            SearchResults.updatePaginationNumbers();
                            SearchResults.updateDates();
                            SearchResults.addResultClickHandlers();
                            SearchResults.initializeVideoResults();
                        }
                        $('.search-filter-radio').attr('disabled', false);
                        SearchResults.hideLoader();
                        SearchResults.config.lockHash = false;
                    },
                    error: function(){
                        SearchResults.errorProcedure(SearchResults.config.searchType === 'vanilla');
                    }
                });

            },

            showLoader: function () {
                $('#search-page .loader').removeClass('hidden');
            },

            hideLoader: function () {
                $('#search-page .loader').addClass('hidden');
                $('.init-search-loader').addClass('hidden');
            },

            /*
             *
             * Pass the facet search object from GSA into the handlebar
             */
            addFilters: function (jsonResults) {
                var facet;
                var radioBtnTemplate = SearchResults.config.filterRadiobtnTemplate;
                var searchFilterContainer = $('.search-sidebar #search-filter');
                searchFilterContainer.find('.mda-custom-dd').each(function(){
                    $(this).remove();
                });
                if(SearchResults.config.origin === 'filter'){
                    if(SearchResults.config.searchType !== 'vanilla'){
                        $('.col-search-filter .term-block span').first().text(SearchResults.config.searchType);
                        $('.col-search-filter .term-block').show();
                    }
                }
                //Since we have converted to JSON, we must access the data using JSON notation
                if(jsonResults.GSP.RES && jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
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
                        if(SearchResults.config.usedFilters.length === 0 || SearchResults.config.usedFilters.indexOf( '|' + facet['@NM']) === -1) {
                            //If this is a phase, switch out the lower case i and v for uppercase values.
                            if (facet['@NM'] === 'phase') {
                                for (var j = 0; j < facet.PV.length; j++) {
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace(new RegExp('i', 'g'), 'I');
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace(new RegExp('v', 'g'), 'V');
                                }
                            }

                            //For physicians, we must reorder the names and sort them alpha numeric
                            if (facet['@NM'] === 'physician') {
                                var physicianArray = [];
                                for(var j = 0; j < facet.PV.length; j++){
                                    physicianArray.push(SearchResults.convertPhysicianName(facet.PV[j]['@V']));
                                }
                                physicianArray.sort();
                                for (var j = 0; j < physicianArray.length; j++) {
                                    facet.PV[j]['@V'] = physicianArray[j]
                                }
                            }

                            if (facet['@NM'] === 'pagetype' || facet['@NM'] === 'pageType') {
                                for (var j = 0; j < facet.PV.length; j++) {
                                    facet.PV[j]['@V'] = facet.PV[j]['@V'].replace('_', ' ')
                                }
                                var $facet = $(radioBtnTemplate(facet));
                                $facet.addClass('result-types').addClass('extended').appendTo(searchFilterContainer);

                            } else {
                                var $facet = $(radioBtnTemplate(facet));
                                if (facet['@NM'] === SearchResults.config.radioBtnString || true) {
                                    $facet.appendTo(searchFilterContainer);
                                } else {
                                    $facet.appendTo(searchFilterContainer);
                                }
                            }
                        }
                    }

                    //If a section has more than 8 filters, add scrolling
                    $('#search-filter .mda-custom-dd-list').each(function(){
                        if($(this).find('li').length > 8){
                            $(this).addClass('scroll');
                        } else{
                            $(this).removeClass('scroll');
                        }
                    });

                    $('.mda-custom-dd.result-types').find('.search-filter-radio').each(function(){
                        $(this).data('facetname','pagetype');
                    })
                }

                //Close all filters if we are on mobile
                if(APP.utils.getViewport().size === 'medium' || APP.utils.getViewport().size === 'small' || APP.utils.getViewport().size === 'xsmall'){
                    $('#search-filter .mda-custom-dd').removeClass('extended');
                }

                if(SearchResults.config.searchType === 'clinical trials'){
                    $('#search-filter .mda-custom-dd').removeClass('extended');
                    $('#allresultsenrollment_status').closest('.mda-custom-dd').addClass('extended');
                }
            },


            /*
             *
             * Click handlers for the pagination links.
             * Clicks will update the config.page variable to the new page and call the method to get pagination results
             *
             */
            addPaginationHandlers: function () {
                $('.search-result-pagination .pagination-number').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    $('.search-result-pagination .pagination-number.active').removeClass('active');
                    $this.addClass('active');
                    SearchResults.config.page = parseInt($this.text()) - 1;
                    SearchResults.setHash('page|page:'+SearchResults.config.page,true);


                });
            },

            /*
             *
             * Update the numbers for pagination after user has selected a new page. This is done to keep 9 numbers in the page list
             *
             */

            updatePaginationNumbers: function () {
                var numPages = Math.ceil(SearchResults.config.resultsCount / SearchResults.config.defaultPageSize);
                var $page;
                var i = 0;
                if (numPages > (1000 / SearchResults.config.defaultPageSize)) {
                    numPages = Math.ceil(1000 / SearchResults.config.defaultPageSize);

                }
                var upperBound = numPages;
                var $paginationLocation = $('.search-result-pagination .pagination');
                $paginationLocation.html('');

                if(APP.utils.getViewport().size !== 'small' && APP.utils.getViewport().size !== 'xsmall' && APP.utils.getViewport().size !== 'medium'){
                    $paginationLocation.show();
                }


                if (SearchResults.config.page + 1 < 5) {
                    upperBound = 9;
                } else {
                    i = SearchResults.config.page - 4;
                    if (SearchResults.config.page + 5 < numPages) {
                        upperBound = SearchResults.config.page + 5;
                    }
                }

                if(numPages < 9){
                    upperBound = numPages;
                }

                if (i !== 0) {
                    $page = $('<a href="#search-page" class="pagination-number">1</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#search-page" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                }

                for (i; i < upperBound; i++) {
                    if (i === SearchResults.config.page) {
                        $page = $('<a href="#search-page" class="pagination-number active">' + (i + 1) + '</a>');
                    } else {
                        $page = $('<a href="#search-page" class="pagination-number" >' + (i + 1) + '</a>');
                    }
                    $page.appendTo($paginationLocation);
                }

                if (upperBound < numPages) {
                    $page = $('<a href="#search-page" class="pagination-number-elip">...</a>');
                    $page.appendTo($paginationLocation);
                    $page = $('<a href="#search-page" class="pagination-number">' + Math.floor(numPages) + '</a>');
                    $page.appendTo($paginationLocation);
                    $paginationMoreButton.show();

                } else {
                    $paginationMoreButton.hide();
                }

                if (SearchResults.config.page + 1 < numPages) {
                    $paginationMoreButton.show();

                }

                if(numPages === 1){
                    $('.search-result-pagination').hide();
                } else{
                    $('.search-result-pagination').show();
                }

                if(SearchResults.config.page === 0){
                    $paginationPrevButton.hide();
                } else{
                    $paginationPrevButton.show();
                }


                SearchResults.addPaginationHandlers();
            },


            /*
             *
             * Handlers for sorting will alter the config.sortString to change the way results are ordered
             *
             */
            addSortingHandlers: function () {
                $('.search-results-sort-date').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').addClass('active');
                    $('.search-results-sort-title').removeClass('active');
                    $('.search-results-sort-relevant').removeClass('active');
                    SearchResults.config.sortString = '&sort=date:D:S:d1';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                });

                $('.search-results-sort-title').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').removeClass('active');
                    $('.search-results-sort-relevant').removeClass('active');
                    $('.search-results-sort-title').addClass('active');
                    SearchResults.config.sortString = '&sort=meta:title';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                });

                $('.search-results-sort-relevant').on('click', function () {
                    SearchResults.config.page = 0;
                    $('.search-results-sort-date').removeClass('active');
                    $('.search-results-sort-title').removeClass('active');
                    $('.search-results-sort-relevant').addClass('active');
                    SearchResults.config.sortString = '';
                    SearchResults.getSearchResults(SearchResults.config.queryString);
                })

            },

            escapeHtml : function(text) {
                return text.replace(/\./g, "%2E")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/%/g, "%25");
            },

            /*
             * Add filter events to update the search results and the filterString variable
             *
             */

            addFilterListeners: function () {
                var $radioButtons = $('.search-filter-radio');

                $('.col-search-filter .term-block i').first().on('click',function(){
                    window.location.href = window.location.pathname + '?q=' + SearchResults.config.queryString;

                });

                $radioButtons.unbind('click');
                $radioButtons.on('click', function (ev) {
                    var facetName = $(ev.target).data('facetname');
                    var facetValue = $(ev.target).attr('value');

                    $('.search-result-pagination').hide();
                    var shouldReload = false;

                    //If we are changing the search type, we need to reload the page to show the specific headers
                    if($('.mda-custom-dd.result-types').find('.search-filter-radio:checked').length > 0) {
                        var searchType = $('.mda-custom-dd.result-types').find('.search-filter-radio:checked')[0].value;
                        shouldReload = searchType === 'clinical trials' || searchType === 'Clinical Trials' || searchType === 'clinical trial' || searchType === 'Clinical Trial' ||
                            searchType == 'blogs' || searchType == 'Blogs' || searchType == 'Blog' || searchType == 'blog' ||
                            searchType === 'publications' || searchType === 'Publications' || searchType === 'publication' || searchType === 'Publication' ||
                            searchType == 'news' || searchType == 'News' || searchType == 'news articles' || searchType == 'news article';
                    }

                    if($(this).closest('.result-types').length > 0 && shouldReload){
                        window.location.href = window.location.pathname + '?q=' + SearchResults.config.queryString + '&searchType=' + $('.mda-custom-dd.result-types').find('.search-filter-radio:checked')[0].value + '&origin=filter';

                    } else{
                        if(facetName.indexOf('physician') > -1){
                            facetValue = SearchResults.convertPhysicianName(facetValue);

                        }


                        SearchResults.addTermBlock(facetName,facetValue);

                        SearchResults.config.page = 0;

                        SearchResults.setHash('filter|' + facetName + ':' + facetValue, true);

                    }


                });

            },

            /*
             * On the click of a result, fire an event before redirecting the user
             */
            addResultClickHandlers: function () {

                $('#search-result-block .search-result:not(.video) a').on('click', function (event) {
                    var $this = this;
                    var $jqThis = $(this);
                    if($jqThis.attr('target') !== '_blank'){
                        event.preventDefault();
                    }
                    var ajaxURL = SearchResults.config.resultClickUrl + '&ct=c&q=' + SearchResults.config.queryString + '&url=' + $this.href + '&r='+$($this).closest('.search-result').data('index');
                    $.ajax({
                        url: ajaxURL,
                        success: function () {
                            if($jqThis.attr('target') !== '_blank'){
                                window.location.href = $this.href;
                            }
                        },
                        error: function(){
                            if($jqThis.attr('target') !== '_blank'){
                                window.location.href = $this.href;
                            }
                        }
                    });


                });
            },


            addSuggestionHandler: function () {
                $('#suggested-content-more').on('click', function (event) {
                    event.preventDefault();

                    if ($suggestedContent.hasClass('collapse')) {
                        $suggestedContent.removeClass('collapse');
                        $suggestedContent.addClass('extended');
                    } else if ($suggestedContent.hasClass('extended')) {
                        $suggestedContent.addClass('collapse');
                        $suggestedContent.removeClass('extended');
                    } else {
                        $suggestedContent.addClass('extended');
                    }

                });
            },

            initFilterMenu: function () {
                var Dropdown;
                return Dropdown = {
                    $el: $('.mda-custom-dd'),

                    init: function () {
                        Dropdown.$el.each(Dropdown.render);
                    },

                    render: function () {
                        var $dropdown = $(this),
                            $ddLink = $dropdown.find('.mda-custom-dd-link'),
                            $ddList = $dropdown.find('.mda-custom-dd-list');

                        $ddLink.unbind('click');
                        $ddLink.on('click', function (e) {
                            e.preventDefault();

                            $dropdown.toggleClass('extended');
                        });

                    }
                };
            },

            /*
             * Perform the necessary logic for keymatch
             * If the text has keymatch in the URL, request the HTML snippet, otherwise use the provided data
             */
            initSuggestions: function (jsonResults) {
                var suggestedTemplate = SearchResults.config.suggestedResultTemplate;
                if (jsonResults.GSP.GM !== undefined) {
                    var suggestions = jsonResults.GSP.GM;
                    var addedSuggestion = false;

                    if (suggestions.length > 1) {
                        for (var i = 0; i < suggestions.length; i++) {
                            if(suggestions[i].GL.indexOf('keymatch') > -1){
                                if(suggestions[i].GL.indexOf(window.location.host) > -1){
                                    addedSuggestion = true;
                                    SearchResults.getHtmlSnippet(suggestions[i].GL);
                                }
                            } else {
                                addedSuggestion = true;
                                $(suggestedTemplate(suggestions[i])).appendTo($suggestedResults);
                            }
                        }
                    } else {
                        if(suggestions.GL.indexOf('keymatch') > -1){
                            if(suggestions.GL.indexOf(window.location.host) > -1){
                                addedSuggestion = true;
                                SearchResults.getHtmlSnippet(suggestions.GL);
                            }
                        } else {
                            addedSuggestion = true;
                            $(suggestedTemplate(suggestions)).appendTo($suggestedResults);
                        }
                    }
                    if(addedSuggestion === true){
                        if($('#suggested-content-more').data('limit') === undefined){
                            $('#suggested-content-more').data('limit',3);
                        }

                        if($('#suggested-content-more').data('limit') > suggestions.length || suggestions.length === undefined){
                            $('#suggested-content-more').hide();
                        } else{
                            var maxHeight = 61 + 124 * $('#suggested-content-more').data('limit');
                            $suggestedContent.css({'max-height': maxHeight + 'px'})
                        }
                        $suggestedContent.removeClass('hidden');
                    }
                }
            },

            addRelatedSearches: function (jsonResults) {
                if (jsonResults.GSP.Synonyms !== undefined) {
                    var synonyms = jsonResults.GSP;
                    $(SearchResults.config.relatedSearchTemplate(synonyms)).appendTo($('.search-sidebar #search-filter'));
                }


            },


            /*
             * Request the new HTML Snippet for keymatch
             */
            getHtmlSnippet : function(url){
                $.get( url, function( data ) {
                    var re = /<a.*search-result(.|\n)*<\/a>/g;
                    var match = re.exec(data);
                    if(match !== null){
                        var temp = $( '<div/>' ).html( match );
                        temp.appendTo($suggestedResults);
                    }

                });
            },


            //This logic adds in the headers for blogs, publications, and clinical trials search
            showSpecificSearchHeader : function(queryString){
                var searchBar = $('.search-wrapper.search-results-search-bar');
                var pageHeader = $('.page-header');
                var header = '';
                var icon = 'fa-user-md';

                if(SearchResults.config.searchType === 'blogs'){
                    header = 'Blogs: ';
                    searchBar.addClass('blogs');
                    searchBar.find('.form-search-submit').addClass('blogs');
                    icon = 'mda-icon-blog';
                }else if(SearchResults.config.searchType === 'clinical trials'){
                    header = 'Clinical Trials: ';
                    searchBar.addClass('clinical-trials');
                    searchBar.find('.form-search-submit').addClass('clinical-trials');
                    icon = 'mda-icon-clinical_trials_new';

                }else if(SearchResults.config.searchType === 'publications'){
                    header = 'Publications: ';
                    searchBar.addClass('publications');
                    searchBar.find('.form-search-submit').addClass('publications');
                    icon = 'mda-icon-publications';
                }else if(SearchResults.config.searchType === 'news'){
                    header = 'News: ';
                    searchBar.addClass('news');
                    searchBar.find('.form-search-submit').addClass('news');
                    icon = 'mda-icon-news';
                }else if(SearchResults.config.searchType === 'patient-education'){
                    header = 'Patient Education: ';
                    searchBar.addClass('patient-education');
                    searchBar.find('.form-search-submit').addClass('patient-education');
                    icon = 'mda-icon-recommendedpages';
                } else{
                    header = "Search Results: ";
                    searchBar.addClass('vanilla');
                    searchBar.find('.form-search-submit').addClass('vanilla');
                    searchBar.addClass('mda-show-md');

                }

                searchBar.find('.search-field').on('focus',function() {
                    $(this).select();
                });

                $navSearchWrapper.find('.search-field').on('focus',function() {
                    $(this).select();
                });
                $navSearchWrapper.find('.search-field').blur();

                searchBar.find('.search-field').val(queryString);

                pageHeader.parent().css({'width':'100%'});
                pageHeader.addClass('search-results');
                pageHeader.find('.page-header-title').addClass('with-icon')
                $('<i class="fa fa-3x header-icon"></i>').addClass(icon).prependTo(pageHeader);
                $('<h1/>').text(header).appendTo(pageHeader.find('.page-header-title'));
                $('<span/>').text(queryString).appendTo(pageHeader.find('.page-header-title'));

                searchBar.removeClass('hidden');
                if(SearchResults.config.searchType !== 'vanilla'){
                    $('.search-page-header-wrapper').removeClass('hidden');
                }
                if(SearchResults.config.searchType === 'patient-education'){
                    $('.search-results-search-bar').find('.search-field').first().focus();
                }

            },

            errorProcedure: function(searchOpen){
                $('.searchError').removeClass('hidden');
                if(!searchOpen){
                    $('#nav-search-toggle').trigger('click');
                }
                $('#search-page').hide();
            },

            initializeVideoResults : function(){
                $('.search-result.video').each(function(){
                    var $this = $(this);
                    $this.find('a').on('click',function(event){
                        $(this).unbind('click');
                        event.preventDefault();
                        var ajaxURL = SearchResults.config.resultClickUrl + '&ct=c&q=' + SearchResults.config.queryString + '&url=' + $this.href + '&r='+$($this).data('index');
                        $.ajax({
                            url: ajaxURL,
                            success: function () {
                            }
                        });
                    });

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
                                url: SearchResults.config.mediaHubApiUrl + $this.data('videoid') ,
                                contentType: 'json',
                                dataType: 'json',
                                success: function (result) {
                                    result[0].description = $this.find('.search-result-desc').html();
                                    outJson.sourceJson = (result[0]);
                                    $this.find('.search-result-details').addClass('video-play-button').data('video-data',outJson);
                                    $this.mdaJWPlayer(true);


                                },
                                error: function(){

                                }
                            });
                        } else{
                            outJson.source = 'youtube';
                            $this.find('.search-result-details').addClass('video-play-button').data('video-data',outJson);
                            $this.mdaJWPlayer(true);
                        }
                    }

                });
            },

            updateDates : function(){
                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";
                var dateElement = $('.search-result-date');
                dateElement.each(function() {
                    var from = $(this).text().split("-");
                    if(from.length > 1)
                        $(this).html(month[from[1] - 1] + ' ' + from[2].trim() + ', ' + from[0])
                });
            },

            parseHash : function(){
                var hash = window.location.hash;
                var hashArray = hash.split(',');
                var maxPage = 0;
                var filterString = '';
                SearchResults.config.usedFilters = '';
                SearchResults.config.filterString = '';
                var addTermBlocks = ($('#search-filter').find('.term-block').length === 0 && SearchResults.config.searchType === 'vanilla') || ($('#search-filter').find('.term-block').length === 1 && SearchResults.config.searchType !== 'vanilla');
                for(var i = 0; i < hashArray.length; i++){
                    var hashItem = hashArray[i];
                    var hashType = hashItem.substring(0,hashItem.indexOf('|'));
                    var hashValue = hashItem.substring(hashItem.indexOf('|')+1,hashItem.length);
                    if(hashType.indexOf('page') > -1){
                        var page = parseInt(hashValue.substring(hashValue.indexOf(':') + 1,hashValue.length));
                        maxPage = page;

                    } else if(hashType.indexOf('filter') > -1){
                        var facetName = hashValue.substring(0,hashValue.indexOf(':'));
                        var facetValue = hashValue.substring(hashValue.indexOf(':') + 1,hashValue.length);
                        SearchResults.config.usedFilters = SearchResults.config.usedFilters + '|' + facetName;
                        filterString = filterString + SearchResults.escapeHtml(hashValue) + '.';
                        if(addTermBlocks){
                            SearchResults.addTermBlock(facetName,facetValue);
                        }
                    }
                }
                SearchResults.config.page = maxPage;
                if(filterString.length > 0){
                    if(SearchResults.config.baseFilterString === '&requiredfields='){
                        SearchResults.config.filterString = SearchResults.config.baseFilterString + filterString.substring(0,filterString.length -1)
                    } else{
                        SearchResults.config.filterString = SearchResults.config.baseFilterString + '.' + filterString.substring(0,filterString.length -1)

                    }
                } else{
                    if(SearchResults.config.baseFilterString !== '&requiredfields='){
                        SearchResults.config.filterString = SearchResults.config.baseFilterString;
                    }
                }

            },

            addTermBlock: function(facetName, facetValue){
                if(facetName.indexOf('physician') > -1){
                    facetValue = SearchResults.convertPhysicianName(facetValue);
                }
                $('#search-filter .term-block').last().after($('<div class="term-block extra-filter" data-facetname="'+facetName+'" data-index="1" style="display:block"><span>'+facetValue+'</span><i class="fa fa-times"></i></div>'));
                $('.term-block.extra-filter i').each(function(){
                    var $this = $(this);
                    $this.unbind('click');
                    $this.on('click',function(){
                        var removalFacetName = $this.closest('.term-block').data('facetname');
                        var removalFacetValue = $this.closest('.term-block').text();
                        $this.closest('.term-block').remove();
                        SearchResults.setHash('filter|' + removalFacetName + ':' + removalFacetValue, false, true);

                    })
                })
            },

            setHash : function(updateValue, isAdd, isTermBlock){
                SearchResults.config.lockHash = true;
                var hash = window.location.hash;

                if(isAdd){
                    if(hash.length > 0){
                        SearchResults.config.hash = (hash + ',' + updateValue).replace('#_,','#');
                        location.href = SearchResults.config.hash;
                    } else{
                        SearchResults.config.hash = '#' + updateValue;
                        location.href = SearchResults.config.hash;
                    }
                } else{
                    var tempHashString = '';
                    var hashArray = hash.split(',');
                    if(updateValue.indexOf('physician:') > -1){
                        var firstHalf = updateValue.substring(0,updateValue.indexOf(':'));
                        var secondHalf = updateValue.substring(updateValue.indexOf(':')+1, updateValue.length);
                        updateValue = firstHalf + ':' + SearchResults.convertPhysicianName(secondHalf)
                    }
                    for(var i = 0; i < hashArray.length; i++){
                        hashArray[i] = hashArray[i].replace('#','');
                        if(hashArray[i] === updateValue){

                        } else{
                            tempHashString = tempHashString + ',' + hashArray[i];
                        }
                    }
                    SearchResults.config.hash = '#' + tempHashString;
                    SearchResults.config.hash = SearchResults.config.hash.replace('#,','#').replace('#_,','#');
                    if(SearchResults.config.hash.length > 2){
                        location.href = SearchResults.config.hash;

                    } else {
                        if(isTermBlock){
                            location.href = '#_';
                        }
                    }
                }
                SearchResults.getSearchResults(SearchResults.config.queryString, false);

            },
            convertPhysicianName : function(name){
                var tempName = '';
                if(name.indexOf(',') > -1){

                    var valArray = name.split(' ');
                    for(var i = 1; i < valArray.length; i++){
                        if(valArray[i] !== ','){
                            tempName = tempName + valArray[i] + ' ';
                        }
                    }
                    tempName = tempName + valArray[0].replace(',','');
                    return tempName;

                } else{

                    var tempNameArr = [];
                    tempNameArr = name.split(' ');
                    tempName = tempNameArr[tempNameArr.length - 1] + ',';
                    for (var g = 0; g < tempNameArr.length - 1; g++) {
                        tempName = tempName + ' ' + tempNameArr[g];
                    }

                    return tempName;
                }

            }
        };
    })(APP.SearchResults || {}); //Fired from APP
})(jQuery);