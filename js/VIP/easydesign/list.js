define(function (require, exports, module) {

  require('jquery');

  $('.case_list li').hover(
    function (event) {
      var a = this;
      $(this).find('.case_wrapper')
        .css('z-index','10')
        .css('box-shadow','0px 0px 19px 3px #ddd')
        .css('height','auto');
      $(this).find('.btnbox').css('display','block').css('opacity', '1');
    },function (event) {
      $(this).find('.case_wrapper')
        .css('z-index','1')
        .css('box-shadow','none')
        .css('height', 398);
      $(this).find('.btnbox').css('opacity', '0');
    }
  );

});