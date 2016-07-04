define(function (require, exports, module) {
  require('jquery');
  require('layer');

  require('js/front/lib/validation/validation');
  require('js/front/lib/tip/jquery.poshytip');
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


    $('.modifybox').find('.information').eq($(this).index()).slideToggle(function(){
      $(this).find('input').each(function(){
        $(this).poshytip('destroy');
      });
    });
  });

  //点击收缩
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
        $(this).find('input').each(function(){
          $(this).poshytip('destroy');
        });
        $(that).text('[点击展开]');
      }else{
         $(that).text('[点击收缩]');
      }

    });
  });



});