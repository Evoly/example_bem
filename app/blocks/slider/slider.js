/* eslint-disable no-unused-vars, prefer-arrow-callback */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  let desktop = $(window).width() > window.globalOptions.sizes.sm;
  let newDesktop;

  const mySliderOpt = {
    loop: true,
    speed: 700,
    slidesPerView: 'auto',
    resistanceRatio: 0,
    roundLengths: true,
    autoHeight: true,
    pagination: {
      el: '.slider-dots',
      type: 'bullets',
      clickable: true,
      bulletClass: 'slider-dot',
      bulletActiveClass: 'is-active',
    },
  };

  let mySlider = !desktop ? new Swiper('.js-slider', mySliderOpt) : false;

  $(window).on('resize', function () {
    if ($('.js-slider').length) {
      newDesktop = $(window).width() > window.globalOptions.sizes.sm;
      if (desktop !== newDesktop) {
        if (newDesktop) {
          mySlider.destroy();
        } else {
          mySlider = new Swiper('.js-slider', mySliderOpt);
        }
        desktop = !desktop;
      }
    }
  });
}
/* eslint-enable no-unused-vars, prefer-arrow-callback */
