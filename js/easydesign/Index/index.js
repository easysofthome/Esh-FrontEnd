define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('jquery.event.move');
  require('../../lib/jquery.twentytwenty/jquery.twentytwenty.index');

  $('.simulation-box').twentytwenty();
  $('.twentytwenty-handle').css('left','600px');
  require('js/easydesign/Index/banner');
  // 模拟效果
  require('js/easydesign/Index/simulation');
  // 设计资源库
  require('js/easydesign/Index/sourceLib');
  // 工作室轮播图
  var studioShow = require('js/easydesign/Index/studioShow');

  $(document).ready(function () {
    $('.exo_conbox li').append("<div class='top-line'></div><div class='right-line'></div><div class='bottom-line'></div><div class='left-line'></div>");
    var w = $(window).width();
    $('.banner-li').css("width",w);
    $('.banner-wrapper').css("height",w/3.84);

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

 $(".video_icobutt_def").bind('click',function(){
    $("#flashPlay").show();

 });

 $("#flashPlay").hover(function(){
    $(".video_icobutt_def").show();

 },function(){
     $(".video_icobutt_def").hide();

 });


//面料对比遮罩及点击事件
function fraticLayer(){
  var zIndex = $('.twentytwenty-overlay').css('z-index');
  //$('.twentytwenty-overlay').css({'z-index':'555'});
  var top = $('.twentytwenty-overlay').offset().top;
  var left = $('.twentytwenty-overlay').offset().left;
  var width = $('.twentytwenty-overlay').width();
  var height = $('.twentytwenty-overlay').height();

$('body').append('<div id="overLayer_fratic_top" style=\'display:block;width:100%;height:100%;position:absolute;\'><div style=\'postion:relative;display:block;width:100%;height:100%;\'><span>真实场景所用面料</span><span>软件模拟所得面料</span></div></div>')
  $('body').append('<div id="overLayer_fratic" style=\'display:block;width:100%;height:100%;position:absolute;\'></div>')

  $('#overLayer_fratic').css({'z-index':'41','opacity': '0.6','filter': 'alpha(opacity=60)','background': '#000','top':top,'left':left,'width':width,'height':height});
  $('#overLayer_fratic_top').css({'color':'#ffffff','z-index':'42','top':top,'left':left,'width':width,'height':height});
  $('#overLayer_fratic_top span:eq(0)').css({'width':150,'top':'55px','left':'50px','position':'absolute','text-align':'center'});
  $('#overLayer_fratic_top span:eq(1)').css({'width':150,'top':'55px','right':'50px','position':'absolute','text-align':'center'});


  $('.twentytwenty-container').bind('mouseleave',function(){
      $('#overLayer_fratic').fadeIn();
     $('#overLayer_fratic_top').fadeIn();
  });


   $('#overLayer_fratic_top').bind('mouseover',function(){
    $('#overLayer_fratic').fadeOut();
    $('#overLayer_fratic_top').fadeOut();

  });


  $('.twentytwenty-container').bind('click',function(){
      window.location = '/html/easydesign/simulationFabric.html';
  });


}


//易家纺设计资源库 点击切换效果
function switchSourceLib(){
  $('.tew_box .exp_butt li').bind('click',function(){
      var currentIndex = $(this).index();
      $('.tew_box .exp_butt li').removeClass('curr_li');
      $(this).addClass('curr_li');
      $('.tew_box .exo_conbox').hide();
      $('.tew_box .exo_conbox').eq(currentIndex).fadeIn(500);
  });
}

$(document).ready(function () {
  fraticLayer();
  switchSourceLib();
});










});