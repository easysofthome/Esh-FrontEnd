define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/lib/tip/jquery.poshytip');

  var objJson = {
    'CurrentImgUrl':'http://cjmx.easysofthome.com/scenemodel/pic3d//201662410/3744348922.jpg','NextPageUrl':'http://182.168.1.134:8180/html/easydesign/scene/viewScene.html','PrevPageUrl':'http://182.168.1.134:8180/html/easydesign/scene/viewScene.html'
  };

 ///////////////////////////////////登录//////////////////////////////////////////
  $('#toLogin').on('click', function() {
    $.layer({
      type: 2,
      title: false,
      area: ['440px', '490px'],
      border: [5, 0.3, '#000'],
      shade: [0.8, '#000'],
      shadeClose: true,
      offset: [($(window).height() - 490)/2+'px',''],
      closeBtn: [0, false], //去掉默认关闭按钮
      shift: 'top',
      fix : false,
      iframe: {src: '/html/VIP/common/regLog/login-single.html'},
      success: function () {

      }

    });
  });

////////////////////////////////图片加载///////////////////////////////////////////


  var objImg = {'w':100,'h':100};
  //动态加载数据
  function loadOtherFabrics(objJson){

    setBigImg(objJson);
  }

  //加载第n张图片
  function setBigImg(objJson){
    $('#j-lb-picwp').hide();
    setNextOrPrev(objJson);
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
       objImg.w = this.width;
       objImg.h = this.height;
       setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
        var options = "panorama="+objJson.CurrentImgUrl+"&focus=350&pan=180&start=true&infoText=&width="+$('#panoramaShow').width()+"&height="+$('#panoramaShow').height();
        $('#panoramaShow').attr('src',objJson.iframeSrc+"?"+options);
        $('#j-lb-picwp').show();
    });

  }


  //设置页面尺寸及top left值 可以自适应页面大小
  function setConstrainImg(image,imgObj,parentDiv,leftSide){
    var winH = $(window).height();
    var winW = $(window).width();
    var w = image.w;
    var h = image.h;
    var l_w_ratio = h/w;
    var w_l_ratio = w/h;
    var leftSide_w = $(leftSide).width();
    if($(leftSide).css('display') == 'none'){
        leftSide_w = 0;
    }
    if(h>winH-60){
        h = winH-60;
        //w = winH*w_l_ratio;

    }
    if(w>winW-leftSide_w){
        w = winW-leftSide_w-10
       // h = winW*l_w_ratio;
    }
    var tmpTop = 0;
    var tmpLeft =0;
    if((winW-leftSide_w-w)>0){
        tmpLeft = (winW-leftSide_w-w)/2;
    }
    if((winH-60-h)>0){
        tmpTop = (winH-60-h)/2;
    }
    $('#j-lb-main').width(winW-leftSide_w);
    $('#j-lb-main').height(winH);
    $('#j-side-cnt').height(winH);
    $(parentDiv).css({'top':tmpTop,'left':tmpLeft});
    $(parentDiv).css({'width':w,'height':h});
    $(imgObj).css({'top':tmpTop,'left':tmpLeft,'width':w,'height':h});
    $('#panoramaShow').css({'top':5,'left':0,'width':w,'height':h-10});
    var obj = window.frames["panoramaShow"].document.getElementById("Main");
    if(obj){
       obj.width = w;
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

    $('.ctrl-next').bind('click',function(){

       window.open(objJson.NextPageUrl,'_self');
    });

    $('.ctrl-prev').bind('click',function(){
       window.open(objJson.PrevPageUrl,'_self');
    });
  }
  //鼠标滚轮，上一张、下一张
  function mousewheel(objJson){
     // jquery 兼容的滚轮事件
    $('#j-lb-main').on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
         if(!objJson.PrevPageUrl ||objJson.PrevPageUrl.length==0){
            return;
         }
         // 向下滚
         window.open(objJson.PrevPageUrl,'_self');
      }else if (delta < 0){
        if(!objJson.NextPageUrl || objJson.NextPageUrl.length==0){
            return;
          }
         // 向上滚
         window.open(objJson.NextPageUrl,'_self');
      }
    });
  }

  //第一张  最后一张 控制链接显示与否
  function setNextOrPrev(objJson){
    var bigImg = objJson;
    $('.ctrl-prev').show();
    $('.ctrl-next').show();

    if(!bigImg.NextPageUrl || bigImg.NextPageUrl.length==0){
      $('.ctrl-next').hide();
    }
    if(!bigImg.PrevPageUrl ||bigImg.PrevPageUrl.length==0){
      $('.ctrl-prev').hide();
    }
  }

  function initPage(objJson){
      bindScrollBigImg(objJson);
      $(document.body).css("overflow","hidden");
      loadOtherFabrics(objJson);
      //mousewheel(objJson);
  }

  $(window).resize(function(event) {
     setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

  /////////////////////////全景图入口/////////////////////////////////////

 $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var curImgUrl = $('#hidCurrentImgUrl').val();
    var iframeSrc = $('#hidHtmlUrl').val();
    setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  // initPage(objJson);
    $.ajax({
      type: 'post',
      url: baseURL+'?'+params,
      data: '' ,
      dataType: 'json',
      beforeSend:function(){
        $('#j-lb-pic').attr('src','/images/production/easydata/gif-load.gif');
      },
      success: function(data){
        $('#j-lb-pic').hide();
        data.CurrentImgUrl = curImgUrl;
        data.iframeSrc = iframeSrc;
        initPage(data);
      },
      error : function() {
        console.log('---场景详情页异常---');
      }
    });

    });




});