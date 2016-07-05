define(function (require, exports, module) {
  require('jquery');
  require('/js/front/lib/autocomplete/autocomplete');
  require('js/front/lib/synchroInputText');
  var placehold = require('js/front/common/module/placehold');
  placehold.init('.username_box>input,.password_box>input,.passwordRe_box>input');

  require('js/front/common/regLog/capslock');
  require('js/front/common/regLog/validate');
  require('js/front/common/regLog/protocol');

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
////////////////////////////////// 我有邀请码//////////////////////////////////////
  //展开/收起  我有邀请码
  $('.Invite-code-words').bind('click',function(){
      $('.Invite-code-input').toggle();
      if($(this).find('i').hasClass('unfold')){
        $(this).find('i').removeClass('unfold').addClass('Pack-up');
      }else{
        $(this).find('i').removeClass('Pack-up').addClass('unfold');
      }
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