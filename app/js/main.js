$(document).ready(function() {
	$('input, textarea').placeholder();
});

$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();
});
//Функция отображения PopUp
function PopUpShow(){
    $("#popup1").show();   
    $(".op").show();

}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup1").hide();
    $(".op").hide();
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
    var uploaded = document.getElementById("fileformlabel");
    uploaded.innerHTML = filename;
}