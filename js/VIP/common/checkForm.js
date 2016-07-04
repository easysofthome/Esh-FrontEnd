define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/tip/jquery.poshytip');

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
      }else if(!tool.validateNum($(that).val())){
        //$(that).trigger('focus');
        setMsgPosition(that,'请输入数字！','right');
         flag = false;
      }else if(!tool.validateNumPointNum($(that).val(),2)){
        //$(that).trigger('focus');
        setMsgPosition(that,'小数位数最多2位！','right');
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

  function isCheckAll(btnSubmitPrice){
    var flag = true;
    var selectedCheckbox = $("input:checkbox[name='priceItiem_ck']:checked");
    $(btnSubmitPrice).poshytip('destroy');
    if(selectedCheckbox.size()==0){
      setMsgPosition(btnSubmitPrice,'请选择要进行操作的报价！','rightBottom');
      setTimeout(function(){$(btnSubmitPrice).poshytip('destroy');},3000);
      flag = false;
    }
    return flag;
  }

   //能否提交报价
  function can_submitPrice(btnSubmitPrice){
    var selectedCheckbox = $("input:checkbox[name='priceItiem_ck']:checked");
    var flag = true;
    var isPass = true;
    if(!isCheckAll(btnSubmitPrice)) return false;
    selectedCheckbox.each(function(i){
     $(this).parent().parent().find('.deydata_inp').each(function(){
        isPass = checkPrice(this);
        if(!isPass){
          flag = false;
          return flag;
        }
      });
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
          $(this).parent().parent().find('.deydata_inp').each(function(){
            isPass = checkPrice(this);
            if(!isPass){
              return false;
            }
          });
             if(!isPass){
              return false;
            }
        });
        if(isPass){
           selectedCheckbox.each(function(i){
             $(this).parent().parent().find('.deydata_inp').each(function(){
               var inputPrice = $(this).val();
               if(direction=="up"){
                  var upRet = Math.floor((((inputPrice*100)+(inputPrice*operRate))/100)*100)/100;
                  $(this).val(upRet);
               }else if(direction=="down"){
                  var downRet = Math.floor((((inputPrice*100)-(inputPrice*operRate))/100)*100)/100;
                  if(downRet<=0){
                    $(inputObj).poshytip('destroy');
                     setMsgPosition(inputObj,'调整后的报价不能小于0！','rightBottom');
                     return;
                  }
                  $(this).val(downRet);
               }
               });

          });
        }

    }

  }

  //全选
  $("input:checkbox[name='priceItiem_ckAll']").bind('click',function(){
      var flag = false;
      if($(this).attr('checked')){
       flag = 'checked';
      }
      tool.selectAllOrNone_ck('priceItiem_ck',flag);
  });


module.exports.checkPrice = checkPrice;
module.exports.can_submitPrice = can_submitPrice;
module.exports.isCheckAll = isCheckAll;
module.exports.upAndDownRate = upAndDownRate;

});