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

    var mainH = screenH - 195 - 133;
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
    autoplay: true,
    beforeSwitch: function(event, toIndex) {


      // if(this.index !== toIndex){
      //   var _this = this;
      //   $(_this).find('.sim_cover').eq(toIndex).css('left','50%').css('width','0').css('marginLeft','0');
      //   // 设置定时器来保持同步
      //   setTimeout(function () {
      //     $(_this).find('.sim_cover').eq(toIndex).animate({
      //     width:'300px',
      //     height:'150px',
      //     top:'50%',
      //     left:'50%',
      //     marginTop:'-75px',
      //     marginLeft:'-150px'
      //   },500);
      //   }, 0);

      //   $(this).find('.sim_cover').eq(this.index).animate({
      //     width:'200px',
      //     height:'100%',
      //     top: 0,
      //     left: 0,
      //     marginTop: 0,
      //     marginLeft: 0
      //   },500);
      // }

      // if beforeSwitch() returns 'false', the switch event stops
      return this.index !== toIndex;
    }
  });

});