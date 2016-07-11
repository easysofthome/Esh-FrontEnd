define(function (require, exports, module) {
    require('jquery');
    require('js/front/lib/tip/jquery.poshytip');
    require('js/front/lib/validation/validation');
    exports.callback;
////////////////////////////错误提示框 tip///////////////////////////////////
    function showTip(obj,msg,alignX,alignY,offsetX,offsetY){
        validateHiddenE(obj);
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
                showTip(obj,msg,"inner-left","top",0,10);
        }
    }

//展开被折叠元素，同时显示错误提示
    function validateHiddenE(ele){
        var id = $(ele).attr('id');
        $('.shrink_wrap:hidden').each(function(){
            showHiddenE(id,this);
        });

        function showHiddenE(id,that){
            var size = $(that).find('#'+id).length;
            if(size > 0){
                $(that).show();
            }
        }
    }

/////////////////////////////// 表单验证部分 ///////////////////////////////////

    // form
    var form = $("#completeForm");

    $('#collectPricingResult').on('click', function() {
        // / form.submit();

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
                if(exports.callback){
                    exports.callback();
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
            },
            success:function(element){
                $(element).poshytip('destroy');
            },
            rules: {
                fabricWidth: {
                    number:true,
                    required: true,
                    maxlength:8
                },
                fabricPrice: {
                    number:true,
                    required: true,
                    maxlength:8
                }

            },
            messages: {
                fabricWidth: {
                    number:'请输入数字！',
                    required: '面料门幅不能为空！',
                    maxlength:'输入数值过长！'
                },
                fabricPrice: {
                    number:'请输入数字！',
                    required: '面料价格不能为空！',
                    maxlength:'输入数值过长！'
                }

            }
        });
    }

    init();

    $('#collectPricingResult').bind('click',function(){
        form.submit();
    });
});