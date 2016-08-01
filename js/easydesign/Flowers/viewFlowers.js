define(function (require, exports, module) {
  require('jquery');
  var loadImageObj = require('loadImage');
  var tools = require('tools');
  require('cookie');
  require('js/front/lib/jquery.history');
  var commonDetail = require('js/front/easydesign/common/descHTML'); //生成详情描述

////////////////////////////////变量 接口///////////////////////////////////////////
  //接口 传入请求地址
  exports.urls = {
    'imgArrayID_url':'',
    'imgDetail_url' :'',
    'similarImg_url':''
  };
  var objImg = {'w':100,'h':100};
  var imgData = {'canScroll':true,'curImgID':'','pagination':{'pageIndex_edge':-2,'curImgIndex':0,'pageIndex':1,'pageCount':3,'hasNextImg':false,'hasPreImg':false},'imgIdArray_cur':[],'imgIdArray_temp':[],'currentImgInfo':{'similarImgList':[]},'searchParam':''};

////////////////////////////////图片样式///////////////////////////////////////////

  //加载第n张图片
  function setBigImg(objJson){
    //图片加载等待
    loadImageObj.spinObj.loadSpin_freeWrapper({'selecter':'.gallery img'});
    //图片加载事件
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
      objImg.w = this.width;
      objImg.h = this.height;
      //设置图片位置及大小
      setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
      //显示图片容器
      $('.gallery-img').show();
      //移除图片加载等待
      loadImageObj.spinObj.removeSpin_freeWrapper();
      //图片加载完毕可以滚动滚轮
      bindMousewheel();
      //载入图片
      $('.gallery img').attr('src',objJson.CurrentImgUrl);
    });
  }

  //动态加载数据 右侧的图片列表
  function loadOtherFabrics(objJson){
    if(!objJson) return;
    if(objJson.length <=0) return;
    $('.xiangshimianliao').html('');
    for(var i=0;i<objJson.length;i++){
      var $str = $('<li class="lf mianliaobox">'+
          '<a href="javascript:void(0)" data-picid="'+objJson[i].id+
          '"></a></li>');
      $('.xiangshimianliao').append($str);
      var $img = '<img />';
      $str.find('a').append($img).find('img').LoadImage({'imgSrc':objJson[i].ImgUrl,'spin_size':'small'});
    }
    $('.xiangshimianliao').find('a').bind('click',function(){
       var similarImgId = $(this).attr('data-picid');
       LoadSimilarImgDetail(similarImgId);
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
    if(h>imgAreaH){
      h = imgAreaH;
      w = imgAreaH*w_l_ratio;
    }
    if(w>winW){
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
      if(pageobj.pageIndex==1&&pageobj.curImgIndex==0){// 么有上一张
        imgData.pagination.hasPreImg = false;
      }else if(pageobj.pageIndex>1||(pageobj.pageIndex==1&&pageobj.curImgIndex>0)){//有上一张
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

////////////////////////////////事件绑定///////////////////////////////////////////
  //鼠标滑过 显示翻页按钮
  $('.gallery-img').mouseenter(function(event) {
    $('.pagination').fadeIn();
  });

  $('.gallery-img').mouseleave(function(event) {
    $('.pagination').fadeOut();
  });

  //鼠标滚轮，上一张、下一张
  function mousewheel(){
    // jquery 兼容的滚轮事件
    $('.img-wrapper').on("mousewheel DOMMouseScroll", function (e) {
      if(!imgData.canScroll)return;
      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
      if (delta > 0){
        // 向上滚
        if(imgData.pagination.hasPreImg){
          unbindMousewheel();
          //防止间隔过短
          prevImg();
        }
      }else if (delta < 0){
         // 向下滚
        if(imgData.pagination.hasNextImg){
          unbindMousewheel();
          //防止间隔过短
          nextImg();
        }
      }
    });
  }
  //键盘左右翻页
  function keyDownLR(){
     $(document).on('keydown',function(e){
      var keyCode = e.keyCode;
      if(keyCode==37){ //上一张
         if(imgData.pagination.hasPreImg){
          unbindMousewheel();
          //防止间隔过短
          prevImg();
        }
      }else if(keyCode==39){//下一张
         if(imgData.pagination.hasNextImg){
          unbindMousewheel();
          //防止间隔过短
          nextImg();
        }
      }
    });
  }


  //注销鼠标滚轮事件
  function unbindMousewheel(){
    imgData.canScroll = false;
  }

  //注册鼠标滚轮事件
  function bindMousewheel(){
    imgData.canScroll = true;
  }

   //绑定上一张下一张事件
  function bindScrollBigImg(){
    $('.next').bind('click',function(){
      nextImg();
    });
    $('.prev').bind('click',function(){
      prevImg();
    });
  }
  //地址改变事件
  History.Adapter.bind(window,'statechange',function(){
      var imgData_state = History.getState();
      if(imgData_state.data&&imgData_state.data.isBrowserGo){
        doLoadData(imgData_state.data);
      }
  });
////////////////////////////////数据请求///////////////////////////////////////////
   //异步请求图片ID数组
  function ajaxLoadImgIdArray(url,pageIndex){
   $.ajax({
        type: 'post',
        url: url,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(){

        },
        success: function(data){
         if(data.length>0){
            setImgIdArrayCookie(data,pageIndex);
         }else{
            var _curImgID = imgData.curImgID;
            //返回图片数组为空，则在之前图片ID在数组中索引
            var _curImgIndex = getIndexByImgID(imgData.imgIdArray_cur,_curImgID);
            //如果当前图片存在于数组中则取出索引，如果不存在返回当前图片索引
            imgData.pagination.curImgIndex = _curImgIndex;
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
    //将数组放入cookie,用户刷新页面记录当前页面信息
    Cookies.set('pageIndex_cur',imgData.pagination.pageIndex);
    Cookies.set('pageIndex_edge',imgData.pagination.pageIndex_edge);
    //console.log(imgData.pagination.pageIndex);
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
        //console.log('pageIndex:'+imgData.pagination.pageIndex);
      },
      error : function() {
        console.log('---面料详情页异常---');
      }
    });
  }
   //将图片数组放入cookie
  function setImgIdArrayCookie(data,pageIndex){
    if(imgData.pagination.pageIndex == pageIndex){ //第一次加载
      imgData.imgIdArray_cur = data;
      Cookies.set('imgIdArray_cur',data);
    }else if(imgData.pagination.pageIndex > pageIndex){//当前组第一张
      imgData.imgIdArray_temp = data;
      Cookies.set('imgIdArray_temp',data);
    }else if(imgData.pagination.pageIndex < pageIndex){//当前组最后一张
      imgData.imgIdArray_temp = data;
      Cookies.set('imgIdArray_temp',data);
    }
    var _curImgID = imgData.curImgID;
    //返回图片数组ID是不为空，则在查找图片ID在数组中索引
    var _curImgIndex = getIndexByImgID(imgData.imgIdArray_cur,_curImgID);
    //如果当前图片存在于数组中则取出索引，如果不存在返回当前图片索引
    imgData.pagination.curImgIndex = _curImgIndex;
  }

   //异步请求相似花型
  function ajaxLoadSimilarImgList(url){
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'jsonp',
      jsonpCallback: 'jsonpCallbackSimilar',
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
  function loadImgIdArray(pageIndex){
    if(pageIndex==0){
      pageIndex = 1;
    }
    if(!pageIndex){
      return false;
    }
    //获取图片数组
    ajaxLoadImgIdArray(getInitURL(pageIndex),pageIndex);
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
    if(!dataArray)    {
      return -1;
    }
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

////////////////////////////////上一张下一张///////////////////////////////////////////
   //重写url
  function reWriteURL(imgData,imgID,isBrowserGo){
    var stateObj = imgData;
    stateObj.isBrowserGo = isBrowserGo;
    var param = 'keyId='+imgID;
    History.pushState(stateObj,null,'?'+param);
  }

  //浏览器前进 后退功能
  function doLoadData(imgData_state){
      imgData=imgData_state
      Cookies.set('imgIdArray_cur',imgData.imgIdArray_cur);
      Cookies.set('imgIdArray_temp',imgData.imgIdArray_temp);
      var pageIndex_cur = 1;
      if(imgData.pagination.pageIndex_edge==-1){
        pageIndex_cur = parseInt(imgData.pagination.pageIndex)-1;
        if(pageIndex_cur==0){
          pageIndex_cur = 1;
        }
        loadImgIdArray(pageIndex_cur);
      }else if(imgData.pagination.pageIndex_edge==1){
        pageIndex_cur = parseInt(imgData.pagination.pageIndex)+1;
        if(pageIndex_cur==0){
          pageIndex_cur = 1;
        }
        loadImgIdArray(pageIndex_cur);
      }else if(imgData.pagination.pageIndex_edge==-2){
        if(pageIndex_cur==0){
          pageIndex_cur = 1;
        }
        loadImgIdArray(pageIndex_cur);
      }else{
        $('.next').show();
        $('.prev').show();
      }

      LoadPageDetail(imgData.curImgID);
  }

   //下一张图片
  function nextImg(){
    var pageobj = imgData.pagination;
    var imgIdArray_cur = imgData.imgIdArray_cur;
    var arrayLength = imgIdArray_cur.length;
    pageobj.curImgIndex ++; //图片索引加一
    var _curImgID = '';
    $('.prev').show();
    imgData.pagination.hasPreImg = true;
    if(pageobj.curImgIndex==arrayLength){//到达下一组第一张
      pageobj.curImgIndex = 0; //页码归零
      pageobj.pageIndex++;     //组索引加一
      imgData.imgIdArray_cur = imgData.imgIdArray_temp;//当前组图片
      imgData.imgIdArray_temp = imgIdArray_cur;
      Cookies.set('imgIdArray_cur',imgData.imgIdArray_cur);
      Cookies.set('imgIdArray_temp',imgData.imgIdArray_temp);
      _curImgID = imgData.imgIdArray_cur[pageobj.curImgIndex].ID;//当前图片ID
      imgData.pagination.pageIndex_edge = 1;//当前图片是第一张则为-1，最后一张则为1，中间则为0
    }else if(pageobj.curImgIndex==arrayLength-1){//到达每组最后一张
      _curImgID = imgIdArray_cur[pageobj.curImgIndex].ID;//当前图片ID
      //loadImgIdArray(parseInt(pageobj.pageIndex)+1);//请求一下组图片
      imgData.pagination.pageIndex_edge = 1;
    }else{//每组中间图片
      _curImgID = imgIdArray_cur[pageobj.curImgIndex].ID;
      imgData.pagination.pageIndex_edge = 0;
    }
    imgData.curImgID = _curImgID;
    //重写URL
    reWriteURL(imgData,_curImgID,true);
  }
  //上一张图片
  function prevImg(){
    var pageobj = imgData.pagination;
    var imgIdArray_cur = imgData.imgIdArray_cur;
    var arrayLength = imgIdArray_cur.length;
    pageobj.curImgIndex --;
    var _curImgID = '';
    $('.next').show();
    imgData.pagination.hasNextImg = true;
   if(pageobj.curImgIndex==-1){//到达上一组最后一张
      pageobj.pageIndex--;     //组索引减一
      if(pageobj.pageIndex==0){
        pageobj.pageIndex =1;
      }
      imgData.imgIdArray_cur = imgData.imgIdArray_temp;//当前组图片
      imgData.imgIdArray_temp = imgIdArray_cur; //记录下一组图片
      pageobj.curImgIndex = imgData.imgIdArray_cur.length-1; //页码归当前组图片末尾
      _curImgID = imgData.imgIdArray_cur[pageobj.curImgIndex].ID;//当前图片ID
      imgData.pagination.pageIndex_edge = 0;
      Cookies.set('imgIdArray_cur',imgData.imgIdArray_cur);
      Cookies.set('imgIdArray_temp',imgData.imgIdArray_temp);
    }else if(pageobj.curImgIndex==0){//到达每组第一张
      _curImgID = imgIdArray_cur[pageobj.curImgIndex].ID;//当前图片ID
      //loadImgIdArray(parseInt(pageobj.pageIndex)-1);//请求上一组图片
      imgData.pagination.pageIndex_edge = -1;
    }else if(pageobj.curImgIndex<-1){
      pageobj.curImgIndex = 0;
      _curImgID = imgIdArray_cur[pageobj.curImgIndex].ID;
    }else{//每组中间图片
      _curImgID = imgIdArray_cur[pageobj.curImgIndex].ID;
      imgData.pagination.pageIndex_edge = 0;
    }
    imgData.curImgID = _curImgID;
    //重写URL
    reWriteURL(imgData,_curImgID,true);
  }

////////////////////////////////数据处理///////////////////////////////////////////

  //初始化页面数据
  function loadData(objJson){
    copyCurImgInfo(objJson);
    setBigImg(imgData.currentImgInfo);
    commonDetail.buildDescHTML(imgData.currentImgInfo,'flower'); //生成详情描述HTML
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


 $(window).resize(function(event) {
  setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
});

////////////////////////////////入口/////////////////////////////////////
//var params = window.location.search.replace(/^\?/, '');

function init(){
  var curImgID = tools.urlHelp.getValueByKey('keyId');
  var imgIdArray_temp = Cookies.get('imgIdArray_temp');
  var imgIdArray_cur = Cookies.get('imgIdArray_cur');
  var pageIndex_cur = 0;
  //var pagination_cookie = Cookies.get('pagination');
  var url_pageIndex = tools.urlHelp.getValueByKey('pageIndex');
  if(url_pageIndex!=-1){ //首次加载
    imgData.pagination.pageIndex = url_pageIndex;
    pageIndex_cur = imgData.pagination.pageIndex;
    imgData.curImgID = curImgID;
    reWriteURL(imgData,curImgID,true);
  }else{ //刷新页面
    //imgData.imgIdArray = jQuery.parseJSON(imgIdArray_cookie);
    imgData.imgIdArray_temp = jQuery.parseJSON(imgIdArray_temp);
    imgData.imgIdArray_cur = jQuery.parseJSON(imgIdArray_cur);
    imgData.pagination.pageIndex = Cookies.get('pageIndex_cur');
    imgData.pagination.pageIndex_edge = Cookies.get('pageIndex_edge');
    if(imgData.pagination.pageIndex_edge==-1){
      pageIndex_cur = parseInt(imgData.pagination.pageIndex)-1;
    }else if(imgData.pagination.pageIndex_edge==1){
      pageIndex_cur = parseInt(imgData.pagination.pageIndex)+1;
    }else{
      pageIndex_cur = parseInt(imgData.pagination.pageIndex);
    }
    if(pageIndex_cur==0){
      pageIndex_cur = 1;
    }
    imgData.curImgID = curImgID;
    //加载图片数组
    loadImgIdArray(pageIndex_cur);
    //加载图片详情
    LoadPageDetail(imgData.curImgID);
  }
  //绑定上一张、下一张事件
  bindScrollBigImg();
  mousewheel();
  keyDownLR();
}

exports.init=init;
});