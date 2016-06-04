/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


    $.fn.relatedResults = function(  options ) {
      var relatedResultsMostRecentQuery = $(this).attr('relatedResultsMostRecentQuery');
      var relatedStoryQueryString = $(this).attr('relatedStoryQueryString');
      if(APP.configs.isLocal){
        relatedResultsMostRecentQuery = 'https://www.mdanderson.org/search?site=mda_aem_prod&getfields=*&output=xml_no_dtd&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&client=publications_fe&requiredfields=pagetype:publication&num=5&partialfields';
      }

      var relatedResultsWrapper = $(this);

      var getRelatedResults = function (queryString, firstRun) {
        $.ajax({
          url: queryString,
          contentType: 'xml',
          dataType: 'xml',
          success: function (result) {
            //Convert the XML to JSON and parse it
            var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

            //If the results are blank, fire a query for most recent, else fire a query
            if (jsonResults.GSP.RES === undefined || jsonResults.GSP.RES.length === 0) {
              //If this is the first time we have checked, look for the most recent, otherwise there are no results for either scenario
              if(firstRun){
                getRelatedResults(relatedResultsMostRecentQuery, false);
              } else{
                //No results for related or most recent
                var $relatedResultsWrapper = relatedResultsWrapper.find('ul');
                $relatedResultsWrapper.empty();
              }
            } else {
              var relatedResultsTemplate;


              if(relatedResultsWrapper.data('relatedresultslisttype')){
                if(relatedResultsWrapper.data('relatedresultslisttype') == 'publication'){
                  relatedResultsTemplate = APP.Templates.related_posts_publication;
                } else if (relatedResultsWrapper.data('relatedresultslisttype') == 'blogs'){
                  relatedResultsTemplate =APP.Templates.related_posts_blogs;
                } else if(relatedResultsWrapper.data('relatedresultslisttype') == 'news'){
                  relatedResultsTemplate =APP.Templates.related_posts_news;
                } else{
                  relatedResultsTemplate =APP.Templates.related_posts_news;
                }
              } else{
                relatedResultsTemplate = APP.Templates.related_posts_publication;
              }
              var $relatedResultsWrapper = relatedResultsWrapper.find('ul');

              var resultSet = jsonResults.GSP.RES.R;
              var searchResult;
              if(!resultSet.length){
                var temp = resultSet;
                resultSet = [];
                resultSet.push(temp);
              }
              //clear placeholders from area
              $relatedResultsWrapper.empty();
              //For each result, pass it to the handlebar variable and append it to the search area
              var minResultLength = 1;
              for (var i = resultSet.length-1; i >= minResultLength; i--) {
                if (resultSet[i].U === window.location.href) {
                  minResultLength = 0;
                  continue;
                }
                searchResult = $(relatedResultsTemplate(resultSet[i]));
                searchResult.appendTo($relatedResultsWrapper);
              }

              var dateElement = $('.related-posts .publish-date');
              dateElement.each(function(){
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
                var from = $(this).text().split("-");
                $(this).text(month[from[1]-1] + ' ' + from[2].trim() + ', ' + from[0])
              });

              var titleElements = $('.related-posts .link-title');
              titleElements.each(function(){
                APP.utils.truncateText($(this),{xlarge: 50, large: 50, medium: 50, small: 50, xsmall: 50});
              });

              $('.related-posts .link-body').each(function(){
                var $this = $(this);
                $this.text($this.text().replace('Skip to Content. ...',''));
                $this.text($this.text().replace('Skip to Content.',''));
              });

            }

          }
        });
      };

      var getMetaData = function (metaName) {
        var metaResult = '';
        if ($("meta[name='" + metaName + "']").length > 0) {
          var metaContent = $("meta[name='" + metaName + "']").attr('content');
          if (metaContent.indexOf(',') >= 0 ) {
            metaContent = metaContent.split(',');
            $.each(metaContent, function (index, value) {
              metaResult += metaName + ':' + value + '|';
            })
          } else {
            metaResult = metaName + ':' + metaContent + '|';
          }
        }
        return metaResult;
      };

      var showRelatedPost = function () {
        var relatedResultsPageTag = '',
            publicationMetaDataValue = getMetaData('publication');
        relatedResultsPageTag += $.trim('partialfields=' + getMetaData('audience') + getMetaData('cancer-topics') +  getMetaData('diseases') + getMetaData('publication'));



        if (relatedResultsPageTag !== '') {
          relatedStoryQueryString += '&' + relatedResultsPageTag.slice(0, relatedResultsPageTag.length - 1);
          if(window.otherPostFilter !== undefined) {
            relatedStoryQueryString += window.otherPostFilter;
          }
          getRelatedResults(relatedStoryQueryString, true);
        } else {
          //load most recent
          if(window.otherPostFilter !== undefined)
            relatedResultsMostRecentQuery += window.otherPostFilter;

          getRelatedResults(relatedResultsMostRecentQuery, false);
        }
      };
      showRelatedPost();
      return this;
    };

    //Blog related-posts functionality
    $('.link-list.related-posts').each(function(){
      $(this).relatedResults();
    });


}( jQuery ));


