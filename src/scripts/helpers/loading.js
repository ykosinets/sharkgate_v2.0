import $ from "jquery";

$(window)
  .on('beforeunload', function () {
    $('body').removeClass('loaded');
  })
  .on('load', function () {
    setTimeout(function () {
      $('body').addClass('loaded');
    }, 100);
  });
