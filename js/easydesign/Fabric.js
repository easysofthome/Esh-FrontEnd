define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {

      $('.flowlist .flowerimg').bind('click',function(e){
      var url = '../easydesign/showDesignImg.html';
      window.open(url);
    });



});


})