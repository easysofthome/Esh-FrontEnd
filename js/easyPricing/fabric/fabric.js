define(function(require, exports, module) {
    var fabric = require('js/front/common/module/fabric');
    var pricing = require('js/front/easyPricing/fabric/pricing'); //核价功能
   // var pricingObj = new pricing();
    var pricingObj = {};
    $(document).ready(function(){

        // 单经单纬却换
        $('input[name=yarnTypeNum]').on('change', function() {
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
        //织造种类 默认选中第一个
        $("input[name='WeavingType']:first").attr("checked", "checked");

        //染织方法
        $("input[name='DyeingType']:first").attr("checked", "checked");

        //染色颜色
        $("input[name='DyeingColorRequirements']:first").attr("checked", "checked");

        //染织方法
        $("input[name='DyeingDyeRequirement']:first").attr("checked", "checked");
        $("input[name='DyeingPrintingProcessRequirements']:first").attr("checked", "checked");
        $("input[name='DyeingColourFastnessGrade']:first").attr("checked", "checked");
        $("input[name=DyeingPrintingProcessRequirements]:last").parent().css('display','none');

        //汇率
        $("input[name='ExchangeRate']").val($("#exchangeRateSel option:first").val());

        $("#exchangeRateSel").change(function() {
            $("input[name='ExchangeRate']").val($(this).val());
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
                    + '<input type="text" class="lf input_fabric" name="FabricYarnsChaine['+ warpNum +'].YarnSpecName" readonly="true" id="warpIngredient2"/>'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].FabricElementId" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YarnSpecNum" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].YarnSpecNumUnit" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].StrandsNum" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].ComponentRatio" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].HolesNum" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].Technology" type="hidden" value="">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].IsChaineDensity" type="hidden" value="true">'
                    + '<input name="FabricYarnsChaine['+ warpNum +'].FactoryYarnId" type="hidden" value="">'
                  + '</span>'
                  + '<span class="clearfix thickness">'
                  + '<span class="clearfix thickness">'
                    + '<span class="lf ingredient_tit">粗细</span>'
                    + '<input type="text" class="lf input_fabric" name="JSGG" readonly="true" id="warpDiameter2"/>'
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
            abbNum++;
            var ifrUrl = $('.wefttype_box .yarn_butt').attr('data-href');
            $('#abb-ul').append('<li class="lf yarn_para">'
              + '<span class="lf para_tit">纬纱'+ abbNum +'：</span>'
              + '<span class="lf include"></span>'
              + '<div class="lf" style="width: 142px;">'
                + '<span class="clearfix ingredient">'
                  + '<span class="lf ingredient_tit">成分</span>'
                  + '<input type="text" class="lf input_fabric" name="FabricYarns['+ abbNum +'].YarnSpecName" readonly="true" id="weftIngredient'+ (abbNum+1) +'"/>'
                  + '<input name="FabricYarns['+ abbNum +'].FabricElementId" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].YarnSpecNum" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].YarnSpecNumUnit" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].StrandsNum" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].ComponentRatio" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].HolesNum" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].Technology" type="hidden" value="">'
                    + '<input name="FabricYarns['+ abbNum +'].IsChaineDensity" type="hidden" value="false">'
                    + '<input name="FabricYarns['+ abbNum +'].FactoryYarnId" type="hidden" value="">'
                + '</span>'
                + '<span class="clearfix thickness">'
                  + '<span class="lf ingredient_tit">粗细</span>'
                  + '<input type="text" class="lf input_fabric" name="WSGG" readonly="true" id="weftDiameter'+ (abbNum+1) +'"/>'
                + '</span>'
              + '</div>'
              + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
              + '</li>');
            $('.multiWarpWeft').find('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
              + '<input type="text" id="abbSpinnerNum'+ (abbNum+1) +'" name="FabricYarns['+ abbNum +'].DensityLength" class="density_input lf">');
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
        }
    };
    // 验证的错误信息配置
    fabric.messages = {
        fabricWidth: {
            required: icons.error + '请输入面料门幅！',
            number: icons.error + '面料门幅值只能是数字！',
            maxlength: icons.error + '面料门幅值过长！'
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

    var submitHandler = function (form) {
        pricingObj.start();return;
        //提交表单
        // formSubmit(form);
        // fabric.closeGuideLayer();
        // $.ajax({
        //     cache: true,
        //     type: "POST",
        //     url: '/UIPricing/ashx/FabricPricingHandler.ashx',
        //     data: $('#fabricForm').serialize(),// 你的formid
        //     async: false,
        //     error: function(request) {
        //         alert("Connection error");
        //     },
        //     success: function(data) {
        //       //阻止表单提交
        //       $.layer(startPriceLayer);
        //       console.log(data);
        //       return false;
        //     }
        // });

        /************ajax***************/

        // $.ajaxSubmit("", ,
        //     function (d) {
        //         if (!d.Success) {
        //             //未登录
        //             if (d.Data == "-1") {
        //                 showLoginForm();
        //             }else {
        //                 layer.alert(d.Message, 8, !1);
        //             }
        //         } else {
        // var priceData = d.Data;
        // var priceData = {
        //     "Result":true,
        //     "TotalPrice":10.57,
        //     "FabricTotalWeight":68,
        //     "FabricDensity":87,
        //     "FabricCompositionContent":"涤纶65.00% 棉35.00% ",
        //     "Message":null
        // };
        // priceData.


        $.ajax({
            type: "POST",
            url: '/Pricing/Fabric/FabricPricing',
            data: $("#fabricForm").serialize(),
            dataType: "json",
            success: function (d) {
                if(!d.jieguo){
                    alert(d.Message);
                    return;
                }

                d.jgdw = $('#hLight_step5 select option:selected').text();

                //var priceData = {"jieguo": true, "qdl": "0-1999米", "zzzl": " 提花布", "rzff": "染色", "yxmf": 232.0, "jwmd": "1*3+2*4*6", "zwmd": 102.0, "jxgg": [{"DensityLength": 20, "YarnSpecName": "涤棉纱", "YarnSpecNum": "32S", "IsChaineDensity": true, "ComponentRatio": "65/35", "StrandsNum": "1", "YarnSpecID": "1bd4daae-7793-48ae-a94c-6580d27c1e66", "FactoryPrice": null }, {"DensityLength": 10, "YarnSpecName": "棉纱", "YarnSpecNum": "16S", "IsChaineDensity": true, "ComponentRatio": "65/20", "StrandsNum": "3", "YarnSpecID": "1bd4daae-7793-48ae-a94c-6580d27c1e66", "FactoryPrice": null } ], "wxgg": [{"DensityLength": 20, "YarnSpecName": "全棉纱", "YarnSpecNum": "60S", "IsChaineDensity": false, "ComponentRatio": "-", "StrandsNum": "1", "YarnSpecID": "ea73606a-3bc1-4a2c-8475-34f5e0beebda", "FactoryPrice": null }, {"DensityLength": 30, "YarnSpecName": "全纱", "YarnSpecNum": "80S", "IsChaineDensity": false, "ComponentRatio": "-", "StrandsNum": "2", "YarnSpecID": "ea73606a-3bc1-4a2c-8475-34f5e0beebda", "FactoryPrice": null } ], "mlkz": 61.0, "mlcf": "涤纶42.80% 棉57.20% ", "hcl": 1, "jg": 8.2, "jgmy": 0, "msg": "发送失败"};

                //同步渲染 模板引擎
                var laytpl = require('laytpl');
                var resultTemplate = laytpl($("#resultTemplate").html()).render(d);
                $("#priceResult").html(resultTemplate);
                var layerPrice = $.layer({
                    type: 1,   //0-4的选择,
                    title: false,
                    shadeClose: false,
                    closeBtn: [0, false], //去掉默认关闭按钮
                    shift: 'top',
                    fix: false,
                    area: ['1000px', '617px'],
                    page: {
                        dom: '#popupResult'
                    },
                    success: function(){
                        var that = this;
                        $('span.btn_close,a.close').on('click',function(){
                            layer.close(layerPrice);
                        })
                    }
                    //收藏核价事件
                    // yes: function () {
                    //     layer.prompt({ title: '请填写收藏名称', type: 3, length: 250 }, function (name, index) {
                    //         var loadi = $.layer({ type: 3, border: [0], bgcolor: '' });
                    //         $.ajaxjson(fabricPricingAshxPath, { Action: "addCollect", recordid: priceData.SYSNUMBER, collectname: name },
                    //       function (d) {
                    //           //款式尺码同步渲染 模板引擎
                    //           if (d.Success) {
                    //               if (d.Success) {
                    //                   layer.close(loadi);
                    //                   layer.close(index);
                    //                   layer.msg('核价结果收藏成功，在会员中心“我的核价”中查看！', 2, { type: 1, shade: false, rate: 'top' });
                    //               } else {
                    //                   if (d.Data == "-1") {
                    //                       showLoginForm();
                    //                   }
                    //                   else {
                    //                       layer.alert("核价结果收藏失败！", 8, !1);
                    //                   }
                    //               }
                    //           }
                    //       }, { IsShowLoading: false });
                    //     });
                    // }
                });
            },
            error: function (err) { console.log('数据提交失败'); }
        });

        // $(".fabric_step_2 tbody tr").hover(function () {
        //     $(this).addClass("hover");
        // }, function () {
        //     $(this).removeClass("hover");
        // });
        // }
        // }, { IsShowLoading: false });
        /************ajax***************/
    }

    fabric.init(submitHandler);
/////////////////////// /表单验证 ////////////////////////////

}); //define