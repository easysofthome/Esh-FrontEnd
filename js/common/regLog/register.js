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
  //智能下拉列表提示
  var companys = ['杭州格仁家纺有限公司', '杭州长相知家纺科技有限公司', '杭州天绫家纺有限公司', '杭州双顺家纺布艺有限公司']; //测试数据

  $(document).ready(function(){
    $('#CompanyName').autocomplete({
      hints: companys,
      width:$('#CompanyName').width()
    });
  });

//////////////////////////////////身份 选择//////////////////////////////////////
function userIdentity(){
  $('input[name="identity"]').bind('click',function(){
    var tag = $(this).attr('id');
    $('#factory_sel,#trafficker_sel,#importer_sel,#stockist_sel').hide();
    $('#'+tag+'_sel').show();
  });
}


//////////////////////////////////文本框输入提示 （银行卡、手机号）//////////////////////////////////////

  $(document).ready(function () {
    $('#RegName').inputTip({
      tag:'',
      marginTop:0
    });
  userIdentity();
   });
});