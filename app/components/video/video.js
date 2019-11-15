const $ = window.$;

export default function video() {
  // валидация форм
  $(document).on('click', '.video__button', function (e) {
    e.preventDefault();
    const $this = $(this);
    const form = $this.parents('form');
    const input = form.find('.video__input, .media__input');

    input.each(function () {
      const value = $(this).val();
      if (value === '') {
        $(this).parents('.inputbox, .media').addClass('is-error');
      }
    });

    if (!form.find('.is-error').length) {
      form.submit();
    }
  });

  $(document).on('click', '.video__input, .media__input', function () {
    $(this).parents('.inputbox, .media').removeClass('is-error');
  });
}
