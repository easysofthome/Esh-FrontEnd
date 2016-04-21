define(function (require, exports, module) {

  require('jquery');

  // 参数大写避免重复赋值
  // Btn:外层选择器
  // BtnTit:显示的文字
  // BtnUl:列表的选择器
  // BtnLi:子项的选择器
  // BtnAfter:BtnTit比BtnLi中多出来的部分
  module.exports.set = function (Btn,BtnTit,BtnUl,BtnLi,BtnAfter) {
    var btn = $(Btn);
    var btnTit = $(BtnTit);
    var btnUl = $(BtnUl);
    var btnLi = $(BtnLi);
    var btnAfter = BtnAfter;

    btn.hover(function(event) {
      btnUl.stop().slideDown("fast");
    },function(event) {
      btnUl.stop().slideUp("fast");
    });
    btnLi.click(function (argument) {
      btnTit.html($(this).html()+btnAfter);
      btnUl.stop().slideUp("fast");
    });
  }

});