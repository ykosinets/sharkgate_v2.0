import $ from "jquery";

let $indexPageButtons = $('.toggle-menu-button, .trigger-menu-button');
let $indexPageToggleButton = $('.toggle-menu-button');
let $indexPageMenu = $('.navigation-horizontal');

if ($indexPageButtons.length) {
  $indexPageButtons.on('click', function () {
    $indexPageToggleButton.toggleClass('active');
    $indexPageMenu.toggleClass('active');
  });
}
