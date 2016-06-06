define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  require('js/lib/laydate/laydate');
  var tool = require('tools');
  var placehold = require('js/common/module/placehold');
  placehold.init('#num>input');

/////////////////////////////////// 日期选择 //////////////////////////////////////////
laydate({
    elem: '#dataTime',
    event: 'focus',
    format: 'YYYY/MM/DD', // 分隔符可以任意定义，该例子表示只显示年月
    festival: true, //显示节日
    choose: function(datas){ //选择日期完毕的回调
        //alert('得到：'+datas);
    }
});
$('.laydate_box').hide();
$('#dataTime').bind('focus',function(){
  laydate();
  $('.laydate_box').show();
});

/////////////////////////////////// 文本框输入提示 （银行卡） //////////////////////////////////////////

function createTip(id){

  var width = $("#"+id).width();
  var height = $("#"+id).height();
  var tipH = 30;
  $(document.body).append('<div id="input_tip_'+id+'"> </div>');
   $('#input_tip_'+id).css({'width':width-5,'height':tipH,'display': 'none',
    'background-color': '#FFFDCA','border': '1px solid #FACF66','color': '#F73200',
    'font-size': '26px','overflow': 'hidden','padding': '4px 8px','text-overflow': 'ellipsis',
    'white-space': 'nowrap','font-family': 'Microsoft YaHei, SimHei','font-weight': '700','position':'absolute'});

 $('#input_tip_'+id).append('<div id="input_tip_text_'+id+'"></div>');
 $('#input_tip_text_'+id).css({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'background-color': '#FFFDCA',
      'color': '#F73200',
      'font-size': '16px',
      'padding': '6px 4px'
    });
 inputTipAutoSize(id);
}

function inputTipAutoSize(id){
  var height = $("#"+id).height();
  var top = $("#"+id).offset().top;
  var left = $("#"+id).offset().left;
  $('#input_tip_'+id).css({'top':(top-height+10),'left':left});
}

function synchroUserInputText(id,tag){
  var inputVal = $('#'+id).val();
  $('#input_tip_text_'+id).text(formatInput(inputVal,tag));
}

function formatInput(text,tag){
  var val = '';
  if(!text) return val;
  var array = text.split('');
  var ret = '';
  var split_str = ' ';
  if(tag=="bankcard"||!tag){
    for(var i=0;i<array.length;i++){
      if(i % 4 == 0){
        ret += split_str;
      }
      ret +=array[i];
    }
  }else if(tag=="phone"){
     for(var i=0;i<array.length;i++){
      if(i==3){
         ret += split_str;
       }else if((i-3) % 4 == 0){
        ret += split_str;

       }
      ret +=array[i];
    }
  }

  return ret;
}

function initInputTip(id,tag){
   createTip(id);
  $('#'+id).bind('change paste keyup',function(){
      $('#input_tip_'+id).show();
      synchroUserInputText(id,tag);
  });

  $('#'+id).bind('blur',function(){
      $('#input_tip_'+id).hide();
  });


}


 //页面尺寸改变时场景标题定位
  $(window).resize(function() {
      inputTipAutoSize('bankCard');
      inputTipAutoSize('phone');
  });

   $(document).ready(function () {
      initInputTip('bankCard');
      initInputTip('phone','phone');
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
              $('.input-tip span').css('display','block');
              $(element).valid();
          },
          errorPlacement: function(error, element) {
              element.siblings('.input-tip').html(error);
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
                  max:500000
              },
              phone: {
                  required: true,
                  phone: true
              },
              remark: {
                  maxlength: 400
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
                  max: icons.error + '汇款金额需小于50W！'
              },
              phone: {
                  required: icons.error + '请填写联系人手机号！'
              },
              remark: {
                  maxlength: icons.error + '备注信息不能超过200个字符！'
              }
          }
      });
  }
  // 添加验证规则
  function addrules() {

      $.validator.addMethod('phone', function (value, element, param) {
          return this.optional(element) || (phoneRule($(element),value));
      }, '');

      $.validator.addMethod('bankCardRule', function (value, element, param) {
          return this.optional(element) || (bankCardRule($(element),value));
      }, '');
  }
  /** phone */
  function phoneRule (element, value) {
      var reg = {
          "86": "^(13|15|18|14|17)[0-9]{9}$"  // 中国
      };
      var regPhone = new RegExp(reg[86]);

      if(!regPhone.test(value)){
          flag = true;
          element.siblings('.input-tip').html('<span class="error">' + icons.error + '您输入的手机号码格式错误！' +'</span>');
      }else{
          flag = false;
          element.siblings('.input-tip').html('');
      }
      return flag;
  }
  /** 银行卡验证*/
  function bankCardRule (element, value) {
      var flag = false;
      var msg = tool.bankCoardCheck(value);
      if(msg.length>0){
          flag = true;
          element.siblings('.input-tip').html('<span class="error">' + icons.error + msg +'</span>');
      }else{
           flag = false;
          element.siblings('.input-tip').html('');
      }
      return flag;
  }

  //将金额格式化成#.##格式
  function formatAmount(obj){
    var val = $(obj).val();
    if(val.length==0)return;
    if(tool.validateNum_plus(val)){
      if(val==0){
        $(obj).val('0.00');
      }else{
        $(obj).val(Math.floor(val*100)/100);
      }

    }

  }

   $('#Amount').bind('blur',function(){
     formatAmount(this);

    });


  init();
});