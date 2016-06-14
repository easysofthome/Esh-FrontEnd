define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {

   $('#westernClassical').bind('click',function(){
        if($('#comprise').css('display')=='none'){
          $('#comprise').removeClass('none');
        }else{
          $('#comprise').addClass('none');
        }
    });

    });




});