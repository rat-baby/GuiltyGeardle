$selectorBox = $('.selectorBox');

function showAutocomplete() {
  $selectorBox.stop().fadeIn(300);
}

function hideAutocomplete() {
  $selectorBox.stop().fadeOut(150);
}

function addHover(element) {
  $(element).on("mouseenter", function() {
    $(this).stop().animate({
      opacity: "100%"},
      150);
  }).on("mouseleave", function() {
    $(this).stop().animate({
      opacity: "75%"
    }, 150);
  })
}