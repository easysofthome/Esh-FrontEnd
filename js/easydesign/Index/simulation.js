define(function (require, exports, module) {

  require('switchable');
  var Accordion = $('.sim_img_box ul');

  Accordion.switchable({
    triggers: Accordion.find('b'),
    triggerType: 'mouse',
    effect: 'horizAccordion',
    easing: 'cubic-bezier(.1, .5, .1, 1)',
    customProps: {
      width: '200px'
    },
    autoplay: true,
    beforeSwitch: function(event, toIndex) {


      if(this.index !== toIndex){
        var _this = this;
        $(_this).find('.sim_cover').eq(toIndex).css('left','50%').css('width','0').css('marginLeft','0');
        // 设置定时器来保持同步
        setTimeout(function () {
          $(_this).find('.sim_cover').eq(toIndex).animate({
          width:'300px',
          height:'150px',
          top:'50%',
          left:'50%',
          marginTop:'-75px',
          marginLeft:'-150px'
        },500);
        }, 0);

        $(this).find('.sim_cover').eq(this.index).animate({
          width:'200px',
          height:'100%',
          top: 0,
          left: 0,
          marginTop: 0,
          marginLeft: 0
        },500);
      }

      // if beforeSwitch() returns 'false', the switch event stops
      return this.index !== toIndex;
    }
  });

});