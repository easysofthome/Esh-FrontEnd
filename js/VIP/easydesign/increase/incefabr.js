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

    // 下拉框
    $('#fabricType').customSelect({width:"120px",padding:"12px 5px"});
    $('#fabricTypeSecond').customSelect({width:"150px",padding:"12px 5px"});
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
/////////////////////////// 增加减少经纬纱种类 /////////////////////////

    var warpNum = $('#yarn-ul li').length;
    var abbNum = $('#abb-ul li').length;


    // 经纱事件
    $('#warp-spinner')
      .spinner({
        min:1,
        max:2,
        value: warpNum,
        addEvent: function () {
            var ifrUrl = $('.yarntype_box .yarn_butt').attr('data-href');
            $('#yarn-ul').append('<li class="lf yarn_para">'
                + '<span class="lf para_tit">经纱2：</span>'
                + '<span class="lf include"></span>'
                + '<div class="lf" style="width: 142px;">'
                  + '<span class="clearfix ingredient" >'
                    + '<span class="lf ingredient_tit">成分</span>'
                    + '<input type="text" class="lf input_fabric" name="FabricYarnsChaine['+ warpNum +'].FabriceElement_NAME" readonly="true" id="warpIngredient2"/>'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YARN_SPEC_ID" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YARN_PRICE" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YARN_TYPE" type="hidden" value="0">'
                  + '</span>'
                  + '<span class="clearfix thickness">'
                  + '<span class="clearfix thickness">'
                    + '<span class="lf ingredient_tit">粗细</span>'
                    + '<input type="text" class="lf input_fabric" name="JSGG" readonly="true" id="warpDiameter2"/>'
                  + '</span>'
                + '</div>'
                + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
                + '</li>');
                $('.fixed-input-tip').eq(0).before('<span class="plus lf"></span>'
                + '<input type="text" id="warpSpinnerNum2" name="FabricYarnsChaine['+ warpNum +'].DENSITY_LENGTH" class="density_input lf">'
            );
        },
        cutEvent: function () {
          $('#yarn-ul li:last input').poshytip('destroy');
          $('#yarn-ul li:last').remove();
          $('#warp_num_box input:last').poshytip('destroy');
          $('#warp_num_box input:last,#warp_num_box .plus:last').remove();

        }
      });
    // 纬纱事件
    $('#abb-spinner').spinner({
        min:1,
        max:4,
        value: abbNum,
        addEvent:function () {
            var ifrUrl = $('.wefttype_box .yarn_butt').attr('data-href');
            $('#abb-ul').append('<li class="lf yarn_para">'
              + '<span class="lf para_tit">纬纱'+ warpNum +'：</span>'
              + '<span class="lf include"></span>'
              + '<div class="lf" style="width: 142px;">'
                + '<span class="clearfix ingredient">'
                  + '<span class="lf ingredient_tit">成分</span>'
                  + '<input type="text" class="lf input_fabric" name="FabricYarns['+ warpNum +'].FabriceElement_NAME" readonly="true" id="weftIngredient'+ (warpNum+1) +'"/>'
                  + '<input name="FabricYarns['+ warpNum +'].YARN_SPEC_ID" type="hidden" value="">'
                  + '<input name="FabricYarns['+ warpNum +'].YARN_PRICE" type="hidden" value="">'
                  + '<input name="FabricYarns['+ warpNum +'].YARN_TYPE" type="hidden" value="1">'
                + '</span>'
                + '<span class="clearfix thickness">'
                  + '<span class="lf ingredient_tit">粗细</span>'
                  + '<input type="text" class="lf input_fabric" name="WSGG" readonly="true" id="weftDiameter'+ (warpNum+1) +'"/>'
                + '</span>'
              + '</div>'
              + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
              + '</li>');
            $('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
              + '<input type="text" id="abbSpinnerNum'+ (warpNum+1) +'" name="FabricYarns['+ warpNum +'].DENSITY_LENGTH" class="density_input lf">');
            warpNum++;
        },
        cutEvent:function () {
            $('#abb-ul li:last input').poshytip('destroy');
            $('#abb-ul li:last').remove();
            $('#abb_num_box input:last').poshytip('destroy');
            $('#abb_num_box input:last,#abb_num_box .plus:last').remove();
            warpNum--;
        }
    });

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
            maxlength:10,
            max: 300
        },
        warpSpinnerNum2: {
            number:true,
            required: true,
            maxlength:10,
            max: 300
        },
        warpIngredient1: {required: true },
        warpIngredient2: {required: true },
        warpDiameter1: {required: true },
        warpDiameter2: {required: true },
        abbSpinnerNum1: {
            number:true,
            required: true,
            maxlength:10,
            max: 300
        },
        abbSpinnerNum2: {
            number:true,
            required: true,
            maxlength:10,
            max: 300
        },
        abbSpinnerNum3: {
            number:true,
            required: true,
            maxlength:10,
            max: 300
        },
        abbSpinnerNum4: {
            number:true,
            required: true,
            maxlength:10,
            max: 300
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
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        warpSpinnerNum2: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入经密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        warpIngredient1: {required: icons.error + '请输入经纱成分！'},
        warpIngredient2: {required: icons.error + '请输入经纱成分！'},
        warpDiameter1: {required: icons.error + '请输入经纱粗细！'},
        warpDiameter2: {required: icons.error + '请输入经纱粗细！'},
        abbSpinnerNum1: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum2: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum3: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum4: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
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

    module.exports.init = fabric.init;
/////////////////////////////// /表单验证部分 ///////////////////////////////////


// module.exports.validate = function(callback){callback()};

});