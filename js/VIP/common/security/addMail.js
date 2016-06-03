define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  var tools = require('tools');

  var placehold = require('js/common/module/placehold');
  placehold.init('.email-box>input');
  placehold.init('.authcode-box>input');


  // input
  var form = $("#modifyMail");

  var icons = {
      def: '<i class="i-def"></i>',
      error: '<i class="i-error"></i>',
      weak: '<i class="i-pwd-weak"></i>',
      medium: '<i class="i-pwd-medium"></i>',
      strong: '<i class="i-pwd-strong"></i>'
  };

  function init() {
      tools.bindClick_countdown("waitcodes","getValidateCode",20,0,"重新发送","mail");
      validate();
      bindEvent();
  }
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
            $('.input-tip span').css('display','block');
              $(element).valid();
          },
          errorPlacement: function(error, element) {
              if(error.text().length==0)return;
              element.siblings('.input-tip').html(error);
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
                  required: icons.error + '请输入邮箱号码！'
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
      }, '');
  }
/** 邮箱验证 */
  function mailRule (element, value) {
      var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
      var flag;
      var regMail = new RegExp(email);
      if(regMail.test(value)){
          element.parent().find('.input-tip').html('');
          flag = true;
      }else{
          element.parent().find('.input-tip').html('<span class="error">' + icons.error + '邮箱格式不正确，请重新输入！' +'</span>');
          flag = false;
      }
      return flag;
  }



/** /用户名验证 */

  init();



});