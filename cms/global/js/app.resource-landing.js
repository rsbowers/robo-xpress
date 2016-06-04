/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    if($('.resource-center-search').length > 0){
        var $searchWrapper = $('.resource-center-search');
        var $dropdownMenu = $searchWrapper.find('.menu');
        var searchUrl = '/search?entqr=0&sort=meta:Cancer_Type:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=resource_center_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles)';
        var destinationUrl = '/resource-results.html';
        if($searchWrapper.data('resourcepredictivequery')){
            if($searchWrapper.data('destinationurl')){
                destinationUrl = $searchWrapper.data('destinationurl');
            }
            searchUrl = $searchWrapper.data('resourcepredictivequery');
            if(APP.configs.isLocal){
                searchUrl = 'http://dctrlaemweb01.mdanderson.edu/search?entqr=0&sort=meta:diseases:a&num=1&ud=1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&filter=0&client=multi_level_fe&site=mda_aem&getfields=*&requiredfields=(pagetype:publication|pagetype:patient_education|videotype:Youtube|videotype:Mediahub|videotype:podcast|pagetype:news%20articles|pagetype:blog).(-publication:Cancer%20Newsline)';
            }
            $.ajax({
                url: searchUrl ,
                contentType: 'xml',
                dataType: 'xml',
                success: function (result) {
                    //Convert the XML to JSON and parse it
                    var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                    //If the resutls are blank, show the no results text, otherwise show the results
                    if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
                        //Do nothing if we have no results
                    } else {
                        var resultSet = jsonResults.GSP.RES.PARM;
                        if (!resultSet.length) {
                            var temp = resultSet;
                            resultSet = [];
                            resultSet.push(temp);

                        }

                        //For each result, pass it to the handlebar variable and append it to the search area
                        var dropdownValues = [];

                        for (var i = 0; i < resultSet.length; i++) {
                            if (!resultSet[i].PMT.length) {
                                var temp = resultSet[i].PMT;
                                resultSet[i].PMT = [];
                                resultSet[i].PMT.push(temp);

                            }
                            var tempDropDownVal = '';
                            var shouldPush = true;
                            for (var j = 0; j < resultSet[i].PMT.length; j++) {
                                for (var m = 0; m < resultSet[i].PMT[j].PV.length; m++) {
                                    tempDropDownVal = (resultSet[i].PMT[j]['@NM'] + ':' + resultSet[i].PMT[j].PV[m]['@V']).trim();
                                    shouldPush = true;
                                    for(var q = 0; q < dropdownValues.length;q++){
                                        if(dropdownValues[q] === tempDropDownVal){
                                            shouldPush = false;
                                        }
                                    }
                                    if(shouldPush){
                                        dropdownValues.push(tempDropDownVal);
                                    }
                                }

                            }

                        }

                        var displayValue = '';
                        var displayValueArray = [];

                        dropdownValues.sort(function(a,b){
                            var firstVal = a.substring(a.indexOf(':') + 1, a.length);
                            if(firstVal.indexOf('___') > -1){
                                displayValueArray = firstVal.split('___');
                                firstVal = displayValueArray[displayValueArray.length -1];
                            }
                            var secondVal = b.substring(b.indexOf(':') + 1, b.length);
                            if(secondVal.indexOf('___') > -1){
                                displayValueArray = secondVal.split('___');
                                secondVal = displayValueArray[displayValueArray.length -1];
                            }

                            if ( firstVal < secondVal)
                                return -1;
                            if ( firstVal > secondVal)
                                return 1;
                            return 0;

                        });




                        for (var i = 0; i < dropdownValues.length; i++) {

                            displayValue = dropdownValues[i].substring(dropdownValues[i].indexOf(':') + 1, dropdownValues[i].length);
                            if(displayValue.indexOf('___') > -1){
                                displayValueArray = displayValue.split('___');
                                displayValue = displayValueArray[displayValueArray.length -1];
                            }

                            $('<div class="item" data-value="' + dropdownValues[i] + '">' + displayValue + '</div>').appendTo($dropdownMenu);
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
                            window.location.href = destinationUrl + '?q=' + $(this).val();
                        });

                    }
                },
                error: function(){

                }
            });
        }
    }
})(jQuery);
