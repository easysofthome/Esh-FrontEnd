define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/front/lib/tip/jquery.poshytip');
  require('js/front/lib/jquery.history');
  var commonDetail = require('js/front/easydesign/common/descHTML'); //生成详情描述

  var objImg = {'w':100,'h':100};

////////////////////////////////图片加载///////////////////////////////////////////
  //异步请求
  function ajaxLoad(url){
    if(/.+\?/.test(url)){
      var param = url.replace(/.+\?/,'');
      if(param){
        History.pushState(null,null,'?'+param);
      }
    }
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
        console.log('---面料详情页异常---');
      }
    });
  }

  //加载第n张图片
  function setBigImg(objJson){
    setNextOrPrev(objJson);
    $('.gallery').attr('src',objJson.CurrentImgUrl);
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
      objImg.w = this.width;
      objImg.h = this.height;
      setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
      $('.gallery-img').show();
    });
  }

  //设置页面尺寸及top left值 可以自适应页面大小
  function setConstrainImg(image,imgObj,parentDiv,rightSide){
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

  //初始化
  function initPage(objJson){
    commonDetail.buildDescHTML(objJson); //生成详情描述HTML
    setBigImg(objJson);
    bindScrollBigImg(objJson);
    mousewheel(objJson);
  }

  $(window).resize(function(event) {
    setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
  });

////////////////////////////////入口/////////////////////////////////////

  $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var url = baseURL+'?'+params;
    ajaxLoad(url);
  });

//接口
  exports.initPage = initPage;


});