export default class DTable {
  constructor($element) {
    this.$element = $element;
  }

  init() {
    this.$element.dataTable({
      searching: false,
      ordering: false,
      info: false,
      bLengthChange: false,
      iDisplayLength: 5,
      dom: '<"table-responsive"t>p',
      oLanguage: {
        oPaginate: {
          sPrevious: "Prev",
          sNext: "Next",
        }
      }
    });
  }
}
