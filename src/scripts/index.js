import '../styles/style.scss';

//3rd party
import './helpers/jquery'
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'datatables.net/js/jquery.dataTables';
import 'particles.js/particles';
import 'slick-carousel/slick/slick';
import 'bootstrap-duallistbox/src/jquery.bootstrap-duallistbox';
import 'select2';

//custom
import './helpers/vh';
import './helpers/loading';
import './components/indexPageControls';
import FileInput from './helpers/fileInput';
import Sidebar from './components/sidebar';
import ScrollBar from './components/scrollbar';
import Map from './components/map';
import DTable from './components/data-table';
import DualBox from './components/dualbox';
import Circle from './components/circle';
//json
import particlesOptions from './components/particlesOptions';
import ChartJS from './components/chart';


//initializations
let sidebar = new Sidebar($('.sidebar'));
sidebar.init();

let scrollbar = new ScrollBar($('.scrollbar'));
scrollbar.init();

let map = new Map($('.map'));
map.init();

// data table
let dTable = new DTable($('.data-table-simple'));
dTable.init();

// charts
let chartsJS = new ChartJS(document.querySelectorAll('.chart'));
chartsJS.init();

// profile page input type file
let fileInput = new FileInput($('#avatar'), $('.avatar-preview'));
fileInput.init();

// index page particles animation
if ($('#particles').length) {
  particlesJS('particles', particlesOptions);
}

// sliders
let $sliders = $('.slider');
$sliders.each(function () {
  let $slider = $(this);
  let w = 0;
  let toShow = 4;
  let responsive = [];
  if ($slider.hasClass('nav-pills-rise')) {
    $slider.find('.nav-item').each(function () {
      let $item = $(this);
      w += $item[0].clientWidth;
    });

    // $slider.width($(window).width() > 1169 ? w - 10 : w);
    toShow = 3;
    responsive = [
      {
        breakpoint: 1330,
        settings: {
          slidesToShow: toShow - 1,
        }
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: toShow - 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: toShow,
        }
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: toShow - 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      },
    ]
  } else {
    responsive = [
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: toShow - 1,
        }
      },
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: toShow - 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: toShow - 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: toShow - 1,
        }
      },
      {
        breakpoint: 616,
        settings: {
          slidesToShow: toShow - 2,
        }
      },
      {
        breakpoint: 416,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      }
    ]
  }

  $slider
    .on('init', function (e, slick) {
      $slider.removeClass('d-none');

      $slider.find('.nav-link').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let $this = $(this);
        let id = $this.attr('href');
        $slider.find('.nav-link').removeClass('active').attr('aria-selected', false);
        $this.addClass('active').attr('aria-selected', true);
        $(id).addClass('active show').siblings().removeClass('active show');
      });
    })
    .on('afterChange', function (e, slick, index) {
      let $element = slick.$slides.eq(index);
    })
    .slick({
      dots: false,
      arrows: true,
      infinite: false,
      initialSlide: 0,
      fade: $slider.hasClass('slider-fade'),
      speed: 300,
      slidesToShow: toShow,
      // focusOnSelect: true,
      // centerMode: true,
      // variableWidth: true,
      prevArrow: $slider.parents('.slider-wrapper').find('.slick-prev') || '',
      nextArrow: $slider.parents('.slider-wrapper').find('.slick-next') || '',
      adaptiveHeight: false,
      responsive: responsive
    });
});

// custom tabs navigation
$('.btn-sharkgate, .btn-cloudflare').on('click', function () {
  let target = $(this).attr('href');
  let $target = $(target);
  let $targetTitle = $('.' + target.substr(1, target.length - 1) + '-title');
  let $targetBadge = $('.' + target.substr(1, target.length - 1) + '-badge');

  $(this).addClass('active').siblings('[data-toggle="pill"]').removeClass('active');
  $targetTitle.removeClass('d-none').siblings('[role="tabpanel"]').addClass('d-none');
  $targetBadge.removeClass('d-none').siblings('[role="tabpanel"]').addClass('d-none');
  $target.show().addClass('active show').attr('aria-selected', true).siblings('[role="tabpanel"]').hide().removeClass('active show').attr('aria-selected', false);
});

// counter animation
$('.counter').each(function () {
  $(this).attr('counter', 0).animate({
    counter: $(this).text()
  }, {
    duration: 2000,
    easing: 'linear',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});

//circles
let circles = new Circle($('.section-circles'));
circles.init();

// dualbox
let dualBox = new DualBox($('select[name="duallistbox[]"]'));
dualBox.init();

// select2
$('.select-wrapper select, .select-wrapper-sm select, .table-select select').select2({
  minimumResultsForSearch: -1,
  placeholder: "Select a state"
});
