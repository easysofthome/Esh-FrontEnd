define(function(require, exports, module){
  require('jquery');
  var layer = require('layer');

  $('.determine_but').on("click", function(){

    var that = this;
    var layerHref = $(this).attr('data-href');

    $.layer({
      type: 2,
      title: false,
      area: ['855px', 'auto'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 360)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: $(that).attr('data-href')},
      success: function (layer) {}
    });

  });
});