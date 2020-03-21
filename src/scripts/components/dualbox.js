import '../helpers/jquery';
import "bootstrap-duallistbox/src/jquery.bootstrap-duallistbox";

export default class DualBox {
  constructor($element) {
    this.$element = $element;
  }

  init() {
    if (this.$element.length) {
      $(document).ready(() => {
        console.log('asd');
        this.$element.bootstrapDualListbox();
      })
    }
  }
}
