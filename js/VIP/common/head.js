define(function (require, exports, module) {
  require('jquery');

  var screenH = $(window).height();
  $(document).ready(function () {
    setHeight(screenH);
  });

  function setHeight (screenH) {
    $('.main_box').height('auto');
    var h1 = $('.main_box').height();
    var h2 = parseInt($('.main_box').css('padding-bottom'));

    var mainH = screenH - 100 - 133;
    if(mainH > (h1+h2)){
     $('.main_box').height(mainH-h2);
    }else{
      $('.main_box').height('auto');
    }
  }

  module.exports.setHeight = setHeight;
});