var archive = (function (window, undefined) {
    'use strict';
    var $el = $('.conquest-archive');
    $(".sorting select").each(function(){
            $(this).wrap("<span class='select-wrapper'></span>");
            $(this).after("<span class='holder'></span>");
        });
    $(".sorting select").change(function(){
            var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
    }).trigger('change');
    var onSort = function () {
        var resultRow = $el.find('.archive-body');
        $el.find('.sorting').on('change', 'select', function (event) {
            var selectedValue = $(this).val();
            switch(selectedValue) {
                case 'showall':
                    resultRow.removeClass('hide');
                break;
                default :
                    $.each(resultRow, function (index, value) {
                        ($(value).hasClass(selectedValue)) ? $(value).removeClass('hide') : $(value).addClass('hide');
                    });
                break;
            }
        });
    }
    var init = function () {
        onSort();
    }
    return {
        init : init
    }
}(window, undefined)).init();