define(function (require, exports, module) {
  require('jquery');
  require('js/front/easyPricing/common/alertLayer');
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
$('.arraybox').find('a.btn').bind('click',function(){
  var checkedNum = $(this).parent().find('input[type="checkbox"]:checked').length;
  var checkedNone = checkedNum>0?false:true;
  if(checkedNone){
    $(this).parent().find('img').layerTip();
  }else{
    if(exports.nextFunction){
      exports.nextFunction();
    }else{
      console.log('接口"nextFunction"未实现');
    }
  }
});



});