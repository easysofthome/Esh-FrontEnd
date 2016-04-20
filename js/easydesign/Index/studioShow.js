define(function (require, exports, module) {
  require('jquery');
  require('animateNumber');

  $('.studio_box').switchable({
     triggers: false,
     panels: 'li',
     easing: 'ease-in-out',

     effect: 'scrollLeft',
     steps: 4,
     visible: 4, // important
     end2end: true,

     autoplay: true,
     prev: '#prev',
     next: $('#next'),
     onSwitch: function(event, currentIndex) {
       var api = this;
       api.prevBtn.toggleClass('disabled', currentIndex === 0);
       api.nextBtn.toggleClass('disabled', currentIndex === api.length - 1);
     }
   });
  // 轮播左右按钮
  $('.studip_conleft').hover(function() {
    $('#prev,#next').show();
  }, function() {
    $('#prev,#next').hide();
  });

  // 数字滚动
  var flag = false;
  var studioNumber;
  module.exports.studioNumScroll = function (element) {
    if(!flag){
      studioNumber = parseInt(element.html());
      element.html(0);
      element.stop().animateNumber({ number: studioNumber },1500);
      flag = true;
    }
  }


});
