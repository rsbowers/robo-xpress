/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';

    $('.blog-sidebar-nav').each(function(){
        var $this = $(this);
        var $contentWrapper = $('.blog-sidebar-nav').find('ul');
        var landingUrl = $this.data('blogsidebarlandingurl');
        var query = $this.data('blogsidebarquery');
        var cancerTopicBase = $this.data('cancertopicbasetagstring');
        var diseaseBase = $this.data('diseasebasetagstring');

        if(cancerTopicBase === undefined){
            cancerTopicBase = "/category/etc/tags/md-anderson/cancer-topics/"
        }
        if(diseaseBase === undefined){
            diseaseBase = "/category/etc/tags/md-anderson/diseases/";
        }



        if(APP.configs.isLocal){
            query = 'http://www.mdanderson.org' + query;
        }

        $.ajax({
            url: query,
            contentType: "xml",
            dataType: "xml",
            success: function (result) {

                //Convert the XML to JSON and parse it
                var jsonResults = JSON.parse(APP.utils.xml2json(result, '\t'));

                //If the resutls are blank, show the no results text, otherwise show the results
                if (jsonResults.GSP.RES != undefined &&  jsonResults.GSP.RES.length != 0) {
                    if(jsonResults.GSP.RES && jsonResults.GSP.RES.PARM && jsonResults.GSP.RES.PARM.PMT) {
                        if (!jsonResults.GSP.RES.PARM.PMT.length) {

                            var temp = jsonResults.GSP.RES.PARM.PMT;
                            jsonResults.GSP.RES.PARM.PMT = [];
                            jsonResults.GSP.RES.PARM.PMT.push(temp);

                        }
                        for (var i = 0; i < jsonResults.GSP.RES.PARM.PMT.length; i++) {
                            if(!jsonResults.GSP.RES.PARM.PMT[i].PV.length){
                                var temp = jsonResults.GSP.RES.PARM.PMT[i].PV;
                                jsonResults.GSP.RES.PARM.PMT[i].PV = [];
                                jsonResults.GSP.RES.PARM.PMT[i].PV.push(temp);

                            }

                            if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'cancer-topics'){
                                var $parent = $('<li class="parent-link"><a href="'+landingUrl+'">'+jsonResults.GSP.RES.PARM.PMT[i]['@DN']+'<i class="fa fa-minus dd-extended-icon"></i><i class="fa fa-plus dd-collapsed-icon"></i></a></a></li>');
                                $parent.appendTo($contentWrapper);
                                var $child = $('<div><ul class="child-level"></ul></div>');
                                $child.appendTo($parent);
                                $child = $child.find('ul');
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    $('<li><a href="'+landingUrl+cancerTopicBase+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].replace(new RegExp('[ ]{2,}', 'g'), ' ').replace(new RegExp(' ', 'g'), '-').toLowerCase()+'">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+' ('+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@C']+')</a></li>').appendTo($child);

                                }
                            }
                            if(jsonResults.GSP.RES.PARM.PMT[i]['@NM'] == 'diseases'){
                                var $diseaseParent = $('<li class="parent-link"><a href="'+landingUrl+'">'+jsonResults.GSP.RES.PARM.PMT[i]['@DN']+'<i class="fa fa-minus dd-extended-icon"></i><i class="fa fa-plus dd-collapsed-icon"></i></a></a></li>');
                                $diseaseParent.appendTo($contentWrapper);
                                var $diseaseChild = $('<div><ul class="child-level"></ul></div>');
                                $diseaseChild.appendTo($diseaseParent);
                                $diseaseChild = $diseaseChild.find('ul');
                                for(var j = 0; j < jsonResults.GSP.RES.PARM.PMT[i].PV.length; j++){
                                    $('<li><a href="'+landingUrl+diseaseBase+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V'].replace(new RegExp('[ ]{2,}', 'g'), ' ').replace(new RegExp(' ', 'g'), '-').toLowerCase()+'">'+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@V']+' ('+jsonResults.GSP.RES.PARM.PMT[i].PV[j]['@C']+')</a></li>').appendTo($diseaseChild);
                                }
                            }
                        }

                        var pageUrl = window.location.href;
                        $contentWrapper.find('.child-level li').each(function(){
                            var $this = $(this);
                            var $anchor = $this.find('a');
                            if($anchor.attr('href').indexOf(pageUrl) > -1){
                                $anchor.addClass('active');
                                $this.closest('.parent-link').addClass('expanded');
                            }
                        });


                        $contentWrapper.find('.parent-link > a').on('click',function(e){
                            e.preventDefault();
                            e.stopPropagation();
                            var $this = $(this);
                            $this.closest('.parent-link').toggleClass('expanded');
                        })
                    }
                }
            }
        });
    });

})(jQuery);