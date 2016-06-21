define(function(require, exports, module) {
    require('jquery');
    require('js/lib/tip/jquery.poshytip');
    var FancyRadioCheckBox = require('FancyRadioCheckBox');
    var placehold = require('js/common/module/placehold');
    require('customSelect');

    require('js/lib/validation/validation');
    placehold.init('input');


    //下拉框
    $('#type_num').customSelect({width:"50px",padding:"12px 5px"});
    $('#color_type').customSelect({width:"140px",padding:"12px 5px"});

    //加载单选按钮样式
    FancyRadioCheckBox.init();

    //选中样式
    // $('.handle_one').click(function() {
    //     $(this).toggleClass('selected');
    // });

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

    // input
    var form = $("#inceflowForm");


    var icons = {
        error: '<i class="i-error"></i>'
    };

    function init() {
        validate();
        //bindEvent();
    }

/** 限制输入字符长度 **/
    function getStringLength (str) {
        if(!str){
            return;
        }
        var bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            //判断是中文还是英文字符
            if (/^[\u0000-\u00ff]$/.test(c)){
                bytesCount += 1;
            }
            else{
                bytesCount += 2;
            }
        }
        return bytesCount;
    }

    function resetStringLength (length,_id) {
        _id='#'+_id;
        while(getStringLength($(_id).val())>length){
                $(_id).val($(_id).val().substring(0,$(_id).val().length-1));
        }
    }

    function bindEvent () {
        $('textarea,input[type=text]').bind('input', function() {
            var _id = $(this).attr('id');
            switch(_id){
                case 'flowerName':
                    resetStringLength(20,_id);
                    break;
                case 'typeNum_1':
                    resetStringLength(20,_id);
                    break;
                case 'typeNum_2':
                    resetStringLength(20,_id);
                    break;
               case 'textareaFlowcla':
                    resetStringLength(500,_id);
                     break;
                default: break;
            }
        });
    }

    function validateUpLoadImg(){
        $($('#filePicker')[0]).poshytip('destroy');
        if(!($('.filelist li img').attr('src'))){
            setMsgPosition($('#filePicker')[0],'请上传花型图片！',$('#filePicker').attr("errorMsgPosition"));
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
                if(!validateUpLoadImg()){
                    return false;
                }alert();
                //阻止表单提交
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
                flowerNameInput: {
                    required: true,
                    maxlength:20
                },
                typeNum_1: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    gt:0

                },
                typeNum_2: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    gt:0

                },
               textareaFlowcla: {
                  maxlength: 400
               }
            },
            messages: {
                flowerNameInput: {
                    required: icons.error + '请输入花型名称！',
                    maxlength: icons.error + '花型名称过长！'
                },
                typeNum_1: {
                    required: icons.error + '请输入第一个数值！',
                    number: icons.error + '请输入数字！',
                    maxlength: icons.error + '第一个数值过长！'

                },
                typeNum_2: {
                    required: icons.error + '请输入第二个数值！',
                    number: icons.error + '请输入数字！',
                    maxlength: icons.error + '第二个数值过长！'
                },
                textareaFlowcla: {
                    maxlength: icons.error + '描述文字最多400个字符！'
                }
            }
        });
    }


    //加载表单验证函数
  init();


    $(document).ready(function(){
         $('.butt_return').bind('click',function(){
            form.submit();
        });

    });

    module.exports.validate = validate;

});