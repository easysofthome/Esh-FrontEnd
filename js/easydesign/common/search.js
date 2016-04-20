define(function (require, exports, module) {

  require('jquery');

  $('.shitu').on('click', function() {
    $('.bg022-box').show();
  });
  $('.bg022-x').on('click', function() {
    $('.bg022-box').hide();
  });

});