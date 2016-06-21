define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {
      $('.Collapse').hide();
      if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
      $('.flowlist .flowerimg').bind('click',function(e){
        var url = '/html/easydesign/uidesign/viewWorks.html';
        window.open(url);
        });
      }


});


})