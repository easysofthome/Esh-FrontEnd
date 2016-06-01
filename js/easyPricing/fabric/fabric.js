define(function(require, exports, module) {
    require('jquery');
    require('layer');
    require('spinner');
    require('customSelect');
    require('js/lib/tip/jquery.poshytip');
    require('js/lib/validation/validation');

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

    $('#warp-spinner').spinner({min:1,max:2});
    $('#abb-spinner').spinner({min:1,max:4});

    $('.handle_one').click(function() {
      $(this).toggleClass('selected');
    });

////////////////////////////弹出层///////////////////////////////////

var startPriceLayer = {
        type: 2,
        title: false,
        area: ['1000px', '617px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 650)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        iframe: {src: '../pricing/result.html'},
        success: function () {

        }

      }



    $('.yarn_butt').on('click', function() {
      $.layer({
        type: 2,
        title: false,
        area: ['1000px', '844px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 844)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        iframe: {src: '../pricing/storehouse.html'},
        success: function () {

        }

      });
    });


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
              //阻止表单提交
            $.layer(startPriceLayer);
             return false;
          },
          onfocusout:function(element){
              $(element).valid();
          },
          errorPlacement: function(error, element) {
             $(element).poshytip('destroy');
              if(error.text().trim().length > 0){
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
                  maxlength:10
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
              exchangeRate: {
                  required: true,
                  number: true,
                  maxlength:10
              },
              factoryPrice1: {
                  number: true,
                  maxlength:10
              },
              factoryPrice2: {
                  number: true,
                  maxlength:10
              },
              factoryPrice3: {
                  number: true,
                  maxlength:10
              }
          },
          messages: {
              fabricWidth: {
                  required: icons.error + '请输入面料门幅！',
                  number: icons.error + '面料门幅值只能是数字！',
                  maxlength: icons.error + '面料门幅值过长！'
              },
              warpSpinnerNum1: {
                  number: icons.error + '第一个经密值只能是数字！',
                  required: icons.error + '请输入第一个经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              warpSpinnerNum2: {
                  number: icons.error + '第二个经密值只能是数字！',
                  required: icons.error + '请输入第二个经密值！',
                  maxlength: icons.error + '经密值过大！'

              },
              abbSpinnerNum1: {
                  number: icons.error + '第一个纬密值只能是数字！',
                  required: icons.error + '请输入第一个经密值！',
                  maxlength: icons.error + '经密值过大！'
              },
              abbSpinnerNum2: {
                  number: icons.error + '第二个纬密值只能是数字！',
                  required: icons.error + '请输入第二个经密值！',
                  maxlength: icons.error + '经密值过大！'
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




init();




})