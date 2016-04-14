define(function (require, exports, module) {
  require('jquery');
  require('js/easydesign/Index/banner');
  // 设计资源库
  require('js/easydesign/Index/sourceLib');


  $(document).ready(function () {
    $('.exo_conbox li').append("<div class='top-line'></div><div class='right-line'></div><div class='bottom-line'></div><div class='left-line'></div>");
  });
});