// require:
// 文本的类名为:placeholder
//   var placehold = require('js/common/module/placehold');
// placehold.init('.username_box>input,.password_box>input,.passwordRe_box>input');

define(function (require, exports, module) {

  require('jquery');

  function init(obj) {
    $('.placeholder,'+obj).on('click focus',function  () {
      if($(this).hasClass('placeholder')){
        $(this).hide();
        $(this).siblings('input').focus();
      }else{
        $(this).siblings('.placeholder').hide();
      }
    });

    $(obj).blur(function() {
      if($(this).val()===''){
        $(this).siblings('.placeholder').show();
      }
    });

  }

  module.exports.init = init;

});