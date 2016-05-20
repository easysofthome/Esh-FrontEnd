define(function(require, exports, module) {
    require('jquery');

    var FancyRadioCheckBox = require('FancyRadioCheckBox');
    var placehold = require('js/common/module/placehold');
    var cus = require('customSelect');

    require('js/lib/validation/validation');
    placehold.init('input');


    //下拉框
    $('#type_num').customSelect({width:"50px",padding:"12px 5px"});
    $('#color_type').customSelect({width:"140px",padding:"12px 5px"});

    //加载单选按钮样式
    FancyRadioCheckBox.init();

    //选中样式
    $('.handle_one').click(function() {
          $(this).toggleClass('selected');
    });


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
            onfocusout:function(element){
              $(element).valid();
            },
            onkeyup: false,
            errorPlacement: function(error, element) {
                error.appendTo( element.siblings('.input-tip') );
            },
            rules: {
                flowerNameInput: {
                    required: true,
                    maxlength:20
                },
                typeNum_1: {
                    required: true,
                    number: true,
                    maxlength: 10

                },
                typeNum_2: {
                    required: true,
                    number: true,
                    maxlength: 10

                },
               textareaFlowcla: {
                  maxlength: 400
               }
            },
            messages: {
                flowerNameInput: {
                    required: icons.error + '请输入当花型名称！',
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

});