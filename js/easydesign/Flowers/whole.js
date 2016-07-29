define(function (require, exports, module) {
    require('jquery');
    $(document).ready(function () {

    if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
      $('.flowlist .flowerimg').bind('click',function(e){
        var url = '/html/easydesign/Flowers/viewFlower.html?keyId=eb2288a7-4439-4577-b240-7e124d8ccb0a&pageIndex=1';
        window.open(url);
      });
    }

    $('#westernClassical').bind('click',function(){
          if($('#comprise').css('display')=='none'){
            $('#comprise').removeClass('none');
          }else{
            $('#comprise').addClass('none');
          }
      });
    });
});