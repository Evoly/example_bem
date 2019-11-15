/* eslint-disable no-useless-escape, object-shorthand */
// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function videocards() {
  function serializeFormJSON() {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  }

  $.fn.serializeFormJSON = serializeFormJSON;

  // переменные
  const screen = $('.screen');
  const inner = $('.inner');
  const footer = $('.footer');
  const header = $('.header');
  const burger = $('.header__burger');

  if (/rv:11\.0/.test(navigator.userAgent.toLowerCase())) {
    $('html').addClass('ie');
  }

  // blur
  function blur() {
    screen.addClass('is-blur');
    inner.addClass('is-blur');
    footer.addClass('is-blur');
    header.addClass('is-fb-open');
  }

  function unblur() {
    screen.removeClass('is-blur');
    inner.removeClass('is-blur');
    footer.removeClass('is-blur');
    header.removeClass('is-fb-open');
    if (burger.hasClass('is-active')) {
      burger.click();
    }
  }

  // fancybox
  const fancyOpts = {
    afterLoad() {
      freeze();
      blur();
    },
    beforeClose() {
      unfreeze();
      unblur();
    },
    afterClose() {
      $('.videocard__content').removeClass('is-hidden');
    },
    smallBtn: false,
    buttons: [],
    touch: false,
  };

  $('.js-fancybox').fancybox(fancyOpts);

  $(document).on('click', '.videocard__close', (e) => {
    e.preventDefault();
    $.fancybox.close();
  });

  // fancybox in fancybox
  $(document).on('click', '.play', function (e) {
    e.preventDefault();
    $.fancybox.close();
    $('.videocard__inputbox').removeClass('is-error');
    const href = $(this).attr('href');
    $.fancybox.open({
      src: href,
      opts: fancyOpts,
    });
  });

  // Direct link to videocard
  const hash = window.location.hash;
  let search = window.location.search;
  let param;
  let target;

  function directvideocard(src) {
    $.fancybox.open({
      src: src,
      opts: fancyOpts,
    });
  }

  if (hash) {
    if ($(`.js-fancybox[href="${hash}"]`).length) {
      directvideocard(hash);
    }
  } else if (search && search.indexOf('videocard') > -1) {
    search = search.substring(1).split('&');
    for (let i = 0; i < search.length; i += 1) {
      param = search[i].split('=');
      if (param[0] === 'videocard') {
        target = `#${param[1]}`;
        directvideocard(target);
        break;
      }
    }
  }
  $(document).on('click', '.videocard__rating', (e) => {
    e.preventDefault();
    console.log('hello');
  });
}
/* eslint-enable no-useless-escape, object-shorthand */
