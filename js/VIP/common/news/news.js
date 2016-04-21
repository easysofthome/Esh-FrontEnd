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
        $(this).html('<span class="lf">展开</span><i class="rg zhankai"></i>');
        obj.animate({'height':'120px'},0,function () {
          head.setHeight(screenH);
        });
        obj.attr('show','false');
      }else if( h > 120){
        $(this).html('<span class="lf">收起</span><i class="rg shouqi"></i>');
        obj.animate({'height':h},0,function () {
          head.setHeight(screenH);
        });
        obj.attr('show','true');
      }
  });
});