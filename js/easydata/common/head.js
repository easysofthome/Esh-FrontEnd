define(function (require, exports, module) {
  require('jquery');

  /* 导航栏 */

  /** 未登录状态的导航 **/
  $('.nav1 .nav-li').hover(
    function() {
      $('.header-sub').stop().slideUp("fast");
      $('.header-sub ul').css('display','none');
      if($(this).index()!=0){
        $('.header-sub').slideDown("fast");
      }
      if($(this).index() == 1){
        $('.header-sub ul').eq(0).css('display','block');
      }else if($(this).index() == 2){
        $('.header-sub ul').eq(1).css('display','block');
      }
    },function (){}
  );
  $('.header-sub').hover(
    function () {},
    function() {
      $('.header-sub').slideUp();
      $('.header-sub ul').css('display','none');
      $('.nav1 .nav-li').removeClass('hover');
    }
  );
  $('.header-sub ul').hover(
    function() {
      $('.nav1 .nav-li').removeClass('hover').eq($(this).index()+1).addClass('hover');
    }, function() {}
  );
  /** /未登录状态的导航 **/
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
      // if($(this).find('span').css('marginLeft') == '-33px'){
      //   $(this).find('span').animate({marginLeft: '1px'},300,function () {
      //     window.open("/html/easysofthome/English.html",'newwindow');
      //   });
      // }else{
      //   $(this).find('span').animate({marginLeft: '-33px'},300);
      // }
      $(this).find('span').animate({marginLeft: '1px'},300,function () {
        window.open("/html/easysofthome/English.html",'newwindow');
        $('.switch span').animate({marginLeft: '-33px'});
      });
    });
  /** /却换中英文 **/

});
