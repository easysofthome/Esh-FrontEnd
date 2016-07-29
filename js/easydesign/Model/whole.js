define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {
      $('.Collapse').hide();
      if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
        $('.flowlist .flowerimg').bind('click',function(e){
          var url = '/html/easydesign/Model/viewModel.html?keyId=7a213ce5-0ac6-4b00-8eec-9ca8f104afc2&pageIndex=1';
          window.open(url);
        });
      }

    })

});