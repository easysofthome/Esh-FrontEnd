define(function ( require, exports, module) {
var littleLoading = function(option){
  var defOpt = {
    'select':'#pLittleLoading',
    'loadCss':{
      'font-size':'13px',
      'border': '1px solid #e1e1e1',
      'text-align': 'center',
      'padding': '30px 0',
      'margin-top': '80px',
      'background': '#fff'
    },
    'loadImgUrl':'/images/production/common/refresh.gif'
  }
  this.opts = $.extend(defOpt,option);
  this.$baseDIV = $(this.opts.select);
}
//原型链方法
littleLoading.prototype = {
  show : function(){
    var that = this;
    littleLoading._private._processHTML(that);
  },
  destroy : function(){
    var that = this;
    littleLoading._private._emptyHTML(that);
  },
  trim : function(str){ //删除左右两端的空格
　  return str.replace(/(^\s*)|(\s*$)/g, "");
　}
}
//私有方法
littleLoading._private = {
  _processHTML : function(that){
    if(that.trim(that.$baseDIV.html()).length > 0){
      _emptyHTML(that);
    }
    var $mainDIV = $('<div></div>');
    that.$baseDIV.append($mainDIV);
    $mainDIV.css(that.opts.loadCss);
    var $img = $('<img />');
    $img.attr('src',that.opts.loadImgUrl).css({'margin':'auto'});
    $mainDIV.append($img).append("<br/>加载中......");
  },
  _emptyHTML : function(that){
      that.$baseDIV.empty();
  }
}
//初始化接口
var init = function(option){
  return new littleLoading(option);
}
module.exports.init = init;

});