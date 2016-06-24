define(function (require, exports, module) {
  require('jquery');
  require('js/lib/tip/jquery.poshytip');
  var tool = require('tools');

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
        showTip(obj,msg,"inner-left","top",0,0);
    }
  }

////////////////////////////表单验证///////////////////////////////////
  var form = $('#buyYiDouForm');
  //验证易豆格式
  function checkeYiDou(inputObj){
      var reg = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
      var that = inputObj;
      var flag = true;
      $(that).poshytip('destroy');
      if($(that).val().length == 0){
        $(that).trigger('focus');
        setMsgPosition(that,'购买数量不能为空！','$(that).attr("errorMsgPosition")');
        flag = false;
      }else if(!tool.validatePositiveInt($(that).val())){
        $(that).trigger('focus');
        setMsgPosition(that,'请输入大于0的整数！',$(that).attr("errorMsgPosition"));
         flag = false;
      }
      return flag;
  }

  //易豆个数文本框失去焦点 进行验证
  $('.buy_quanbox .buy_inp').bind('blur',function(){
      checkeYiDou(this);
  });

   //能否支付
  function can_pay(){
    var flag = false;
    if(checkeYiDou('.buy_quanbox .buy_inp')){
      flag = true;
    }
    return flag;
  }

  //支付
  $('.save').bind('click',function(){
      if(can_pay()){
        //跳转到支付页面
        form.submit();
      }
  });



});