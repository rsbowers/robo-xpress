/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
    'use strict';

    var TabsComponent = (function(Tabs) {
        return Tabs = {
            el: $('.blog-search-filter'),
            init: function () {
                Tabs.ui = {
                    searchMask : Tabs.el.find('.blog-search-mask'),
                    searchBox : Tabs.el.find('.search-field'),
                    showAll : Tabs.el.find('.blog-sort')
                };
                Tabs.ui.searchMask.hover(Tabs.toggleSearch);
                Tabs.ui.searchMask.click(Tabs.toggleSearch);
                Tabs.ui.searchMask.find('.search-icon').on('mousedown',function () {
                    Tabs.ui.searchMask.find('form').submit();
                });
                Tabs.ui.searchBox.on('blur', function(){
                    $('.blog-search.col6').removeClass('expand');
                    Tabs.ui.searchMask.removeClass('reveal');
                });
                Tabs.showAll();
                Tabs.updateShowAll();
            },

            toggleSearch : function () {
                $('.blog-search.col6').addClass('expand');
                Tabs.ui.searchMask.addClass('reveal');
                if ( Tabs.ui.searchMask.hasClass('reveal') ) {
                    Tabs.ui.searchBox.focus();
                } else {
                    Tabs.ui.searchMask.find('.search-wrapper').trigger('clear');
                }
            },
            showAll : function () {
                Tabs.ui.showAll.on('change', 'select', function (event) {
                    var selectedValue = $(this).val();
                    $.each($(this).find('option'), function (index, value) {
                        var findVal = $(this).attr('value');
                        if (findVal === selectedValue) {
                            if (!window.location.origin) {
                              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                            }
                            window.location.replace(window.location.origin + $(this).data('href'));
                        }
                    });

                });
            },
            getParameterByName : function (name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            updateShowAll : function () {
                var val = Tabs.getParameterByName('value') || '';
                if (val != '') {
                    $.each(Tabs.ui.showAll.find('select option'), function (index, value) {
                        var findVal = $(this).attr('value');
                        if (findVal === val) {
                            Tabs.ui.showAll.find('select').val($(this).val());
                        }
                    });
                }
            }
        };
    })(TabsComponent || {}).init();
})(jQuery);
