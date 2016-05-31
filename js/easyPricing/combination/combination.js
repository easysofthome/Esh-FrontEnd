define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/validation/validation');

////////////////////////////弹出层///////////////////////////////////

      //更改单品款式
      $("#modifySingleStyle").attr('href', 'javascript:void(0)');
      $("#modifySingleStyle").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '680px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '/html/easyPricing/pricing/similarSingle.html'},

          success: function (layero, index) {


          }
        });


      });


/////////////////////////////// 表单验证部分 ///////////////////////////////////


  // form
  var form = $("#combinationForm");

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

             window.location = "/html/easyPricing/combination/modify.html";
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
              proNum: {
                  number:true,
                  required: true,
                  maxlength:8
              }

          },
          messages: {
              proNum: {
                  number:'请输入数字！',
                  required: '数量不能为空！',
                  maxlength:'输入数值过长！'
              }
          }
      });
  }


init();



});