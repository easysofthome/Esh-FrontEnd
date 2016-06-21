define(function (require, exports, module) {
    require('jquery');
    $(document).ready(function () {

    if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
      $('.flowlist .flowerimg').bind('click',function(e){
        var url = '/html/easydesign/Flowers/viewFlower.html';
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