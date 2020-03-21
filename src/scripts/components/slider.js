import '../helpers/jquery';
import "slick-carousel/slick/slick";

class Slider {
  constructor($element, options) {
    this.$element = $element;
    this.options = options;
  }

  render(data) {};

  init(data) {
    this.render(data);

    $(this.$element)
      .on('init', function (slick) {
        let $slides = $(slick.target).find('.slick-slide');
      })
      .on('afterChange', function (slick, currentSlide, currentIndex) {
        let $slide = $(currentSlide.$slides.eq(currentIndex));
      })
      .slick(this.options);
  };
}

export default Slider;
