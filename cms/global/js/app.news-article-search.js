/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ($) {
    'use strict';

    var TabsComponent = (function (Tabs) {
        return Tabs = {
            el: $('.news-article-search'),

            init: function () {
                Tabs.ui = {
                    searchMask: Tabs.el.find('.news-article-search-mask'),
                    searchBox: Tabs.el.find('.search-field'),
                    clickTarget: null
                };

                Tabs.ui.searchMask.hover(Tabs.toggleSearch);
                Tabs.ui.searchMask.click(Tabs.toggleSearch);

                $(document).mousedown(function (e) {
                    Tabs.ui.clickTarget = $(e.target);
                });

                Tabs.ui.searchBox.on('blur', function () {
                    if($('.news-article-search-mask').has(Tabs.ui.clickTarget).length < 1){
                        Tabs.ui.searchMask.removeClass('reveal');
                        Tabs.ui.searchBox.val('');
                    }
                });
            },

            toggleSearch: function () {

                if (Tabs.ui.searchMask.hasClass('reveal')) {
                    Tabs.ui.searchBox.focus();
                } else {
                    Tabs.ui.searchMask.addClass('reveal');
                    Tabs.ui.searchBox.focus();
                    Tabs.ui.searchMask.find('.search-wrapper').trigger('clear');
                }

            }

        };
    })(TabsComponent || {}).init();
})(jQuery);
