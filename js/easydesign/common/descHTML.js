define(function (require, exports, module) {
  require('jquery');
  //var flowersDic = {'NAME':'花型名称','PROPERTY_COLOR_NAME':'色数分类','PROPERTY_TYPE_NAME':'花型属性'};
  //生成描述信息 dataJson:数据源
  function buildDescHTML(dataJson,type){
    var data = dataJson;
    var $rightPart = $('#scrollbar').find('.right-top');
    $rightPart.html('');
    $('#scrollbar').find('.scrollbar').html(data.CREATE_USER);
    var retHTML = '';
    switch(type){
      case 'flower':
        retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                  '<div class="desc clearfix"><span class="lf">[色数分类]</span><p class="lf tit-width">'+data.PROPERTY_COLOR_NAME+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">[花型属性]</span><p class="lf tit-width">'+data.PROPERTY_TYPE_NAME+'</p></div>';
        break;
      case 'fabric':
        retHTML = '<h3>[面料名称]'+data.NAME+'</h3>'+
                  '<div class="desc clearfix"><span class="lf">分类名称：</span><p class="lf tit-width">'+data.PROPERTY_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">参考价格：</span><p class="lf tit-width">[门幅150cm]'+data.PRICE_150+'<br/>[门幅280cm]'+data.PRICE_280+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">面料克重：</span><p class="lf tit-width">'+data.FABRIC_WEIGHT_PER+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">面料成分：</span><p class="lf tit-width">'+data.FABRIC_ELEMENT_CONTAINS+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">织造种类：</span><p class="lf tit-width">'+data.WEAVING_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">染织方法：</span><p class="lf tit-width">'+data.DYEING_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">纱线构成：</span><p class="lf tit-width">'+data.CHAINE_DENSITY+'经'+data.FILLING_DENSITY+'纬</p></div>'+
                  '<div class="desc clearfix"><span class="lf">经纱：</span><p class="lf tit-width">'+  ''  +'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">纬纱：</span><p class="lf tit-width">'+  ''  +'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">花回尺寸：</span><p class="lf tit-width">'+data.CHAINE_FLOWER_SIZE+' x '+data.FILLING_FLOWER_SIZE+'</p></div>';
        break;
      case 'quality':
        retHTML = '<h3>[品质样名称]'+data.NAME+'</h3>'+
                  '<div class="desc clearfix"><span class="lf">分类名称：</span><p class="lf tit-width">'+data.PROPERTY_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">参考价格：</span><p class="lf tit-width">[门幅150cm]'+data.PRICE_150+'<br/>[门幅280cm]'+data.PRICE_280+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">面料克重：</span><p class="lf tit-width">'+data.FABRIC_WEIGHT_PER+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">面料成分：</span><p class="lf tit-width">'+data.FABRIC_ELEMENT_CONTAINS+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">织造种类：</span><p class="lf tit-width">'+data.WEAVING_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">染织方法：</span><p class="lf tit-width">'+data.DYEING_TYPE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">纱线构成：</span><p class="lf tit-width">'+data.CHAINE_DENSITY+'经'+data.FILLING_DENSITY+'纬</p></div>'+
                  '<div class="desc clearfix"><span class="lf">经纱：</span><p class="lf tit-width">'+  ''  +'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">纬纱：</span><p class="lf tit-width">'+  ''  +'</p></div>';
                  // '<div class="desc clearfix"><span class="lf">关键字：</span><p class="lf tit-width">'+'  '+'</p></div>';
        break;
      case 'scene':
       retHTML = '<h3>'+data.CODE+'</h3>'+
                  '<div class="desc clearfix"><span class="lf">场景类型：</span><p class="lf tit-width">'+data.PROPERTY_TYPE_CODE+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">场景名称：</span><p class="lf tit-width">'+data.NAME+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">场景描述：</span><p class="lf tit-width">'+data.REMARK+'</p></div>';
                  // '<div class="desc clearfix"><span class="lf">关键字：</span><p class="lf tit-width">'+data.FABRIC_WEIGHT_PER+'</p></div>';
        break;
      case 'model':
       retHTML = '<h3>[模型编号]'+data.CODE+'</h3>'+
                  '<div class="desc clearfix"><span class="lf">模型名称：</span><p class="lf tit-width">'+data.NAME+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">模型分类：</span><p class="lf tit-width">'+data.STYLE_ID+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">模型长度：</span><p class="lf tit-width">'+data.LENGHT+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">模型宽度：</span><p class="lf tit-width">'+data.WIDTH+'</p></div>'+
                  '<div class="desc clearfix"><span class="lf">模型高度：</span><p class="lf tit-width">'+data.HEIGHT+'</p></div>';
        break;
      case 'uidesign':
       retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                  '<h3>[色数分类]'+data.PROPERTY_COLOR_NAME+'</h3>'+
                  '<h3>[花型属性]'+data.PROPERTY_TYPE_NAME+'</h3>';
        break;

    }
    $rightPart.append(retHTML);
    return $rightPart;
  }
  exports.buildDescHTML = buildDescHTML;
});