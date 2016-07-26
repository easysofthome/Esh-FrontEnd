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
        retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                    '<h3>[色数分类]'+data.PROPERTY_COLOR_NAME+'</h3>'+
                  '<h3>[花型属性]'+data.PROPERTY_TYPE_NAME+'</h3>';
        break;
      case 'quality':
        retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                  '<h3>[色数分类]'+data.PROPERTY_COLOR_NAME+'</h3>'+
                  '<h3>[花型属性]'+data.PROPERTY_TYPE_NAME+'</h3>';
        break;
      case 'scene':
       retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                  '<h3>[色数分类]'+data.PROPERTY_COLOR_NAME+'</h3>'+
                  '<h3>[花型属性]'+data.PROPERTY_TYPE_NAME+'</h3>';
        break;
      case 'model':
       retHTML = '<h3>[花型名称]'+data.NAME+'</h3>'+
                  '<h3>[色数分类]'+data.PROPERTY_COLOR_NAME+'</h3>'+
                  '<h3>[花型属性]'+data.PROPERTY_TYPE_NAME+'</h3>';
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