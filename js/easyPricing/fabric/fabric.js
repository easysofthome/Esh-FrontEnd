define(function(require, exports, module) {
    var observer = require('js/front/common/module/observer');
    window.observer = observer;
    var fabric = require('js/front/common/module/fabric');
    var pricing = require('js/front/easyPricing/fabric/pricing'); //核价功能
    var pricingObj = new pricing();

    $(document).ready(function(){


        // 单经单纬却换
        $('input[name=yarnTypeNum]').on('click', function() {
            var index = $(this).parent().index();
            if(index){
                $('.spinner,.singleWarpWeft').hide();
                $('.spinner,.multiWarpWeft').show();
            } else {
                $('.spinner,.singleWarpWeft').show();
                $('.spinner,.multiWarpWeft').hide();
            }
        })

    /////////////// 默认选项 ///////////////
        $('input[name=yarnTypeNum]:first').click();
        //织造种类 默认选中第一个
        $("input[name='WeavingType']:first").click();

        //染织方法
        $("input[name='DyeingType']:first").click();
        $("input[name='Fruit3']:first").click();
        $("input[name='Fruit7']:first").click();


        //染色颜色
        $("input[name='DyeingColorRequirements']:first").click();

        //染织方法
        $("input[name='DyeingDyeRequirement']:first").click();
        $("input[name='DyeingPrintingProcessRequirements']:first").click();
        $("input[name='DyeingColourFastnessGrade']:first").click();
        $("input[name=DyeingPrintingProcessRequirements]:last").parent().css('display','none');

        //汇率
        $("input[name='ExchangeRate']").val($("#exchangeRateSel option:first").val());
        //染厂后处理
        //$("input[name='AfterProcessesIds']:first").click();
        //核价方式 默认选中宜家纺
        $("input[name='FabricPricingType']:last").click();

        $("#exchangeRateSel").change(function() {
            $("input[name='ExchangeRate']").val($(this).val());
        });

        //初始化表单验证
        fabric.init(function(form){
            fabric.validSuccess = true;
        });
    });

////////////////////////////表单样式///////////////////////////////////
    $('.sel1').customSelect({width:"150px",padding:"12px 5px"});
    $('.sel2').customSelect({width:"90px",padding:"12px 5px"});

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
                    + '<input dataName="YarnSpecName" type="text" class="lf input_fabric" name="FabricYarnsChaine['+ warpNum +'].YarnSpecName" readonly="true" id="warpIngredient2"/>'
                    + '<input dataName="FabricElementId" name="FabricYarnsChaine['+ warpNum +'].FabricElementId" type="hidden" value="">'
                    + '<input dataName="YarnSpecNum" name="FabricYarnsChaine['+ warpNum +'].YarnSpecNum" type="hidden" value="">'
                    + '<input dataName="YarnSpecNumUnit" name="FabricYarnsChaine['+ warpNum +'].YarnSpecNumUnit" type="hidden" value="">'
                    + '<input dataName="StrandsNum" name="FabricYarnsChaine['+ warpNum +'].StrandsNum" type="hidden" value="">'
                    + '<input dataName="ComponentRatio" name="FabricYarnsChaine['+ warpNum +'].ComponentRatio" type="hidden" value="">'
                    + '<input dataName="HolesNum" name="FabricYarnsChaine['+ warpNum +'].HolesNum" type="hidden" value="">'
                    + '<input dataName="Technology" name="FabricYarnsChaine['+ warpNum +'].Technology" type="hidden" value="">'
                    + '<input dataName="IsChaineDensity" name="FabricYarnsChaine['+ warpNum +'].IsChaineDensity" type="hidden" value="true">'
                    + '<input dataName="FactoryYarnMId" name="FabricYarnsChaine['+ warpNum +'].FactoryYarnId" type="hidden" value="">'
                  + '</span>'
                  + '<span class="clearfix thickness">'
                  + '<span class="clearfix thickness">'
                    + '<span class="lf ingredient_tit">粗细</span>'
                    + '<input dataName="YarnNum" type="text" class="lf input_fabric" name="JSGG" readonly="true" id="warpDiameter2"/>'
                  + '</span>'
                + '</div>'
                + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
                + '</li>');
                $('.multiWarpWeft').find('.fixed-input-tip').eq(0).before('<span class="plus lf"></span>'
                + '<input type="text" id="warpSpinnerNum2" name="FabricYarnsChaine['+ warpNum +'].DensityLength" class="density_input lf">'
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
              + '<span class="lf para_tit">纬纱'+ abbNum +'：</span>'
              + '<span class="lf include"></span>'
              + '<div class="lf" style="width: 142px;">'
                + '<span class="clearfix ingredient">'
                  + '<span class="lf ingredient_tit">成分</span>'
                  + '<input dataName="YarnSpecName" type="text" class="lf input_fabric" name="FabricYarns['+ abbNum +'].YarnSpecName" readonly="true" id="weftIngredient'+ (abbNum+1) +'"/>'
                  + '<input dataName="FabricElementId" name="FabricYarns['+ abbNum +'].FabricElementId" type="hidden" value="">'
                    + '<input dataName="YarnSpecNum" name="FabricYarns['+ abbNum +'].YarnSpecNum" type="hidden" value="">'
                    + '<input dataName="YarnSpecNumUnit" name="FabricYarns['+ abbNum +'].YarnSpecNumUnit" type="hidden" value="">'
                    + '<input dataName="StrandsNum" name="FabricYarns['+ abbNum +'].StrandsNum" type="hidden" value="">'
                    + '<input dataName="ComponentRatio" name="FabricYarns['+ abbNum +'].ComponentRatio" type="hidden" value="">'
                    + '<input dataName="HolesNum" name="FabricYarns['+ abbNum +'].HolesNum" type="hidden" value="">'
                    + '<input dataName="Technology" name="FabricYarns['+ abbNum +'].Technology" type="hidden" value="">'
                    + '<input dataName="IsChaineDensity" name="FabricYarns['+ abbNum +'].IsChaineDensity" type="hidden" value="false">'
                    + '<input dataName="FactoryYarnMId" name="FabricYarns['+ abbNum +'].FactoryYarnId" type="hidden" value="">'
                + '</span>'
                + '<span class="clearfix thickness">'
                  + '<span class="lf ingredient_tit">粗细</span>'
                  + '<input dataName="YarnNum" type="text" class="lf input_fabric" name="WSGG" readonly="true" id="weftDiameter'+ (abbNum+1) +'"/>'
                + '</span>'
              + '</div>'
              + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
              + '</li>');
            $('.multiWarpWeft').find('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
              + '<input type="text" id="abbSpinnerNum'+ (abbNum+1) +'" name="FabricYarns['+ abbNum +'].DensityLength" class="density_input lf">');
            abbNum++;
        },
        cutEvent:function () {
            $('#abb-ul li:last input').poshytip('destroy');
            $('#abb-ul li:last').remove();
            $('#abb_num_box input:last').poshytip('destroy');
            $('#abb_num_box input:last,#abb_num_box .plus:last').remove();
            abbNum--;
        }
    });

