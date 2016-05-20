define(function(require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  /////////////////////////////// 表单样式部分 ///////////////////////////////////

  var placehold = require('js/common/module/placehold');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');
  var cus = require('customSelect');
  var spinner = require('spinner');
  var layer = require('layer');



  //下拉框
  $('#fabric-type').customSelect({width:"120px",padding:"12px 5px"});
  $('#minimum_order_num').customSelect({width:"120px",padding:"12px 5px"});
  $('#density_unit,#flowerColor_num,#isFixedPosition,#warp_flower_size,#across_flower_size,#exchange_rate').customSelect({width:"90px",padding:"12px 5px"});


  //纬纱/经纱 成分增减
  $('#warp-spinner').spinner({min:1,max:2});
  $('#abb-spinner').spinner({min:1,max:4});

  //加载单选按钮样式
  FancyRadioCheckBox.init();

  //选中样式
  $('.handle_one').click(function() {
      $(this).toggleClass('selected');
    });

  //占位符
  placehold.init('input');


  //iframe 弹出层 选择经纱
  $('.yarn_butt').on('click', function() {
    $.layer({
      type: 2,
      title: false,
      area: ['1000px', '465px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 650)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      iframe: {src: '/html/easyPricing/pricing/storehouse.html'},
      success: function () {

      }
    });
  });


    //iframe 弹出层 保存并发布
  $('.butt_return').on('click', function() {
    $.layer({
      type: 2,
      title: false,
      area: ['1020px', '524px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 650)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      iframe: {src: '/html/easyPricing/Pop-ups/result.html'},
      success: function () {
      }
    });
  });


/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#addFabricForm");

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
//addrules();
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
          onkeyup: true,
          errorPlacement: function(error, element) {
              error.appendTo(element.siblings('.input-tip') );
          },
          rules: {
              fabricName: {
                  required: true,
                  maxlength:20
              },
              warpSpinnerNum1: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              warpSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              abbSpinnerNum1: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              abbSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              warpFlowerSize: {
                  required: true,
                  maxlength:10
              },
              acrossFlowerSize: {
                  required: true,
                  maxlength:10
              },
              exchangeRate:{
                  number:true,
                  required: true,
                  maxlength:10
              },
              textRemarks: {
                  maxlength: 400
              }
          },
          messages: {
              fabricName: {
                  required: icons.error + '请输入面料名称！',
                  maxlength: icons.error + '面料名称过长！'
              },
              warpSpinnerNum1: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入第一个经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              warpSpinnerNum2: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入第二个经密值！',
                  maxlength: icons.error + '经密值过大！'

              },
              abbSpinnerNum1: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入第一个经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              abbSpinnerNum2: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入第二个经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              warpFlowerSize:{
                  required: icons.error + '请输入经向花回尺寸！',
                  maxlength: icons.error + '输入数值过长！'
              },
              acrossFlowerSize: {
                  required: icons.error + '请输入纬向花回尺寸！',
                  maxlength: icons.error + '输入数值过长！'
              },
              exchangeRate:{
                  number: icons.error + '汇率值只能是数字！',
                  required: icons.error + '请输入汇率！',
                  maxlength: icons.error + '输入数值过长！'

              },
              textRemarks: {
                  maxlength: icons.error + '备注信息过长！'
              }
          }
      });
  }


init();

});