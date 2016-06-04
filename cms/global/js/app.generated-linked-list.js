/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

var generated_link_list = (function (window, undefined) {
    var $el = $('.link-list-body');

    var generateQuery = function (linkListBody) {
        var searchQuery = new Array();

        if(APP.configs.isLocal){
             $(linkListBody).each(function(i){
                searchQuery.push('http://d1prlaemweb01.mdanderson.edu'+ $(linkListBody).eq(i).data('attribute-query'));
            })
        }else {
            $(linkListBody).each(function(i){
                searchQuery.push($(linkListBody).eq(i).data('attribute-query'));
            })
        }
        for (var i = 0; i <= searchQuery.length; i++) {
            if($(linkListBody).eq(i).data('attribute-style') !=undefined){
                 getGSAResults(linkListBody, searchQuery[i], i, true);
            }
            else{
                 getGSAResults(linkListBody, searchQuery[i], i, null);
            }
        }
    }
    var getGSAResults = function (linkListBody, queryString, queryLenth, queryStyle ) {
        $.ajax({
            url: queryString,
            contentType: 'xml',
            dataType: 'xml',
            success: function (result) {
                var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {

                } else {
                    var handleBarTemplate = APP.Templates.generated_linked_list;
                    var $domWrapper = '';

                    if(queryStyle) {
                        $(linkListBody).eq(queryLenth).find('ul').addClass('linked-list-border');
                        $domWrapper = $(linkListBody).find('ul.linked-list-border')

                    }
                     else {

                         $domWrapper = $(linkListBody).find('ul').eq(queryLenth);
                     }

                    var resultSet = jsonResults.GSP.RES.R;
                    var searchResult;
                    if(!resultSet.length){
                        var temp = resultSet;
                        resultSet = [];
                        resultSet.push(temp);
                    }
                    $domWrapper.empty();

                    for (var i = 0; i < resultSet.length; i++) {
                        searchResult = $(handleBarTemplate(resultSet[i]));
                        searchResult.appendTo($domWrapper);
                    }
                }

            }
        });
    };
    var init = function (argument) {
        $.each($el, function (index, value) {
            generateQuery(value);
        })
    }
    return {
        init : init
    }
}(window, undefined)).init();
