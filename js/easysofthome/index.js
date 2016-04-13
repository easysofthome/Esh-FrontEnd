define(function (require, exports, module) {

  require('jquery');
  // 颜色渐变支持

  // 窗口结构加载完成时
  $(document).ready(function(){
    $('#section1,#section2').css('display','block');
    setWH();
  });

  // 窗口改变时
  $(window).resize(function() {
    setWH();
  });

  // 初始化页的高度
  function setWH() {
    var devWidth = $(window).width();
    var devHeight = $(window).height();
    $('#section0').width(devWidth);
    var w1 = -$('#section0 .wrap').width()/2;
    var h1 = -$('#section0 .wrap').height()/2;
    var w2 = -$('#section1 .content_box').width()/2;
    $('#section0 .wrap').css('margin-left',w1+"px")
                        .css('margin-top',h1+"px")
                        .css('left',"50%")
                        .css('top',"50%")

    $('#section1 .othermodules').css('height',devHeight-160);
    $('#section1 .content_box').css('top','50%').css('left','50%').css('margin-left',w2+"px");
    $('#section2 .wrap').css('height',devHeight-282);
  }

  require('animateColor');
  // 数字增长动画支持
  require('animateNumber');
  // 全屏滚动插件
  require('fullPage');

  $(function(){
    //第一屏根据身份禁止点击
    $('.disableSup a').removeAttr('href');
    $('.disableBuy a').removeAttr('href');

    // fullPage
    $('.index_box').fullpage({
      // 'anchors': ['section0', 'section1', 'section2'],
      'verticalCentered': false,
      'navigation': true,
      'resize': true,

      afterLoad: function(anchorLink, index){
        if(index == 1){
          $('span.mousedown').show();
          $('.header').animate({backgroundColor: 'rgba(48,56,69,0)'},1000);
          $('.header a').animate({color: '#fff'},500);
        }
        if(index == 2){
          $('#data-num').html('0');
          $('#flower-type').html('0');
          $('span.mousedown').show();

          $('.header').animate({backgroundColor: '#303845'},1000);
          $('.header a').animate({color: '#fff'},500);
          // 图片描述文字运动
          setTimeout(function () {
            $('.sheji_text').stop().animate({
              top: '120px'
            },700);

            $('.hejia_text').stop().animate({
              top: '120px'
            },700);

          },600);
          //数字增长
          $('#data-num').stop().animateNumber({ number: 888556 },1500);
          $('#flower-type').stop().animateNumber({ number: 20055 },1500);
        }
        if(index == 3){
          $('span.mousedown').hide();
          $('.header').animate({backgroundColor:'#303845'},1000);
          $('.header a').animate({color: '#fff'},500);
        }
      },
      onLeave: function(index, direction){
        if(index == 2){
          $('.sheji_text,.hejia_text').stop().animate({top: '-50%'},400);
        }
      }
    });

    // 滚动提示按钮点击事件
    $('.mousedown').on('click',function() {
      $.fn.fullpage.moveSectionDown();
    });

  });
})