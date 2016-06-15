define(function (require, exports, module) {

  require('jquery');
  require('animateColor');

  $('.case_list li').on('mouseover',
    function (event) {
      var a = this;
      $(this).find('.case_wrapper')
        .css('z-index','10')
        .css('box-shadow','0px 0px 19px 3px #ddd')
        .css('height','auto');
      $(this).find('.btnbox').css('display','block');
    }
  );
  $('.case_list li').on('mouseout',function (event) {
    $(this).find('.case_wrapper')
      .css('z-index','1')
      .css('box-shadow','none')
      .css('height', 398);
    $(this).find('.btnbox').css('display', 'none');
    }
  );

  $('.switch,.switchno').on('click', function() {
    var obj = $(this).find('span');
    var mL = parseInt(obj.css('marginLeft'));
    if(mL == -33){
      obj.animate({'marginLeft':'0'},300);
      $(this).animate({'backgroundColor': '#3CA1D7'},300);
    }
    if(mL == 0){
      obj.animate({'marginLeft':'-33px'},300);
      $(this).animate({'backgroundColor': '#AFAFAF'},300);
    }
  });

});