define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  require('js/lib/tip/jquery.poshytip');
  var tools = require('tools');
  require('js/lib/synchroInputText');
  var placehold = require('js/common/module/placehold');

  ////////////////////////////文本框占位符///////////////////////////////////
  placehold.init('#mail');
  placehold.init('.authcode-box>input');

////////////////////////////文本框输入提示 （银行卡、手机号） //////////////////////////
   $(document).ready(function () {
    $('#mail').inputTip({
      tag:'mail',
      marginTop:-8,
      width:$('#mail').width()
    });

   });
////////////////////////////验证码倒计时///////////////////////////////////
  function init() {
      tools.bindClick_countdown("waitcodes","getValidateCode",20,0,"重新发送","mail");
      validate();
      bindEvent();
  }

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
        showTip(obj,msg,"inner-right","bottom",-15,5);
        break;
      case "bottom":
        showTip(obj,msg,"inner-left","bottom",-17,5);
        break;
      default:
        showTip(obj,msg,"right","center",5,0);
    }
  }

/////////////////////////////////// 表单验证 //////////////////////////////////////////

// input
  var form = $("#modifyMail");

  var icons = {
      def: '<i class="i-def"></i>',
      error: '<i class="i-error"></i>',
      weak: '<i class="i-pwd-weak"></i>',
      medium: '<i class="i-pwd-medium"></i>',
      strong: '<i class="i-pwd-strong"></i>'
  };
/** 限制输入字符长度 **/
  function getStringLength (str) {
      if(!str){
          return;
      }
      var bytesCount = 0;
      for (var i = 0; i < str.length; i++) {
          var c = str.charAt(i);
          //判断是中文还是英文字符
          if (/^[\u0000-\u00ff]$/.test(c)){
              bytesCount += 1;
          }
          else{
              bytesCount += 2;
          }
      }
      return bytesCount;
  }
  function resetStringLength (length,_id) {
      _id='#'+_id;
      while(getStringLength($(_id).val())>length){
              $(_id).val($(_id).val().substring(0,$(_id).val().length-1));
      }
  }
  function bindEvent () {
      $('input[type=password],input[type=text]').bind('input', function() {
          var _id = $(this).attr('id');
          switch(_id){
              case 'mail':
                  resetStringLength(30,_id);
                  break;
              case 'authCode':
                  resetStringLength(6,_id);
                  break;
              default: break;
          }
      });
  }
/** /限制输入字符长度 **/

/** 表单验证 */
  var validator;
  var validatorTip = {'msg':'addMethod'};
  function validate() {
      addrules();
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //提交表单
              formSubmit(form);
              //阻止表单提交
              return false;
          },
          onfocusout:function(element){
              $(element).valid();
          },
          errorPlacement: function(error, element) {
             if(error.text()!='addMethod'){
                 $(element).poshytip('destroy');
              }
              if(error.text().length > 0&&error.text()!='addMethod'){

                   setMsgPosition(element,error.text(),$(element).attr("errorMsgPosition"));
              }
              return true;
          },
          success:function(element){
              $(element).poshytip('destroy');
          },
          rules: {
              //密码
              mail: {
                  required: true,
                  mail: true
              },
              authCode: {
                  required: true,
                  minlength: 6
              }
          },
          messages: {
              mail: {
                  required: icons.error + '请输入邮箱地址！'
              },
              authCode: {
                  required: icons.error + '请输入验证码！',
                  minlength: icons.error +'请输入六位验证码！'
              }
          }
      });
  }
  //验证规则
  function addrules() {

      $.validator.addMethod('mail', function (value, element, param) {
          return this.optional(element) || (mailRule($(element),value));
      }, validatorTip.msg);
  }
/** 邮箱验证 */
  function mailRule (element, value) {
      $(element).poshytip('destroy');
      var msg = '';
      var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
      var flag;
      var regMail = new RegExp(email);
      if(regMail.test(value)){
          flag = true;
      }else{
          msg = '邮箱格式错误，请重新输入！';
          setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
          flag = false;
      }
      return flag;
  }



/** /用户名验证 */

  init();



});