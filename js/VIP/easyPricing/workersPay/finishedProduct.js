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

  //验证价格
  function checkPrice(inputObj){

      var that = inputObj;
      var flag = true;
      $(that).poshytip('destroy');
      if($(that).val().length == 0){
       // $(that).trigger('focus');
        setMsgPosition(that,'报价不能为空！','right');
        flag = false;
      }else if(!tool.validatePositiveNum($(that).val())){
        //$(that).trigger('focus');
        setMsgPosition(that,'报价不能为负数或0！','right');
         flag = false;
      }else if($(that).val().length>15){
        //$(that).trigger('focus');
        setMsgPosition(that,'报价数值过大，请重新输入！','right');
         flag = false;
      }
      return flag;
  }

   //能否提交报价
  function can_submitPrice(btnSubmitPrice){
    var flag = true;
    var selectedCheckbox = $("input:checkbox[name='priceItiem_ck']:checked");
    $(btnSubmitPrice).poshytip('destroy');
    if(selectedCheckbox.size()==0){
      setMsgPosition(btnSubmitPrice,'请选择要提交的报价！','rightBottom');
      flag = false;
    }
    selectedCheckbox.each(function(i){
      var that = $(this).parent().parent().find('.deydata_inp');
      var isPass = checkPrice(that);
      if(!isPass){
        flag = false;
        return flag;
      }
    });

    return flag;
  }


  //验证上调或下调报价的百分比
  function checkUpAndRate(inputObj){
    var that = inputObj;
    var flag = true;
    $(that).poshytip('destroy');
    if($(that).val().length == 0 || $(that).val() == 0) return false;
    if(!tool.validatePositiveNum($(that).val())){
      setMsgPosition(that,'请输入大于0的数字','rightBottom');
      flag = false;
    }else if($(that).val().length>8){
        //$(that).trigger('focus');
      setMsgPosition(that,'上调数值过大，请重新输入！','rightBottom');
      flag = false;
    }
    return flag;
  }


  function upAndDownRate(inputObj,direction){
    var isPass = true;
    if(checkUpAndRate(inputObj)){
        var operRate = $(inputObj).val();
        var selectedCheckbox = $("input:checkbox[name='priceItiem_ck']:checked");
        $(inputObj).poshytip('destroy');
        if(selectedCheckbox.size()==0){
          setMsgPosition(inputObj,'请选择要上调/下调的报价！','rightBottom');
        }
        selectedCheckbox.each(function(i){
          var that = $(this).parent().parent().find('.deydata_inp');
          isPass = checkPrice(that);
        });
        if(isPass){
           selectedCheckbox.each(function(i){
             var that = $(this).parent().parent().find('.deydata_inp');
             var inputPrice = $(that).val();
             if(direction=="up"){
                var upRet = Math.floor((((inputPrice*100)+(inputPrice*operRate))/100)*100)/100;
                $(that).val(upRet);
             }else if(direction=="down"){
                var downRet = Math.floor((((inputPrice*100)-(inputPrice*operRate))/100)*100)/100;
                if(downRet<=0){
                   setMsgPosition(inputObj,'调整后的报价不能小于0！','rightBottom');
                   return;
                }
                $(that).val(downRet);
             }

          });
        }

    }

  }




//////////////////////////事件处理入口///////////////////////////////////////////

  //报价文本框失去焦点 进行验证
  $('.dyeing ul .deydata_inp').bind('blur',function(){
      checkPrice($(this));
  });

  //提交报价
  $('.batch_butt').bind('click',function(){
    var that = this;
    if(can_submitPrice(that)){
      //提交报价
      alert('提交报价成功');
    }
  });

  //全选
  $("input:checkbox[name='priceItiem_ckAll']").bind('click',function(){
      var flag = false;
      if($(this).attr('checked')){
       flag = 'checked';
      }
      tool.selectAllOrNone_ck('priceItiem_ck',flag);
  });

  //上调
  $("#batch_inc_up").bind('blur',function(){
      var that = this;
      upAndDownRate(that,'up');
  });

  //下调
  $("#batch_inc_down").bind('blur',function(){
       var that = this;
      upAndDownRate(that,'down');
  });

});