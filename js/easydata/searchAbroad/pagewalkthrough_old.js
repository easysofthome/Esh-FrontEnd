define(function (require, exports, module) {
  require('jquery');
  require('js/common/pagewalkthrough/jquery.pagewalkthrough-1.1.0');



  $(document).ready(function(){

    //页面引导功能
    $('#walkthrough').pagewalkthrough({

    steps:
        [
        {

             wrapper: '#sel_country', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: false,      //要高亮区域是否固定在顶部
             appendScrollNum:0,
             //引导说明文字图片区域
             popup:
             {
               content: '#guide_step1',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'left',   //相对高亮区域的位置
               offsetHorizontal: 0,  //水平位置
               offsetVertical: -90,    //垂直位置
               width: '630'
             },
             accessable:false,//是否与高亮区域内元素互动
             lockScrolling: false//是否随滚动条移动
             ,onLeave:function(){
               removeStyle();
               return true;
             },
             onEnter:function(){

                return true;
            }
       },
       {
             wrapper: '#guideToView', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: true,      //要高亮区域是否固定在顶部
             appendScrollNum:0,
             //引导说明文字图片区域
             popup:
             {
               content: '#guide_step2',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'left',   //相对高亮区域的位置
               offsetHorizontal: 0,  //水平位置
               offsetVertical: -90,    //垂直位置
               width: '630'
             },
             accessable:false,//是否与高亮区域内元素互动
             lockScrolling: false//是否随滚动条移动
             ,onLeave:function(){
               removeStyle();
               return true;
             },
             onEnter:function(){

                return true;
             }

        }

        ],
        onLoad: true,     //只在页面第一次加载时执行
        name: 'Walkthrough',
        onClose: function(){
          removeStyle();
          return true;
        },
        onCookieLoad: function(){

        },
        onAfterShow:function(){
          initStyle();

          firstLoadGuide();
          skipGuide();

        }

  });

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
            $.pagewalkthrough('close');
            removeStyle();

        });




      //计算无滚动条的页面宽度
      function windowWidth() {
        return $(window).innerWidth() || $(window).width();
      }

      function initStyle(){
          $(".module-ul1").find('li').eq(0).css({'z-index':'2','height':'440px','color':'#ffffff','background-color':'#3CA1D7'});
          $(".module-ul1").find('li').eq(0).find('a').css({'color':'#ffffff','border':'1px solid #ffffff','display':'block'});;
          $(".module-ul2").find('li').eq(1).css({'z-index':'0'});
          clickHighLight();
      }

      function removeStyle(){
         $('.main-menu ul li a#open-extra').removeClass('active');
         $(document.body).css("overflow","");
        $(".module-ul1").find('li').eq(0).removeAttr('style');
      }

      function skipGuide(){
         $('#jpWalkthrough #skipGuideBtn').bind("click",function(){
               $.pagewalkthrough('close');
               removeStyle();
          });
      }

      function firstLoadGuide(){
          var offsetW = $(document).width() ;
          $(document.body).css("overflow","hidden");
          if($("#overlayRight")[0]){
            $("#overlayRight")[0].style.width = offsetW + "px";
          }
      }

      function clickHighLight(){
         $("#middleCenter").bind("click",function(){
            var url = $("#guideToView").attr("href");
            window.open(url)
          });
      }

  });


      $(window).resize(function() {
        $('body').pagewalkthrough('renderOverlay');
    });

})