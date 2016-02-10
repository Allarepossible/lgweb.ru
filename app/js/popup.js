//Функция отображения PopUp
function PopUpShow(){
    $('#popup').fadeTo(500, 1); 
    $('.add_project_form').show();     
    $('.op').show();
};
//Функция скрытия PopUp
function PopUpHide(){
    $('#popup').fadeOut();
    $('.op').hide();
    myModule.removeErrorAll();
    $('input, textarea').val('');
    $('#fileformlabel').empty();
    $('.popup_succes').hide();   
    $('.popup_error').hide();   
    document.getElementById('fileformlabel').innerHTML = "Загрузите изображение";
};

function PopSuccesShow(){
    PopUpShow();
    PopErHide();
    $('.add_project_form').hide();
    $('.popup_succes').fadeTo(500, 1);
};

function PopErShow(){
    PopUpShow();
    $('.popup_error').fadeTo(500, 1);
};

function PopErHide(){
    $('.popup_error').fadeOut();
};


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
};

