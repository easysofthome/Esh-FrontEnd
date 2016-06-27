define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/validation/validation');
  var FancyRadioCheckBox = require('FancyRadioCheckBox');
  FancyRadioCheckBox.init();


///////////////使用时间戳防止冒泡//////////////////////
  var evTimeStamp = 0;
  $('.lab').on('click', function() {
    if($(this).index()==0)return;
    var now = +new Date();
    if (now - evTimeStamp < 100) {
      return;
    }
    evTimeStamp = now;

    $('.modifybox').find('.information').eq($(this).index()).slideToggle();
  });

  $('.shrink').attr('href','javascript:void(0)');
  $('.shrink').on('click', function() {
    var now = +new Date();
    if (now - evTimeStamp < 100) {
      return;
    }
    evTimeStamp = now;
    var that = this;
    $(this).parent().next().slideToggle(function(){
      if($(this).css('display')=='none'){
        $(that).text('[点击展开]');
      }else{
         $(that).text('[点击收缩]');
      }

    });
  });



});