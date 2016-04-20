define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

  // input
  var form = $("#form-submit");

  var icons = {
      def: '<i class="i-def"></i>',
      error: '<i class="i-error"></i>',
  };

  function init() {
      validate();
      // bindEvent();
  }

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
              remitAccount: {
                  required: true,
                  // creditcard: true
                  number: true
              },
              remitter: {
                  required: true
              },
              num: {
                  required: true,
                  number: true
              },
              dataTime:{
                  required: true
              },
              phone: {
                  required: true,
                  phone: true
              },
              remark: {
                  maxlength: 400
              }
          },
          messages: {
              remitAccount: {
                  required: icons.error + '请输入汇款人银行账号',
                  number: icons.error + '账号格式错误'
              },
              remitter: {
                  required: icons.error + '请输入汇款人姓名'
              },
              num: {
                  required: icons.error + '请输入汇款金额',
                  number: icons.error + '金额格式错误'
              },
              dataTime:{
                  required: icons.error + '请选择汇款时间'
              },
              phone: {
                  required: icons.error + '请填写联系人手机号'
              },
              remark: {
                  required: icons.error + '备注信息不能超过200个字符'
              }
          }
      });
  }
  // 添加验证规则
  function addrules() {
      var flag;
      $.validator.addMethod('phone', function (value, element, param) {
          return this.optional(element) || (phoneRule($(element),value));
      }, '');

  }
  /** phone */
  function phoneRule (element, value) {
      var reg = {
          "86": "^(13|15|18|14|17)[0-9]{9}$"  // 中国
      };
      var regPhone = new RegExp(reg[86]);

      if(!regPhone.test(value)){
          flag = true;
          element.siblings('.input-tip').html('<span class="error">' + icons.error + '您输入的手机号码格式错误' +'</span>');
      }else{
          flag = false;
          element.siblings('.input-tip').html('');
      }
      return flag;
  }
  /** /phone */
  $('.placeholder,#num>input').on('click', function() {
    if($(this).hasClass('placeholder')){
      $(this).siblings('input').focus();
    }else{
      $('#num>input').focus();
    }
    $('#num>.placeholder').hide();
  });
  $('.placeholder,#num>input').on('focus', function() {
    $('#num>.placeholder').hide();
  });

  $('#num>input').on('blur', function() {
    if($(this).val() == ''){
      if($(this).hasClass('placeholder')){
        $(this).show();
      }else{
        $(this).siblings('div.placeholder').show();
      }
    }
  });


  init();
});