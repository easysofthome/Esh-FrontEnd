define(function (require, exports, module) {
  require('jquery');
  require('js/common/pagewalkthrough/jquery.pagewalkthrough-1.1.0');



  $(document).ready(function(){

     //页面引导功能
    $('#walkthrough').pagewalkthrough(showUserGuideByIdentity());



  });

function MoveBox(obj) {
    var divTop = $(obj).offset().top;
    var divLeft = $(obj).offset().left;
    $(obj).css({ "position": "absolute", "z-index": "500", "left": divLeft + "px", "top": divTop + "px" });
    $(obj).animate({ "left": ($("#fixLeftMid").offset().left - $("#fixLeftMid").width()) + "px", "top": ($(document).scrollTop() + 30) + "px", "width": "100px", "height": "70px" }, 500, function () {
        $(obj).animate({ "left": $("#fixLeftMid").offset().left + "px", "top": $("#fixLeftMid").offset().top + "px" }, 500).fadeTo(0, 0.1).hide(0);
    });
}


  //检验用户身份
  function showUserGuideByIdentity(){
    var str_url_search = window.location.search;
    var unlogin = /UserIdentity=unlogin/;
    var loggedOn = /UserIdentity=loggedOn/;
    var VIPUser = /UserIdentity=VIPUser/;
    var isUpdate = false;
    if(str_url_search){
        // if(loggedOn.exec(str_url_search)){
        //   return walkthrough_loggedOn;
        // }

      // if(loggedOn.exec(str_url_search)){
      //   return walkthrough_loggedOn;
      // }else if(VIPUser.exec(str_url_search)){
      //   return walkthrough_VIPUser;
      // }
    }
    return walkthrough_VIPUser;

  }


   //vip用户引导项
   var walkthrough_VIPUser = {

    steps:
        [
        {
             wrapper: '#extra_abroad_buyer', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: false,      //要高亮区域是否固定在顶部
             appendScrollNum:0,
             //引导说明文字图片区域
             popup:
             {
               content: '#guide_step1',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'right',   //相对高亮区域的位置
               offsetHorizontal: 0,  //水平位置
               offsetVertical: 90,    //垂直位置
               width: '400'
             },
             accessable:true,//是否与高亮区域内元素互动
             lockScrolling: false,//是否随滚动条移动
             onLeave:function(){

               return true;
             },
             onEnter:function(){
                return true;
            }
       }
        ],
        onLoad: true,     //只在页面第一次加载时执行
        name: 'WalkthroughIndex',
        onClose: function(){
          resetStyle();
          return true;
        },
        onCookieLoad: function(){

        },
        onAfterShow:function(){
          initStyle();
          firstLoadGuide();
          return true;
        }

  };


        //页面引导功能

        $('.prev-step').live('click', function(e){
            $.pagewalkthrough('prev',e);
        });

        $('.next-step').live('click', function(e){
            $.pagewalkthrough('next',e);
        });

        $('.restart-step').live('click', function(e){
            $.pagewalkthrough('restart',e);
        });

        $('.close-step').live('click', function(e){
            resetStyle();
            $.pagewalkthrough('close');
            MoveBox('#jpWalkthrough');


        });




      //计算无滚动条的页面宽度
      function windowWidth() {
        return $(window).innerWidth() || $(window).width();
      }

      function initStyle(){
          $(".module-ul1").find('li').eq(0).css({'z-index':'2','height':'440px','color':'#ffffff','background-color':'#3CA1D7'});
          $(".module-ul1").find('li').eq(0).find('a').css({'color':'#ffffff','border':'1px solid #ffffff','display':'block'});
          $(".module-ul2").find('li').eq(1).css({'z-index':'0'});
          $('.module-wrapper .module-ul1 .module-li1 .icon-1').css({'background-position': '-4px -1165px'});

          $(".module-ul1").find('li').eq(0).unbind('hover');

      }

      function resetStyle(){
         $('.main-menu ul li a#open-extra').removeClass('active');
         $(document.body).css("overflow","");
         $(".module-ul1").find('li').eq(0).removeAttr('style');
         $(".module-ul1").find('li').eq(0).find('a').removeAttr('style');
         $(".module-ul1").find('li').eq(0).css({'z-index':'1','height':'210px'});

          $('.module-wrapper .module-ul1 .module-li1 .icon-1').css({'background-position': '-4px -1057px'});
          //重新绑定鼠标滑过特效
          $('[control=false] li a').css("display","block");
          $('[control=true] li').hover(
            function() {
              $(this).stop().css('z-index','2').animate({'height':'440px'},500);
              $(this).find('a').stop().delay(300).fadeIn();
              $('.module-wrapper .module-ul1 .module-li1 .icon-1').css({'background-position': '-4px -1165px'});
            },
            function () {
              $(this).stop().css('z-index','1').animate({'height':'210px'},300);
              $(this).find('a').stop().fadeOut();
              $('.module-wrapper .module-ul1 .module-li1 .icon-1').css({'background-position': '-4px -1057px'});
            }
          );
          $('.module-ul li a').hover(
            function() {
              $(this).fadeOut().fadeIn(300);
            },function () {
            }
          );

      }

      function skipGuide(){
         $('#jpWalkthrough #skipGuideBtn').bind("click",function(){
               $.pagewalkthrough('close');
               resetStyle();
          });
      }

      function firstLoadGuide(){
          var offsetW = $(document).width() ;
          $(document.body).css("overflow","hidden");
          if($("#overlayRight")[0]){
            $("#overlayRight")[0].style.width = offsetW + "px";
          }
      }







$(window).resize(function() {
        // /$('body').pagewalkthrough('renderOverlayNew');
});






});