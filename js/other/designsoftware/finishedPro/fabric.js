define(function (require, module, exports) {
  require('jquery');

  var h;
  $('.shrink_box').on('click', function() {

    if($(this).find('span:eq(1)').html() == '收起选项'){
      // h = parseInt($('.classification-box').css('height'));
      // $('.classification-box').animate({height: 40}, 200);
      // $('.Unfolded-top').animate({marginTop: 20}, 200);
      $('.classification-box').slideUp('300');
      $('.Unfolded-top').animate({'padding-top':'90px'});
      $(this).find('span:eq(1)').html('展开选项');
    }else{
      // $('.classification-box').css('height', 'AUTO');
      // $('.Unfolded-top').css('marginTop',(h-14));
      $('.classification-box').slideDown('300');
      $('.Unfolded-top').animate({'padding-top':'285px'});
      $(this).find('span:eq(1)').html('收起选项');
    }
  });

  $('.class-box:eq(4) .class-li:eq(0)').on('click', function() {
    $('.class-box:last').hide();
  });
  $('.class-box:eq(4) .class-li:gt(0)').on('click', function() {
    $('.class-box:last').show();
  });



});