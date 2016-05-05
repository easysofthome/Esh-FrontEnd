define(function (require, exports, module) {

  require('jquery');
  var myTools = require('tools');


  // 颜色渐变支持

  // 窗口结构加载完成时
  $(document).ready(function(){
    $('#section1,#section2').css('display','block');
    setWH();
   //浏览器版本过低，跳转到升级页面
    validateLowBrowser();
  });

  // 窗口改变时
  $(window).resize(function() {
    setWH();

    //调整小鼠标的位置
    setTimeout(function(){
      var myMouse = new littleMouse();
      myMouse.setLittleMousePosition("section0_id","little_mouse");
    }, 600);


  });

  //低版本ie浏览器检测，并给出提示
  function validateLowBrowser(){
    if(myTools.browserHelp.isIE6||myTools.browserHelp.isIE7){
      var isUpdate = confirm(
        "您浏览器版本过低，继续浏览可能会影响您的体验，是否升级您的浏览器？");
      if(isUpdate){
        var downloadURL = "http://dl1sw.baidu.com/soft/9e/14917/IE10-Windows6.1-zh-cn.exe?version=3474208079";
        window.location = downloadURL;
      }
    }
  }

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
                        .css('top',"50%");

    $('#section1 .othermodules').css('height',devHeight-160);
    $('#section1 .content_box').css('top','50%').css('left','50%').css('margin-left',w2+"px");
    $('#section2 .wrap').css('height',devHeight-282);
  }

  //首页小鼠标定位操作
  //胡庆龙 2016-05-4
  var littleMouse=function(){
    this.mix_bottom = 10;
    this.m_bottom = 0;
    this.m_left = 0;

    //set小鼠标距离屏幕底部距离
    this.setLittleMousePosition=function (canZhaoId,targetId){
      var section0_top = $("#"+canZhaoId).offset().top;
      var padding_top = parseInt($("#"+canZhaoId).css('padding-top').replace("px",""));
      var padding_bottom = parseInt($("#"+canZhaoId).css('padding-bottom').replace("px",""));
      var mouseHeight = $("#"+targetId).height();

      var section0_height = $("#"+canZhaoId).height()+padding_top+padding_bottom;
      var windowHeight = $(window).height();

      var section0_bottom = windowHeight-(section0_top + section0_height);
      var t_bottom = this.mix_bottom;
       t_bottom = section0_bottom/2;
      if(section0_bottom >=this.mix_bottom){
          t_bottom = section0_bottom/2;
      }
      this.m_bottom = t_bottom;
      if((this.m_bottom - mouseHeight)<0){
        $("#"+targetId)[0].style.bottom = this.mix_bottom + "px";
      }else{
         $("#"+targetId)[0].style.bottom = (this.m_bottom - mouseHeight) + "px";
      }

    }

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
          $('#little_mouse').show();
          $('.header').animate({backgroundColor: 'rgba(48,56,69,0)'},1000);
          $('.header a').animate({color: '#fff'},500);
        }
        if(index == 2){
          $('#data-num').html('0');
          $('#flower-type').html('0');

          $('#little_mouse').hide();

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

          $('#little_mouse').hide();
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

    //调整小鼠标的位置
    var myMouse = new littleMouse();
    myMouse.setLittleMousePosition("section0_id","little_mouse");

  });
})