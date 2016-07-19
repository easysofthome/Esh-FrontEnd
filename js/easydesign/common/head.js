define(function (require, exports, module) {
  require('jquery');
  // 搜索
  require('js/front/easydesign/common/search');

  // var switchSel = require('js/front/common/module/switchSel');
  // switchSel.set('.sea-words','.sea-words>span','.xiala-box','.xiala-box>li','');

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
/** @type {void} 鼠标滚动增加阴影 */
    // var top = $(window).scrollTop();
    // $(window).scroll(function() {
    //   top = $(window).scrollTop();
    //   if(top > 0){
    //     $('.header').css('box-shadow','0px 2px 3px 2px #ddd');
    //   }else{
    //     $('.header').css('box-shadow','none');
    //   }
    // });


    $(document).ready(function () {

    });
    var categoryHigh = 0;
    function resetHight(){
      // 收起按钮
      categoryHigh = 0;
      $('.leibie').each(function(index, el) {
       if($(this).css('display')=='none') {
        return;
       }

        categoryHigh = categoryHigh + $(this).height() + parseInt($(this).css('margin-top'));
      });
      if(categoryHigh <= 50) $('.Collapse').hide();
    }

    $('.Collapse').on('click', function() {
      if($('.leibie_box').attr('show')=='true'){
        $('.leibie_box').animate({'height':'50px'},300);
        $('.leibie_box').attr('show','false');
        $(this).html('展开');
      }else{
        resetHight();
        $('.leibie_box').animate({'height':categoryHigh},300);
        $('.leibie_box').attr('show','true');
        $(this).html('收起');
      }
    });


  });

});