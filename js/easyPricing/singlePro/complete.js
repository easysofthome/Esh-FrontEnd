define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

  /////////////////////////////// 表单验证部分 ///////////////////////////////////


  // form
  var form = $("#completeForm");

  $('#collectPricingResult').on('click', function() {
         // / form.submit();

  });

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  function init() {
      validate();
      // bindEvent();
  }

  /** 表单验证 */
  var validator;
  function validate() {

      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //提交表单
            // formSubmit(form);
              //阻止表单提交
            // window.location = "/html/easyPricing/suite/complete.html";
             return false;
          },
          onfocusout:function(element){
               //修正的一个奇怪的bug，有时候错误信息不显示
              if($('.input-tip').find('span').length>0){
                $('.input-tip').find('span').show();
              }
              $(element).valid();
          },
          onkeyup: true,
          errorPlacement: function(error, element) {
              error.appendTo(element.siblings('.input-tip') );
          },
          rules: {
              fabricWidth: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricPrice: {
                  number:true,
                  required: true,
                  maxlength:8
              }

          },
          messages: {
              fabricWidth: {
                  number:'请输入数字！',
                  required: '面料门幅不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricPrice: {
                  number:'请输入数字！',
                  required: '面料价格不能为空！',
                  maxlength:'输入数值过长！'
              }

          }
      });
  }



init();
});