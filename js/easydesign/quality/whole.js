define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {

      $('.flowlist .flowerimg').bind('click',function(e){
      var url = '/html/easydesign/quality/viewQuality.html';
      window.open(url);
    });


   $('#widthPrice150Title').bind('click',function(){
        if($('#widthPrice150').css('display')=='none'){
          $('#widthPrice150').removeClass('none');
        }else{
          $('#widthPrice150').addClass('none');
        }
    });

    });




});