$(document).ready(function() {
	$('input, textarea').placeholder();
    $('.b-popup').click(PopUpHide);
    $('.b-popup-content').click(function(event){
   event.stopPropagation()});
        $('.socials').clone().appendTo('.wrapper').addClass('socials2').removeClass('socials');
        $('.empty').clone().appendTo('.wrapper');

});

//Функция отображения PopUp
function PopUpShow(){
    $('#popup1').fadeTo(500, 1);   
    $('.op').show();
}
//Функция скрытия PopUp
function PopUpHide(){
    $('#popup1').fadeOut();
    $('.op').hide();
    app.removeErrorAll();
    $('input, textarea').val('');
    $('#fileformlabel').empty();
    document.getElementById('fileformlabel').innerHTML = "Загрузите изображение";
}


$(function() {
    var pull        = $('#pull');
        menu        = $('.nav_list');
        menuHeight  = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function(){
        var w = $(window).width();
        if(w < 769 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });



});


function getName (str){
    if (str.lastIndexOf('\\')){
        var i = str.lastIndexOf('\\')+1;
    }
    else{
        var i = str.lastIndexOf('/')+1;
    }                       
    var filename = str.slice(i);            
    var uploaded = document.getElementById('fileformlabel');
    uploaded.innerHTML = filename;
}

     var app = {

        init : function () {          
            this.setUpListeners();
        },

        setUpListeners: function () {
            $('form').on('submit', app.submitForm);
            $('form').on('reset', app.removeErrorAll);
            $('form').on('click', 'input, textarea, label', app.removeError);  
        },

        submitForm: function (e) {
            e.preventDefault();

            var form = $('form');
            if (app.validateForm(form) === false) return false;
            console.log('submitt!!')

        },

        validateForm: function(form) {
            var inputs = form.find('input, textarea'),
                valid =true;

            app.removeErrorAll(); 

            $.each(inputs, function(index, val) {
                 var input = $(val),
                     val = input.val(),
                     child = input.parents('.input_group').children('div').children('.for_input');
                     childImg = input.parents('.input_group').children('.label_img');

                if(val.length === 0){
                    child.addClass('has_error').removeClass('has_succes');
                    childImg.addClass('has_error').removeClass('has_succes');                    
                    child.parent('div').prepend('<div class="error">');
                    childImg.prepend('<div class="error">');
                    valid = false;
                } else {
                    child.addClass('has_succes').removeClass('has_error');
                    childImg.addClass('has_succes').removeClass('has_error');
                }
            });
            
        },
        removeError: function() {
            $(this).removeClass('has_error');
            $(this).siblings('.error').remove();
        },

        removeErrorAll: function() {
            var form = $('form'),
                inputs = form.find('input, textarea');

             $.each(inputs, function() {
                    $(this).removeClass('has_error').removeClass('has_succes');
                    $(this).parent('label').removeClass('has_error').removeClass('has_succes');
                    $('.error').remove();}
                    )
        },


    }

    app.init();




