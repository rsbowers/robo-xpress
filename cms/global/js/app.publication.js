/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */


(function($) {
    'use strict';

    $('.publication-subscribe .subscribe-cta').not('.external').on('click', function (event) {
        var formContainer = $(this).parent().parent().find('.subscribe-form-container');
        event.preventDefault();

        if (formContainer.hasClass('collapse')) {
            formContainer.slideDown('slow');

            formContainer.removeClass('collapse');
            formContainer.addClass('extended');
            $(this).find('.fa-minus').removeClass('hidden');
            $(this).find('.fa-plus').addClass('hidden');

        } else if (formContainer.hasClass('extended')) {
            formContainer.slideUp('slow');
            formContainer.addClass('collapse');
            formContainer.removeClass('extended');

            $(this).find('.fa-minus').addClass('hidden');
            $(this).find('.fa-plus').removeClass('hidden');

        } else {
            formContainer.slideDown('slow');
            formContainer.addClass('extended');
            formContainer.removeClass('collapse');


        }

    });

    $('.publication-subscribe-bar').each(function () {
        var formContainer = $(this);
        formContainer.find('.subscribe-cta').on('click',function(event){    
          
            event.preventDefault();

            if (formContainer.hasClass('collapse')) {
                formContainer.removeClass('collapse');
                formContainer.addClass('extended');
                $(this).find('.fa-minus').removeClass('hidden');
                $(this).find('.fa-plus').addClass('hidden');
                $('.subscribe-form-container').show();

            } else if (formContainer.hasClass('extended')) {
                formContainer.addClass('collapse');
                $('.subscribe-form-container').hide();
                formContainer.removeClass('extended');
                $(this).find('.fa-minus').addClass('hidden');
                $(this).find('.fa-plus').removeClass('hidden');
            } else {
                formContainer.addClass('extended');
                $('.subscribe-form-container').show();
                $(this).find('.fa-minus').removeClass('hidden');
                $(this).find('.fa-plus').addClass('hidden');
            }
        });


    });

    var submitToBronto = function(form) {
        var posted = $.post(form.attr('action'), form.serialize());
        var $formContainer = form.parent();
        posted.done(function(response){
            var error = $($.parseHTML(response)).filter('.warning');
            console.log(error);
            if (error.length) {
                $formContainer.find('.error-message').text($(error).text().trim());
                $formContainer.find('.error-message').show();
            } else {
                $formContainer.find('.success-message').show();
                $formContainer.addClass('success');
                form.hide();
                $formContainer.find('.error-message').hide();
            }
        });
    };

    $('.pub-subscribe-form').each(function(){
        $(this).submit(function(event) {
            event.preventDefault();
            submitToBronto($(this));

        });
    });

    $('.subscribe-form-container .input-group input').on('focus',function(){

        $(this).closest('.input-group').addClass('has-value');

    });

    $('.subscribe-form-container .input-group label').on('click',function(){

        $(this).closest('.input-group').addClass('has-value');
        $(this).closest('.input-group').find('input').focus();

    });

    $('.subscribe-form-container .input-group input').on('blur',function(){

        var text_val = $(this).val();

        if(text_val === "") {

            $(this).closest('.input-group').removeClass('has-value');

        } else {

            $(this).closest('.input-group').addClass('has-value');

        }

    });
    

})(jQuery);




