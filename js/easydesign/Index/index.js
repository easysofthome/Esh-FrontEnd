define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/easydesign/Index/banner');
  // 模拟效果
  require('js/easydesign/Index/simulation');
  // 设计资源库
  require('js/easydesign/Index/sourceLib');
  // 工作室轮播图
  var studioShow = require('js/easydesign/Index/studioShow');

  $(document).ready(function () {
    $('.exo_conbox li').append("<div class='top-line'></div><div class='right-line'></div><div class='bottom-line'></div><div class='left-line'></div>");
  });

  var top;
  $(window).scroll(function() {
    top = $(window).scrollTop();
    if(top > 1750){
      studioShow.studioNumScroll($('.studip_conrg .dahaozi'));
    }

  });

  $('.videoDiv').on('click',function () {
    $.layer({
        type: 2,
        title: false,
        area: ['910px', '700px'],
        fix: false,
        shadeClose: false,
        offset: [($(window).height() - 700)/2+'px', ''], //上下垂直居中
        border: [0],
        shade : [0.9, '#000'],
        iframe: {src: ''}
    });
  });

  $('.a04').on('click',function () {
    $.layer({
        type: 2,
        title: false,
        area: ['910px', '700px'],
        fix: false,
        shadeClose: false,
        offset: [($(window).height() - 700)/2+'px', ''], //上下垂直居中
        border: [0],
        shade : [0.9, '#000'],
        iframe: {src: ''}
    });
  });


  //媒体图片鼠标划过特效
  $(".video_icobutt_def").append('<span class="video_icobutt_def2"></span>');
  $(".video_icobutt_def2").css('opacity', 0);
  $(".video_icobutt_def").hover(function(){
  $(".video_icobutt_def2").stop().animate({opacity: '1'},600);
  },
  function(){
  $(".video_icobutt_def2").stop().animate({opacity: '0'},600);
  });
   
   
    
    
  

    



});