define(function (require, exports, module) {
  require('jquery');
  require('js/front/easyPricing/common/alertLayer');
  var tool = require('tools');
  exports.nextFunction;
  $('.array').hover(
    function (event) {
      $(this).find('.array-wrapper').css('z-index','10').css('height','auto').css('box-shadow','0px 0px 19px 3px #ddd');
      $(this).find('.dropbox').css('opacity','1');
      $(this).find('a.btn').css('opacity','1');
    },function (event) {
      $(this).find('.array-wrapper').css('z-index','1').css('height','307').css('box-shadow','none');
      $(this).find('.dropbox').css('opacity','0');
      $(this).find('a.btn').css('opacity','0');
    }
  );
/////////////////////////////// 筛选菜单收缩 ///////////////////////////////////
  //筛选条件 展开收缩
  $('#sunblindFillter').bind('click',function(){
      if ($(this).attr('show') == 'true') {
        $('#sunblindMenus').slideUp();
        $(this).attr('show', 'false');
      } else {
        $('#sunblindMenus').slideDown();
        $(this).attr('show', 'true');
      }
  });
  // 筛选条件 过滤
  $('body').on('click', '.Switch_button a', function () {
    $(this).parent().find('a').toggleClass('button_cur');
    var index = $(this).index(),
      obj = $(this).parents('.dropbox');
      obj.find('.js-filter').hide();
      obj.find('.js-filter').eq(index).show();
  })

/////////////////////////////// 表单验证部分 ///////////////////////////////////
var _choicePage = (function(){

//choice对象
var choiceObj = {
  $form:{}
}
choiceObj.init = function(){
  this.bindEvent();
}
//下一步
choiceObj.nextStep = function(that){
  var c = $(that).parent().find('.js-filter');
  var msg = '';
  var valid = false;
  if(!$(c[0]).is(':hidden')){
    var checkedNum = $(c[0]).find('label.c_on').length;
    valid = checkedNum>0?true:false;
    msg = '请选择尺寸！';
    this.$form = $(c[0]).parent();
  }else{
    var msg = this.checkInput($(c[1]));
    valid = msg=='ok'?true:false;
    this.$form = $(c[1]).parent();
  }
  if(!valid){
    $(that).parent().find('img').layerTip({
      showText:msg
    });
  }else{
    if(exports.nextFunction){
      exports.nextFunction(this.$form);
    }else{
      console.log('接口"nextFunction"未实现');
    }
  }
}
//绑定事件
choiceObj.bindEvent = function(){
  var that = this;
  //选择尺寸不能为空，输入尺寸不能为空、必须是数字
  $('.arraybox').find('a.btn').bind('click',function(){
      that.nextStep(this);
  });
  }
  //如果input为空或非数字返回错误信息，正确则返回’ok
  choiceObj.checkInput = function(selector){
    var msg = 'ok';
    selector.find('input').each(function(){
      var v = tool.validateHelper.trim(this.value);
      var isNum = /\d+/.test(v);
      if(v.length==0||!v||v=='undefined'){
        msg = '尺寸不能为空！';
        return false;
      }else if(!isNum){
        msg = '请输入数字！';
        return false;
      }
    });
    return msg;
  }
  //返回Form对象
  choiceObj.getForm = function(){
    var t = this.$form;
    return t;
  }
  //页面加载时初始化
  choiceObj.init();

  return {
    //返回Form对象
    getForm:choiceObj.getForm
  }
})();

//接口
module.exports.choicePage = _choicePage;
})

