

$('[data-toggle-button-group] .button').click(function () {
  $(this).siblings().removeClass('is-active');
  $(this).addClass('is-active');
});

