define(function (require, exports, module) {

  require('jquery');

  var screenH;
  $(document).ready(function () {
    screenH = $(window).height();
    setHeight(screenH);
  });
  $(window).resize(function () {
    screenH = $(window).height();
    setHeight(screenH);
  });

  function setHeight (screenH) {
    $('.main_box').height('auto');
    var h1 = $('.mainbox').height();
    var h2 = parseInt($('.mainbox').css('padding-bottom'));

    var mainH = screenH-32-100-133-h2;
    if(mainH > h1){
     $('.mainbox').height(mainH);
    }else{
      $('.mainbox').height('auto');
    }
  }

});