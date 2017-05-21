$(".cg_sub_menu li a").click(function (event) {
    event.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    $('.collapse').removeClass("show");
});