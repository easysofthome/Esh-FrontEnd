define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/jquery.snipe/jquery.snipe');
  require('layer');
  require('js/front/lib/tip/jquery.poshytip');
  var objImg = {'w':100,'h':100};
////////////////////////////////图片加载///////////////////////////////////////////
//异步请求
  function ajaxLoad(url){
    var curImgUrl = $('#hidCurrentImgUrl').val();
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'json',
      beforeSend:function(){
        if(!curImgUrl)return;
        objImg = {'w':100,'h':100};
        setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
        $('.gallery').attr('src','/images/production/easydata/gif-load.gif');
      },
      success: function(data){
        data.CurrentImgUrl= curImgUrl;
        initPage(data);
      },
      error : function() {
        console.log('---品质样详情页异常---');
      }
    });
  }

  var display = true;
  //动态加载数据
  function loadOtherFabrics(objJson){
    setBigImg(objJson,0);
  }

  //加载第n张图片
  function setBigImg(objJson){
    setNextOrPrev(objJson);
    $('.gallery').attr('src',objJson.CurrentImgUrl);
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
      objImg.w = this.width;
      objImg.h = this.height;
      bindWinresize(function(){
        $('.gallery-img').show();
        $('.snipe_len_tool').show();
        snipe_len(objJson,'.gallery');
      });
    }).each(function() {
      //解决IE8不重复加载的问题
      if (this.complete) {
        return $(this).load();
      }
    });
  }

  //显示\隐藏放大镜
  $('.snipe_len_tool').bind('click',function(){
    var isShow = $('#snipe_len').css('display');
    if(isShow != 'none'){
      $('#snipe_len').hide();
      $(this).find('span p').text('点击显示放大镜');
      display = false;
    }else{
      $('#snipe_len').show();
      $(this).find('span p').text('点击隐藏放大镜');
      display = true;
    }

  })

  //图片放大镜
  function snipe_len(objJson,id){
    //图片放大镜
    $(id).snipe({
      bounds: [10,-10,-10,10],
      image: objJson.CurrentImgUrl,
      moveable:true,
      visible:display
    });
  }

  //设置页面尺寸及top left值 可以自适应页面大小
  function setConstrainImg(image,imgObj,parentDiv,rightSide,callback){
    var topMenuH= 112;
    var botH = 62;
    var winH = $(window).height();
    var winW = $(window).width();
    var imgAreaH = winH-topMenuH-botH;
    var w = image.w;
    var h = image.h;
    var l_w_ratio = h/w;
    var w_l_ratio = w/h;
    var leftSide_w = $(rightSide).outerWidth()||$(rightSide).width();
    if($(rightSide).css('display') == 'none'){
      leftSide_w = 0;
    }
    if(h>imgAreaH&&l_w_ratio>=1){
      h = imgAreaH;
      w = imgAreaH*w_l_ratio;

    }else if(w>winW&&l_w_ratio<=1){
      w = winW;
      h = winW*l_w_ratio;
    }
    var tmpTop = 0;
    var tmpLeft =0;
    if((winW-leftSide_w-w)>0){
      tmpLeft = (winW-leftSide_w-w)/2;
    }else{
      w = w-leftSide_w;
    }

    $(rightSide).css({'height':winH-topMenuH-30});
    $(parentDiv).css({'width':(winW-leftSide_w),'height':(winH-topMenuH-botH),'line-height':(winH-topMenuH-botH)+"px"});
    $(parentDiv).parent().css({'height':winH-topMenuH});
    $(imgObj).css({'width':w,'height':h});
    $(imgObj).parent().css({'width':w,'height':h});
    if(callback){
      callback();
    }
  }


  //下一张图片
  function nextImg(objJson){
    var bigImg = objJson;
    if(!bigImg.NextPageUrl || bigImg.NextPageUrl.length==0){
      return false;
    }
    setBigImg(objJson);
  }

  //上一张图片
  function prevImg(objJson){

    var bigImg = objJson;
    if(!bigImg.PrevPageUrl ||bigImg.PrevPageUrl.length==0){
      return false;
    }
    setBigImg(objJson);
  }

  //绑定上一张下一张事件
  function bindScrollBigImg(objJson){
    $('.next').bind('click',function(){
      ajaxLoad(objJson.NextPageUrl);
    });
    $('.prev').bind('click',function(){
      ajaxLoad(objJson.PrevPageUrl);
    });
  }


  //鼠标滚轮，上一张、下一张
  function mousewheel(objJson){
    // jquery 兼容的滚轮事件
    $('.img-wrapper').on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
        if(!objJson.PrevPageUrl ||objJson.PrevPageUrl.length==0){
          return;
        }
        // 向下滚
        ajaxLoad(objJson.PrevPageUrl);
      }else if (delta < 0){
        if(!objJson.NextPageUrl || objJson.NextPageUrl.length==0){
          return;
        }
        // 向上滚
        ajaxLoad(objJson.NextPageUrl);
      }
    });
  }

  //第一张  最后一张 控制链接显示与否
  function setNextOrPrev(objJson){
    var bigImg = objJson;
    $('.prev').show();
    $('.next').show();

    if(!bigImg.NextPageUrl || bigImg.NextPageUrl.length==0){
      $('.next').hide();
    }
    if(!bigImg.PrevPageUrl ||bigImg.PrevPageUrl.length==0){
      $('.prev').hide();
    }
  }
  //鼠标滑过 显示翻页按钮
  $('.gallery-img').mouseenter(function(event) {
    $('.pagination').fadeIn();
  });

  $('.gallery-img').mouseleave(function(event) {
    $('.pagination').fadeOut();
  });

  //入口
  function initPage(objJson){
    bindScrollBigImg(objJson);
    loadOtherFabrics(objJson);

    if(document.all){
      document.onselectstart= function(){return false;}; //for ie
    }else{
      document.onmousedown= function(){return false;};
      document.onmouseup= function(){return true;};
    }
    document.onselectstart = new Function('event.returnValue=false;');
    mousewheel(objJson);
  }

  //页面尺寸改编，图片一直居中
  function bindWinresize(callback){
    setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right',callback);
    $(window).resize(function(event) {
      setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right',callback);
    });
  }

////////////////////////////////入口/////////////////////////////////////
  $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var url = baseURL+'?'+params;
    ajaxLoad(url);

  });

  exports.initPage = initPage;
});