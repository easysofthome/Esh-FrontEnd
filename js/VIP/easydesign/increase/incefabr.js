define(function(require, exports, module) {
    var fabric = require('js/front/common/module/fabric');

    $(document).ready(function(){
        $('#btnSaveAndPublish').on('click', function() {
            $("#fabricForm").submit();
        });
    });

/////////////////////////////// 表单样式部分 ///////////////////////////////////

    var placehold = require('js/front/common/module/placehold');
    //占位符
    placehold.init('input');

    // var FancyRadioCheckBox = require('FancyRadioCheckBox');
    //加载单选按钮样式
    // FancyRadioCheckBox.init();

    // 下拉框
    $('#fabricType,#fabricTypeSecond').customSelect({width:"120px",padding:"12px 5px"});
    $('#minimum_order_num').customSelect({width:"120px",padding:"12px 5px"});
    $('#density_unit,#sel4,#sel5,#warp_flower_size,#across_flower_size,#exchange_rate').customSelect({width:"90px",padding:"12px 5px"});


    // 花型选择 二级联动
    $('#fabricType').on('change',function(){
        var that = this;
        $.ajax({
            type: "POST",
            url: '/MemberCenter/Fabric/GetDesignPropertys?id=' + $(that).val(),
            success: function (data) {
                var index;
                data = JSON.parse(data);
                var selectObj = $('#fabricTypeSecond');
                // 清空select(html、值)
                selectObj.html('<option value="">请选择面料分类</option>');
                // $('.customSelectInner:eq(1)').html('');

                for(index in data){
                    selectObj.append('<option value="'+ data[index].Id +'">'+ data[index].Name + '</option>');
                }
            },
            error: function (err) { console.log('connect error!'); }
        });
    })

/////////////////////////////// 表单验证部分 ///////////////////////////////////

    //错误信息提示点
    var icons = {
        error: '<i class="i-error"></i>'
    };

    //如果没有上传图片 返回false
    function validateUpLoadImg(){
            $($('#filePicker')[0]).poshytip('destroy');
            if(!($('.filelist li img').attr('src'))){
                    fabric.setMsgPosition($('#filePicker')[0],'请上传面料图片！',$('#filePicker').attr("errorMsgPosition"));
                    return false;
            }
            return true;
    }
    // 提交表单时的处理事件
    fabric.submitHandler = function (form){
        //验证上传图片是否为空
        if(!validateUpLoadImg()){
            return false;
        }
        //执行回调
        if(callback){
            callback();
        }
        return false;
    }
    // 表单验证规则
    fabric.rules = {
        fabricName: {
            required: true,
            maxlength:20
        },
        fabricType:{
            required: true
        },
        fabricTypeSecond:{
            required: true
        },
        warpSpinnerNum1: {
            number:true,
            required: true,
            maxlength:10
        },
        warpSpinnerNum2: {
            number:true,
            required: true,
            maxlength:10
        },
        warpIngredient1: {required: true },
        warpIngredient2: {required: true },
        warpDiameter1: {required: true },
        warpDiameter2: {required: true },
        abbSpinnerNum1: {
            number:true,
            required: true,
            maxlength:10
        },
        abbSpinnerNum2: {
            number:true,
            required: true,
            maxlength:10
        },
        abbSpinnerNum3: {
            number:true,
            required: true,
            maxlength:10
        },
        abbSpinnerNum4: {
            number:true,
            required: true,
            maxlength:10
        },
        weftIngredient1: {required: true },
        weftIngredient2: {required: true },
        weftIngredient3: {required: true },
        weftIngredient4: {required: true },
        weftDiameter1: {required: true },
        weftDiameter2: {required: true },
        weftDiameter3: {required: true },
        weftDiameter4: {required: true },
        warpFlowerSize: {
            required: true,
            number:true,
            maxlength:10
        },
        acrossFlowerSize: {
            required: true,
            number:true,
            maxlength:10
        },
        exchangeRate:{
            number:true,
            required: true,
            maxlength:10
        },
        textRemarks: {
            maxlength: 400
        }
    };
    fabric.messages = {
        fabricName: {
            required: icons.error + '请输入面料名称！',
            maxlength: icons.error + '面料名称过长！'
        },
        fabricType:{
            required: icons.error + '请选择面料分类！'
        },
        fabricTypeSecond:{
            required: icons.error + '请选择面料分类！'
        },
        warpSpinnerNum1: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入经密值！',
            maxlength: icons.error + '经密值过大！'
        },
        warpSpinnerNum2: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入经密值！',
            maxlength: icons.error + '经密值过大！'
        },
        warpIngredient1: {required: icons.error + '请输入经纱成分！'},
        warpIngredient2: {required: icons.error + '请输入经纱成分！'},
        warpDiameter1: {required: icons.error + '请输入经纱粗细！'},
        warpDiameter2: {required: icons.error + '请输入经纱粗细！'},
        abbSpinnerNum1: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！'
        },
        abbSpinnerNum2: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！'
        },
        abbSpinnerNum3: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！'
        },
        abbSpinnerNum4: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！'
        },
        weftIngredient1: {required: icons.error + '请输入纬纱成分！'},
        weftIngredient2: {required: icons.error + '请输入纬纱成分！'},
        weftIngredient3: {required: icons.error + '请输入纬纱成分！'},
        weftIngredient4: {required: icons.error + '请输入纬纱成分！'},
        weftDiameter1: {required: icons.error + '请输入纬纱粗细！'},
        weftDiameter2: {required: icons.error + '请输入纬纱粗细！'},
        weftDiameter3: {required: icons.error + '请输入纬纱粗细！'},
        weftDiameter4: {required: icons.error + '请输入纬纱粗细！'},
        warpFlowerSize:{
            required: icons.error + '请输入经向花回尺寸！',
            number:icons.error + '经向花回尺寸只能是数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        acrossFlowerSize: {
            required: icons.error + '请输入纬向花回尺寸！',
            number:icons.error + '纬向花回尺寸只能是数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        exchangeRate:{
            number: icons.error + '汇率值只能是数字！',
            required: icons.error + '请输入汇率！',
            maxlength: icons.error + '输入数值过长！'
        },
        textRemarks: {
            maxlength: icons.error + '备注信息过长！'
        }
    };

    fabric.init();
/////////////////////////////// /表单验证部分 ///////////////////////////////////


// module.exports.validate = function(callback){callback()};

});