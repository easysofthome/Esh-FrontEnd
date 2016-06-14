define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/tip/jquery.poshytip');
  require('js/lib/validation/validation');

  // 删除按钮
  var numArray = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十'};
  $('.resultbox').on('click', 'a', function(event) {

    var index = $(this).parent().index();
    $('tr.tit td').eq(index).remove();
    $('tr:eq(1) td').eq(index).remove();

    for (var i = 0 ;i < $('tr.tit td').length - 4; i++) {
      $('tr.tit td').eq(i+4).html('第'+ numArray[i+2] +'尺码 <a href="javascript:;">[删除]</a>');
    };
  });



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
      showTip(obj,msg,"inner-left","top",0,10);
  }
}

////////////////////////////弹出层///////////////////////////////////

      //更改单品款式
      $("#modifySingleStyle").attr('href', 'javascript:void(0)');
      $("#modifySingleStyle").bind("click",function(){
        $.layer({
          type:2,
          title: false,
          area: ['1000px', '680px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 650)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: '/html/easyPricing/pricing/similarSingle.html'},

          success: function (layero, index) {


          }
        });


      });


/////////////////////////////// 表单验证部分 ///////////////////////////////////


  // form
  var form = $("#combinationForm");

  $('#btnNext').on('click', function() {

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

      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
              //提交表单
            // formSubmit(form);
              //阻止表单提交

             window.location = "/html/easyPricing/combination/modify.html";
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
              proNum: {
                  number:true,
                  required: true,
                  maxlength:8
              }

          },
          messages: {
              proNum: {
                  number:'请输入数字！',
                  required: '数量不能为空！',
                  maxlength:'输入数值过长！'
              }
          }
      });
  }


init();



});