define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/tip/jquery.poshytip');

  ////////////////////////////弹出层///////////////////////////////////
      //查看信息
      var tempURL = '';
      $("#styleInfo a").hover(function(){
          tempURL = $(this).attr('href');
          $(this).attr('href', 'javascript:void(0)');
      },function(){
         $(this).attr('href',tempURL);
      });

      $("#styleInfo a").bind("click",function(){
        var href = tempURL;

        $.layer({
          type:2,
          title: false,
          area: ['1000px', '206px'],
          border: [5, 0.3, '#000'],
          shade: [0.8, '#000'],
          shadeClose: true,
          offset: [($(window).height() - 206)/2+'px',''],
          closeBtn: [0, false], //去掉默认关闭按钮
          shift: 'top',
          fix : false,
          iframe: {src: href},
          success: function (layero, index) {


          }
        });
      });

});