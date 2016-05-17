define(function(require, exports, module) {
  require('jquery');


  var switchSel = require('js/common/module/switchSel');
  var placehold = require('js/common/module/placehold');
   require('js/lib/validation/validation');
  placehold.init('#name>input');

  switchSel.set('.select-box','.select-box>span','.select-ul','.select-ul>li','');
  switchSel.set('.select-box_color','.select-box_color>span','.select-ul_color','.select-ul_color>li','');


    // input
    var form = $("#inceflowForm");


    var icons = {
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
/** /限制输入字符长度 **/

/** 表单验证 */
    var validator;

    function validate() {
        validator = form.validate({
            //忽略
            ignore: '.ignore',
            submitHandler: function (form) {
                //提交表单
                formSubmit(form);
                //阻止表单提交
                return false;
            },
            onkeyup: false,
            errorPlacement: function(error, element) {
                error.appendTo( element.siblings('.input-tip') );
            },
            rules: {

                flowerNameInput: {
                    required: true
                },
                typeNum_1: {
                    required: true,
                    rangelength: [1,5],
                    num: true

                },
                typeNum_2: {
                    required: true,
                    rangelength: [1,5],
                    num: true
                }
            },
            messages: {
                flowerNameInput: {
                    required: icons.error + '请输入当花型名称'
                },
                typeNum_1: {
                    required: icons.error + '请输入数值',
                    rangelength: icons.error + '数字长度只能在{0}-{1}个字符之间',
                    num: icons.error + '请输入数字。'
                },
                typeNum_2: {
                    required: icons.error + '请输入数值',
                    rangelength: icons.error + '数字长度只能在{0}-{1}个字符之间',
                    num: icons.error + '请输入数字。'
                }
            }
        });
    }

    init();

});