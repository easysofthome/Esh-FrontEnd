define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/tip/jquery.poshytip');
  require('js/front/lib/validation/validation');
  require('js/front/lib/synchroInputText');
  var placehold = require('js/front/common/module/placehold');
  placehold.init('.user_box>input,.password_box>input,.authcode_box>input');

////////////////////////////错误提示框 tip///////////////////////////////////
function showTip(obj,msg,alignX,alignY,offsetX,offsetY){

 $(obj).poshytip({
      className: 'tip-violet',
      content: msg,
      showOn: 'none',
      alignTo: 'target',
      alignX: alignX,
      alignY: alignY,
      offsetX: offsetX,
      offsetY: offsetY
    });

  $(obj).poshytip('show');
}

function setMsgPosition(obj,msg,direction){
  switch(direction){
    case "right":
      showTip(obj,msg,"right","center",5,0);
      break;
    case "rightTop":
      showTip(obj,msg,"inner-left","top",50,5);
      break;
    case "rightBottom":
      showTip(obj,msg,"inner-left","bottom",0,5);
      break;
    default:
      showTip(obj,msg,"inner-left","bottom",0,0);
  }
}


/////////////////////////////////// 文本框输入提示 （银行卡、手机号） //////////////////////////////////////////
    //tag为如何格式化，例如手机号是### #### ####
   $(document).ready(function () {
    $('#userName').inputTip({
      tag:'userName',
      marginTop:5,
      width:$('#userName').width()
    });
   });

/////////////////////////////// 表单验证部分 ///////////////////////////////////

   /** 自定义规则 用户名验证 */
  function userRule (element, value) {
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
        var flag = new Array();
        var regPhone = new RegExp(reg[86]);
        var regEmail = new RegExp(email);
        flag[0] = false;
        if(regPhone.test(value)){
            flag[0] = true;
            flag[1] = 'phone';  //手机验证成功
        }else if(regEmail.test(value)){
            flag[0] = true;
            flag[1] = 'email';  //邮箱验证成功
        }
        if(!flag[0]){
             $(element).poshytip('destroy');
             setMsgPosition(element,'请输入正确的手机号或邮箱地址',$(element).attr("errorMsgPosition"));

        }else{
            $(element).poshytip('destroy');
        }
        return flag;
    }

 $.validator.addMethod('checkUser', function (value, element, param) {
            return this.optional(element) || userRule($(element), value);
        }, '');


  // form
  var form = $("#loginForm");

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  /** 表单验证 */
  var validator;
  function validate(callback) {
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
            if(callback){
              callback();
            }
            return false;
          },
          onfocusout:function(element){
              $(element).valid();
          },
          errorPlacement: function(error, element) {
              if($(element).attr('id')=='userName' && error.text().length == 0) return;
              $(element).poshytip('destroy');
              if(error.text().length > 0){
                   setMsgPosition(element,error.text(),$(element).attr("errorMsgPosition"));
              }
              return true;
          },
          success:function(element){
              $(element).poshytip('destroy');
          },
          rules: {
              userName: {
                  required: true
              },
              uPassWord: {
                  required: true
              },
              validateCode: {
                  required: true
              }

          },
          messages: {
              userName: {
                  required: icons.error + '手机号或邮箱不能为空'
              },
              uPassWord: {
                  required: icons.error + '密码不能为空！'
              },
              validateCode: {
                  required: icons.error + '验证码不能为空！'
              }
          }
      });
  }

   module.exports.validate = validate;

});