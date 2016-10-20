define(function (require, exports, module) {
(function($) {

  $.AlertLayer = function(elm, options){
    this.$elm = $(elm);
    this.opts = $.extend({}, $.fn.layerTip.defaults, options);
    this.alertId = 'alertLayer';
    this.$parentWraper = this.$elm.parent();
    this.$wraper = $('<div id="'+this.alertId+'"></div>');
    this.init();
  };
  $.AlertLayer.prototype.init = function(){
    var that = this;
    //this.$elm.data('alertLayer',this);
    this.show();
    setTimeout(function(){
      that.hide();
    }, 1000);
  }
  $.AlertLayer.prototype.creatHTML = function(){
    this.$wraper.css(this.opts.css);
    this.$wraper.append('<span>'+this.opts.showText+'</span>');
  }
  $.AlertLayer.prototype.delAlert = function(){
    if(this.hasElement('#'+this.alertId)){
      $('#'+this.alertId).remove();
    }
  }
  $.AlertLayer.prototype.hide = function(){
    //$('#'+this.alertId).fadeOut();
    if(this.hasElement('#'+this.alertId)){
      this.$parentWraper.find('#'+this.alertId).fadeOut();
    }
  }
  $.AlertLayer.prototype.destroy = function(){
    if(this.hasElement('#'+this.alertId)){
      $('#'+this.alertId).remove();
    }
    this.$elm.removeData('alertLayer');
  }
  $.AlertLayer.prototype.hasElement = function(element){
    if(this.$parentWraper.find(element).length>0){
      return true;
    }else{
      return false;
    }
  }
  $.AlertLayer.prototype.show = function(){
    if(!this.hasElement('#'+this.alertId)){
      this.creatHTML();
      this.$parentWraper.append(this.$wraper);
    }else{
      this.$parentWraper.find('#'+this.alertId).html('<span>'+this.opts.showText+'</span>').show();
    }
  }

  $.fn.layerTip = function(options){
    if(typeof(options) == 'string'){
      return this.each(function(){
        var alertLayer = $(this).data('alertLayer');
        if(alertLayer&&alertLayer[options]){
          alertLayer[options]();
        }
      });
    }
    return this.each(function() {
        new $.AlertLayer(this,options);
    });
  }

  $.fn.layerTip.defaults = {
    showText:'请选择尺寸！',
    css:{'z-index': 1,
    'width': '285px',
    'height': '285px',
    'line-height': '285px',
    'background': 'rgba(201, 220, 216, 0.8)',
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'text-align': 'center',
    'font-size': '30px',
    'color': 'rgb(224, 57, 48)'}
  };

})(jQuery);

});