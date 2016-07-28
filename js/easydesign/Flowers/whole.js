define(function (require, exports, module) {
    require('jquery');
    $(document).ready(function () {

    if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
      $('.flowlist .flowerimg').bind('click',function(e){
        var url = '/html/easydesign/Flowers/viewFlower.html?keyId=e15b7697-8e9f-48f3-b9f4-a9eb7f826f1f&pageIndex=1';
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