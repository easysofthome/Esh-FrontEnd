define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');
  require('js/lib/tip/jquery.poshytip');
  require('js/lib/synchroInputText');
  var tools = require('tools');
  var placehold = require('js/common/module/placehold');

  ////////////////////////////文本框占位符///////////////////////////////////
  placehold.init('#phone');
  placehold.init('.authcode-box>input');

////////////////////////////文本框输入提示 （银行卡、手机号） //////////////////////////
   $(document).ready(function () {
    $('#phone').inputTip({
      tag:'phone',
      marginTop:-8
    });

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
        showTip(obj,msg,"inner-right","bottom",-15,5);
        break;
      case "bottom":
        showTip(obj,msg,"inner-left","bottom",-17,5);
        break;
      default:
        showTip(obj,msg,"right","center",5,0);
    }
  }

/////////////////////////////////// 表单验证 //////////////////////////////////////////

    // input
    var form = $("#modifyPhone");
    var validatorTip = {'msg':'addMethod'};
    var icons = {
        def: '<i class="i-def"></i>',
        error: '<i class="i-error"></i>',
        weak: '<i class="i-pwd-weak"></i>',
        medium: '<i class="i-pwd-medium"></i>',
        strong: '<i class="i-pwd-strong"></i>'
    };

    function init() {
        tools.bindClick_countdown("waitcodes","getValidateCode",20,0,"重新发送","phone");
        validate();
        bindEvent();
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
        $('input[type=password],input[type=text]').bind('input', function() {
            var _id = $(this).attr('id');
            switch(_id){
                case 'phone':
                    resetStringLength(11,_id);
                    break;
                case 'authCode':
                    resetStringLength(6,_id);
                    break;
                default: break;
            }
        });
    }
/** /限制输入字符长度 **/

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
                //密码
                phone: {
                    required: true,
                    phone: true
                },
                authCode: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                phone: {
                    required: icons.error + '请输入手机号码！'
                },
                authCode: {
                    required: icons.error + '请输入验证码！',
                    minlength: icons.error +'请输入六位验证码！'
                }
            }
        });
    }
    //验证规则
    function addrules() {

        $.validator.addMethod('phone', function (value, element, param) {
            return this.optional(element) || (phoneRule($(element),value));
        }, validatorTip.msg);
    }
/** 手机号验证 */
    function phoneRule (element, value) {
        $(element).poshytip('destroy');
        var msg = '';
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var flag;
        var regPhone = new RegExp(reg[86]);
        if(regPhone.test(value)){
            element.parent().find('.input-tip').html('');
            flag = true;
        }else{
            msg = '手机号码格式不正确，请重新输入！';
            setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
            flag = false;
        }
        return flag;
    }



/** /用户名验证 */

    init();



});