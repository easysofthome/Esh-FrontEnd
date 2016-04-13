define(function (require,exports,module) {

  require('jquery');
  require('layer');

  // 选择国家
  $('.module-ul li a').eq(0).on('click',function(event) {
    $.layer({
        type: 2,
        shadeClose: true,
        title: false,
        closeBtn: [0, false],
        shade: [0.5, '#000'],
        offset: [($(window).height() - 450)/2+'px',''],
        area: ['830px', '450px'],
        border: [5, 0.3, '#000'],
        iframe: {src: './country.html', scrolling: 'auto'},
        shift: "top"
    });
  });

  // 选择进出口
  $('.module-ul li a').eq(2).on('click',function (event) {
    var layer1 = $.layer({
      type: 1,
      title: false,
      area: ['486px', '174px'],
      border: [5, 0.3, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 174)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      page: {
         html: '<div class="mod-li2" id="mod-li2"> <div class="close-btn"></div> <div class="mod-li2-cont"> <div class="mod-li2-tit">了解价格行情</div> <div class="mod-li2-btngroup clearfix"> <a href="./priceDet/importDet.html" class="mod-export-btn">查看中国出口价格</a> <a href="./priceDet/exportDet.html" class="mod-import-btn">查看国外进口价格</a> </div> </div> </div>'
      },
      success: function () {
        $('#mod-li2 .close-btn').on('click',function () {
          layer.close(layer1);
        });
      }
    });
  });

  // 介绍视频
  $('.videoinfo-btn').eq(0).on('click',function () {
    $.layer({
        type: 2,
        title: false,
        area: ['910px', '700px'],
        fix: false,
        shadeClose: false,
        offset: [($(window).height() - 700)/2+'px', ''], //上下垂直居中
        border: [0],
        shade : [0.9, '#000'],
        iframe: {src: ''}
    });
  });

  // 演示视频
  $('.videoinfo-btn').eq(1).on('click',function () {
    $.layer({
        type: 2,
        title: false,
        area: ['910px', '700px'],
        fix: false,
        shadeClose: false,
        offset: [($(window).height() - 700)/2+'px', ''], //上下垂直居中
        border: [0],
        shade : [0.9, '#000'],
        iframe: {src: ''}
    });
  });

});