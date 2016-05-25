define(function (require, exports, module) {
  require('jquery');
  $('.flowlist .flowerimg').bind('click',function(e){
      var url = '../../easydesign/showDesignImg.html';
      window.open(url);
  });

});