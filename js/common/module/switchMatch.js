define(function (require, exports, module) {
  require('js/common/module/switchMatch.css');
  require('jquery');

  setTop(getHeight());

  function setTop (h) {
    $('.esh-sel').css('top',h);
  }

  function getHeight(){
    var obj = $('.esh-input');
    var h = obj.height();
    h += parseInt($('.esh-input').css('padding-top'));
    h += parseInt($('.esh-input').css('padding-bottom'));
    return h;
  }

  // 鼠标经过
  module.exports.initHover = function (inputObj) {
    $(inputObj + '>input').on('mouseover', function(event) {
      $(this).siblings('ol,ul').show();
    });
    $(inputObj).hover(
      function(event) {

      },function () {
        $(this).find('ol,ul').hide();
      }
    );
  }

  // 点击事件
  // module.exports.initClick = function (selObj) {
  //   $(selObj + '>li').on('click', function(event) {
  //     $(this).parent().hide();
  //     $(this).parent().siblings('input').val($(this).text())
  //   });
  // }
});