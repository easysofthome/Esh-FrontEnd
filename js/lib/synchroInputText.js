define(function (require, exports, module) {



/////////////////////////////////// 文本框输入提示：输入什么在文本框上就出现什么 （银行卡、手机号） //////////////////////////////////////////
(function($){


$.InputTip = function(elm, options){
    this.$elm = $(elm);
    this.opts = $.extend({},$.fn.inputTip.defaults,options);
    var id = this.$elm.attr('id');
    $(document.body).append('<div class="input_tip_'+id+'"><div class="input_tip_text_'+id+'"></div></div>');
    this.$outerTip =  $('.input_tip_'+id);
    this.$innnerTip = $('.input_tip_text_'+id);
    this.initCss();
    this.bindEvent(this);

}


$.InputTip.prototype = {
  initCss:function(){
    var tipWidth=this.opts.width ==0?(this.$elm.width()-5):(this.opts.width);
    this.$outerTip.css({'width':tipWidth,'height':this.opts.tipH,'display': 'none',
    'background-color': '#FFFDCA','border': '1px solid #FACF66','color': '#F73200',
    'font-size': '26px','overflow': 'hidden','padding': '4px 8px','text-overflow': 'ellipsis',
    'white-space': 'nowrap','font-family': 'Microsoft YaHei, SimHei','font-weight': '700','position':'absolute'
    });

    this.$innnerTip.css({'overflow': 'hidden','text-overflow': 'ellipsis','white-space': 'nowrap',
      'background-color': '#FFFDCA','color': '#F73200','font-size': '16px','padding': '6px 4px'
    });
    this.inputTipAutoSize();
  },
  inputTipAutoSize:function(){
    var height = this.$elm.height();
    var top = this.$elm.offset().top;
    var left = this.$elm.offset().left;
    this.$outerTip.css({'top':(top-height+this.opts.marginTop),'left':left});
  },
  synchroUserInputText:function(){
    var inputVal = this.$elm.val();
    this.$innnerTip.text(this.formatInput(inputVal,this.opts.tag));
  },
  formatInput:function(text,tag){
    var val = '';
    if(!text) return val;
    var array = text.split('');
    var ret = '';
    var split_str = ' ';
    if(tag=="bankcard"){
      for(var i=0;i<array.length;i++){
        if(i % 4 == 0){
          ret += split_str;
        }
        ret +=array[i];
      }
    }else if(tag=="phone"){
       for(var i=0;i<array.length;i++){
        if(i==3){
           ret += split_str;
         }else if((i-3) % 4 == 0){
          ret += split_str;

         }
        ret +=array[i];
      }
    }else{
       for(var i=0;i<array.length;i++){
        ret +=array[i];
      }
    }

    return ret;
  },
  bindEvent:function(obj){
    this.$elm.bind('change paste keyup',function(){
      obj.$outerTip.show();
      obj.synchroUserInputText();
    });

    this.$elm.bind('blur',function(){
       obj.$outerTip.hide();
    });

    $(window).resize(function(){
      obj.inputTipAutoSize();
    });

  }

};


  $.fn.inputTip=function(options){
     var opts = $.extend({}, $.fn.inputTip.defaults, options);
     return this.each(function() {
        new $.InputTip(this, opts);
      });

  }

  $.fn.inputTip.defaults={
      tipH:30,        //输入提示栏的高度
      marginTop:10,   //输入提示栏的垂直移动距离
      tag:'',          //格式化需求 目前有phone bankcard 默认三种 手机为：### #### #### 银行卡为 #### #### #### #### 默认无空格
      width:0
  };

})(jQuery);

});