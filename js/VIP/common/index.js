define(function (require, exports, module) {

  require('jquery');
  require('switchable');

  var screenH = $(window).height();

  $(document).ready(function () {
    setHeight(screenH);
  });

  $(window).resize(function () {
    setHeight(screenH);
  });
  // 设置主体区域高度
  function setHeight (screenH) {
    $('.indexbox ').height('auto');
    var h1 = $('.indexbox ').height();
    var h2 = parseInt($('.indexbox ').css('padding-top'));
    var h3 = parseInt($('.indexbox ').css('padding-bottom'));

    var mainH = screenH - 182 - 133 -32;
    if(mainH > (h1+h2+h3)){
     $('.indexbox').height(mainH-h2-h3);
    }else{
      $('.indexbox').height('auto');
    }
  }

  var Accordion = $('.indexL_bot ul');
  Accordion.switchable({
    triggers: Accordion.find('b'),
    triggerType: 'mouse',
    effect: 'horizAccordion',
    easing: 'cubic-bezier(.1, .5, .1, 1)',
    customProps: {
      width: '75px'
    },
    autoplay: false,
    beforeSwitch: function(event, toIndex) {


      if(this.index !== toIndex){
        var _this = this;
        $('.indexL_bot li').eq(toIndex).addClass('safty_cur');
        $('.indexL_bot li').eq(this.index).removeClass('safty_cur');
        $(_this).find('.operation').eq(toIndex).css('opacity',0);
        // 设置定时器来保持同步
        setTimeout(function () {
          $(_this).find('.operation').eq(toIndex).animate({
          opacity: 1
        },100);
        }, 500);
      }

      // if beforeSwitch() returns 'false', the switch event stops
      return this.index !== toIndex;
    }
  });

});