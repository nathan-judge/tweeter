let maxLength = 140;
$('textarea').keyup(function () {
    let textlen = maxLength - $(this).val().length;
    let $output = $('output')
    $output.text(textlen);
    if (textlen < 0) {
        $output.addClass('neg')
    } else {
        $output.removeClass('neg')
    }
});

