define(function (require, exports, module) {
  require('jquery');
  require('js/common/regLog/capslock');
  require('js/common/regLog/validate');
  require('js/common/regLog/protocol');

  // placeholder
  $('.placeholder,.username_box>input,.password_box>input,.passwordRe_box>input').on('click focus',function  () {
    if($(this).hasClass('placeholder')){
      $(this).hide();
      $(this).siblings('input').focus();
    }else{
      $(this).siblings('span').hide();
    }
  });
  $('.username_box>input,.password_box>input,.passwordRe_box>input').blur(function  () {
    if($(this).val()===''){
      $(this).siblings('span').show();
    }
  });

});