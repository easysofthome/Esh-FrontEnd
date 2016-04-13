define(function (require, exports, module) {

  require('js/easydata_old/Index/pop');
  require('js/easydata_old/Index/rankCar');
  var rankCar = require('js/easydata_old/Index/rankCar');
  rankCar.init();

  var switchSel = require('js/easydata_old/switchSel');

  switchSel.set('.rank-btn','.rank-btn-tit','.rank-btn-ul','.rank-btn-li','&nbsp;&nbsp;<span></span>');

});