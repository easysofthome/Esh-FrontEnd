define(function (require, module, exports) {

  require('jquery');

  /** 却换中英文 **/
  $('.switch').on('click',function () {
    if($(this).find('span').css('marginLeft') == '-33px'){
      $(this).find('span').animate({marginLeft: '1px'},300,function () {
        window.open("/html/easysofthome/English.html",'newwindow');
      });
    }else{
      $(this).find('span').animate({marginLeft: '-33px'},300);
    }
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


});