define(function (require, exports, module) {
  exports.overwrite;
  require('jquery');
  //选择产品
  $('#sel-pro').hover(function() {
    $('.sel-pro').show();
  }, function() {
    $('.sel-pro').hide();
  });

  $('#sel-pro').on('mouseover', '.level1>li', function(event) {
    $(this).parent().find('.cur').removeClass('cur');
    $(this).addClass('cur');
    $('.level2 ul').hide();
    $('.level2 ul').eq($(this).index()).show();
  });

  var offsetL;
  $('#sel-pro').on('mouseover', '.level2 ul>li', function(event) {
    offsetL = $(this).offset().left-$('.level2').offset().left;
    // 判断元素的位置在左半边还是右半边
    if(offsetL > 578 - offsetL){
      $(this).find('.level3').css('left','unset').css('right',0);
      $(this).find('.level3').css('width',offsetL + $(this).width()-1);
    }else{
      $(this).find('.level3').css('width',576 - offsetL);
    }

    $(this).find('.level3-tit').css('z-index','3');
    $(this).find('.level3').show();
  });

  $('#sel-pro').on('mouseout', '.level2 ul>li', function(event) {
    $(this).find('.level3').hide();
    $(this).find('.level3-tit').css('z-index','1');
  });

  $('#sel-pro').on('click', '.level2 ul>li .final', function(event) {
    $('#sel-pro input').val($(this).html());
  });
  if(exports.overwrite)
    exports.overwrite();
});
