var contactMe = (function () {

    var init = function () {          
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('form').on('submit', _submitForm); 
    };

    var _submitForm = function (e) {

        e.preventDefault();
        $('.error_message').remove();

        var form = $(this),
            url = 'php/contact_me.php',
            url2 = 'php/send.php',
            server = _ajaxForm(form, url),
            mail = _ajaxSend(form, url2);
    };

    var _ajaxSend = function (form, url) {
   
        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        });

        return result;  
              
    };



    var _ajaxForm = function (form, url) {

        server = form.serialize(); 

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: server,
            success: function (msg) {
                    console.log(msg);
                    $('form').before('<div class="error_message">');
                    $('.error_message').text(msg.mes);

                    if(msg.st === 'ok'){
                        $('button[type=reset]').click();
                        $('form').before('<div class="error_message">');
                        $('.error_message').text(msg.mes);
                        $('.error_message').addClass('text_succes');
                    }
                }
        }).fail(function (ans) {
            console.log("Проблемы в РНР contact");
        });

        return result;        

    };

    return {
        init : init
    };
    
}) ();

if($('.contact_form')) {
    contactMe.init();
};

