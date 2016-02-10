var myModule = (function() {

    var init = function () {          
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('form').on('submit', _addProject);
        $('form').on('reset', _removeErrorAll);
        $('form').on('click', 'input, textarea, label', _removeError);  
    };

    var _submitForm = function (e) {
        e.preventDefault();
        var form = $('form');
        if (_validateForm(form) === false) return false;
    };

    var _addProject = function (e) {
        console.log('добавление проекта');
        e.preventDefault();

        var form = $(this),
            url = 'add_project.php',
            server = _ajaxForm(form, url);

        console.log(data);

        server.done(function(ans){
            console.log(ans);
            if (ans.text === 'ok') {
                console.log(ans.text);
                form.find('.popup_succes').show();            
            }else{
                console.log(ans.text);
                form.find('.popup_error').show(); 
            }

        })
    };

    var _ajaxForm = function (form, url) {
        

        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        }).fail(function(ans) {
            console.log("Проблемы в РНР");
            form.find('.popup_error').show();
        });

        return result;        

    };


    //валидация форм с появлением тултипов с подсказкой
    var _validateForm = function(form) {
        var inputs = form.find('input, textarea'),
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
    var _removeError = function() {
        $(this).removeClass('has_error');
        $(this).siblings('.error').remove();
    };

    var _removeErrorAll = function() {
        var form = $('form'),
            inputs = form.find('input, textarea');

         $.each(inputs, function() {
                $(this).removeClass('has_error').removeClass('has_succes');
                $(this).parent('label').removeClass('has_error').removeClass('has_succes');
                $('.error').remove();}
                )
    };

    return {
        init : init,
        removeErrorAll : _removeErrorAll
    };
    
}) ();

myModule.init();
