define(function (require, exports, module) {
  require('jquery');
  require('pagewalkthrough');

  $(document).ready(function(){

    //页面引导功能
    $('#walkthrough').pagewalkthrough({

    steps:
        [
         {
             wrapper: '.vip-ser', //高亮区域 class 或 id
             margin: '0',         //最好别改
             isTopFix: true,      //要高亮区域是否固定在顶部
             //引导说明文字图片区域
             popup:
             {
               content: '#user_area',//引导元素id/class(提前在页面定义)
               type: 'tooltip',      //类型
               position: 'bottom',   //相对高亮区域的位置
               offsetHorizontal: 0,  //水平位置
               offsetVertical: 0,    //垂直位置
               width: '500'
             },
             accessable:false,//是否与高亮区域内元素互动
             lockScrolling: false//是否随滚动条移动
           },
           {
             wrapper: '.menu',
             margin: '0',
             isTopFix: true,
             popup:
             {
               content: '#navigation_global',
               type: 'tooltip',
               position: 'bottom',
               offsetHorizontal: 0,
               offsetVertical: 0,
               width: '400'
             }
           },
           {
             wrapper: '.sim_img_box .clearfix',
             margin: '0',
             popup:
             {
               content: '#simulation_area',
               type: 'tooltip',
               position: 'top',
               offsetHorizontal: 0,
               offsetVertical: 0,
               width: '400'
             }
           },
           {
             wrapper: '#showStudioList',
             margin: '0',
             popup:
             {
               content: '#studio_area',
               type: 'tooltip',
               position: 'top',
               offsetHorizontal: 0,
               offsetVertical: 0,
               width: '400'
             }
           }

        ],
        onLoad: true,     //只在页面第一次加载时执行
        name: 'Walkthrough',
        onClose: function(){
             $('.main-menu ul li a#open-extra').removeClass('active');
              $(document.body).css("overflow","");
          return true;
        },
        onCookieLoad: function(){

        },
        onAfterShow:function(){
          var offsetW = $(document).width() ;
          $(document.body).css("overflow","hidden");
          $("#overlayRight")[0].style.width = offsetW + "px";
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
            $(document.body).css("overflow","");
        });


      //计算无滚动条的页面宽度
      function windowWidth() {
        return $(window).innerWidth() || $(window).width();
      }

  });

})