define(function (require, exports, module) {
    require('./quickPanel.css');
    //关闭引导页后创建引导页快捷入口动画
      module.exports.MoveBox = function() {
        $('body').prepend('<div id="toQuikStart" style="width:80%;height:80%;opacity: 0.3;filter: alpha(opacity=30);background: #000"></div>');
        var obj = "#toQuikStart";
        var divTop = $(obj).offset().top;
        var divLeft = $(obj).offset().left;
        $(obj).css({ "position": "absolute", "z-index": "500", "left":"20%", "top": "20%"});
        $(obj).animate({ "left": ($("#userGuide").offset().left + $("#userGuide").width()/3) + "px", "top": ($("#userGuide").offset().top + $("#userGuide").height()/2) + "px", "width": "10px", "height": "10px",'opacity': 0.3,'filter':'alpha(opacity=30)'}, 500,
          function () {
          $(obj).fadeTo(600, 0.2).hide(0);
        });
      }


      function quickTopDisplay(){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop<=100){
          $('#quickToTop').fadeOut();
        }else{
          $('#quickToTop').fadeIn();
        }
      }

      $(window).scroll(function(){
          quickTopDisplay();
      });



    //快捷入口,页面右侧 可快捷到顶部 底部
    $(document).ready(function(){
        quickTopDisplay();
        $("#quickToTop").click(function(){
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
        //  $("#quickToBottom").click(function(){
        //     $('body,html').animate({scrollTop: $('.copyright').offset().top},1000);
        //     return false;
        // });
    });





});