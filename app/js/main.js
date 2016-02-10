$(document).ready(function() {
	$('input, textarea').placeholder();
    $('.popup').click(PopUpHide);
    $('.popup_content').click(function(event){
                                event.stopPropagation()
                            });
    $('.socials').clone().appendTo('.wrapper').addClass('socials2').removeClass('socials');
    $('.empty').clone().appendTo('.wrapper');

});
