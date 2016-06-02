define(function (require, exports, module) {
  require('jquery');
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
        showTip(obj,msg,"inner-left","top",0,0);
    }
  }

////////////////////////////表单验证///////////////////////////////////
  //验证易豆格式
  function checkeYiDou(inputObj){
      var isUserYiDou = $('#useYiDou_ck').attr("checked");
      if(!isUserYiDou) return;
      var reg = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
      var that = inputObj;
      var flag = true;
      $(that).poshytip('destroy');
      if($(that).val().length == 0 || $(that).val() == 0){
        $(that).trigger('focus');
        setMsgPosition(that,'易豆个数不能为空或0！','$(that).attr("errorMsgPosition")');
        flag = false;
      }else if(!reg.test($(that).val())){
        $(that).trigger('focus');
        setMsgPosition(that,'请输入易豆个数，不能为负数或0！',$(that).attr("errorMsgPosition"));
         flag = false;
      }else if($(that).val().length>15){
        $(that).trigger('focus');
        setMsgPosition(that,'易豆个数值过大，请重新输入！',$(that).attr("errorMsgPosition"));
         flag = false;
      }
      return flag;
  }

  //易豆个数文本框失去焦点 进行验证
  $('.Bean_box .yidou_input').bind('blur',function(){
      checkeYiDou(this);
  });

  //是否使用易豆 否=文本框禁用
  $('#useYiDou_ck').bind('click',function(){
      var checked = $(this).attr("checked");
      if(checked){
        $('.Bean_box .yidou_input').attr("disabled",false);
      }else{
        $('.Bean_box .yidou_input').attr("disabled",true);
        $('.Bean_box .yidou_input').val('');
        $('.Bean_box .yidou_input').poshytip('destroy');
      }
  });

   //能否支付
  function can_pay(){
    var flag = false;
     var isUserYiDou = $('#useYiDou_ck').attr("checked");
     if(isUserYiDou){
        if(checkeYiDou('.Bean_box .yidou_input')){
          flag = true;
        }
     }else{
      flag = true;
     }
     return flag;
  }

  //支付
  $('.bean_butt').bind('click',function(){

      if(can_pay()){
        //跳转到支付页面
      }
  });



});