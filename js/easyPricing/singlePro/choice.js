define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#choiceForm");

  $('#btnNext').on('click', function() {

          form.submit();

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

             window.location = "/html/easyPricing/singleProduct/modify.html";
             return false;
          },
          onclick:function(element){
              //每次强行显示错误信息容器
             $('#messageBox span').css('display','block');
             $(element).valid();
          },
          onkeyup: true,
          errorPlacement: function(error, element) {
              error.appendTo($('#messageBox') );
          },
          rules: {
              "spam[]": {
                  required:true,
                  minlength:1
              }
          },
          messages: {
              "spam[]": {
                  required:'请至少选择一项！',
                  minlength:'请至少选择一项！'
              }
          }
      });
  }


init();

});