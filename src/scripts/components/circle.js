import $ from "jquery";

export default class Circles {
  constructor($wrapper) {
    this.$wrapper = $wrapper;
    this.$circles = this.$wrapper.find('.circle-wrapper');
    this.$toggles = this.$wrapper.find('.btn:not(.circle-switcher)');
  }

  init() {
    let self = this;

    self.$toggles.on('click', function () {
      let index = $(this).parents('.circle-wrapper').index();
      let $circle = self.$circles.eq(index).find('.circle');
      let $stateCircle = self.$wrapper.find('.circle-state');
      let $stateBtn = self.$wrapper.find('.circle-state + div .btn');

      $circle.toggleClass('inactive active');
      let state = self.$wrapper.find('.circle:not(.circle-state).active').length || 0;

      if(state > 1){
        $stateCircle.removeClass('state-one inactive').addClass('state-all active');
        $stateBtn.find('span').text('100%');
        $stateCircle.find('.percents').text('100%');
      }else{
        if(state > 0){
          $stateCircle.removeClass('state-all inactive').addClass('state-one active');
          $stateBtn.find('span').text('50%');
          $stateCircle.find('.percents').text('50%');
        }else{
          $stateCircle.removeClass('state-one state-all active').addClass('inactive');
          $stateBtn.find('span').text('0%');
          $stateCircle.find('.percents').text('0%');
        }
      }

      $(this).text($(this).parent().prev('.inactive').length ? 'ENABLE' : 'ENABLED');
    });
  }
}
