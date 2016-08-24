define(function (require, exports, module) {
  require('jquery');
  require('FancyRadioCheckBox');
  require('js/front/easyPricing/common/form');



  var index = parent.layer.getFrameIndex(window.name);
  $('.close,.btn_close').click(function(){
    parent.layer.close(index);
  });

});