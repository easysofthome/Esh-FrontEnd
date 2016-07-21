define(function(require, exports, module) {
    require('jquery');

    //关闭弹出层
    var index = parent.layer.getFrameIndex(window.name);
    $('.close,.btn_close').click(function(){
      parent.layer.close(index);
    });

    $('.accessories_box').find('.access_butt').bind('click',function(){
      parent.layer.close(index);
    });

});