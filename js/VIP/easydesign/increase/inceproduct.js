define(function(require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  /////////////////////////////// 表单样式部分 ///////////////////////////////////

  var placehold = require('js/common/module/placehold');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');


  //加载单选按钮样式
  FancyRadioCheckBox.init();

  //占位符
  placehold.init('input');



/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#inceproductForm");

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  function init() {
      validate();

  }

  /** 表单验证 */
  var validator;
  function validate() {

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
              error.appendTo(element.siblings('.input-tip') );
          },
          rules: {
              fabricProName: {
                  required: true,
                  maxlength:20
              }
          },
          messages: {
              fabricProName: {
                  required: icons.error + '请输入成品名称！',
                  maxlength: icons.error + '成品名称过长！'
              }
          }
      });
  }


init();

});