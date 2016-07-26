define(function (require, exports, module) {
  require('jquery');
  require('cookie');
  var tools = require('tools');
  require('js/front/lib/jquery.history');
  var commonDetail = require('js/front/easydesign/common/descHTML'); //生成详情描述

  //接口 传入请求地址
  exports.urls = {
    'imgArrayID_url':'',
    'imgDetail_url' :''
  };
  var objImg = {'w':100,'h':100};
  var imgData = {'pagination':{'curImgIndex':0,'pageIndex':1,'pageCount':20,'hasNextImg':true,'hasPreImg':true},'imgIdArray':[],'currentImgInfo':{'detail':{}},'searchParam':''};
////////////////////////////////图片加载///////////////////////////////////////////

  //异步请求图片ID数组
  function ajaxLoadImgIdArray(url){
   $.ajax({
        type: 'post',
        url: url,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(){

        },
        success: function(data){
         imgData.imgIdArray = data;
         Cookies.set('imgIdArray',imgData.imgIdArray);
         LoadPageDetail(imgData);
        },
        error : function(e) {
          console.log('---异步请求图片ID数组异常---');
        }
      });
  }

  //异步请求图片详情
  function ajaxLoadImgDetail(url){
    if(/.+\?/.test(url)){
      //var param = url.replace(/.+\?/,'');
      var param = 'pageIndex='+imgData.pagination.pageIndex+'&curImgIndex='+imgData.pagination.curImgIndex;
      if(param){
        History.pushState(null,null,'?'+param);
      }
    }
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'jsonp',
      jsonpCallback: 'jsonpCallbackDetail',
      beforeSend:function(){
      },
      success: function(data){
        loadData(data);
        //console.log(data.ID);
      },
      error : function() {
        console.log('---异步请求面料详情页异常---');
      }
    });
  }

  //加载第n张图片
  function setBigImg(objJson){
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

  //鼠标滚轮，上一张、下一张
  function mousewheel(pageobj,imgIdArray){
    // jquery 兼容的滚轮事件
    $('.img-wrapper').on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
      if (delta > 0){
        if(!pageobj.hasNextImg){
          return;
        }
        // 向下滚
        nextImg(pageobj,imgIdArray);
      }else if (delta < 0){
        if(!pageobj.hasPreImg){
          return;
        }
        // 向上滚
        prevImg(pageobj,imgIdArray);
      }
    });
  }

  //绑定上一张下一张事件
  function bindScrollBigImg(pageobj,imgIdArray){
    $('.next').bind('click',function(){
      nextImg(pageobj,imgIdArray);
    });
    $('.prev').bind('click',function(){
      prevImg(pageobj,imgIdArray);
    });
  }

   //下一张图片
  function nextImg(pageobj,imgIdArray){
    var arrayLength = imgIdArray.length;
    pageobj.curImgIndex ++;
    $('.prev').show();
    //当前组最后一张图片 且 还有下一组图片
    if(pageobj.curImgIndex >= arrayLength-1&&arrayLength>=pageobj.pageCount){
      pageobj.curImgIndex == arrayLength-1;
      pageobj.pageIndex ++;
      loadEntry(pageobj.pageIndex);
      return;
    }
    //当前组最后一张图片 且 没有下一组图片
    if(arrayLength<pageobj.pageCount&&pageobj.curImgIndex == arrayLength-1){
      $('.next').hide();
    }
    //加载图片详情
    LoadImgDetail(imgIdArray,pageobj.curImgIndex);
  }

  //上一张图片
  function prevImg(pageobj,imgIdArray){
    var arrayLength = imgIdArray.length;
    pageobj.curImgIndex --;
    $('.next').show();
    //当前组第一张图片 且 还有上一组图片
    if(pageobj.curImgIndex==0&&pageobj.pageIndex>1){
      pageobj.curImgIndex == arrayLength-1;
      pageobj.pageIndex --;
      loadEntry(pageobj.pageIndex);
      return;
    }
    //当前组第一张图片 且 还没有上一组图片
    if(pageobj.curImgIndex==0&&pageobj.pageIndex==1){
      $('.prev').hide();
    }
    //加载图片详情
    LoadImgDetail(imgIdArray,pageobj.curImgIndex);

  }

  //第一张  最后一张 控制按钮显示与否
  function setNextOrPrevButton(hasNextImg,hasPreImg){
    $('.prev').show();
    $('.next').show();
    if(!hasNextImg){
      $('.next').hide();
    }
    if(!hasPreImg){
      $('.prev').hide();
    }
  }

  //上一张 下一张赋值
  function setNextOrPrev(pageobj,arrayLength){
     imgData.pagination.hasNextImg = false;
     imgData.pagination.hasPreImg = false;
     //有上一张
     if(pageobj.curImgIndex==0&&pageobj.pageIndex>1){
        imgData.pagination.hasPreImg = true;
     }else if(pageobj.curImgIndex>0){
        imgData.pagination.hasPreImg = true;
     }

     //有下一张
     if(arrayLength>1){
        imgData.pagination.hasNextImg = true;
     }
     setNextOrPrevButton(imgData.pagination.hasNextImg,imgData.pagination.hasPreImg);
  }

  //鼠标滑过 显示翻页按钮
  $('.gallery-img').mouseenter(function(event) {
    $('.pagination').fadeIn();
  });

  $('.gallery-img').mouseleave(function(event) {
    $('.pagination').fadeOut();
  });

  //初始化页面数据
  function loadData(objJson){
    copyCurImgInfo(objJson);
    setBigImg(imgData.currentImgInfo);
    commonDetail.buildDescHTML(imgData.currentImgInfo,'flower'); //生成详情描述HTML
    //mousewheel(objJson);
  }

  function copyCurImgInfo(objJson){
    imgData.currentImgInfo.CurrentImgUrl = objJson.IMG_PATH;
    imgData.currentImgInfo.IS_VIP = objJson.IS_VIP;
    imgData.currentImgInfo.NAME = objJson.NAME;
    imgData.currentImgInfo.PROPERTY_TYPE_NAME = objJson.PROPERTY_TYPE_NAME;
    imgData.currentImgInfo.PROPERTY_STYLE_CODE = objJson.PROPERTY_STYLE_CODE;
    imgData.currentImgInfo.PROPERTY_COLOR_NAME = objJson.PROPERTY_COLOR_NAME;
    imgData.currentImgInfo.DESCRIPTION = objJson.DESCRIPTION;
    imgData.currentImgInfo.CREATE_USER = objJson.CREATE_USER;
    imgData.currentImgInfo.CREATE_TIME = objJson.CREATE_TIME;
    imgData.currentImgInfo.LAST_UPDATE_TIME = objJson.LAST_UPDATE_TIME;
    return copyCurImgInfo;
  }
  function loadEntry(pageIndex){
    //获取图片数组
    ajaxLoadImgIdArray(getInitURL(pageIndex));
  }
  function LoadPageDetail(imgData){
    setNextOrPrev(imgData.pagination,imgData.imgIdArray.length);
    bindScrollBigImg(imgData.pagination,imgData.imgIdArray);
    LoadImgDetail(imgData.imgIdArray,imgData.pagination.curImgIndex);
    loadSimilarImgList(imgData.imgIdArray,imgData.pagination.curImgIndex);
  }
  function LoadImgDetail(imgIdArray,curImgIndex){
    //当前图片索引
    var curImgID = imgIdArray[curImgIndex].ID;
    //获取图片详情 根据url
    ajaxLoadImgDetail(getImgDetailURL(curImgID));
  }
  function loadSimilarImgList(imgIdArray,curImgIndex){
    var curImgID = imgIdArray[curImgIndex].ID;
  }
  function getInitURL(pageIndex){
    var url = '';
    if(exports.urls.imgArrayID_url.length>0){
      url = exports.urls.imgArrayID_url+'&pageIndex='+pageIndex;
    }
    return url;
  }
  function getImgDetailURL(pid){
    var url = '';
    if(exports.urls.imgDetail_url.length>0){
      url = exports.urls.imgDetail_url+'?ID='+pid;
    }
    return url;
  }

  $(window).resize(function(event) {
    setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
  });

////////////////////////////////入口/////////////////////////////////////

//var params = window.location.search.replace(/^\?/, '');
function init(){
  var pageIndex = tools.urlHelp.getValueByKey('pageIndex');
  var curImgIndex = tools.urlHelp.getValueByKey('curImgIndex');
  if(pageIndex>=0&&curImgIndex>=0){
     imgData.pagination.pageIndex = pageIndex;
     imgData.pagination.curImgIndex = curImgIndex;
     var imgIdArray_cookie = Cookies.get('imgIdArray');
     if(imgIdArray_cookie){
       imgData.imgIdArray = jQuery.parseJSON(imgIdArray_cookie);
       LoadPageDetail(imgData);
     }
  }else{
    loadEntry(imgData.pageIndex);
  }
}

exports.init=init;
});