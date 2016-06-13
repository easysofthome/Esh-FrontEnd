define(function (require, exports, module) {

  require('jquery');
  require('animateColor');
  require('js/easydata/Index/pop');
  var rankCar = require('js/easydata/Index/rankCar');
  rankCar.init();
  require('animateNumber');

  var switchSel = require('js/common/module/switchSel');
  switchSel.set('.rank-btn','.rank-btn-tit','.rank-btn-ul','.rank-btn-li','&nbsp;&nbsp;<span></span>');

  $(function () {
    // 获取首页全球供应商和全球买家库的数字
    var num1 = parseInt($('#lib-num1').html()) ;
    var num2 = parseInt($('#lib-num2').html());
    $('#lib-num1').html(0);
    $('#lib-num2').html(0);
    var i = 1;

    $(window).scroll(function() {
      if($(window).scrollTop()>685){
        if(i > 0){
          i--;
          $('#lib-num1').animateNumber({ number: num1 },1500);
          $('#lib-num2').animateNumber({ number: num2 },1500);
        }
      }else{

      }
    });


      //鼠标滑过特效
      function hoverAnimate(){
        // module drawer

        $('[control=false] li a').css("display","block");
        $('[control=true] li').hover(
          function() {
            $(this).stop().css('z-index','2').animate({'height':'440px'},500);
            $(this).find('a').stop().delay(300).fadeIn();
          },
          function () {
            $(this).stop().css('z-index','1').animate({'height':'210px'},300);
            $(this).find('a').stop().fadeOut();
          }
        );
        $('.module-ul li a').hover(
          function() {
            $(this).fadeOut().fadeIn(300);
          },function () {
          }
        );

      }



      hoverAnimate();


  });

});