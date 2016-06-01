define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/tip/jquery.poshytip');
  require('js/lib/validation/validation');

  ///////////////////////表单样式初始化//////////////////////////////////
  var FancyRadioCheckBox = require('FancyRadioCheckBox');
  FancyRadioCheckBox.init();

  var evTimeStamp = 0;
  $('.lab').on('click', function() {
    var now = +new Date();
    if (now - evTimeStamp < 100) {
      return;
    }
    evTimeStamp = now;

    $('.modifybox').find('.information').eq($(this).index()).toggle();
  });


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
      showTip(obj,msg,"inner-left","top",0,10);
  }
}

////////////////////////////弹出层///////////////////////////////////

      //获取出口税率
      $("#exportTariff").attr('href', 'javascript:void(0)');
      $("#exportTariff").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '439px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/export.html'},
          success: function (layero, index) {


          }
        });
      });

      //产品辅料 查看修改
      $("#product_view").attr('href', 'javascript:void(0)');
      $("#product_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '272px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/productacc.html'},
          success: function (layero, index) {


          }
        });
      });

      //包装辅料 查看修改
      $("#packing_view").attr('href', 'javascript:void(0)');
      $("#packing_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '272px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/productacc.html'},
          success: function (layero, index) {


          }
        });
      });

       //体积信息 查看修改
      $("#volume_view").attr('href', 'javascript:void(0)');
      $("#volume_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '190px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/volume.html'},
          success: function (layero, index) {


          }
        });
      });


       //替换面料
      $("#replaceFabric_id").attr('href', 'javascript:void(0)');
      $("#replaceFabric_id").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '980px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 964)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/replaceFabric.html'},
          success: function (layero, index) {


          }
        });
      });


      //辅料替换
      $(".accessories_name").attr('href', 'javascript:void(0)');
      $(".accessories_name").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '586px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 586)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          iframe: {src: '../pricing/accessories.html'},
          success: function (layero, index) {


          }
        });
      });

/////////////////////////////// 表单验证部分 ///////////////////////////////////


  // form
  var form = $("#suiteModifyForm");

  $('#btnStartPrice').on('click', function() {
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
             window.location = "/html/easyPricing/suite/complete.html";
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
            //error.appendTo(element.siblings('.input-tip') );
          },
          success:function(element){
              $(element).poshytip('destroy');
          },
          rules: {
              USARate: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              educationalTariff: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              RefundRate: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              profitRate: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              domesticProfit: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              startPort: {
                  maxlength:20
              },
              twentyCounterPerPrice: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              endPort: {
                  maxlength:20
              },
              fortyCounterPerPrice: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              exportTariff: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              exportCountry: {
                  maxlength:20
              },
              premiumRate: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              CustomsClearanceFee: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              creditRisk: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              interest: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              commision: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              exportProfitRate: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricWidth_a: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricPrice_a: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricWidth_b: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricPrice_b: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricWidth_c: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fabricPrice_c: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              yuanPerKg: {
                  number:true,
                  required: true,
                  maxlength:8
              },
              fillingWeight : {
                  number:true,
                  required: true,
                  maxlength:8
              },
              factoryOffer : {
                  number:true,
                  maxlength:8
              }

          },
          messages: {
              USARate: {
                  number:'请输入数字！',
                  required: '美元汇率不能为空！',
                  maxlength:'输入数值过长！'
              },
              educationalTariff: {
                  number:'请输入数字！',
                  required: '增值税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              RefundRate: {
                  number:'请输入数字！',
                  required: '退税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              profitRate: {
                  number:'请输入数字！',
                  required: '利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              domesticProfit: {
                  number:'请输入数字！',
                  required: '内销利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              startPort: {
                  maxlength:'输入字符过长！'
              },
              twentyCounterPerPrice: {
                  number:'请输入数字！',
                  required: '20柜单价不能为空！',
                  maxlength:'输入数值过长！'
              },
              endPort: {
                  maxlength:'输入字符过长！'
              },
              fortyCounterPerPrice: {
                  number:'请输入数字！',
                  required: '40柜单价不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportTariff: {
                  number:'请输入数字！',
                  required: '出口税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportCountry: {
                  maxlength:'输入字符过长！'
              },
              premiumRate: {
                  number:'请输入数字！',
                  required: '保险费率不能为空！',
                  maxlength:'输入数值过长！'
              },
              CustomsClearanceFee: {
                  number:'请输入数字！',
                  required: '清关费用不能为空！',
                  maxlength:'输入数值过长！'
              },
              creditRisk: {
                  number:'请输入数字！',
                  required: '信用风险不能为空！',
                  maxlength:'输入数值过长！'
              },
              interest: {
                  number:'请输入数字！',
                  required: '利息不能为空！',
                  maxlength:'输入数值过长！'
              },
              commision: {
                  number:'请输入数字！',
                  required: '佣金不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportProfitRate: {
                  number:'请输入数字！',
                  required: '利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricWidth_a: {
                  number:'请输入数字！',
                  required: '面料门幅不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricPrice_a: {
                  number:'请输入数字！',
                  required: '面料价格不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricWidth_b: {
                  number:'请输入数字！',
                  required: '面料门幅不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricPrice_b: {
                  number:'请输入数字！',
                  required: '面料价格不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricWidth_c: {
                  number:'请输入数字！',
                  required: '面料门幅不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricPrice_c: {
                  number:'请输入数字！',
                  required: '面料价格不能为空！',
                  maxlength:'输入数值过长！'
              },
              yuanPerKg: {
                  number:'请输入数字！',
                  required: '辅料单价(元/公斤)不能为空',
                  maxlength:'输入数值过长！'
              },
              fillingWeight: {
                  number:'请输入数字！',
                  required: '填充重量不能为空',
                  maxlength:'输入数值过长！'
              },
              factoryOffer: {
                  number:'请输入数字！',
                  maxlength:'输入数值过长！'
              }
          }
      });
  }






init();


});