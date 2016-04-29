define(function (require, exports, module) {
  require('jquery');

  var evTimeStamp = 0;
  $('.lab').on('click', function() {
    var now = +new Date();
    if (now - evTimeStamp < 100) {
      return;
    }
    evTimeStamp = now;

    $('.modifybox').find('.information').eq($(this).index()).toggle();
  });
});