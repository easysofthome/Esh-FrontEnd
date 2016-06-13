define(function (require, exports, module) {

  require('jquery');

  $('.array').hover(
    function (event) {
      var a = this;
      $(this).find('.array-wrapper')
        .css('z-index','10')
        .css('box-shadow','0px 0px 19px 3px #ddd');
      $(this).find('.array-wrapper').stop().animate({height: '377'} ,500);
      $(this).find('a.btn').animate({'opacity': 1},500);
    },function (event) {
      $(this).find('.array-wrapper')
        .css('z-index','1')
        .css('box-shadow','none')
        .stop().animate({height: 307} ,500);
      $(this).find('a.btn').animate({'opacity': 0},500);
    }
  );


});