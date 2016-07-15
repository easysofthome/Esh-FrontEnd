/*
**************图片预加载插件******************
///说明：在图片加载前显示一个加载标志，当图片下载完毕后显示图片出来
可对图片进行是否自动缩放功能
此插件使用时可让页面先加载，而图片后加载的方式，
解决了平时使用时要在图片显示出来后才能进行缩放时撑大布局的问题
///参数设置：
imgSrc      要加载的图片的路径
container   显示等待图标的容器
scaling     是否等比例自动缩放
width       图片最大高
height      图片最大宽
*/
define(function (require, exports, module) {
require('js/front/lib/spin'); //依赖插件 用js实现的等待图标


jQuery.fn.LoadImage=function(option){
  //默认配置选项
  var defalutOpts = {
    'imgSrc':'',
    'container':'',
    'scaling':false,
    'width':0,
    'height':0,
    'layer_zIndex':26,
    'spin_zIndex':27,
    'layerOpacity':0.2
  };

  var opts = $.fn.extend({},defalutOpts,option);

  //依赖插件等待图标配置选项
  var spin_opts = {
    lines: 11, // The number of lines to draw
    length: 0, // The length of each line
    width: 20, // The line thickness
    radius: 40, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 48, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: opts.spin_zIndex, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent in px
    left: '50%' // Left position relative to parent in px
  };

	return this.each(function(){
		var t=$(this);
		var wapper = opts.container || $(this).parent();
		var src=opts.imgSrc;
		var img=new Image();
		img.src=src;
		//自动缩放图片

    hideLoadingImg();
		var spinner = new Spinner(spin_opts);
		var $loadLayer = $('<div class="loadLayer"></div>');
		$loadLayer.css({'position':'absolute','z-index':opts.layer_zIndex,'opacity': opts.layerOpacity,'filter': 'alpha(opacity='+(opts.layerOpacity*100)+')','background': '#000','top':0,'left':0,'width':t.width(),'height':t.height(),'line-height':t.height()+'px'});
		t.after($loadLayer);
		spinner.spin($(wapper)[0]);
		//处理ff下会自动读取缓存图片
		if(img.complete){
			//hideLoadingImg();
			t.attr("src",img.src);
			return;
		}

		$(img).load(function(){
			//hideLoadingImg();
			t.attr("src",this.src);
		});

		function hideLoadingImg(){
      var cur_loadLayer = t.parent().find('.loadLayer');
      var cur_spin = $(wapper).find('.spinner');
      if(cur_spin.length>0){
        cur_spin.remove();
      }
      if(cur_loadLayer.length>0){
        cur_loadLayer.remove();
      }
		}

	});
}

});