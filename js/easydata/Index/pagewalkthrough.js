define(function (require, exports, module) {
  require('jquery');
  require('js/common/pagewalkthrough/jquery.pagewalkthrough-1.1.0');



  $(document).ready(function(){

    //页面引导功能
    $('#walkthrough').pagewalkthrough({

    steps:
        [
         {
             wrapper: '.module .module-li1', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: false,      //要高亮区域是否固定在顶部
             appendScrollNum:220,
             //引导说明文字图片区域
             popup:
             {
               content: '#extra_supplier_ch',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'bottom',   //相对高亮区域的位置
               offsetHorizontal: 230,  //水平位置
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
             wrapper: '.module .module-li1',
             margin: '0',
             popup:
             {
               content: '#extra_supplier_ch',
               type: 'tooltip',
               position: 'top',
               offsetHorizontal: 0,
               offsetVertical: 0,
               width: '400'
             },onLeave:function(){
               removeStyle();
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



  });

$(window).resize(function() {
        $('body').pagewalkthrough('renderOverlayNew');
    });

})