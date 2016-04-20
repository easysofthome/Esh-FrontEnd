define(function (require, exports, module) {

  require('jquery');
  // 调节屏幕高度
  var head = require('js/VIP/common/head');

  var h,obj;
  var screenH = $(window).height();
  $('li.width-rg').on('click', '.Packup', function() {

    obj = $(this).parents('.width-rg');
    h = obj.find('.xiaoxi_main').height();


      if(obj.attr('show')=='true'){
        $(this).find('span').html('展开');
        obj.animate({'height':'120px'},0,function () {
          head.setHeight(screenH);
        });
        obj.attr('show','false');
      }else if( h > 120){
        $(this).find('span').html('收起');
        obj.animate({'height':h},0,function () {
          head.setHeight(screenH);
        });
        obj.attr('show','true');
      }
  });
});