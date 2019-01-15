$('body').on('click', '.fish', function() {
    $('div.fish').toggleClass("fast");
    if ($('div.fish').hasClass("fast")) {
        $(this).text("Woah there! Its not that serious.")
    }
    else {
        $(this).text("Speed Up")
    }
});