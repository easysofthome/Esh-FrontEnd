define(function (require, exports, module) {

  require('jquery');

  $(window).scroll(function(event) {
    var scrollTop = $(document).scrollTop();
    if(scrollTop > 1000){
      $('.side').stop().animate({"opacity":1},1000);
    }else{
      $('.side').stop().animate({"opacity":0},1000);
    }
  });

  $(function(){
    $(".side ul li").hover(function(){
      $(this).find(".sidebox").stop().animate({"width":"124px"},200).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#3CA1D7"})
    },function(){
      $(this).find(".sidebox").stop().animate({"width":"54px"},200).css({"opacity":"0.8","filter":"Alpha(opacity=80)","background":"#000"})
    });
  });

  // html中调用(window.)
  window.goTop = function () {
    $('html,body').animate({'scrollTop':0},300);
  }

});