define(function (require, exports, module) {
  require('jquery');
  require('pagewalkthrough');
  var quickPanel = require('js/front/common/quickPanel/quickPanel');


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

//////////////////////////引导页参数配置////////////////////////////////

   //vip用户引导项
   var walkthrough_VIPUser = {

    steps:
        [
        {
             wrapper: '#corepriceGuide', //高亮区域 class 或 id
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
               width: '520'
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
        onLoad: false,     //只在页面第一次加载时执行
        name: 'WalkthroughIndex',
        onClose: function(){
          resetStyle();
          quickPanel.MoveBox();
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

//////////////////////////引导页按钮控制 ////////////////////////////////

        //上一页
        $('.prev-step').live('click', function(e){
            $.pagewalkthrough('prev',e);
        });
        //下一页
        $('.next-step').live('click', function(e){
            $.pagewalkthrough('next',e);
        });

        $('.restart-step').live('click', function(e){
            $.pagewalkthrough('restart',e);
        });
        //关闭
        $('.close-step').live('click', function(e){
            resetStyle();
            $.pagewalkthrough('close');
             quickPanel.MoveBox();

        });

        function skipGuide(){
         $('#jpWalkthrough #skipGuideBtn').bind("click",function(){
               $.pagewalkthrough('close');
               resetStyle();
          });
      }

//////////////////////////引导页样式////////////////////////////////

      //计算无滚动条的页面宽度
      function windowWidth() {
        return $(window).innerWidth() || $(window).width();
      }

      function initStyle(){
      }

      function resetStyle(){
         $('.main-menu ul li a#open-extra').removeClass('active');
         $(document.body).css("overflow","");
      }


      function firstLoadGuide(){
          var offsetW = $(document).width() ;
          $(document.body).css("overflow","hidden");
          if($("#overlayRight")[0]){
            $("#overlayRight")[0].style.width = offsetW + "px";
          }
      }


//////////////////////////页面加载与窗口变化////////////////////////////////

  $(window).resize(function() {
      $('body').pagewalkthrough('renderOverlayNew');
  });


 $(document).ready(function(){

     //点击右侧引导页快捷入口，打开引导页
    $('#userGuide').bind('click',function(){
          $('#walkthrough').pagewalkthrough(showUserGuideByIdentity());
      });

     //页面引导功能
    $('#walkthrough').pagewalkthrough(showUserGuideByIdentity());

  });



});