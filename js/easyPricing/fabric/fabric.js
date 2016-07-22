define(function(require, exports, module) {
    require('jquery');
    require('js/front/lib/tip/jquery.poshytip');
    require('layer');
    var laytpl = require('laytpl');
    require('spinner');
    require('customSelect');

    require('js/front/lib/validation/validation');

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


////////////////////////////表单样式///////////////////////////////////
    $('#sel1').customSelect({width:"150px",padding:"12px 5px"});
    $('#sel2,#sel3,#sel4,#sel5').customSelect({width:"90px",padding:"12px 5px"});
    $('#sel6').customSelect({width:"200px",padding:"12px 5px"});

var yarnNum = $('#abb-ul li').length + $('.yarn-ul li').length;

// 经纱纬纱事件
    $('#warp-spinner')
      .spinner({
        min:1,
        max:2,
        addEvent: function () {
            yarnNum = yarnNum + 1;
            var ifrUrl = $('.yarntype_box .yarn_butt').attr('data-href');
            $('#yarn-ul').append('<li class="lf yarn_para">'
                + '<span class="lf para_tit">经纱2：</span>'
                + '<span class="lf include"></span>'
                + '<div class="lf" style="width: 142px;">'
                  + '<span class="clearfix ingredient" >'
                    + '<span class="lf ingredient_tit">成分</span>'
                    + '<input type="text" class="lf input_fabric" name="" readonly="true" id="warpIngredient2"/>'
                    + '<input name="FabricYarns['+ yarnNum +'].YarnSpecID" type="hidden" value="">'
                    + '<input name="FabricYarns['+ yarnNum +'].FactoryPrice" type="hidden" value="">'
                    + '<input name="FabricYarns['+ yarnNum +'].IsChaineDensity" type="hidden" value="true">'
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
                + '<input type="text" id="warpSpinnerNum2" errorMsgPosition="rightTop" name="FabricYarns['+ yarnNum +'].DensityLength" class="density_input lf">'
            );
        },
        cutEvent: function () {
          $('#yarn-ul li:last input').poshytip('destroy');
          $('#yarn-ul li:last').remove();
          $('#warp_num_box input:last').poshytip('destroy');
          $('#warp_num_box input:last,#warp_num_box .plus:last').remove();

        }
      });

    $('#abb-spinner').spinner({
      min:1,
      max:4,
      addEvent:function () {
        var num = $('#abb-ul li').length+1;
        yarnNum = yarnNum + 1;
        var ifrUrl = $('.wefttype_box .yarn_butt').attr('data-href');
        $('#abb-ul').append('<li class="lf yarn_para">'
          + '<span class="lf para_tit">纬纱'+ num +'：</span>'
          + '<span class="lf include"></span>'
          + '<div class="lf" style="width: 142px;">'
            + '<span class="clearfix ingredient">'
              + '<span class="lf ingredient_tit">成分</span>'
              + '<input type="text" class="lf input_fabric" name="" readonly="true" id="weftIngredient'+num+'"/>'
              + '<input name="FabricYarns['+ yarnNum +'].YarnSpecID" type="hidden" value="">'
              + '<input name="FabricYarns['+ yarnNum +'].FactoryPrice" type="hidden" value="">'
              + '<input name="FabricYarns['+ yarnNum +'].IsChaineDensity" type="hidden" value="false">'
            + '</span>'
            + '<span class="clearfix thickness">'
              + '<span class="lf ingredient_tit">粗细</span>'
              + '<input type="text" class="lf input_fabric" name="WSGG" readonly="true" id="weftDiameter'+num+'"/>'
            + '</span>'
          + '</div>'
          + '<div class="yarn_butt lf" data-href="'+ ifrUrl +'">选择纱线</div>'
          + '</li>');
        $('.fixed-input-tip').eq(1).before('<span class="plus lf"></span>'
          + '<input type="text" id="abbSpinnerNum'+num+'" name="FabricYarns['+ yarnNum +'].DensityLength" class="density_input lf">');
      },
      cutEvent:function () {
        $('#abb-ul li:last input').poshytip('destroy');
        $('#abb-ul li:last').remove();
        $('#abb_num_box input:last').poshytip('destroy');
        $('#abb_num_box input:last,#abb_num_box .plus:last').remove();
      }
    });

    $('.handle_one').click(function() {
      var obj = $(this).find('input');
      if(obj.prop('checked')){
        obj.prop('checked',false);
      } else {
        obj.prop('checked',true);
      }
      $(this).toggleClass('selected');
    });

    //染织方法
    $('#dyed-method label').on('click', function() {

      var index = $(this).index();
      $('.AddItem .js-tab').hide();
      $('.AddItem .js-tab').eq(index).show();
    });

////////////////////////////弹出层///////////////////////////////////

var that;

  window.parentFn = function(ingredient, standard, id, price){
    var obj = $('li.curLayer');
    obj.find('.input_fabric').val(ingredient);
    obj.find('.input_fabric:eq(1)').val(standard);
    obj.find('.ingredient input:eq(1)').val(id);
    obj.find('.ingredient input:eq(2)').val(price);
  }

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
        success: function (layer) {

        }

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
        success: function () {

        }

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
        success: function () {

        }

      });
    });