/////////////////////// 表单验证 ////////////////////////////

    //错误信息提示点
    var icons = {
        error: '<i class="i-error"></i>'
    };

    // 表单验证配置
    // function validateConf() {
    // 验证规则配置
    fabric.rules = {
        fabricWidth: {
            number:true,
            required: true,
            maxlength:10,
            gt:0
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
        exchangeRate: {
            required: true,
            number: true,
            maxlength:10,
            gt:0
        },
        factoryPrice1: {
            number: true,
            maxlength:10,
            gt:0
        },
        factoryPrice2: {
            number: true,
            maxlength:10,
            gt:0
        },
        factoryPrice3: {
            number: true,
            maxlength:10,
            gt:0
        },
        singleWarpSpinnerNum1: {
            required: true,
            number:true
        },
        singleabbSpinnerNum1: {
            required: true,
            number:true
        },
        singleWarpSpinnerNum: {
            required: true,
            number:true
        },
        singleabbSpinnerNum: {
            required: true,
            number:true
        }
    };
    // 验证的错误信息配置
    fabric.messages = {
        fabricWidth: {
            required: icons.error + '请输入面料门幅！',
            number: icons.error + '面料门幅值只能是数字！',
            maxlength: icons.error + '面料门幅值过长！'
        },
        singleWarpSpinnerNum: {
            number: icons.error + '经密值只能是数字！',
            required: icons.error + '请输入经密值！',
            maxlength: icons.error + '经密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        singleabbSpinnerNum: {
            number: icons.error + '纬密值只能是数字！',
            required: icons.error + '请输入经密值！',
            maxlength: icons.error + '纬密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
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
        warpIngredient1: {
            required: icons.error + '请输入经纱成分！'
        },
        warpIngredient2: {
            required: icons.error + '请输入经纱成分！'
        },
        warpDiameter1: {
            required: icons.error + '请输入经纱粗细！'
        },
        warpDiameter2: {
            required: icons.error + '请输入经纱粗细！'
        },
        abbSpinnerNum1: {
            number: icons.error + '纬密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '纬密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum2: {
            number: icons.error + '纬密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '纬密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum3: {
            number: icons.error + '纬密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '纬密值过大！',
            max: icons.error + '密度值不超过300根/厘米'
        },
        abbSpinnerNum4: {
            number: icons.error + '纬密值只能是数字！',
            required: icons.error + '请输入纬密值！',
            maxlength: icons.error + '纬密值过大！',
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
        exchangeRate:{
            required: icons.error + '请输入汇率！',
            number: icons.error + '汇率值只能是数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        factoryPrice1: {
            number: icons.error + '只能输入数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        factoryPrice2:{
            number: icons.error + '只能输入数字！',
            maxlength: icons.error + '输入数值过长！'

        },
        factoryPrice3: {
            number: icons.error + '只能输入数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        singleWarpSpinnerNum1: {
            required: icons.error + '请输入经密值！',
            number: icons.error + '只能输入数字！',
            maxlength: icons.error + '输入数值过长！'
        },
        singleabbSpinnerNum1: {
            required: icons.error + '请输入纬密值！',
            number: icons.error + '只能输入数字！',
            maxlength: icons.error + '输入数值过长！'
        }
    };
    // }
    module.exports.fabric = fabric;
    module.exports.pricingObj = pricingObj;


});