define(function (require, exports, module) {

  require('jquery');
  require('switchable');

  $(function() {
    $('.banner-wrapper').switchable({
      triggers: '&bull;',
      putTriggers: 'insertAfter',
      effect: 'fade',
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
  });
});