/////////////////////////////// 关闭引导层 ///////////////////////////////////
function closeGuideLayer(){
  $.pagewalkthrough('close');
  $(document.body).css("overflow","");
}


/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#fabricForm");

  $('#startPrice').on('click', function() {
          form.submit();

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
//addrules();
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //提交表单
            // formSubmit(form);
            // closeGuideLayer();
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
        //
            // $.ajaxSubmit("", ,
            //   function (d) {
                  // if (!d.Success) {
                  //     //未登录
                  //     if (d.Data == "-1") {
                  //         showLoginForm();
                  //     }
                  //     else {
                  //         layer.alert(d.Message, 8, !1);
                  //     }
                  // } else {
                      // var priceData = d.Data;
                      var priceData = {"Data":{"SYSNUMBER":"7571e4a6-9dc7-4b6e-9efd-3e5ad7631b58","MLCOMPONENT":"棉100%   ","QDL_NAME":"0-1999米","S_QDL":0.0,"E_QDL":1999.0,"SZ_GYYQ":null,"RS_GYYQ":"面料机缸染色","RS_YSYQ":"浅","YH_GYYQ":null,"YH_SLDDJ":null,"YH_RLYQ":null,"IFDWH":"0","YH_SS":null,"YH_HWXH":null,"WIDTH_CM":1.0,"WIDTH_INCH":0.393700787401575,"INCH_CM":"CM","JXSZ":1.0,"WXSZ":1.0,"MLGZ":10.0,"MLYL":2.0,"FA_SYSNUMBER":"FA0001","FA_FNUMBER":"FA0001","FA_NAME":"梭织","FL_SYSNUMBER":"FL0001","FL_FNUMBER":"FL0001","FL_NAME":"提花布","DY_SYSNUMBER":"DY0001","DY_FNUMBER":"DY0001","DY_NAME":"染色","MEMBER_ID":null,"CREATETIME":null,"HCLFSYSNUMBER":"b1b1bb7e-c0c9-42c9-851c-63e497c93af4+3bb8a138-de77-4344-9287-330fcf43f84b","HCLF":2.83,"HCLQUANTITY":null,"FOBPRICE":0.76,"QDL_SYSNUMBER":"88faf09c-d00c-4399-8ffe-2ab97ab8b7fd","JSMLGZ":1.0,"WSMLGZ":9.0,"HCLSL":0.00,"TVALUE":5.0,"JXMD":"1","WXMD":"1","JXCF":"全棉纱","WXCF":"全棉纱","JXSZGGNAME":"全棉纱","WXSZGGNAME":"全棉纱","JSGG":"80S","WSGG":"7S","JX_GUXIAN":"1","WX_GUXIAN":"1","JX_CFBL":"-","WX_CFBL":"-","PRICE_JS":"","PRICE_WS":"","EXCHANGERATENAME":"美元","EXCHANGERATEVALUE":6.67,"INIUNIT":"CM","PRICE":5.33,"DCPRIC":1.87,"HCLFNAME":"抗菌处理；轧花"},"Success":true,"Message":""};
                      //同步渲染 模板引擎
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
                      $(".fabric_step_2 tbody tr").hover(function () {
                          $(this).addClass("hover");
                      }, function () {
                          $(this).removeClass("hover");
                      });
                  // }
              // }, { IsShowLoading: false });
                    /************ajax***************/

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
          rules: {
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
                  gt:0
              },
              warpSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
              },
              warpIngredient1: {
                  required: true
              },
              warpIngredient2: {
                  required: true
              },
              warpDiameter1: {
                  required: true
              },
              warpDiameter2: {
                  required: true
              },
              abbSpinnerNum1: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
              },
              abbSpinnerNum2: {
                  number:true,
                  required: true,
                  maxlength:10,
                  gt:0
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
              weftIngredient1: {
                  required: true
              },
              weftIngredient2: {
                  required: true
              },
              weftIngredient3: {
                  required: true
              },
              weftIngredient4: {
                  required: true
              },
              weftDiameter1: {
                  required: true
              },
              weftDiameter2: {
                  required: true
              },
              weftDiameter3: {
                  required: true
              },
              weftDiameter4: {
                  required: true
              },
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
          },
          messages: {
              fabricWidth: {
                  required: icons.error + '请输入面料门幅！',
                  number: icons.error + '面料门幅值只能是数字！',
                  maxlength: icons.error + '面料门幅值过长！'
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
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum2: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum3: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              abbSpinnerNum4: {
                  number: icons.error + '纬密值只能是数字！',
                  required: icons.error + '请输入纬密值！',
                  maxlength: icons.error + '纬密值过大！'
              },
              weftIngredient1: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient2: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient3: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftIngredient4: {
                  required: icons.error + '请输入纬纱成分！'
              },
              weftDiameter1: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter2: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter3: {
                  required: icons.error + '请输入纬纱粗细！'
              },
              weftDiameter4: {
                  required: icons.error + '请输入纬纱粗细！'
              },
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
          }
      });
  }


//核价方式：选择易家纺工缴库核价   选择工厂报价核价
$(document).ready(function(){
  $('.factoryOffer-box').hide();
  $('#easySoftHomePrice_rad').bind('click',function(){
    $('.factoryOffer-box').hide();
  });
  $('#factoryPrice_rad').bind('click',function(){
    $('.factoryOffer-box').show();
  });

});


init();

});