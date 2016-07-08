define(['jquery'],function(require, exports, module) {

  var nodataH;

  $(document).ready(function(){
    nodataH = $('.qutside_box').height();
    setNoDataH();
  });
  $(window).resize(function(){
    setNoDataH();
  });
  function setNoDataH (){

    var offsetTop = $('.qutside_box').offset().top;
    var footerH = $('.foot_box').height();
    var windowH = $(window).height();
    var height = windowH - offsetTop - footerH;
    if(height > nodataH){
      $('.qutside_box').css('height', height-2);
    } else {
      $('.qutside_box').css('height', nodataH);
    }
  }
});