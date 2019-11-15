import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function header() {
  // переменные
  const mobBg = $('.header__mob-bg');
  const menu = $('.header__menu');
  const account = $('.header__account');
  const userMenu = $('.header__user-menu');
  const burger = $('.header__burger');
  const logos = $('.header__logos');
  const backArrow = $('.header__back-arrow');
  const userArrow = $('.header__user-arrow');
  const screen = $('.screen');
  const inner = $('.inner');
  let wWidth = $(window).width();

  // бургер
  $(document).on('click', '.header__burger', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    if (!userMenu.hasClass('is-active')) {
      menu.toggleClass('is-active');
    } else {
      backArrow.toggleClass('is-active');
    }
    mobBg.toggleClass('is-active');
    account.toggleClass('is-active');
    logos.toggleClass('is-active');
    if ($(this).hasClass('is-active')) {
      freeze();
      screen.addClass('is-blur');
      inner.addClass('is-blur');
    } else {
      unfreeze();
      screen.removeClass('is-blur');
      inner.removeClass('is-blur');
    }
  });

  // подменю в мобильной версии
  $(document).on('click', '.header__user-arrow', function (e) {
    e.preventDefault();
    $(this).addClass('is-active');
    menu.removeClass('is-active');
    userMenu.addClass('is-active');
    backArrow.addClass('is-active');
  });

  $(document).on('click', '.header__back-arrow', function (e) {
    e.preventDefault();
    $(this).removeClass('is-active');
    menu.addClass('is-active');
    userMenu.removeClass('is-active');
    userArrow.removeClass('is-active');
  });

  $(document).on('click', '.header__user-top', (e) => {
    e.preventDefault();
    if (wWidth <= window.globalOptions.sizes.sm) {
      userArrow.toggleClass('is-active');
      menu.toggleClass('is-active');
      userMenu.toggleClass('is-active');
      backArrow.toggleClass('is-active');
    } else {
      userArrow.toggleClass('is-active');
      userMenu.toggleClass('is-active');
    }
  });

  // сброс меню при ресайзе
  $(window).on('resize', () => {
    if (burger.hasClass('is-active') && $(window).width() !== wWidth) {
      burger.click();
    }
    wWidth = $(window).width();
  });

  // Logout
  $(document).on('click', '[data-type="logout"]', (e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/user/logout?_format=json',
      contentType: 'application/json',
      success() {
        location.reload();
      },
      error() {
        console.log('error');
      },
    });
  });
}
