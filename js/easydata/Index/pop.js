define(function (require,exports,module) {

  require('jquery');
  require('layer');

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