/* eslint-disable no-useless-escape, object-shorthand */
// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';
// https://github.com/RobinHerbots/Inputmask
import Inputmask from 'inputmask';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
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
  Inputmask({
    mask: '+7 (999) 999-99-99',
  }).mask('input[data-type="phone"]');

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
      $('.popup__content').removeClass('is-hidden');
    },
    smallBtn: false,
    buttons: [],
    touch: false,
  };

  $('.js-fancybox').fancybox(fancyOpts);

  $(document).on('click', '.popup__close', (e) => {
    e.preventDefault();
    $.fancybox.close();
  });

  // fancybox in fancybox
  $(document).on('click', '.popup__link', function (e) {
    e.preventDefault();
    $.fancybox.close();
    $('.popup__inputbox').removeClass('is-error');
    const href = $(this).attr('href');
    $.fancybox.open({
      src: href,
      opts: fancyOpts,
    });
  });

  // валидация форм
  function checkInput(el, beforeSubmit) {
    const $this = el;
    const value = $this.val();
    const name = $this.attr('name');
    let inputType;
    if (beforeSubmit) {
      inputType = $this.attr('type');
    }
    // Чекбоксы
    if (beforeSubmit) {
      if (inputType === 'checkbox' && !$this.prop('checked')) {
        $this.parent().addClass('is-error');
      }
    }
    // Имя Фамилия
    if (name === 'firstname' || name === 'lastname') {
      if (!value.match(/^[\u0400-\u04FF]*$/)) {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // birthday
    if (name === 'birthday') {
      let checkDate = true;
      if (value.indexOf('.') > -1) {
        const arrDate = value.split('.');
        arrDate[1] -= 1;
        console.log(arrDate[1]);
        const newDate = new Date(arrDate[2], arrDate[1], arrDate[0]);
        if ((newDate.getFullYear() === parseInt(arrDate[2], 10)) &&
        (newDate.getMonth() === parseInt(arrDate[1], 10)) &&
        (newDate.getDate() === parseInt(arrDate[0], 10))) {
          checkDate = true;
        } else {
          checkDate = false;
        }
      }
      if (value === '' || checkDate === false) {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // E-mail
    if (name === 'login' || name === 'name') {
      if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // phone
    if (name === 'phone') {
      const tel = value.replace(/[^0-9]/g, '');
      if (tel.length !== 11) {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // Пароль
    function checkPass(pass) {
      if (pass) {
        let passError = '';
        if (!value.match(/^(?=.{8,})/)) {
          passError += '- минимум 8 символов;<br>';
        }
        if (!value.match(/^[a-zA-Z0-9!@#\$%\^&\*\?]+$/)) {
          passError += '- только латиница;<br>';
        }
        if (!value.match(/(?=.*[0-9])/)) {
          passError += '- минимум одна цифра;<br>';
        }
        if (!value.match(/(?=.*[A-Z])/)) {
          passError += '- минимум одна буква верхнего регистра;<br>';
        }
        if (!value.match(/(?=.*[a-z])/)) {
          passError += '- минимум одна буква нижнего регистра;<br>';
        }
        if (passError) {
          $this.parents('.inputbox').addClass('is-error');
          $this.siblings('.inputbox__error').html(passError);
        } else {
          $this.parents('.inputbox').removeClass('is-error');
        }
      }
    }
    if (name === 'password1') {
      const password1 = $this.parents('form').find('[name="password1"]').val();
      checkPass(password1);
    }

    if (name === 'pass') {
      if (value === '') {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // Повторение пароля
    if (name === 'password2') {
      const otherValue = $this.parents('form').find('[name="password1"]').val();
      if (otherValue && value !== otherValue) {
        $this.parent().addClass('is-error');
      } else {
        $this.parent().removeClass('is-error');
      }
    }
    // проверка на пустое значение
    if (value === '' && name !== 'password2' && name !== 'pass') {
      $this.parent().addClass('is-error');
    }
  }

  $(document).on('click', '.popup__button, .js-submit', function (e) {
    e.preventDefault();
    const $this = $(this);
    const form = $this.parents('form');
    const input = form.find('input').not('.js-notrequire');
    const url = form.attr('action');
    const popup = $this.parents('.popup');
    const type = popup.attr('id');
    const message = popup.find('.popup__message');
    const content = popup.find('.popup__content');

    input.each(function () {
      checkInput($(this), true);
    });

    if (!form.find('.is-error').length) {
      $('.popup__button, .js-submit').attr('disabled', true);
      $.ajax({
        type: 'POST',
        url: `${url}?_format=json`,
        data: JSON.stringify(form.serializeFormJSON()),
        contentType: 'application/json',
        success: function (textStatus) {
          if (type === 'register') {
            message.text('На ваш e-mail отправлено письмо с подтверждением').addClass('is-active');
            content.addClass('is-hidden');
          } else if (type === 'login') {
            location.reload();
          } else if (type === 'recovery') {
            if (textStatus.status === 200) {
              message.text('На ваш e-mail отправлено письмо для смены пароля').addClass('is-active');
            }
            message.text('На ваш e-mail отправлено письмо для смены пароля').addClass('is-active');
          } else if (type === 'recoveryConfirm') {
            message.text('Ваш пароль обновлен').addClass('is-active');
            window.history.replaceState({}, document.title, '/films/');
            setTimeout(() => {
              $.fancybox.close();
              $.fancybox.open({
                src: '#login',
                opts: fancyOpts,
              });
            }, 4000);
          } else {
            message.text(textStatus.message).addClass('is-active');
            //  console.log(textStatus);
          }
          $('.popup__button, .js-submit').attr('disabled', false);
        },
        error: function () {
          if (type === 'register') {
            message.text('В процессе регистрации произошла ошибка').addClass('is-active');
            $(location).attr('href', 'http://assolya.ru:3000/jury.html');
            setTimeout(() => {
              $.fancybox.close();
              $.fancybox.open({
                src: '#login',
                opts: fancyOpts,
              });
            }, 4000);
          } else if (type === 'login') {
            message.text('Неверно указан e-mail/пароль').addClass('is-active');
          } else if (type === 'recovery') {
            message.text('Неверно указан e-mail').addClass('is-active');
          } else if (type === 'recoveryConfirm') {
            const login = $('a[href="#login"]')[0];
            $(login).trigger('click');
          }
          $('.popup__button, .js-submit').attr('disabled', false);
        },
      });
    }
  });

  $(document).on('input', '.popup__input', function () {
    checkInput($(this));
  });

  $(document).on('focus click', '.popup input', function () {
    $(this).parent().removeClass('is-error');
    checkInput($(this));
  });

  $(document).on('click', () => {
    $('.popup__message').removeClass('is-active');
  });

  // Direct link to popup
  const hash = window.location.hash;
  let search = window.location.search;
  let param;
  let target;

  function directPopup(src) {
    $.fancybox.open({
      src: src,
      opts: fancyOpts,
    });
  }

  if (hash) {
    if ($(`.js-fancybox[href="${hash}"]`).length) {
      directPopup(hash);
    }
  } else if (search && search.indexOf('popup') > -1) {
    search = search.substring(1).split('&');
    for (let i = 0; i < search.length; i += 1) {
      param = search[i].split('=');
      if (param[0] === 'popup') {
        target = `#${param[1]}`;
        directPopup(target);
        break;
      }
    }
  }
  // videocard
  $(document).on('click', '.js-rating', function (e) {
    e.preventDefault();
    const el = $('.js-rating');
    el.removeClass('is-active');
    $(this).addClass('is-active');
    $('.videocard__message').addClass('is-active');
  });

  // gallery

  // fancybox in fancybox
  $(document).on('click', '.js-play', function (e) {
    e.preventDefault();
    const href = $(this).attr('href');
    $.fancybox.open({
      src: href,
      type: 'ajax',
      opts: fancyOpts,
    });
  });
  $(document).on('click', '.js-control_play', (e) => {
    e.preventDefault();
    $('#video')[0].play();
  });
  $(document).on('click', '.js-control_pause', (e) => {
    e.preventDefault();
    $('#video')[0].pause();
  });
}
/* eslint-enable no-useless-escape, object-shorthand */
