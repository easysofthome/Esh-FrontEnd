define(function (require, exports, module) {
  require('jquery');

  $('.continent li').click(function () {
    $('.continent li.cur').removeClass('cur');
    $(this).addClass('cur');
    $('.country-ol').hide();
    $('.country-ol').eq($(this).index()).show();
  });

  // iframe 在此处进行设置关闭比较方便
  $('.close-btn').on('click',function () {
    var index = parent.layer.getFrameIndex(window.xubox_iframe1); //获取窗口索引
    parent.layer.close(index);
  });

});