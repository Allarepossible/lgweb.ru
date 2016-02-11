$(function () {
	$('input, textarea').placeholder();
    $('.popup').click(PopUpHide);
    $('.popup_content').click(function (event) {
                                event.stopPropagation()
                            });
    var soc = $('.socials').clone().appendTo('.wrapper');
    soc.addClass('socials2').removeClass('socials');
    $('.empty').clone().appendTo('.wrapper');
    var data = $(this).serialize();

    //Сессия. открывается возможность добавления проекта
    $.ajax({
    	url: '../php/proj_auth.php',
    	type: 'POST', 	
    })
    .done(function (ans) {
    	if(ans == 'ok'){
    	$('.project_item:last-child').css('display', 'inline-block');}
    });
    
});
