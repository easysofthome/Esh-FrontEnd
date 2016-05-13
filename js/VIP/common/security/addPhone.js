define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

  var placehold = require('js/common/module/placehold');
  placehold.init('.phone-box>input');
  placehold.init('.authcode-box>input');

    // input
    var form = $("#modifyPhone");

    var icons = {
        def: '<i class="i-def"></i>',
        error: '<i class="i-error"></i>',
        weak: '<i class="i-pwd-weak"></i>',
        medium: '<i class="i-pwd-medium"></i>',
        strong: '<i class="i-pwd-strong"></i>'
    };

    function init() {
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
            onkeyup: true,
            errorPlacement: function(error, element) {
                error.appendTo(element.siblings('.input-tip'));
            },
            rules: {
                //密码
                phone: {
                    required: true,
                    minlength: 11,
                    phone: true
                },
                authCode: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                phone: {
                    required: icons.error + '请输入手机号码',
                    minlength: icons.error + '手机号码长度有误'
                },
                authCode: {
                    required: icons.error + '请输入验证码',
                    minlength: icons.error +'验证码长度有误'
                }
            }
        });
    }
    //验证规则
    function addrules() {

        $.validator.addMethod('phone', function (value, element, param) {
            return this.optional(element) || (phoneRule($(element),value));
        }, '');
    }
/** 手机号验证 */
    function phoneRule (element, value) {
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var flag;
        var regPhone = new RegExp(reg[86]);
        if(regPhone.test(value)){
            element.parent().find('.input-tip').html('');
            flag = true;
        }else{
            element.parent().find('.input-tip').html('<span class="error">' + icons.error + '格式有误' +'</span>');
            flag = false;
        }
        return flag;
    }



/** /用户名验证 */

    init();



});