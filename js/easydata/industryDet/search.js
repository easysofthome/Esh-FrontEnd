define(function (require, exports, module) {

  require('jquery');
  $('#peer>input').on('mouseover', function(event) {
    $(this).siblings('ol,ul').show();
  });
  $('#peer').hover(function(event) {

  },function () {
    $(this).find('ol,ul').hide();
  });
  // 点击选择
  $('.peer li').on('click', function(event) {
    $(this).parent().hide();
    $(this).parent().siblings('input').val($(this).text());
  });

});