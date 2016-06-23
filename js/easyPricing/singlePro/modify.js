define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/validation/validation');
  require('js/lib/tip/jquery.poshytip');
////////////////////////////错误提示框 tip///////////////////////////////////
function showTip(obj,msg,alignX,alignY,offsetX,offsetY,className,isDropList){
var cName = (className == undefined? 'tip-violet':'tip-yellow');
var dropList = (false || isDropList);
 $(obj).poshytip({
      className: cName,
      content: msg,
      showOn: 'none',
      alignTo: 'target',
      alignX: alignX,
      alignY: alignY,
      offsetX: offsetX,
      offsetY: offsetY,
      dropList:dropList
    });

}
function setMsgPosition(obj,msg,direction,className,isDropList){
  switch(direction){
    case "right":
      showTip(obj,msg,"right","center",5,0,className,isDropList);
      break;
    case "rightTop":
      showTip(obj,msg,"inner-left","top",50,5,className,isDropList);
      break;
    case "rightBottom":
      showTip(obj,msg,"inner-left","bottom",0,5,className,isDropList);
      break;
    default:
      showTip(obj,msg,"inner-left","top",0,10,className,isDropList);
  }
}

////////////////////////////弹出层///////////////////////////////////

  //获取出口税率
      $("#exportTariff").attr('href', 'javascript:void(0)');
      $("#exportTariff").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1020px', '450px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 450)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '../pricing/export.html'},
          success: function (layero, index) {


          }
        });
      });

      //产品辅料 查看修改
      $("#product_view").attr('href', 'javascript:void(0)');
      $("#product_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '272px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 270)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '../pricing/productacc.html'},
          success: function (layero, index) {
          }
        });
      });

      //包装辅料 查看修改
      $("#packing_view").attr('href', 'javascript:void(0)');
      $("#packing_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '272px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 272)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '../pricing/productacc.html'},
          success: function (layero, index) {


          }
        });
      });

       //体积信息 查看修改
      $("#volume_view").attr('href', 'javascript:void(0)');
      $("#volume_view").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '200px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 200)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '../pricing/volume.html'},
          success: function (layero, index) {


          }
        });
      });


       //替换面料
      $(".replaceFabric_name").attr('href', 'javascript:void(0)');
      $(".replaceFabric_name").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '980px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 964)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '../pricing/replaceFabric.html'},
          success: function (layero, index) {


          }
        });
      });


      //辅料替换
      $(".accessories_name").attr('href', 'javascript:void(0)');
      $(".accessories_name").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '600px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 600)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '/html/easyPricing/pricing/accessories.html'},
          success: function (layero, index) {


          }
        });
      });

      //选择织造工缴工厂报价
      $(".factoryOffer_butt").attr('href', 'javascript:void(0)');
      $(".factoryOffer_butt").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '270px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 270)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '/html/easyPricing/pricing/selectQuotation.html'},
          success: function (layero, index) {


          }
        });
      });

     //产品辅料 新增(双层layer)
     $("#showAddLayer").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '594px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 594)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '/html/easyPricing/pricing/accessories.html'},
          success: function (layero, index) {


          }
        });
      });

