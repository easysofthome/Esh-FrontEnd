define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/front/lib/tip/jquery.poshytip');

  var objImg = {'w':100,'h':100};
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
        setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
        $('.gallery').attr('src','/images/production/easydata/gif-load.gif');
      },
      success: function(data){
        $('.gallery').hide();
        data.CurrentImgUrl = curImgUrl;
        data.iframeSrc = iframeSrc;
        initPage(data);
      },
      error : function() {
        console.log('---场景详情页异常---');
      }
    });
  }

  //动态加载数据
  function loadOtherFabrics(objJson){
    setBigImg(objJson);
  }

  //加载第n张图片
  function setBigImg(objJson){
    setNextOrPrev(objJson);
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
       objImg.w = this.width;
       objImg.h = this.height;
       setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
        var options = "panorama="+objJson.CurrentImgUrl+"&focus=350&pan=180&start=true&infoText=&width="+$('#panoramaShow').width()+"&height="+$('#panoramaShow').height();
        $('#panoramaShow').attr('src',objJson.iframeSrc+"?"+options);
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
    $('#panoramaShow').css({'width':winW-leftSide_w,'height':h});
    var obj = window.frames["panoramaShow"].document.getElementById("Main");
    if(obj){
       obj.width = winW-leftSide_w;
       obj.height = h;
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

  function initPage(objJson){
     bindScrollBigImg(objJson);
     loadOtherFabrics(objJson);
  }

  $(window).resize(function(event) {
     setConstrainImg(objImg,'.gallery','.img-wrapper','.main-right');
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