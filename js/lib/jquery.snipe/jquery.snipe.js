define(function (require, exports, module) {
(function() {
  var $, Bounds, Snipe, defaultsSettings, forceSettings;

  $ = jQuery;

  defaultsSettings = {
    "class": 'snipe-lens',
    size: 200,
    animation: null,
    image: null,
    cursor: 'move',
    bounds: [],
    draggable:false,
    css: {
      borderRadius: 200,
      width: 200,
      height: 200,
      border: '2px solid white',
      backgroundColor: 'white',
      boxShadow: '0 0 10px #777, 0 0 8px black inset, 0 0 80px white inset'
    },
    zoomin: function(lens) {},
    zoomout: function(lens) {},
    zoommoved: function(lend) {}
  };

  forceSettings = {
    css: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundRepeat: 'no-repeat'
    }
  };

  Bounds = (function() {

    function Bounds(top, right, bottom, left) {
      this.top = top;
      this.right = right;
      this.bottom = bottom;
      this.left = left;
      return this;
    }

    Bounds.prototype.contains = function(x, y) {
      return (this.left < x && x < this.right) && (this.top < y && y < this.bottom);
    };

    Bounds.prototype.containsLen = function(x, y, objLen) {
      var flag = true;
      if(this.left > objLen.offset().left){
        objLen.css({'left':this.left});
        flag = false;
      }
      if(objLen.offset().left+objLen.width() > this.right){
        objLen.css({'left':this.right-objLen.width()});
        flag = false;
      }
      if(this.top > objLen.offset().top){
        objLen.css({'top':this.top});
        flag = false;
      }
      if(objLen.offset().top+objLen.height() > this.bottom){
        objLen.css({'top':this.bottom-objLen.height()});
        flag = false;
      }
      return flag;
    };

    return Bounds;

  })();

  Snipe = (function() {

    function Snipe(el, settings) {
      var _this = this;
      this.el = el;
      if (settings == null) {
        settings = {};
      }
      this.body = $('body');
      this.defaults = defaultsSettings;
      this.makeSettings(settings);
      this.el.one('load', function() {
        return _this.makeBounds();
      }).each(function() {
        if (this.complete) {
          return $(this).load();
        }
      });
      this.el.data('snipe', this);
      if($('#snipe_len').length){
        $('#snipe_len').remove();
      }
      this.lens = $('<div id="snipe_len" style="-moz-user-select:none;-webkit-user-select:none;user-select:none">').addClass(this.settings["class"]).css('display', 'none').appendTo('body');

      this.rate = 0.5;
      this.ratioX = 1;
      this.ratioY = 1;
      this.x_space = 0;
      this.y_space = 0;
      this.ratioEl = $('<img>').attr('src', this.settings.image);
      this.ratioEl.one('load', function() {
        return _this.calculateRatio.call(_this);
      }).each(function() {
        if (this.complete) {
          return $(this).load();
        }
      });


      return this.el;
    }

    Snipe.prototype.makeSettings = function(settings) {
      var img;
      if (this.el.is('a')) {
        img = this.el.find('img:first');
        this.defaults.image = settings.image || this.el.attr('href');
      } else {
        img = this.el.is('img') ? this.el : this.el.find('img:first');
        this.defaults.image = settings.image || this.el.data('zoom') || this.el.attr('src');
      }
      this.el = img;
      this.defaults.css.backgroundImage = "url(" + this.defaults.image + ")";
      this.defaults.css.cursor = settings.cursor || this.defaults.cursor;
      this.settings = $.extend({}, this.defaults, settings, forceSettings);
      return this.settings.css = $.extend({}, this.defaults.css, settings && settings.css, forceSettings.css);
    };

    Snipe.prototype.makeBounds = function() {
      this.offset = this.el.offset();
      return this.bounds = new Bounds(this.offset.top, this.offset.left + this.el.width(), this.offset.top + this.el.height(), this.offset.left);
    };

    Snipe.prototype.run = function() {
      if(this.settings.draggable){
        return this.init();
      }
      return this.hide();
    };

    Snipe.prototype.calculateRatio = function() {
      this.ratioX = this.ratioEl[0].width / this.el[0].width;
      this.ratioY = this.ratioEl[0].height / this.el[0].height;
      this.ratioEl.remove();
      this.lens.css(this.settings.css);
      return this.run();
    };



    Snipe.prototype.onMouseMove = function(e) {
      if (!(this.bounds != null) && this.lens.not(':animated')) {
        return;
      } else {
        if (!this.bounds.containsLen(e.pageX, e.pageY, this.lens)) {
          if(this.settings.draggable){
            return;
          }
           this.hide();
        }
      }
      // backgroundX = -((e.pageX - this.offset.left) * this.ratioX - this.settings.size * .5);
      // backgroundY = -((e.pageY - this.offset.top) * this.ratioY - this.settings.size * .5);


      //   left: e.pageX - this.settings.size * .5,
      //   top: e.pageY - this.settings.size * .5,
      //   backgroundPosition: "" + backgroundX + "px " + backgroundY + "px"
      // });

      this.lens.css({
        left: e.pageX-this.x_space,
        top: e.pageY-this.y_space
      });
      this.lenImg(this.ratioX,this.ratioY);

    };

    Snipe.prototype.lenImg=function(ratioX,ratioY){
      var backgroundX, backgroundY;
      backgroundX = -((this.lens.offset().left - this.offset.left) * ratioX + this.settings.size);
      backgroundY = -((this.lens.offset().top - this.offset.top) * ratioY + this.settings.size);
      this.lens.css({
        backgroundPosition: "" + backgroundX + "px " + backgroundY + "px"
      });
    }

     //鼠标滚轮，放大缩小
  Snipe.prototype.mousewheel=function(){
     // jquery 兼容的滚轮事件
    $(document).on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
          // 向上滚
         this.rate *= 0.9;
         this.lenImg(this.rate*this.ratioX,this.rate*this.ratioY);
      }else if (delta < 0){
          // 向下滚
         this.rate *= 0.9;
         this.lenImg(this.rate*this.ratioX,this.rate*this.ratioY);
      }
    });
  }


    Snipe.prototype.init = function(e) {
      this.show();
      var backgroundX, backgroundY;

      //backgroundX = -((e.pageX - this.offset.left) * this.ratioX - this.settings.size * .5);
      //backgroundY = -((e.pageY - this.offset.top) * this.ratioY - this.settings.size * .5);

      this.lens.css({
        left: this.offset.left+this.el[0].width-this.settings.size-30,
        top: this.offset.top+30
      });

       backgroundX = -((this.lens.offset().left - this.offset.left) * this.ratioX + this.settings.size);
       backgroundY = -((this.lens.offset().top - this.offset.top) * this.ratioY + this.settings.size);
       this.lens.css({
        backgroundPosition: "" + backgroundX + "px " + backgroundY + "px"
      });
    };

    /*
    API Methods
    */


    Snipe.prototype.show = function(animation) {
      var _this = this;
      if (animation == null) {
        animation = true;
      }
      this.makeBounds();

      if(!this.settings.draggable){
         moveEvent(_this);
      }else{
        this.lens.unbind('mousedown');
        this.lens.bind('mousedown',function(e){
           //$('.flowname').text( _this.lens.left+ "__"+e.pageY);
           _this.x_space = e.pageX - $(this).offset().left;
           _this. y_space = e.pageY - $(this).offset().top;
           moveEvent(_this);
        })

        this.lens.bind('mouseup',function(){
            removeMoveEvent(_this);
        });
        this.lens.bind('mouseout',function(){
            removeMoveEvent(_this);
        });
      }

      this.lens.show().css({
        opacity: 1,
        cursor: this.settings.css.cursor
      });
      return this;
    };

    //鼠标移动事件
    function moveEvent(_this){

        _this.lens.unbind('mousemove');
        _this.lens.unbind('mouseover');
        _this.lens.bind('mousemove', function(e) {

          return _this.onMouseMove(e);
        });

    }

    function removeMoveEvent(that){
        that.lens.unbind('mousemove');
        that.lens.unbind('mouseover');
    }

    Snipe.prototype.hide = function(animation) {
      var _this = this;
      if (animation == null) {
        animation = true;
      }
      this.el.bind('mouseover', function(e) {
        //return _this.show();
      });
      this.body.unbind('mousemove');
      this.lens.css({
        opacity: 0,
        cursor: 'default'
      }).hide();
      return this;
    };

    return Snipe;

  })();

  (function($) {
    return $.fn.snipe = function(settings) {
      return this.each(function() {
        return new Snipe($(this), settings);
      });
    };
  })(jQuery);

}).call(this);

});