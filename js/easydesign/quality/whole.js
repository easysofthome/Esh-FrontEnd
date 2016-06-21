define(function (require, exports, module) {
    require('jquery');


    $(document).ready(function () {
    // if($('.flowlist a').attr('href')=="#"||!($('.flowlist a').attr('href'))){
    //   $('.flowlist .flowerimg').bind('click',function(e){
    //     var url = '/html/easydesign/quality/viewQuality.html';
    //     window.open(url);
    //   });
    // }


   $('#widthPrice150Title').bind('click',function(){
      // 展开按钮
      var categoryHigh = 0;
      $('#widthPrice150').removeClass('none');
      // if($('#widthPrice150').css('display')=='none'){
      //   $('#widthPrice150').removeClass('none');
      // }else{
      //   $('#widthPrice150').addClass('none');
      // }
      $('.leibie').each(function(index, el) {
          if($(this).css('display')=='none') return;
          categoryHigh = categoryHigh + $(this).height() + parseInt($(this).css('margin-top'));
      });
      $('.leibie_box').animate({'height':categoryHigh},300);

    });

    $('#widthPriceAll').bind('click',function(){
      // 收起按钮
      var categoryHigh = 0;
      $('#widthPrice150').addClass('none');
      $('.leibie').each(function(index, el) {
          if($(this).css('display')=='none') return;
          categoryHigh = categoryHigh + $(this).height() + parseInt($(this).css('margin-top'));
      });
      $('.leibie_box').animate({'height':categoryHigh},300);

    });



    });




});