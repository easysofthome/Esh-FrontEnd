define(function (require, exports, module) {
  require('jquery');
  require('/js/lib/autocomplete/autocomplete');
  require('js/lib/synchroInputText');
  var placehold = require('js/common/module/placehold');
  placehold.init('.username_box>input,.password_box>input,.passwordRe_box>input');

  require('js/common/regLog/capslock');
  require('js/common/regLog/validate');
  require('js/common/regLog/protocol');

//////////////////////////////////验证码倒计时//////////////////////////////////////
  //验证码倒计时可在‘bindClick_countdown’最后一个参数上添加回调函数
  var tools = require('tools');
  tools.bindClick_countdown("waitcodes","getValidateCode",20,0,"重新发送","RegName");


//////////////////////////////////智能下拉列表提示//////////////////////////////////////

  function showComNameList(obj,companys){
      $(obj).autocomplete({
        hints: companys,
        width: $(obj).width()
      });
  }

  $('.Invite-code-words').bind('click',function(){
      $('.Invite-code-input').toggle();
  });

//////////////////////////////////文本框输入提示 （银行卡、手机号）//////////////////////////////////////

  $(document).ready(function () {
    $('#RegName').inputTip({
      tag:'',
      marginTop:0
    });
   });

  //接口
  exports.showComNameList = showComNameList;
});