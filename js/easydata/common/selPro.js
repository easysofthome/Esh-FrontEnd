define(function (require, exports, module) {
  require('jquery');

  //选择产品
  $('#sel-pro').hover(function() {
    $('.sel-pro').show();
  }, function() {
    $('.sel-pro').hide();
  });
  $('.level1>li').hover(function() {
    $(this).parent().find('.cur').removeClass('cur');
    $(this).addClass('cur');
    $('.level2 ul').hide();
    $('.level2 ul').eq($(this).index()).show();
  }, function() {

  });

  $('.level2 ul>li').hover(function() {
    $(this).find('.level3-tit').css('z-index','3');
    $(this).find('.level3').show();
  }, function() {
    $(this).find('.level3').hide();
    $(this).find('.level3-tit').css('z-index','1');
  });

  $('.level2 ul>li .final').on('click', function(event) {
    $('#sel-pro input').val($(this).html());
  });
})
