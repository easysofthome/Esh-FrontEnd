define(function (require, exports, module) {
  require('jquery');

  $('.lab').on('click', function() {
    $('.modifybox').find('.information').eq($(this).index()).toggle();
  });
});