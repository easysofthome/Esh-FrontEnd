define(function (require, exports, module) {
  require('jquery');
  require('customSelect');

////////////////////////////关闭layer///////////////////////////////////
  var index = parent.layer.getFrameIndex(window.name);
  $('.close,.btn_close,.btn_gray.lf').click(function(){
    parent.layer.close(index);
  });

////////////////////////////表单样式///////////////////////////////////
    $('#sel1').customSelect({width:"150px",padding:"12px 5px"});
    $('#sel2,#sel3,#sel4').customSelect({width:"90px",padding:"12px 5px"});

});