/////////////////////////////// 起始港 目的港 下拉提示 ///////////////////////////////////
var listStartPort = {};
var listEndPort = {};
var startPortHTML ='<div class="port_contxt" id="port_list"><a class="a1"><span data-port="上海">上海(SHANGHAI)</span>中国</a><a class="a1"><span data-port="深圳">深圳(SHENZHEN)</span>中国</a><a class="a1"><span data-port="天津">天津(TIANJIN)</span>中国</a><a class="a1"><span data-port="青岛">青岛(QINGDAO)</span>中国</a><a class="a1"><span data-port="大连">大连(DALIAN)</span>中国</a><a class="a1"><span data-port="宁波">宁波(NINGBO)</span>中国</a><a class="a1"><span data-port="厦门">厦门(XIAMEN)</span>中国</a><a class="a1"><span data-port="广州">广州(GUANGZHOU)</span>中国</a></div>';
var endPortHTML ='<div class="port_contxt" id="port_list"><a class="a1"><span data-port="洛杉矶">洛杉矶(LOS ANGELES CA)</span>美国</a><a class="a1"><span data-port="迪拜">迪拜(DUBAI)</span>阿联酋</a><a class="a1"><span data-port="鹿特丹">鹿特丹(ROTTERDAM)</span>荷兰</a><a class="a1"><span data-port="东京">东京(TOKYO)</span>日本</a><a class="a1"><span data-port="新加坡">新加坡(SINGAPORE)</span>新加坡</a><a class="a1"><span data-port="汉堡">汉堡(HAMBURG)</span>德国</a><a class="a1"><span data-port="卡拉奇">卡拉奇(KARACHI)</span>巴基斯坦</a><a class="a1"><span data-port="那瓦什瓦">那瓦什瓦(NHAVA SHEVA)</span>印度</a></div>';

//起始港口 下拉提示
$('#startPort').bind('focus',function(element){
  $(this).poshytip('destoryDop');
  setMsgPosition(this,buildHTML(startPortHTML),'rightBottom','tip-yellow',true);
});

//目的港口 下拉提示
$('#endPort').bind('focus',function(element){
  $(this).poshytip('destoryDop');
  setMsgPosition(this,buildHTML(endPortHTML),'rightBottom','tip-yellow',true);
});

//隐藏下拉提示
$('#startPort,#endPort').bind('blur',function(){
  if($(this).attr('locked')=='true')return;
  $(this).poshytip('destoryDop');
});

//将后端返回数据拼接成HTML
function buildHTML(data){
  var retHTML ='<div class="port_msg" id="port_message">默认列表</div>'+ data;
  return retHTML;
}

//检查起始港口 目的港口非空
function checkShippingInfo (callback){
  $('#getShippingInfo').bind('click',function(){
    var $startPort = $('#startPort');
    var $endPort = $('#endPort');
    if($startPort.val().length ==0){
      $startPort.poshytip('destoryDop');
      setMsgPosition('#'+$startPort.attr('id'),'起始港不能为空！','');
      $startPort.trigger('focus')
      return false;
    }
    if($endPort.val().length ==0){
      $endPort.poshytip('destoryDop');
      setMsgPosition('#'+$endPort.attr('id'),'目的港不能为空！','');
      $endPort.trigger('focus')
      return false;
    }

    callback();

  });

}

//点击确定 起始港口 目的港口非空 则执行回调
function searchShippingInfo(callback){
  checkShippingInfo(callback);
}
//测试
searchShippingInfo(function(){alert('成功！将获取最近的一天海运费信息。')});

//异步获取港口名称列表
function getPortsListAjax(baseURL,params){
  var params = baseURL
  var baseURL = params;
   $.ajax({
      type: 'post',
      url: baseURL+'?'+params,
      data: '' ,
      dataType: 'json',
      success: function(data){
        var postsHTML = buildHTML(data);
        $(this).poshytip('showPostList',postsHTML);
      },
      error : function() {
        console.log('---获取港口名称列表异常---');
      }
    });
}

//获取最近的一天海运费信息
$('#startPort,#endPort').bind('keyup keydown paste focus change',function(){
   $(this).poshytip('searchKeyWord');
   //$(this).poshytip('showPostList',endPortHTML);

  // getPortsListAjax();
});

