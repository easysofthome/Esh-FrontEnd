define(function (require, exports, module) {
  require('jquery');

  $('.exo_conbox li').hover(function() {
    $('.selectbox .search')
    $(this).find('.search,.select_text').css('display','block').animate({'opacity': '1'},300);
    $(this).find('.top-line,.bottom-line').animate({'height':'5px'},300);
    $(this).find('.right-line,.left-line').animate({'width':'5px'},300);
    $(this).find('.selectbox').animate({'opacity':'0.6'},300);
  }, function() {
    $(this).find('.search,.select_text').hide().animate({'opacity': '0'},300);
    $(this).find('.top-line,.bottom-line').animate({'height':'0'},300);
    $(this).find('.right-line,.left-line').animate({'width':'0'},300);
    $(this).find('.selectbox').animate({'opacity':'0'},300);
  });

  // $('.exo_conbox').on('mouseover', 'li', function(event) {
  //   $('.selectbox .search')
  //   $(this).find('.search,.select_text').css('display','block').animate({'opacity': '1'},300);
  //   $(this).find('.top-line,.bottom-line').animate({'height':'5px'},300);
  //   $(this).find('.right-line,.left-line').animate({'width':'5px'},300);
  //   $(this).find('.selectbox').animate({'opacity':'0.6'},300);
  // });
  // $('.exo_conbox').on('mouseout', 'li', function(event) {
  //   $(this).find('.search,.select_text').hide().animate({'opacity': '0'},300);
  //   $(this).find('.top-line,.bottom-line').animate({'height':'0'},300);
  //   $(this).find('.right-line,.left-line').animate({'width':'0'},300);
  //   $(this).find('.selectbox').animate({'opacity':'0'},300);
  // });

});