import $ from "jquery";

export default class Sidebar {
  constructor($element) {
    if (!$element || $element.length === 0) {
      console.warn('jQuery element is required for Sidebar initialization.');
      return;
    }

    const $window = $(window);
    this.$element = $element;
    this.$wrapper = $('body');
    this.collapseBreakpoint = 767;
    this.isSwitchSide = true;
    this.state = {
      isOpen: $window.width() > this.collapseBreakpoint,
      isExpanded: $window.width() > this.collapseBreakpoint
    };

    return this;
  }

  init() {
    let self = this;
    if (!self.$element || self.$element.length === 0) {
      return;
    }
    const $window = $(window);
    const $document = $(document);
    let $sidebarVisibilityToggleButton = self.$wrapper.find('.toggle-sidebar-visibility-button');
    let $sidebarSizeToggleButton = self.$wrapper.find('.toggle-sidebar-size-button');
    document.documentElement.style.setProperty('--scroll-y', '0');
    self.listenDeviceChanged();
    self.switchSide();

    // force to apply initial state
    this.update();

    // detect scrolled position for "non jump" menu open on mobile
    $window
      .on('scroll', function () {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      })
      .on('resize', function(){
        self.switchSide();
      });

    // open / close menu on button click
    $sidebarVisibilityToggleButton
      .on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        self[self.getState().isOpen ? 'close' : 'open']();
      });

    // expand / collapse menu on button click
    $sidebarSizeToggleButton
      .on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        self[self.getState().isExpanded ? 'collapse' : 'expand']();
      });

    // open / close menu on "empty click"
    $document
      .on('click touchstart', function (e) {
        if (!$(e.target).closest(self.$element).length
          && !$(e.target).closest($sidebarVisibilityToggleButton).length
          && self.getState().isOpen) {
          self.close();
        }
      });

    self.$element
      .on('click touchstart', function (e) {
        if(!$(e.target).closest('[data-toggle]')) {
          e.stopPropagation();
        }
      })
      // inform about menu state change
      .on('statechange', function (e, ce) {
        console.info("menu", ce);
      })
      // change menu state on window resize
      .on('devicechanged', function (e, ec) {
        self[ec.device === 'mobile' ? 'close' : 'open']();
      });

    // additional way to interact with menu
    this.initKeyboardNavigation();
  };

  switchSide = () =>{
    if (this.isSwitchSide) {
      if (this.isMobile()) {
        this.$element.removeClass('sidebar-left').addClass('sidebar-right')
      }else{
        this.$element.removeClass('sidebar-right').addClass('sidebar-left')
      }
    }
  };

  getState = () => {
    return this.isMobile() ? this.state : !localStorage.getItem('menuState') ? this.state : JSON.parse(localStorage.getItem('menuState'));
  };

  setState = (state, force) => {
    switch (state) {
      case 'collapse':
        this.state.isExpanded = false;
        break;
      case 'expand':
        this.state.isExpanded = true;
        break;
      case 'close':
        this.state.isOpen = false;
        break;
      case 'open':
        this.state.isOpen = true;
        break;
      default:
        console.error('no such state for:' + this.$element);
    }

    // update localstorage state
    localStorage.setItem('menuState', JSON.stringify(this.state));
    this.$element.trigger('statechange', this.state);
    this.update(force);
  };

  update = (force) => {
    let self = this;

    if (this.getState().isOpen || force) {
      self.$wrapper.removeClass('menu-close').addClass('menu-open');
      self.$wrapper.css('top', '-' + document.documentElement.style.getPropertyValue('--scroll-y'));
    } else {
      self.$wrapper.removeClass('menu-open').addClass('menu-close');
      if (self.isMobile()) {
        window.scrollTo(0, parseInt(self.$wrapper.css('top') || '0') * -1);
        self.$wrapper.css('top', 'auto');
      }
    }

    if (this.getState().isExpanded || force) {
      self.$wrapper.removeClass('menu-collapsed').addClass('menu-expanded');
    } else {
      self.$wrapper.removeClass('menu-expanded').addClass('menu-collapsed');
    }
  };

  initKeyboardNavigation() {
    //keyboard navigation
    const $window = $(window);
    let excludedTags = ['TEXTAREA', 'INPUT', 'SELECT'];

    $window
      .on('keyup', (e) => {
        if (!excludedTags.includes(e.target.tagName)) {
          switch (e.keyCode) {
            case 69:
              this.expand(); //"e" button to expand menu;
              this.$element.focus();
              break;
          }
        }
      });
  };

  open = (force = false) => {
    this.setState('open', force);
  };

  close = (force = false) => {
    this.setState('close', force);
  };

  expand = (force = false) => {
    this.setState('expand', force);
  };

  collapse = (force = false) => {
    this.setState('collapse', force);
  };

  listenDeviceChanged = () => {
    const $window = $(window);
    let self = this;
    let device = self.isMobile() ? 'mobile' : 'desktop';

    $window
      .on('resize', function () {
        if (self.isMobile()) {
          if (device !== 'mobile') {
            device = 'mobile';
            self.$element.trigger('devicechanged', {device: 'mobile'});
          }
        } else {
          if (device !== 'desktop') {
            device = 'desktop';
            self.$element.trigger('devicechanged', {device: 'desktop'});
          }
        }
      });
  };

  isMobile = () => $(window).width() <= this.collapseBreakpoint;
}
