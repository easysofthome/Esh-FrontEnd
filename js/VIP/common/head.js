define(function (require, exports, module) {
  require('jquery');


  $(document).ready(function(){
    $('.collapse_box').attr('data-state','on');
  });

  $('.collapse_box').on('click', function() {
    if($(this).attr('data-state') == 'on'){
      $('.core_box').slideUp('300');
      $(this).attr('data-state','off');
      $(this).html('展开');
    } else {
      $('.core_box').slideDown('300');
      $(this).attr('data-state','on');
      $(this).html('收起');
    }
  });

//////////////当内容比较少时设置页面全屏////////////////
  var screenH;
  $(document).ready(function () {
    screenH = $(window).height();
    setHeight(screenH);
  });

  $(window).resize(function () {
    screenH = $(window).height();
    setHeight(screenH);
  });

  function setHeight (screenH) {
    $('.main_box').height('auto');
    var h1 = $('.main_box').height();
    var h2 = parseInt($('.main_box').css('padding-bottom'));

    var mainH = screenH - 100 - 133 -32;
    if(mainH > (h1+h2)){
     $('.main_box').height(mainH-h2);
    }else{
      $('.main_box').height('auto');
    }
  }

  $('.nav-more').hover(function() {
    $(this).find('i').toggleClass('service-open');
    $(this).find('ul').slideDown(100);
  }, function() {
    $(this).find('i').toggleClass('service-open');
    $(this).find('ul').slideUp(100);
  });

  module.exports.setHeight = setHeight;
});