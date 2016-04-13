define(function (require, exports, module) {

  require('jquery');

  // .hover,a:hover{color: #f60;}

  // 参数大写避免重复赋值
  // Ul: 外层ul的类或者id
  // Li: 内层标签名
  // Line: 运动线的标签名
  // CurName: 当前的标签类名
  // Width: 每个li的宽度
  //
  // 调用：
  // seajs.use("js/easydata/common/switchTab",function (switchTab) {
  //    switchTab.set(".timeswitchbox","a","span",".cur",100);
  // });
  exports.set = function (Ul,Li,Line,CurName,Width) {

    var ul = $(Ul);
    var li = $(Ul + " " + Li);
    var line = $(Ul + " " + Line);
    var curIndex = $(Ul + " " + Li + CurName).index();
    var width = Width;

    window.onload = function () {
      var init = ul.find('a.cur');
      // line.css("left",width*(init.index()));
      line.stop().animate({left: width*(init.index())},0);
    };

    $(function(){

      li.hover(
        function(e) {
          var superThis = $(this);
          if($(this).index() != curIndex)
            ul.find('.hover').removeClass('hover');
            line.stop().animate({left: width*($(this).index())},200,function() {
            superThis.addClass('hover');
          });
        },
        function(e) {
          //避免闪烁
          if($(this).index() != curIndex)
            ul.find('a.hover').removeClass('hover');
            line.stop().animate({left: width*(curIndex)},100,function() {
            ul.find('a.cur').addClass('hover');
          });
        }
      );

      li.click(function (argument) {
        ul.find('a.cur').removeClass('cur');
        $(this).addClass('cur hover');
        curIndex = $(this).index();
      });

    });
  }
});

