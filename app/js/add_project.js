var addProject = (function () {

    var init = function () {          
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('form').on('submit', _addProject);
    };

    var _addProject = function (e) {

        e.preventDefault();
 
        var form = $('form'),
            url = 'php/add_project.php',
            server = _ajaxForm(form, url);
    };

    var _ajaxForm = function (form, url) {

        if (validForm.validateForm(form) === false) return false;       
 
        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (ans) {
            if(ans.mes == 'Поля не заполнены'){
                PopErShow();  
            }else{
                PopSuccesShow();
            }
        })
        .fail(function (ans) {
            console.log("Проблемы в РНР");
        });

        return result;        
    };

    return {
        init : init,
    };
    
}) ();

if($('.add_project_form')) {
    addProject.init();
};

