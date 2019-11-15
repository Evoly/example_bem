/* eslint-disable no-useless-escape */
// https://github.com/RobinHerbots/Inputmask
import Inputmask from 'inputmask';

const $ = window.$;

export default function profile() {
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

  Inputmask({
    mask: '+7 (999) 999-99-99',
  }).mask('input[data-type="phone"]');

  // валидация форм
  function checkInput(el) {
    const $this = el;
    const value = $this.val();
    const name = $this.attr('data-type');

    // Имя Фамилия
    if (name === 'firstname' || name === 'lastname' || name === 'patronymic') {
      if (!value.match(/^[\u0400-\u04FF]*$/)) {
        $this.parents('.inputbox').addClass('is-error');
      } else {
        $this.parents('.inputbox').removeClass('is-error');
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
        $this.parents('.inputbox').addClass('is-error');
      } else {
        $this.parents('.inputbox').removeClass('is-error');
      }
    }
    // E-mail
    if (name === 'email') {
      if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $this.parents('.inputbox').addClass('is-error');
      } else {
        $this.parents('.inputbox').removeClass('is-error');
      }
    }
    // phone
    if (name === 'phone') {
      const tel = value.replace(/[^0-9]/g, '');
      if (tel.length !== 11) {
        $this.parents('.inputbox').addClass('is-error');
      } else {
        $this.parents('.inputbox').removeClass('is-error');
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
          $this.parents('.form-no-label').addClass('is-error');
          $this.siblings('.inputbox__error').html(passError);
        } else {
          $this.parents('.form-no-label').removeClass('is-error');
        }
      }
    }

    if (name === 'old_password') {
      const oldPass = $('.input[data-type="old_password"]').val();
      checkPass(oldPass);
    }

    if (name === 'newpass') {
      const newPass = $('.input[data-type="newpass"]').val();
      checkPass(newPass);
    }
  }

  $(document).on('click', '.profile__button', function (e) {
    e.preventDefault();
    const $this = $(this);
    const form = $this.parents('form');
    const input = form.find('input').not('.js-notrequire');
    const url = form.attr('action');

    input.each(function () {
      checkInput($(this), true);
    });

    if (!form.find('.is-error').length) {
      $('.profile__button').attr('disabled', true);
      $.ajax({
        type: 'POST',
        url: `${url}?_format=json`,
        data: JSON.stringify(form.serializeFormJSON()),
        contentType: 'application/json',
      });
      $('.profile__button').attr('disabled', false);
    }
  });

  $(document).on('input', '.profile__input', function () {
    checkInput($(this));
  });

  $(document).on('focus click', '.profile__input', function () {
    $(this).parents().removeClass('is-error');
    checkInput($(this));
  });
}

/* eslint-enable no-useless-escape */
