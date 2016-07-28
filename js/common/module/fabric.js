define(function(require, exports, module) {

    var modExp = module.exports;

    require('jquery');
    require('js/front/lib/tip/jquery.poshytip');
    require('js/front/lib/validation/validation');
    var spinner = require('spinner');
    var cus =  require('customSelect');


/////////////////////////////// 表单样式部分 ///////////////////////////////////
    var FancyRadioCheckBox = require('FancyRadioCheckBox');
    // 加载单选按钮样式
    FancyRadioCheckBox.init();

    // 染织方法
    $('#dyed-method label').on('click', function() {
        var index = $(this).index();
        $('.AddItem .js-tab').hide();
        $('.AddItem .js-tab').eq(index).show();
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
                    + '<input type="text" class="lf input_fabric" name="FabricYarnsChaine['+ warpNum +'].YarnSpecName" readonly="true" id="warpIngredient2"/>'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YarnSpecID" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].FactoryPrice" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].IsChaineDensity" type="hidden" value="true">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].IsChaineDensity" type="hidden" value="true">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].IsChaineDensity" type="hidden" value="true">'
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
                + '<input type="text" id="warpSpinnerNum2" errorMsgPosition="rightTop" name="FabricYarnsChaine['+ warpNum +'].DensityLength" class="density_input lf">'
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
                  + '<input type="text" class="lf input_fabric" name="FabricYarnsChaine['+ warpNum +'].YarnSpecNum" readonly="true" id="weftIngredient'+ (warpNum+1) +'"/>'
                  + '<input name="FabricYarns['+ warpNum +'].YarnSpecID" type="hidden" value="">'
                  + '<input name="FabricYarns['+ warpNum +'].FactoryPrice" type="hidden" value="">'
                  + '<input name="FabricYarns['+ warpNum +'].IsChaineDensity" type="hidden" value="false">'
                + '</span>'
                + '<span class="clearfix thickness">'
                  + '<span class="lf ingredient_tit">粗细</span>'
                  + '<input type="text" class="lf input_fabric" name="WSGG" readonly="true" id="weftDiameter'+ (warpNum+1) +'"/>'
                + '</span>'
              + '</div>'
              + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
              + '</li>');
            $('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
              + '<input type="text" id="abbSpinnerNum'+ (warpNum+1) +'" name="FabricYarns['+ warpNum +'].DensityLength" class="density_input lf">');
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
    $('#yarn-ul').on('click', '.yarn_butt' , function() {
        that = this;

        $('.curLayer').removeClass('curLayer');
        $(that).parents('li').addClass('curLayer');

        $.layer({
            type: 2,
            title: false,
            area: ['1020px', '874px'],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 874)/2+'px',''],
            closeBtn: [0, false], //去掉默认关闭按钮
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function (layer) {}
        });
    });

    // 纬纱种类选择纱线
    $('#abb-ul').on('click', '.yarn_butt' , function() {
        that = this;

        $('.curLayer').removeClass('curLayer');
        $(that).parents('li').addClass('curLayer');

        $.layer({
            type: 2,
            title: false,
            area: ['1020px', '874px'],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 874)/2+'px',''],
            closeBtn: [0, false], //去掉默认关闭按钮
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function () {}
        });
    });

    //选择织造工缴工厂报价
    $('.factoryOffer_butt').on('click', function() {
        that = this;
        $.layer({
            type: 2,
            title: false,
            area: ['1000px', '270px'],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 270)/2+'px',''],
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
        form.submit();
    });

    function init() {
        validate();
    }

    /** 表单验证 */
    var validator;

    function validate() {
        //addrules();
        validator = form.validate({
            //忽略
            ignore: '.ignore',
            submitHandler: modExp.submitHandler,
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
/////////////////////////////// /表单验证部分 ///////////////////////////////////


module.exports.setMsgPosition = setMsgPosition;
module.exports.closeGuideLayer = closeGuideLayer;
module.exports.init = init;

});

