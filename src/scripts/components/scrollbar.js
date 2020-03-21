import $ from "jquery";

export default class ScrollBar {
  constructor($element) {
    this.$element = $element;
    this.$track = this.$element.find('.scrollbar-track');

    return this;
  };

  init = () => {
    let self = this;
    let timer;
    const $window = $(window);
    self.listenIdle();
    //todo replace with mutationObserver (<main> padding change detection) + fix for ie/edge
    setTimeout(function () {
      self.setHeight();
    }, 300);

    $window
      .on('scroll', function () {
        self.setPosition();
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          self.$element.trigger('idle');
        }, 150);
      })
      .on('resize', function () {
        self.setHeight();
        self.setPosition();
      });

    self.$element
      .on('idle', function () {
        $(this).removeClass('scrollbar-active');
      });

  };

  getHeight = () => {
    const $window = $(window);
    const $body = $('body');
    let documentH = $body.height();
    let windowH = $window.height();

    return windowH * windowH / documentH;
  };

  setHeight = () => {
    let self = this;
    $(document).ready(function () {
      self.$track.css('height', self.getHeight());
    })
  };

  getPosition = () => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.$element.addClass('scrollbar-active');
    return (document.body.scrollTop || document.documentElement.scrollTop / height) * 100;
  };

  setPosition = () => {
    document.documentElement.style.setProperty('--scrollbar-position', this.getPosition() + "%");
    document.documentElement.style.setProperty('--n-scrollbar-position', '-' + this.getPosition() + "%");
  };

  listenIdle = () => {
    let self = this;
    $(window).on('scroll', function () {
    });
  };
}
