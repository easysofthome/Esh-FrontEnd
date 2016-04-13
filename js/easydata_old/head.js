define(function (require, exports, module) {
  require('jquery');
  require('js/easydata_old/goTop');

  /* 导航栏 */
  $('.more').on('mouseover mouseout',function() {
    $(this).find('.nav-more').stop().slideToggle("fast");
  });
  $('.login-ico-bg').on('mouseover',function() {
    $('.nav-ol3').slideDown("fast");    // 不能加stop()
  });
  //不用mouseout可以避免mouseover和mouseout冒泡
  $('.login-ico-wrap').hover(function(){
    //此处为空
  },function() {
    $('.nav-ol3').slideUp("fast");      // 不能加stop()
  });

  // $('.nav-li').click(function(event) {
  //   $('#nav cur').removeClass('cur');
  //   $(this).addClass('cur');
  // });

});
