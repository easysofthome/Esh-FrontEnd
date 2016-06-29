define(function(require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  require('js/lib/tip/jquery.poshytip');

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
      showTip(obj,msg,"inner-left","top",0,5);
  }
}

/////////////////////////////// 表单样式部分 ///////////////////////////////////

  var placehold = require('js/common/module/placehold');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');
  var cus = require('customSelect');
  var spinner = require('spinner');
  var layer = require('layer');



  //下拉框
  $('#fabric-type').customSelect({width:"120px",padding:"12px 5px"});
  $('#minimum_order_num').customSelect({width:"120px",padding:"12px 5px"});
  $('#density_unit,#sel4,#sel5,#warp_flower_size,#across_flower_size,#exchange_rate').customSelect({width:"90px",padding:"12px 5px"});


  //纬纱/经纱 成分增减
  // 经纱纬纱事件
    $('#warp-spinner')
      .spinner({
        min:1,
        max:2,
        addEvent: function () {
          $('#yarn-ul').append('<li class="lf yarn_para">'
            + '<span class="lf para_tit">经纱2：</span>'
            + '<span class="lf include"></span>'
            + '<div class="lf" style="width: 142px;">'
              + '<span class="clearfix ingredient" >'
                + '<span class="lf ingredient_tit">成分</span>'
                + '<input class="lf input_fabric" name="" readonly="true" id="warpIngredient2"/>'
              + '</span>'
              + '<span class="clearfix thickness">'
              + '<span class="clearfix thickness">'
                + '<span class="lf ingredient_tit">粗细</span>'
                + '<input class="lf input_fabric" name="" readonly="true" id="warpDiameter2"/>'
              + '</span>'
            + '</div>'
            + '<div class="yarn_butt lf">选择纱线</div>'
          + '</li>');
          $('.fixed-input-tip').eq(0).before('<span class="plus lf"></span>'
            + '<input type="text" id="warpSpinnerNum2" errorMsgPosition="rightTop" name="warpSpinnerNum2" class="density_input lf">'
          );
        },
        cutEvent: function () {
          $('#yarn-ul li:last input').poshytip('destroy');
          $('#yarn-ul li:last').remove();
          $('#warp_num_box input:last').poshytip('destroy');
          $('#warp_num_box input:last,#warp_num_box .plus:last').remove();

        }
      });

    $('#abb-spinner').spinner({
      min:1,
      max:4,
      addEvent:function () {
        var num = $('#abb-ul li').length+1;
        $('#abb-ul').append('<li class="lf yarn_para">'
          + '<span class="lf para_tit">纬纱'+ num +'：</span>'
          + '<span class="lf include"></span>'
          + '<div class="lf" style="width: 142px;">'
            + '<span class="clearfix ingredient">'
              + '<span class="lf ingredient_tit">成分</span>'
              + '<input class="lf input_fabric" name="" readonly="true" id="weftIngredient'+num+'"/>'
            + '</span>'
            + '<span class="clearfix thickness">'
              + '<span class="lf ingredient_tit">粗细</span>'
              + '<input class="lf input_fabric" name="" readonly="true" id="weftDiameter'+num+'"/>'
            + '</span>'
          + '</div>'
          + '<div class="yarn_butt lf">选择纱线</div>'
          + '</li>');
        $('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
          + '<input type="text" id="abbSpinnerNum'+num+'" name="abbSpinnerNum'+num+'" class="density_input lf">');
      },
      cutEvent:function () {
        $('#abb-ul li:last input').poshytip('destroy');
        $('#abb-ul li:last').remove();
        $('#abb_num_box input:last').poshytip('destroy');
        $('#abb_num_box input:last,#abb_num_box .plus:last').remove();
      }
    });

    //染织方法
    $('#dyed-method label').on('click', function() {

      var index = $(this).index();
      $('.AddItem .js-tab').hide();
      $('.AddItem .js-tab').eq(index).show();
    });

  //加载单选按钮样式
  FancyRadioCheckBox.init();

  //选中样式
  $('.handle_one').click(function() {
    $(this).toggleClass('selected');
  });

  //占位符
  placehold.init('input');


  // 经纱种类选择纱线
  $('#yarn-ul').on('click', '.yarn_butt' , function() {
    $.layer({
      type: 2,
      title: false,
      area: ['1020px', '874px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 874)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: '/html/easyPricing/pricing/storehouse.html'},
      success: function () {

      }

    });
  });

  // 纬纱种类选择纱线
    $('#abb-ul').on('click', '.yarn_butt' , function() {
      $.layer({
        type: 2,
        title: false,
        area: ['1020px', '874px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 874)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        fix : false,
        iframe: {src: '/html/easyPricing/pricing/storehouse.html'},
        success: function () {

        }

      });
    });


//iframe 弹出层 保存并发布
var startPriceLayer = {
      type: 2,
      title: false,
      area: ['1020px', '550px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 550)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: '/html/easyPricing/Pop-ups/result.html'},
      success: function () {
      }
    }


/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#addFabricForm");

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  //如果没有上传图片 返回false
  function validateUpLoadImg(){
      $($('#filePicker')[0]).poshytip('destroy');
      if(!($('.filelist li img').attr('src'))){
          setMsgPosition($('#filePicker')[0],'请上传面料图片！',$('#filePicker').attr("errorMsgPosition"));
          return false;
      }
      return true;
  }

  /** 表单验证 */
  var validator;
  function validate(callback) {
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //验证上传图片是否为空
              if(!validateUpLoadImg()){
                  return false;
              }
              //执行回调
              if(callback){
                  callback();
              }
              return false;
          },
          onfocusout:function(element){
              $(element).valid();
          },

          errorPlacement: function(error, element) {
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
              warpIngredient1: {
                  required: true
              },
              warpIngredient2: {
                  required: true
              },
              warpDiameter1: {
                  required: true
              },
              warpDiameter2: {
                  required: true
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
              abbSpinnerNum3: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              abbSpinnerNum4: {
                  number:true,
                  required: true,
                  maxlength:10
              },
              weftIngredient1: {
                  required: true
              },
              weftIngredient2: {
                  required: true
              },
              weftIngredient3: {
                  required: true
              },
              weftIngredient4: {
                  required: true
              },
              weftDiameter1: {
                  required: true
              },
              weftDiameter2: {
                  required: true
              },
              weftDiameter3: {
                  required: true
              },
              weftDiameter4: {
                  required: true
              },
              warpFlowerSize: {
                  required: true,
                  number:true,
                  maxlength:10
              },
              acrossFlowerSize: {
                  required: true,
                  number:true,
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
                  required: icons.error + '请输入经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              warpSpinnerNum2: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              warpIngredient1: {
                  required: icons.error + '请输入经纱成分！'
              },
              warpIngredient2: {
                  required: icons.error + '请输入经纱成分！'
              },
              warpDiameter1: {
                  required: icons.error + '请输入经纱粗细！'
              },
              warpDiameter2: {
                  required: icons.error + '请输入经纱粗细！'
              },
              abbSpinnerNum1: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              abbSpinnerNum2: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              abbSpinnerNum3: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              abbSpinnerNum4: {
                  number: icons.error + '经密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              weftIngredient1: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient2: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient3: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient4: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftDiameter1: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter2: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter3: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter4: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              warpFlowerSize:{
                  required: icons.error + '请输入经向花回尺寸！',
                  number:icons.error + '经向花回尺寸只能是数字！',
                  maxlength: icons.error + '输入数值过长！'
              },
              acrossFlowerSize: {
                  required: icons.error + '请输入纬向花回尺寸！',
                  number:icons.error + '纬向花回尺寸只能是数字！',
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

  $(document).ready(function(){
      $('#btnSaveAndPublish').on('click', function() {
          form.submit();
      });
  });

  //接口 参数为回调函数 表单验证成功后执行
  module.exports.validate = validate;

});