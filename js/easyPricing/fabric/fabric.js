define(function(require, exports, module) {
   var fabric = require('js/front/common/module/fabric');

    $(document).ready(function(){
        //核价方式：选择易家纺工缴库核价   选择工厂报价核价
        $('.factoryOffer-box').hide();
        $('#easySoftHomePrice_rad').bind('click',function(){
            $('.factoryOffer-box').hide();
        });
        $('#factoryPrice_rad').bind('click',function(){
            $('.factoryOffer-box').show();
        });
    });

////////////////////////////表单样式///////////////////////////////////
    $('#sel1').customSelect({width:"150px",padding:"12px 5px"});
    $('#sel2,#sel3,#sel4,#sel5').customSelect({width:"90px",padding:"12px 5px"});
    $('#sel6').customSelect({width:"200px",padding:"12px 5px"});


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
            }
        };
    // }

    fabric.submitHandler = function (form) {
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


                console.log($('#fabricForm').serialize());



                $.ajax({
                    type: "POST",
                    url: '/Pricing/Fabric/FabricPricing',
                    data: $("#fabricForm"),
                    dataType: "text",
                    success: function (d) { console.log(d); },
                    error: function (err) { console.log('提交失败'); }
                });

                return;

                var priceData = {"Data":{"SYSNUMBER":"7571e4a6-9dc7-4b6e-9efd-3e5ad7631b58","MLCOMPONENT":"棉100%   ","QDL_NAME":"0-1999米","S_QDL":0.0,"E_QDL":1999.0,"SZ_GYYQ":null,"RS_GYYQ":"面料机缸染色","RS_YSYQ":"浅","YH_GYYQ":null,"YH_SLDDJ":null,"YH_RLYQ":null,"IFDWH":"0","YH_SS":null,"YH_HWXH":null,"WIDTH_CM":1.0,"WIDTH_INCH":0.393700787401575,"INCH_CM":"CM","JXSZ":1.0,"WXSZ":1.0,"MLGZ":10.0,"MLYL":2.0,"FA_SYSNUMBER":"FA0001","FA_FNUMBER":"FA0001","FA_NAME":"梭织","FL_SYSNUMBER":"FL0001","FL_FNUMBER":"FL0001","FL_NAME":"提花布","DY_SYSNUMBER":"DY0001","DY_FNUMBER":"DY0001","DY_NAME":"染色","MEMBER_ID":null,"CREATETIME":null,"HCLFSYSNUMBER":"b1b1bb7e-c0c9-42c9-851c-63e497c93af4+3bb8a138-de77-4344-9287-330fcf43f84b","HCLF":2.83,"HCLQUANTITY":null,"FOBPRICE":0.76,"QDL_SYSNUMBER":"88faf09c-d00c-4399-8ffe-2ab97ab8b7fd","JSMLGZ":1.0,"WSMLGZ":9.0,"HCLSL":0.00,"TVALUE":5.0,"JXMD":"1","WXMD":"1","JXCF":"全棉纱","WXCF":"全棉纱","JXSZGGNAME":"全棉纱","WXSZGGNAME":"全棉纱","JSGG":"80S","WSGG":"7S","JX_GUXIAN":"1","WX_GUXIAN":"1","JX_CFBL":"-","WX_CFBL":"-","PRICE_JS":"","PRICE_WS":"","EXCHANGERATENAME":"美元","EXCHANGERATEVALUE":6.67,"INIUNIT":"CM","PRICE":5.33,"DCPRIC":1.87,"HCLFNAME":"抗菌处理；轧花"},"Success":true,"Message":""};

                // if(!priceData.Result){
                //     alert(priceData.Message);
                //     return;
                // }

                //同步渲染 模板引擎
                var laytpl = require('laytpl');
                var resultTemplate = laytpl($("#resultTemplate").html()).render(priceData.Data);
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
                // $(".fabric_step_2 tbody tr").hover(function () {
                //     $(this).addClass("hover");
                // }, function () {
                //     $(this).removeClass("hover");
                // });
            // }
        // }, { IsShowLoading: false });
            /************ajax***************/
    }
    // 配置规则并初始化
    // validateConf();
    fabric.init();
/////////////////////// /表单验证 ////////////////////////////

}); //define


//     $.ajax({
//         type: "POST",
//         url: /UIPricing/ashx/FabricPricingHandler.ashx?Action=pricing,
//         data: $("#fabricForm"),
//         dataType: "text",
//         beforeSend: function () {
//             if (options.IsShowLoading == true) {
//                 loadi = $.layer({ type: 3, border: [0], bgcolor: '' });
// //                    $.hLoading.show({ msg: options.Message, Isback: options.Isback, timeout: 10000000, loadingType: options.LoadingType });
//             }
//         },
//         success: function (d) { layer.close(loadi); fnSuccess(d); },
//         error: function (err) { layer.close(loadi); layer.alert(options.ErrorMsg, 8, !1); }
//     });