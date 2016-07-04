define(function(require, exports, module) {
  require('jquery');
  require('js/front/lib/validation/validation');
  require('js/front/lib/tip/jquery.poshytip');
  /////////////////////////////// 表单样式部分 ///////////////////////////////////

  var placehold = require('js/front/common/module/placehold');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');

  //加载单选按钮样式
  FancyRadioCheckBox.init();

  //占位符
  placehold.init('input');

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
/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#inceproductForm");

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  //如果没有上传图片 返回false
  function validateUpLoadImg(){
        $($('#filePicker')[0]).poshytip('destroy');
        if(!($('.filelist li img').attr('src'))){
            setMsgPosition($('#filePicker')[0],'请上传成品图片！',$('#filePicker').attr("errorMsgPosition"));
            return false;
        }
        return true;
  }

  /** 表单验证 */
  var validator;
  function validate(callback) {
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
            //验证上传图片是否为空
            if(!validateUpLoadImg()){
                return false;
            }
            //执行回调
            if(callback){
                callback();
            }
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
          success:function(error, element){
              $(element).poshytip('destroy');
          },
          rules: {
              fabricProName: {
                  required: true,
                  maxlength:20
              }
          },
          messages: {
              fabricProName: {
                  required: icons.error + '请输入成品名称！',
                  maxlength: icons.error + '成品名称过长！'
              }
          }
      });
  }

  $(document).ready(function(){
       $('.butt_return').bind('click',function(){
          form.submit();
      });
  });

  //接口 参数为回调函数 表单验证成功后执行
  module.exports.validate = validate;
});