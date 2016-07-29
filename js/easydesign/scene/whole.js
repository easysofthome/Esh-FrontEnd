define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {
      $('.Collapse').hide();
      if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
        $('.flowlist .flowerimg').bind('click',function(e){
          var url = '/html/easydesign/scene/viewScene.html?keyId=5a503def-fe60-4575-b0f8-3c9dc8ff2223&pageIndex=1';
          window.open(url);
        });
      }


  });

});