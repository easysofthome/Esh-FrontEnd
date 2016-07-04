define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/front/lib/tip/jquery.poshytip');

  var objImg = {'w':100,'h':100};
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
  //异步请求
  function ajaxLoad(url){
    var curImgUrl = $('#hidCurrentImgUrl').val();
    var iframeSrc = $('#hidHtmlUrl').val();
    $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'json',
      beforeSend:function(){
        if(!curImgUrl)return;
        objImg = {'w':100,'h':100};
        setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
        $('#j-lb-pic').attr('src','/images/production/easydata/gif-load.gif');
      },
      success: function(data){
        $('#j-lb-pic').hide();
        data.CurrentImgUrl = curImgUrl;
        data.iframeSrc = iframeSrc;
        initPage(data);
      },
      error : function() {
        console.log('---花型详情页异常---');
      }
    });
  }

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
       ajaxLoad(objJson.NextPageUrl);
    });
    $('.ctrl-prev').bind('click',function(){
       ajaxLoad(objJson.PrevPageUrl);
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
  }

  $(window).resize(function(event) {
     setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

  /////////////////////////全景图入口/////////////////////////////////////

 $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var url = baseURL+'?'+params;
    ajaxLoad(url);
  });


exports.initPage = initPage;

});