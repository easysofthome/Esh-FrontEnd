define(function (require, exports, module) {
  require('jquery');
  require('js/common/pagewalkthrough/jquery.pagewalkthrough-1.1.0');



  $(document).ready(function(){

    //页面引导功能
    $('#walkthrough').pagewalkthrough({

    steps:
        [
        {

             wrapper: '#sel-country', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: false,      //要高亮区域是否固定在顶部
             appendScrollNum:0,
             //引导说明文字图片区域
             popup:
             {
               content: '#guide_step1',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'bottom',   //相对高亮区域的位置
               offsetHorizontal: 0,  //水平位置
               offsetVertical: 0,    //垂直位置
               width: '630'
             },
             accessable:true,//是否与高亮区域内元素互动
             lockScrolling: false//是否随滚动条移动
             ,onLeave:function(){

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
             accessable:true,//是否与高亮区域内元素互动
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
          selectDropdownGuide();
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


      }

      function removeStyle(){
         $('.main-menu ul li a#open-extra').removeClass('active');
         $(document.body).css("overflow","");

      }

      //跳过引导层
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

      function selectDropdownGuide(){
          var overlayBottom_Top = $('#overlayBottom').offset().top ;
          var bottomAccessable_top = $('#bottomAccessable').offset().top;

          $("#sel-country").hover(function(){
            var num = $('#sel-country .sel-country').height();
            var bottomH = $(document).height() - (parseInt($('#overlayTop').height()) + parseInt(num));
            //alert($('#overlayBottom').offset().top + 'ddd'+num);
           // alert($('#bottomAccessable').offset().top + 'sss'+num);

            var overlayBottom_top_tmp = overlayBottom_Top + num;
            var bottomAccessable_top_tmp = bottomAccessable_top + num;
            setLightH(num+30,bottomH,overlayBottom_top_tmp,bottomAccessable_top_tmp);

            //动画
            //$(this).stop().animate({});
          },function(){
            var num = $('#sel-country').height();
            //setLightH(num,bottomH);

            //$(this).stop().animate({});

          });


      }

      function setLightH(num,bNum,overlayBottom_Top,bottomAccessable_top){
        $('#middleLeft').height(num);
        $('#middleRight').height(num);
        $('#overlayRight').height(num+60);
        $('#overlayLeft').height(num+60);
        $('#overlayBottom').height(bNum);
        $('#overlayBottom').css('top',overlayBottom_Top);

        $('#bottomAccessable').css('top',bottomAccessable_top);

      }









  });





      $(window).resize(function() {
        $('body').pagewalkthrough('renderOverlay');
    });

})