/////////////////////////////// 表单验证部分 ///////////////////////////////////

  // form
  var form = $("#pricingModifyForm");

  //错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>'
  };

  /** 表单验证 */
  var validator;
  function validate() {

      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
            //表单验证成功后执行
            window.location = "/html/easyPricing/singleProduct/complete.html";
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

              return true;
          },
          success:function(element){
              $(element).poshytip('destroy');
          }
          ,
           rules: {
              USARate: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              educationalTariff: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              RefundRate: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              profitRate: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              domesticProfit: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              startPort: {
                  maxlength:20
              },
              twentyCounterPerPrice: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              endPort: {
                  maxlength:20
              },
              fortyCounterPerPrice: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              exportTariff: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              exportCountry: {
                  maxlength:20
              },
              premiumRate: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              CustomsClearanceFee: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              creditRisk: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              interest: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              commision: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              exportProfitRate: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              fabricWidth: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              fabricPrice: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              yuanPerM: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              yuanPerNum: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              useEndNum: {
                  number:true,
                  required: true,
                  maxlength:8,
                  gt:0
              },
              factoryOffer: {
                  number:true,
                  maxlength:8,
                  gt:0
              }

          },
          messages: {
              USARate: {
                  number:'请输入数字！',
                  required: '美元汇率不能为空！',
                  maxlength:'输入数值过长！'
              },
              educationalTariff: {
                  number:'请输入数字！',
                  required: '增值税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              RefundRate: {
                  number:'请输入数字！',
                  required: '退税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              profitRate: {
                  number:'请输入数字！',
                  required: '利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              domesticProfit: {
                  number:'请输入数字！',
                  required: '内销利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              startPort: {
                  maxlength:'输入字符过长！'
              },
              twentyCounterPerPrice: {
                  number:'请输入数字！',
                  required: '20柜单价不能为空！',
                  maxlength:'输入数值过长！'
              },
              endPort: {
                  maxlength:'输入字符过长！'
              },
              fortyCounterPerPrice: {
                  number:'请输入数字！',
                  required: '40柜单价不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportTariff: {
                  number:'请输入数字！',
                  required: '出口税率不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportCountry: {
                  maxlength:'输入字符过长！'
              },
              premiumRate: {
                  number:'请输入数字！',
                  required: '保险费率不能为空！',
                  maxlength:'输入数值过长！'
              },
              CustomsClearanceFee: {
                  number:'请输入数字！',
                  required: '清关费用不能为空！',
                  maxlength:'输入数值过长！'
              },
              creditRisk: {
                  number:'请输入数字！',
                  required: '信用风险不能为空！',
                  maxlength:'输入数值过长！'
              },
              interest: {
                  number:'请输入数字！',
                  required: '利息不能为空！',
                  maxlength:'输入数值过长！'
              },
              commision: {
                  number:'请输入数字！',
                  required: '佣金不能为空！',
                  maxlength:'输入数值过长！'
              },
              exportProfitRate: {
                  number:'请输入数字！',
                  required: '利润率不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricWidth: {
                  number:'请输入数字！',
                  required: '面料门幅不能为空！',
                  maxlength:'输入数值过长！'
              },
              fabricPrice: {
                  number:'请输入数字！',
                  required: '面料价格不能为空！',
                  maxlength:'输入数值过长！'
              },
              yuanPerM: {
                  number:'请输入数字！',
                  required: '辅料单价(元/米)不能为空！',
                  maxlength:'输入数值过长！'
              },
              yuanPerNum: {
                  number:'请输入数字！',
                  required: '辅料单价(元/个)不能为空！',
                  maxlength:'输入数值过长！'
              },
              useEndNum: {
                  number:'请输入数字！',
                  required: '耗用数量不能为空！',
                  maxlength:'输入数值过长！'
              },
              factoryOffer: {
                  number:'请输入数字！',
                  maxlength:'输入数值过长！'
              }
          }

      });
  }

   //
  function init() {
    validate();
  }

  $('#btnStartPrice').on('click', function() {
        form.submit();

  });

////////////////////////选择工厂报价核价 显示与隐藏///////////////////////////////////
function radioSelectPriceType(){
  $('#easySoftHomePrice_rad').bind('click',function(){
    $('#factoryOffer-box').hide();
  });
  $('#factoryPrice_rad').bind('click',function(){
    $('#factoryOffer-box').show();
  });
}

$(document).ready(function(){
  init();
  //核价方式：选择易家纺工缴库核价
  radioSelectPriceType();

});







});