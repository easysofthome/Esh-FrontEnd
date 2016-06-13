define(function (require, exports, module) {

  require('jquery');

  require('switchable');

  $(function() {
    $('.banner-box').switchable({
      triggers: '&bull;',
      putTriggers: 'insertAfter',
      effect: 'scrollLeft',
      /* fade effect only supports steps == 1 */
      // steps: 1,
      easing: 'ease-in-out',
      loop: false,
      prev: '#prev',
      next: $('#next'),
      triggers: $('.switchable-triggers > li'),
      onSwitch: function(event, currentIndex) {
        var api = this;
        api.prevBtn.toggleClass('disabled', currentIndex === 0);
        api.nextBtn.toggleClass('disabled', currentIndex === api.length - 1);
      }

    });
     var w = $(window).width();
    $('.banner-li').css("width",w);
    $('.banner-wrapper').css("height",w/3.84);
  });

  //媒体图片鼠标划过特效
  $(".video_icobutt_def").append('<span class="video_icobutt_def2"></span>');
  $(".video_icobutt_def2").css('opacity', 0);
  $(".video_icobutt_def").hover(function(){
  $(".video_icobutt_def2").stop().animate({opacity: '1'},600);

  },
  function(){
  $(".video_icobutt_def2").stop().animate({opacity: '0'},600);
  });

});