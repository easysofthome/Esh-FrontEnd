define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/tip/jquery.poshytip');
  require('js/front/lib/validation/validation');
  require('js/front/lib/laydate/laydate');
  require('js/front/lib/synchroInputText');
  var tool = require('tools');
  var placehold = require('js/front/common/module/placehold');
  placehold.init('#num>input');

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
        showTip(obj,msg,"inner-right","bottom",-15,5);
        break;
      case "bottom":
        showTip(obj,msg,"inner-left","bottom",-17,5);
        break;
      default:
        showTip(obj,msg,"right","center",5,0);
    }
  }

/////////////////////////////////// 日期选择 //////////////////////////////////////////
var laydateOpt = {
    elem: '#dataTime',
    event: 'focus',
    format: 'YYYY-MM-DD', // 分隔符可以任意定义
    festival: true, //显示节日
    choose: function(datas){ //选择日期完毕的回调
        //alert('得到：'+datas);
        $('#dataTime').siblings('.placeholder').hide();
    }
}

$('#dataTime').bind('focus',function(){
  laydate(laydateOpt);

});

/////////////////////////////////// 文本框输入提示 （银行卡、手机号） //////////////////////////////////////////

   $(document).ready(function () {
    $('#bankCard').inputTip({
      tag:'bankcard'
    });

    $('#phone').inputTip({
      tag:'phone'
    });

   });



/////////////////////////////////// 表单验证 //////////////////////////////////////////
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
  var validatorTip = {'msg':'addMethod'};
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
          onfocusout:function(element){
              $(element).valid();
          },
          errorPlacement: function(error, element) {
              if(error.text()!='addMethod'){
                 $(element).poshytip('destroy');
              }
              if(error.text().length > 0&&error.text()!='addMethod'){

                   setMsgPosition(element,error.text(),$(element).attr("errorMsgPosition"));
              }
              return true;
          },
          success:function(element){
                $(element).poshytip('destroy');
          },
          rules: {
              bankCard:{
                  required: true,
                  bankCardRule:true
              },
              remitter: {
                  maxlength:10
              },
              Amount: {
                  number: true,
                  max:500000,
                  gt:0
              },
              phone: {
                  required: true,
                  phone: true
              },
              remark: {
                  maxlength: 400
              },
              uploadImg:{
                  required:true
              }
          },
          messages: {
              bankCard: {
                  required: icons.error + '请输入汇款人银行账号！'
              },
              remitter: {
                  maxlength: icons.error + '汇款人姓名过长！'
              },
              Amount: {
                  number: icons.error + '汇款金额格式错误！',
                  max: icons.error + '汇款金额需小于50W！',
                  gt: icons.error + '汇款金额不能小于等于0！'
              },
              phone: {
                  required: icons.error + '请填写联系人手机号！'
              },
              remark: {
                  maxlength: icons.error + '备注信息不能超过200个字符！'
              },
              uploadImg:{
                  required: icons.error + '请上传图片！'
              }
          }
      });
  }
  // 添加验证规则
  function addrules() {

      $.validator.addMethod('phone', function (value, element, param) {
          return this.optional(element) || (phoneRule($(element),value));
      }, validatorTip.msg);

      $.validator.addMethod('bankCardRule', function (value, element, param) {
          return this.optional(element) || (bankCardRule($(element),value));
      }, validatorTip.msg);
  }
  /** phone */
  function phoneRule (element, value) {
      var flag = false;
      $(element).poshytip('destroy');
      var msg = '';
      var reg = {
          "86": "^(13|15|18|14|17)[0-9]{9}$"  // 中国
      };
      var regPhone = new RegExp(reg[86]);

      if(!regPhone.test(value)){
          flag = false;
          msg = '您输入的手机号码格式错误！';
          setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
      }else{
          flag = true;
          //element.siblings('.input-tip').html('');
      }
      return flag;
  }
  /** 银行卡验证*/
  function bankCardRule (element, value) {
      $(element).poshytip('destroy');
      var flag = false;
      var msg = tool.bankCoardCheck(value);
      if(msg.length>0){
          flag = false;
          setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
      }else{
          flag = true;
          //element.siblings('.input-tip').html('');
      }
      return flag;
  }

   //强制保留两位小数，不四舍五入
   $('#Amount').bind('blur',function(){
    if(!tool.validateAllNum($(this).val())) return;
     $(this).val(tool.toDecimal2($(this).val()));

    });


  init();
});