define(function(require, exports, module) {

    var modExp = module.exports;

    require('jquery');
    require('js/front/lib/tip/jquery.poshytip');
    require('js/front/lib/validation/validation');
    require('spinner');
    var cus =  require('customSelect');


/////////////////////////////// 表单样式部分 ///////////////////////////////////
    var FancyRadioCheckBox = require('FancyRadioCheckBox');
    // 加载单选按钮样式
    FancyRadioCheckBox.init();

    // 染织方法
    $('#dyed-method input[type="radio"]').bind('click', function(e) {
        var index = $(this).parent().index();
        $('.AddItem .js-tab').hide();
        $('.AddItem .js-tab').eq(index).show();
        if(index==2){ //色织选中 选择纱线+织造+染色（印花）隐藏
            $('#factoryPrice_rad').parent().hide();
            $('#factoryPrice_rad').attr('checked')?$('#easySoftHomePrice_rad').attr('checked','checked'):'';
        }else{
            $('#factoryPrice_rad').parent().show();
        }
    });
    $('input:radio[name=DyeingDyeRequirement]').on('click', function(){
        var obj = $('input:radio[name=DyeingPrintingProcessRequirements]');
        if($(this).val() == '转移印花'){
            obj.eq(0).parent().hide().next().hide();
            $('#flowerPositionLoop').css('display','inline-block');
            obj.eq(2).attr('checked','checked').parent().show();
        } else {
            obj.eq(2).parent().hide();
            $('#flowerPositionLoop').hide();
            obj.eq(0).attr('checked','checked').parent().show().next().show();
        }
    });

/////////////////////////////// /表单样式部分 ///////////////////////////////////


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


/////////////////////////////// 关闭引导层 ///////////////////////////////////
    function closeGuideLayer(){
        $.pagewalkthrough('close');
        $(document.body).css("overflow","");
    }


/////////////////// 切换单位重新设置验证 ////////////////////////////
    var icons = {
        error: '<i class="i-error"></i>'
    };
    var yarnDensityStr = '';

    $('#hLight_step2 select').on('change', function(){
        setWarpValidator();
        setAbbValidator();
    });

    $('.increase:eq(0)').on('click', function(){
        setWarpValidator();
    });

    $('.increase:eq(1)').on('click', function(){
        setAbbValidator();
    });

    // 纱线密度限制数值和错误信息
    function yarnDensity(){
        var Density = 300;
        if($('#hLight_step2 select').val() == 'Inches'){
            Density = Density * 2.54;
            yarnDensityStr = '密度值不超过762根/英寸';
        } else {
            yarnDensityStr = '密度值不超过300根/厘米';
        }
        return Density;
    }
    // 重新设置经纱的验证
    function setWarpValidator(){
        $('#warpSpinnerNum1,#warpSpinnerNum2').each(function(){
            $(this).rules('add',{
                number: true,
                required: true,
                maxlength: 10,
                max: yarnDensity(),
                messages: {
                    number: icons.error + '经密值只能是数字！',
                    required: icons.error + '请输入经密值！',
                    maxlength: icons.error + '经密值过大！',
                    max: icons.error + yarnDensityStr
                }
            });
        });
    }

    // 重新设置纬纱的验证
    function setAbbValidator(){
        $('#abbSpinnerNum1,#abbSpinnerNum2,#abbSpinnerNum3,#abbSpinnerNum4').each(function(){
            $(this).rules('add',{
                number:true,
                required: true,
                maxlength:10,
                max: yarnDensity(),
                messages: {
                    number: icons.error + '经密值只能是数字！',
                    required: icons.error + '请输入经密值！',
                    maxlength: icons.error + '经密值过大！',
                    max: icons.error + yarnDensityStr
                }
            });
        });
    }

    // 标签选择
    $('.handle_one').click(function() {
        var obj = $(this).find('input');
        if(obj.prop('checked')){
            obj.prop('checked',false);
        } else {
            obj.prop('checked',true);
        }
        $(this).toggleClass('selected');
    });

//////////////////////////////// 弹出层 /////////////////////////////
    require('layer');
    var that;

    //点击开始核价 弹出层 配置选项
    var nextStepUrl = $('.butt_return').attr('data-href');

    var startPriceLayer = {
        type: 2,
        title: false,
        area: ['1020px', '650px'],
        border: [5, 0.3, '#000'],
        shade: [0.8, '#000'],
        shadeClose: true,
        offset: [($(window).height() - 650)/2+'px',''],
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top',
        fix : false,
        iframe: {src: nextStepUrl},
        success: function () {

        }

      }

    // 经纱种类选择纱线
    $('.yarntype_box').on('click', '.yarn_butt' , function() {
        that = this;

        $('.curLayer').removeClass('curLayer');
        $(that).parents('li').addClass('curLayer');
        $.layer({
            type: 2,
            title: false,
            area: ['1020px', ''],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 600)/2+'px',''],
            closeBtn: [0, false], //去掉默认关闭按钮
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function (layer) {}
        });
    });

    // 纬纱种类选择纱线
    $('.wefttype_box').on('click', '.yarn_butt' , function() {
        that = this;

        $('.curLayer').removeClass('curLayer');
        $(that).parents('li').addClass('curLayer');

        $.layer({
            type: 2,
            title: false,
            area: ['1020px', ''],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 600)/2+'px',''],
            closeBtn: [0, false], //去掉默认关闭按钮
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function () {}
        });
    });

