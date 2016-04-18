define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

  // input
  var form = $("#modify-baseData");

  var icons = {
      def: '<i class="i-def"></i>',
      error: '<i class="i-error"></i>',
  };

  function init() {
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
              case 'email':
                  resetStringLength(30,_id);
                  break;
              case 'phone':
                  resetStringLength(16,_id);
                  break;
              case 'contact':
                  resetStringLength(20,_id);
                  break;
              case 'qq':
                  resetStringLength(20,_id);
                  break;
              case 'address':
                  resetStringLength(100,_id);
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
          onkeyup: false,
          errorPlacement: function(error, element) {
              error.appendTo( element.siblings('.input-tip') );
          },
          rules: {
              email: {
                  required: true,
                  email: true
              },
              phone: {
                  required: true,
                  phone: true
              },
              contact: {
                  required: true
              },
              qq:{
                  required: true,
                  number: true
              },
              address: {
                  required: true
              }
          },
          messages: {
              email: {
                  required: icons.error + '请输入邮箱',
                  email: icons.error + '您输入的电子邮箱格式错误'
              },
              phone: {
                  required: icons.error + '请输入手机号码'
              },
              contact: {
                  required: icons.error + '请输联系人名字'
              },
              qq:{
                  required: icons.error + '请输入qq号码',
                  number: icons.error + '您输入的qq号码格式错误'
              },
              address: {
                  required: icons.error + '请输入详细地址'
              }
          }
      });
  }
  // 添加自定义规则
  function addrules() {
      var flag;
      $.validator.addMethod('phone', function (value, element, param) {
          return this.optional(element) || (phoneRule($(element),value));
      }, '');

  }
  /** phone */
  function phoneRule (element, value) {
      var reg = {
          "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
      };
      var regPhone = new RegExp(reg[86]);

      if(!regPhone.test(value)){
          flag = true;
          element.siblings('.input-tip').html('<span class="error">' + icons.error + '手机号码格式有误' +'</span>');
      }else{
          flag = false;
          element.siblings('.input-tip').html('');
      }
      return flag;
  }
  /** /phone */


  init();
});