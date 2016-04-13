define(function (require, exports, module) {

  require('jquery');
  require('switchable');
  module.exports.init = function () {
    $('.rank-cont').switchable({
      triggers: ' ',
      putTriggers: 'insertAfter',
      panels: 'li',
      effect: 'scrollLeft',
      autoplay: true
    });
  }
});