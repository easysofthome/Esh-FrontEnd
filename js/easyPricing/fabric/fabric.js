define(function(require, exports, module) {
    require('jquery');
    require('js/front/lib/tip/jquery.poshytip');
    require('layer');
    require('spinner');
    require('customSelect');

    require('js/front/lib/validation/validation');

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


////////////////////////////表单样式///////////////////////////////////
    $('#sel1').customSelect({width:"150px",padding:"12px 5px"});
    $('#sel2,#sel3,#sel4,#sel5').customSelect({width:"90px",padding:"12px 5px"});
    $('#sel6').customSelect({width:"200px",padding:"12px 5px"});

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

    $('.handle_one').click(function() {
      $(this).toggleClass('selected');
    });

    //染织方法
    $('#dyed-method label').on('click', function() {

      var index = $(this).index();
      $('.AddItem .js-tab').hide();
      $('.AddItem .js-tab').eq(index).show();
    });

////////////////////////////弹出层///////////////////////////////////

//点击开始核价 弹出层 配置选项
var startPriceLayer = {
        type: 2,
        title: false,
        area: ['1020px', '650px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 650)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        fix : false,
        iframe: {src: '/html/easyPricing/pricing/result.html'},
        success: function () {

        }

      }

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
        success: function (layer) {

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

    //选择织造工缴工厂报价
    $('.factoryOffer_butt').on('click', function() {
      $.layer({
        type: 2,
        title: false,
        area: ['1000px', '270px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 270)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        fix : false,
        iframe: {src: '/html/easyPricing/pricing/selectQuotation.html'},
        success: function () {

        }

      });
    });
/////////////////////////////// 关闭引导层 ///////////////////////////////////
function closeGuideLayer(){
  $.pagewalkthrough('close');
  $(document.body).css("overflow","");
}


/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#fabricForm");

  $('#startPrice').on('click', function() {
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
//addrules();
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //提交表单
            // formSubmit(form);
            closeGuideLayer();
              //阻止表单提交
            $.layer(startPriceLayer);
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
              fabricWidth: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
              },
              warpSpinnerNum1: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
              },
              warpSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
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
                  maxlength:10,
                  gt:0
              },
              abbSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
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
              exchangeRate: {
                  required: true,
                  number: true,
                  maxlength:10,
                  gt:0
              },
              factoryPrice1: {
                  number: true,
                  maxlength:10,
                  gt:0
              },
              factoryPrice2: {
                  number: true,
                  maxlength:10,
                  gt:0
              },
              factoryPrice3: {
                  number: true,
                  maxlength:10,
                  gt:0
              }
          },
          messages: {
              fabricWidth: {
                  required: icons.error + '请输入面料门幅！',
                  number: icons.error + '面料门幅值只能是数字！',
                  maxlength: icons.error + '面料门幅值过长！'
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
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum2: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum3: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum4: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
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
              exchangeRate:{
                  required: icons.error + '请输入汇率！',
                  number: icons.error + '汇率值只能是数字！',
                  maxlength: icons.error + '输入数值过长！'
              },
              factoryPrice1: {
                  number: icons.error + '只能输入数字！',
                  maxlength: icons.error + '输入数值过长！'
              },
              factoryPrice2:{
                  number: icons.error + '只能输入数字！',
                  maxlength: icons.error + '输入数值过长！'

              },
              factoryPrice3: {
                  number: icons.error + '只能输入数字！',
                  maxlength: icons.error + '输入数值过长！'
              }
          }
      });
  }


//核价方式：选择易家纺工缴库核价   选择工厂报价核价
$(document).ready(function(){
  $('.factoryOffer-box').hide();
  $('#easySoftHomePrice_rad').bind('click',function(){
    $('.factoryOffer-box').hide();
  });
  $('#factoryPrice_rad').bind('click',function(){
    $('.factoryOffer-box').show();
  });

});


init();




})