////////////////////// iframe传值 ////////////////////
    // window.parentFn = function(ingredient, standard, id, price){
    //     var obj = $('li.curLayer');
    //     obj.find('.input_fabric').val(ingredient);
    //     obj.find('.input_fabric:eq(1)').val(standard);
    //     obj.find('.ingredient input:eq(1)').val(id);
    //     obj.find('.ingredient input:eq(2)').val(price);
    // }
    // postMessage
    window.addEventListener('message',function(e){
        // console.log(e.data);
        var obj = $('li.curLayer');
        obj.find('.input_fabric').val(e.data.ingredient);
        obj.find('.input_fabric:eq(1)').val(e.data.standard);
        obj.find('.ingredient input:eq(1)').val(e.data.id);
        obj.find('.ingredient input:eq(2)').val(e.data.price);
    },false);


/////////////////////////////// 表单验证部分 ///////////////////////////////////
    // form
    var form = $("#fabricForm");

    $('#startPrice').on('click', function() {
        ///form.submit();
    });

    function init(callback) {
        validate(callback);
    }

    /** 表单验证 */
    var validator;

    function validate(callback) {
        //addrules();
        validator = form.validate({
            //忽略
            ignore: ':hidden',
            submitHandler:function(){
                if(callback){
                    callback();
                }
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
            success:function(element){
                $(element).poshytip('destroy');
            },
            rules: modExp.rules,
            messages: modExp.messages
        });
        module.exports.validator = validator;
    }

/////////////////////// /表单动态赋值 ////////////////////////////
//观察者模式
var observer = (function(){
    var subscribes = {};
    var content = [];
    var _update = function(data){

    }
    var subscribe = function(id,update){
        var ob = {};
        ob.id = id;
        ob.update = update || _update;
        content.push(ob);
        subscribes[id] = content;
    }
    var publish = function(id,data){
        if(subscribes[id]){
            var len = subscribes[id].length;
            for(var i=0;i<len;i++ ){
                subscribes[id][i].update(data);
            }
        }
    }
    var unsubscribe = function (id) {
        if(subscribes[id]){
            delete subscribes[id];
        }
    }

    return {
        publish:publish,
        subscribe:subscribe,
        unsubscribe:unsubscribe
    }
})();
//订阅选择纱线
observer.subscribe('fabricForm',function(data){
    $(that).parent().find('input').each(function(){
        var name = $(this).attr('dataName');
        var readOnly = $(this).attr('readonly');
        if(readOnly){
            $(this).attr('readonly','');
            $(this).val(data[name]);
            $(this).attr('readonly','readonly');
        }else{
             $(this).val(data[name]);
        }

    });
});
window.observer = observer;


module.exports.setMsgPosition = setMsgPosition;
module.exports.closeGuideLayer = closeGuideLayer;
module.exports.init = init;


});

