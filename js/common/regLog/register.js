define(function (require, exports, module) {
  require('jquery');

  var placehold = require('js/common/module/placehold');
  placehold.init('.username_box>input,.password_box>input,.passwordRe_box>input');

  require('js/common/regLog/capslock');
  require('js/common/regLog/validate');
  require('js/common/regLog/protocol');

});