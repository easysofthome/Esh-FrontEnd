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
      autoplay: 'true',
      loop: true,
      prev: '#prev',
      next: $('#next'),
      triggers: $('.switchable-triggers > li'),
      onSwitch: function(event, currentIndex) {
        var api = this;
        api.prevBtn.toggleClass('disabled', currentIndex === 0);
        api.nextBtn.toggleClass('disabled', currentIndex === api.length - 1);
      }
    });
  });
});