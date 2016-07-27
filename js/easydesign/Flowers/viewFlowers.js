define(function (require, exports, module) {
  require('jquery');
  require('loadImage');
  var tools = require('tools');
  require('cookie');
  require('js/front/lib/jquery.history');
  var commonDetail = require('js/front/easydesign/common/descHTML'); //生成详情描述

  //接口 传入请求地址
  exports.urls = {
    'imgArrayID_url':'',
    'imgDetail_url' :'',
    'similarImg_url':''
  };
  var objImg = {'w':100,'h':100};
  var imgData = {'curImgID':'','pagination':{'curImgIndex':0,'pageIndex':1,'pageCount':3,'hasNextImg':false,'hasPreImg':false},'imgIdArray':[],'currentImgInfo':{'detail':{},'similarImgList':[]},'searchParam':''};
////////////////////////////////图片加载///////////////////////////////////////////

  //异步请求图片ID数组
  function ajaxLoadImgIdArray(url){
   $.ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        //jsonp: "callback",
       // jsonpCallback: 'jsonpCallback',
        beforeSend:function(){

        },
        success: function(data){
         //如果数组不为空则放入cookie
         if(data.length>0){
            imgData.imgIdArray = data;
            //将数组放入cookie,用户刷新页面记录当前页面信息
            Cookies.set('imgIdArray',imgData.imgIdArray);
            var _curImgID = imgData.curImgID;
            var tempCurImgIndex = imgData.pagination.curImgIndex;
            //返回图片数组ID是不为空，则在查找图片ID在数组中索引
            var _curImgIndex = getIndexByImgID(data,_curImgID);
            //如果当前图片存在于数组中则取出索引，如果不存在则取数组的开始或结束索引（取决于用户点击的上一张还是下一张）
            imgData.pagination.curImgIndex = _curImgIndex >= 0 ? _curImgIndex : (tempCurImgIndex>0?-1:imgData.imgIdArray.length);
         }
         //设置上一张、下一张按钮显示与否
         setNextOrPrev(imgData.pagination,data.length);
        },
        error : function(e) {
          console.log('---异步请求图片ID数组异常---');
        }
      });
  }

  //异步请求图片详情
  function ajaxLoadImgDetail(url){
    //重写url
    rewriteRUL(url);
    //将数组放入cookie,用户刷新页面记录当前页面信息
    Cookies.set('pageIndex',imgData.pagination.pageIndex);
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'json',
      // jsonpCallback: 'jsonpCallbackDetail',
      beforeSend:function(){
      },
      success: function(data){
        loadData(data);
        //console.log(data.ID);
      },
      error : function() {
        console.log('---花型详情页异常---');
      }
    });
  }

   //异步请求相似花型
  function ajaxLoadSimilarImgList(url){
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'json',
      //jsonpCallback: 'jsonpCallbackSimilar',
      beforeSend:function(){
      },
      success: function(data){
        loadSimilarData(data);
        //console.log(url);
      },
      error : function() {
        console.log('---相似花型详情页异常---');
      }
    });
  }

  //动态加载数据 右侧的图片列表
  function loadOtherFabrics(objJson){
    if(!objJson) return;
    if(objJson.FlowerStyleSimilarList.length <=0) return;
    $('.xiangshimianliao').html('');
    for(var i=0;i<objJson.FlowerStyleSimilarList.length;i++){
      var $str = $('<li class="lf mianliaobox">'+
          '<a href="javascript:void(0)" data-picid="'+objJson.FlowerStyleSimilarList[i].ImgLink+
          '"></a></li>');
      $('.xiangshimianliao').append($str);
      var $img = '<img />';
      $str.find('a').append($img).find('img').LoadImage({'imgSrc':objJson.FlowerStyleSimilarList[i].ImgUrl,'spin_size':'small'});
    }
    $('.xiangshimianliao').find('a').bind('click',function(){
       var link_url = $(this).attr('data-picid');
       var imgID = tools.urlHelp.getValueByKey_URL(link_url,'keyId');
       LoadSimilarImgDetail(imgID);
    });
  }

  //加载第n张图片
  function setBigImg(objJson){
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
      objImg.w = this.width;
      objImg.h = this.height;
      setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
      $('.gallery-img').show();
    });
    $('.gallery img').LoadImage({'imgSrc':objJson.CurrentImgUrl,'container':'.gallery'});
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
    $(imgObj+' img').css({'width':w,'height':h});
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
  function bindScrollBigImg(){
    $('.next').bind('click',function(){
      var that = $(this);
      nextImg();
    });
    $('.prev').bind('click',function(){
      var that = $(this);
      prevImg();
    });
  }

   //下一张图片
  function nextImg(){
    var pageobj = imgData.pagination;
    var imgIdArray = imgData.imgIdArray;
    var arrayLength = imgIdArray.length;
    pageobj.curImgIndex ++;
    var _curImgID = '';
    $('.prev').show();
    //当前组最后一张图片 且 可能还有下一组图片
    if(arrayLength==pageobj.pageCount){
      if(pageobj.curImgIndex >= arrayLength-1){
        pageobj.curImgIndex = arrayLength-1;
        pageobj.pageIndex++;
        //pageobj.curImgIndex = 0;
        _curImgID = imgIdArray[pageobj.curImgIndex].ID;
        loadImgIdArray(pageobj.pageIndex);
      }else{
        _curImgID = imgIdArray[pageobj.curImgIndex].ID;
      }
    }else if(arrayLength<pageobj.pageCount){
       _curImgID = imgIdArray[pageobj.curImgIndex].ID;
      //当前组最后一张图片 且 没有下一组图片
      if(pageobj.curImgIndex == arrayLength-1){
         pageobj.pageIndex ++;
         $('.next').hide();
      }
    }
    //加载图片详情
    LoadPageDetail(_curImgID);
  }

  //上一张图片
  function prevImg(){
    var pageobj = imgData.pagination;
    var imgIdArray = imgData.imgIdArray;
    var arrayLength = imgIdArray.length;
    pageobj.curImgIndex --;
    var _curImgID = '';
    $('.next').show();
    //当前组第一张图片 且 还有上一组图片
    if(pageobj.pageIndex>1){
      if(pageobj.curImgIndex<=0){
        pageobj.curImgIndex =0;
        pageobj.pageIndex--;
        //pageobj.curImgIndex = arrayLength-1;
        _curImgID = imgIdArray[pageobj.curImgIndex].ID;
        imgData.curImgID = _curImgID;
        loadImgIdArray(pageobj.pageIndex);
      }else if(pageobj.curImgIndex==arrayLength-2){
        pageobj.pageIndex --;
        _curImgID = imgIdArray[pageobj.curImgIndex].ID;
      }else{
         _curImgID = imgIdArray[pageobj.curImgIndex].ID;
      }
    }else if(pageobj.pageIndex==1){
      _curImgID = imgIdArray[pageobj.curImgIndex].ID;
      imgData.curImgID = _curImgID;
      loadImgIdArray(pageobj.pageIndex);
    }
    //加载图片详情
    LoadPageDetail(_curImgID);
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

  //上一张 下一张显示或隐藏
  function setNextOrPrev(pageobj,arrayLength){
    if(arrayLength == 0){//没有下一组图片
      imgData.pagination.hasNextImg = false;
      if(pageobj.pageIndex==1){// 么有上一张
        imgData.pagination.hasPreImg = false;
      }else if(pageobj.pageIndex>1){//有上一张
        imgData.pagination.hasPreImg = true;
      }
    }else if(arrayLength > 0){//有下一组图片
      imgData.pagination.hasNextImg = true;
      if(pageobj.pageIndex==1&&pageobj.curImgIndex==0){//么有上一张
         imgData.pagination.hasPreImg = false;
      }else if(pageobj.pageIndex>1||(pageobj.pageIndex==1&&pageobj.curImgIndex>0)){//有上一张
         imgData.pagination.hasPreImg = true;
      }
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
   function loadSimilarData(objJson){
    loadOtherFabrics(objJson);
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
  function loadImgIdArray(pageIndex){
    //获取图片数组
    ajaxLoadImgIdArray(getInitURL(pageIndex));
  }
  function LoadPageDetail(curImgID){
    imgData.curImgID = curImgID;
    //加载图片详情数据
    LoadImgDetail(curImgID);
    //加载相似花型数据
    loadSimilarImgList(curImgID);
  }
  function LoadImgDetail(curImgID){
    //获取图片详情 根据url
    ajaxLoadImgDetail(getImgDetailURL(curImgID));
  }
  function loadSimilarImgList(curImgID){
    ajaxLoadSimilarImgList(getSimilarImgListURL(curImgID));
  }

  function LoadSimilarImgDetail(curImgID){
    imgData.curImgID = curImgID;
    //获取图片详情 根据url
    ajaxLoadImgDetail(getImgDetailURL(curImgID));
    ajaxLoadSimilarImgList(getSimilarImgListURL(curImgID));
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
  function getSimilarImgListURL(keyId){
    var url = '';
    if(exports.urls.similarImg_url.length>0){
      url = exports.urls.similarImg_url+'&keyId='+keyId;
    }
    return url;
  }
  //返回找出相同值，返回索引
  function getIndexByImgID(dataArray,_curImgID){
    var _curImgIndex = -1;
    for(var i=0;i<dataArray.length;i++){
            var ID = dataArray[i].ID;
            if(ID==_curImgID){
              _curImgIndex = i;
              break;
            }
    }
    return _curImgIndex;
  }

  //重写url
  function rewriteRUL(url){
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
    });

    if(/.+\?/.test(url)){
      //var param = 'pageIndex='+imgData.pagination.pageIndex+'&keyId='+imgData.curImgID;
      var param = 'keyId='+imgData.curImgID;
      if(param){
        History.pushState({State:imgData.curImgID},null,'?'+param);
      }
    }
  }

 $(window).resize(function(event) {
  setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
});

////////////////////////////////入口/////////////////////////////////////
//var params = window.location.search.replace(/^\?/, '');

function init(){
  var curImgID = tools.urlHelp.getValueByKey('keyId');
  var imgIdArray_cookie = Cookies.get('imgIdArray');
  var pageIndex = Cookies.get('pageIndex');
  var url_pageIndex = tools.urlHelp.getValueByKey('pageIndex');
  if(url_pageIndex!=-1){ //首次加载
    imgData.pagination.pageIndex = url_pageIndex;
  }else{ //刷新页面
    imgData.imgIdArray = jQuery.parseJSON(imgIdArray_cookie);
    imgData.pagination.pageIndex = pageIndex;
    imgData.pagination.curImgIndex = getIndexByImgID(imgData.imgIdArray,curImgID);
  }
  imgData.curImgID = curImgID;
  //加载图片数组
  loadImgIdArray(imgData.pagination.pageIndex);
  //绑定上一张、下一张按钮点击事件
  bindScrollBigImg();
  //加载图片详情  加载相似花型
  LoadPageDetail(imgData.curImgID);
}

exports.init=init;
});