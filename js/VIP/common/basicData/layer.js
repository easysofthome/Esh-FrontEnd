define(function (require, exports, module) {
  require('jquery');
  var href = $('.btn_modify').attr('href');

  // var htmlText = '<div class="modifybox clearfix"> <p class="tit clearfix"><span class="lf">企业类型</span><i class="rg"></i></p> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="1"/> <span class="lf">纺纱厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="2"/> <span class="lf">织布厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="3"/> <span class="lf">印花厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="4"/> <span class="lf">纱线染厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="5"/> <span class="lf">面料染厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="6"/> <span class="lf">绣花厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="7"/> <span class="lf">辅料厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="8"/> <span class="lf">成品厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="9"/> <span class="lf">后处理厂</span> </label> <label class="lf modify clearfix"> <input type="checkbox" class="lf int" name="facType" value="10"/> <span class="lf">包装材料厂</span> </label> </div>';
  $('.btn_modify').on('click', function() {
    var layer1 = $.layer({
      type: 2,
      title: false,
      area: ['1000px', '200px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 200)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      // page: {
      //   html: htmlText
      // },
      iframe: {src: href},
      success: function () {
        // var value1 = $('.facType').val();
        // var Temp = value1.split(',');
        // if(Temp != ''){
        //   $.each(Temp, function(index, val) {
        //     $('.modify>input').eq(val-1).attr('checked','checked');
        //   });
        // }

        // $('.modifybox .tit i').on('click',function () {
        //   var value = '';
        //   $('.modify>input').each(function(index, el) {
        //     if($(el).attr('checked')){
        //       value = value + $(el).val()+',';
        //     }
        //   });
        //   value = value.substring(0,value.length-1);
        //   $('.facType').val(value);
        //   layer.close(layer1);
        // });
      }

    });
  });

});