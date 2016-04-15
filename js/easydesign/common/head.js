define(function (require, exports, module) {
  require('jquery');

  $(function () {
    /** 登录状态的导航  */
    $('.nav2 .nav-li').hover(function() {
      $(this).find('span').css('height','2px').animate({
        left: '0',
        width: "100%"
      },500);
    }, function() {
      if($('.nav2 .cur').index() != $(this).index()){
        $(this).find('span').animate({left: '50%',width: '0'},500);
      }
    });
    // $('.nav2 .nav-li').on('click', function() {
    //   $(this).parent('.nav1').find('.cur').removeClass('.cur');
    //   $(this).addClass('.cur');
    // });
    /** /登录状态的导航  */
    /** 却换中英文 **/
    $('.switch').on('click',function () {
      if($(this).find('span').css('marginLeft') == '-33px'){
        $(this).find('span').animate({marginLeft: '1px'},300,function () {
          window.location.href = "./en/";
        });
      }else{
        $(this).find('span').animate({marginLeft: '-33px'},300);
      }
    });
    /** /却换中英文 **/
    var top = $(window).scrollTop();
    $(window).scroll(function() {
      top = $(window).scrollTop();
      if(top > 0){
        $('.header').css('box-shadow','0 0 3px 1px #666');
      }else{
        $('.header').css('box-shadow','none');
      }

    });








  });

});