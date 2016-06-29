define(function(require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/tip/jquery.poshytip');

  //产品辅料 查看修改
  var src = "";
  $(".productaccView,.packageView,.volumeView").hover(function(){
    src = $(this).attr("href");
    $(this).attr('href', 'javascript:void(0)');
  },function(){
    $(this).attr("href",src);
  });

  $(".productaccView").bind("click",function(){
    $.layer({
      type:2,
      title: false,
      area: ['1000px', '210px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 210)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: src},
      success: function (layero, index) {


      }
    });
  });

  //包装辅料 查看修改
  $(".packageView").bind("click",function(){
    $.layer({
      type:2,
      title: false,
      area: ['1000px', '210px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 210)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: src},
      success: function (layero, index) {


      }
    });
  });

   //体积信息 查看修改
  $(".volumeView").bind("click",function(){
    $.layer({
      type:2,
      title: false,
      area: ['1000px', '140px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 140)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: src},
      success: function (layero, index) {


      }
    });
  });

});
