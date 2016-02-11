var validForm = (function () {

    var init = function () {          
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('form').on('submit', _validateForm);
        $('form').on('reset', _removeErrorAll);
        $('form').on('click', 'input, textarea, label', _removeError);  
    };

    //валидация форм с появлением тултипов с подсказкой
    var _validateForm = function (form) {
        var inputs = $(this).find('input, textarea'),
            valid =true;

        _removeErrorAll(); 

        $.each(inputs, function(index, val) {
            var input = $(val),
                val = input.val(),
                childImg = input.parents('.input_group').children('.label_img');

            if(val.length === 0){
                input.addClass('has_error').removeClass('has_succes');
                childImg.addClass('has_error').removeClass('has_succes');                    
                input.before('<div class="error">');
                valid = false;
            } else {
                input.addClass('has_succes').removeClass('has_error');
                childImg.addClass('has_succes').removeClass('has_error');
            }
        });
        
    };

    // удаление тултипов с ошибками
    var _removeError = function () {
        $(this).removeClass('has_error');
        $(this).siblings('.error').remove();
    };

    var _removeErrorAll = function () {
        var form = $('form'),
            inputs = form.find('input, textarea');

         $('.error_message').remove();
         
         $.each(inputs, function () {
                $(this).removeClass('has_error').removeClass('has_succes');
                $(this).parent('label').removeClass('has_error').removeClass('has_succes');
                $('.error').remove();
                
            })
    };

    return {
        init : init,
        removeErrorAll : _removeErrorAll,
        validateForm : _validateForm
    };
    
}) ();

if($('form')) {
    validForm.init();
};

