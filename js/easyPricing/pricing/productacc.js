define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/tip/jquery.poshytip');
  require('js/front/lib/validation/validation');
  var tool = require('tools');

////////////////////////////全选///////////////////////////////////
$('#sel_all').bind('click',function(){
    var flag = false;
    if($(this).attr('checked')){
     flag = 'checked';
    }
    tool.selectAllOrNone_ck('Fruit',flag);
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
      showTip(obj,msg,"right","center",0,10);
  }
}

////////////////////////////弹出层///////////////////////////////////
//点击x关闭弹出层  点击增加弹出第二个弹出层
function operParentLayer(){
   var index = parent.layer.getFrameIndex(window.name);
    $('.close,.btn_close,.btn_gray.lf').click(function(){
      parent.layer.close(index);
    });

    $('#addBtn').bind('click',function(){
     $('#showAddLayer', parent.document).trigger('click');
    });
}

operParentLayer();


/////////////////////////////// 表单验证部分 ///////////////////////////////////


  // form
  var form = $("#sproductaccForm");

  $('#btnSave').on('click', function() {
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
          },
          success:function(element){
              $(element).poshytip('destroy');
          }
      });
  }


  $(document).ready(function(){
    init();

     $(".priceValid").each(function(){
      $(this).rules("add", {
          required : true,
          min : 0,
          maxlength : 8,
          messages : {
            required : "单价不能为空！",
            min : "请输入大于等于0的数字！",
            maxlength : "数字位数过长！"
        }
      });
   });

     $(".quantityValid").each(function(){
        $(this).rules("add", {
            required : true,
            positiveInt : true,
            maxlength : 8,
            messages : {
              required : "单价不能为空！",
              positiveInt : "请输入大于等于0的整数！",
              maxlength : "数字位数过长！"
          }
        });
      });
  });

/////////////////////////////// 表单计算 ///////////////////////////////////
$(".priceValid,.quantityValid").bind('blur',function(){
  checkInput(this);
});

function checkInput(that){

  var id = $(that).attr('id');
  var index = id.indexOf('_');
  var tag = id.substring(index+1);
  if($('#quantityValid_'+tag).valid() && $('#priceValid_'+tag).valid()){
     var ret = tool.toDecimal2(($('#quantityValid_'+tag).val())*($('#priceValid_'+tag).val()));
     $('#finalCost_'+tag).text(ret);
  }

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







});