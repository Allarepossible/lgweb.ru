$(function () {
    var pull = $('#pull');
        menu = $('.nav_list');
        menuHeight = menu.height();
    $(pull).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });
    $(window).resize(function () {
        var w = $(window).width();
        if(w < 769 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
}); 
