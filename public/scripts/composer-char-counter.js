$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    let inputLength = $(this).val().length;
    let inputLeft = 140 - inputLength;
    let counter = $(this).siblings('div').children('.counter');

    counter.text(inputLeft);

    if (inputLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});