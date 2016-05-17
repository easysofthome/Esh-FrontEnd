define(function (require, exports, module) {

  require('jquery');
  //选择国家
  $('#sel-country').hover(function() {
    $('.sel-country').show();
  }, function() {
    $('.sel-country').hide();
  });
  $('.continent li').on('mouseover',function () {
    $(this).parent().find('.cur').removeClass('cur');
    $(this).addClass('cur');
    $('.country-ol').hide();
    $('.country-ol').eq($(this).index()).show();
  });

  $('.country-ol li').click(function(event) {
    $('#sel-country input').val($.trim($(this).html()));
    $('.sel-country').hide();
  });
});