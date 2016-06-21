define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/validation/validation');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');
  FancyRadioCheckBox.init();


///////////////使用时间戳防止冒泡//////////////////////
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