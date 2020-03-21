export default class FileInput {
  constructor($input, $element) {
    this.$input = $input;
    this.$element = $element;
  }

  init() {
    let self = this;

    self.$input.on('change', function () {
      self.readURL(this);
    });
  }

  readURL() {
    let self = this;
    let input = self.$input[0];


    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        self.$element.attr('src', e.target.result).addClass('active');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
