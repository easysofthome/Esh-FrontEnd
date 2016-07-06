define(function (require, exports, module) {
  require('jquery');
  require('layer');
  require('js/front/lib/tip/jquery.poshytip');
  var commonDetail = require('js/front/easydesign/common/descHTML'); //生成详情描述

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
        data.CurrentImgUrl= curImgUrl;
        initPage(data);
      },
      error : function() {
        console.log('---花型详情页异常---');
      }
    });
  }


  //动态加载数据 右侧的图片列表
  function loadOtherFabrics(objJson){
    if(!objJson) return;
    setBigImg(objJson);
    if(objJson.FlowerStyleSimilarList.length <=0) return;
    for(var i=0;i<objJson.FlowerStyleSimilarList.length;i++){
      var str = '<li class="lf mianliaobox">'+
      '<a href="javascript:void(0)" data-picid="'+objJson.FlowerStyleSimilarList[i].ImgLink+
      '"><img src="'+objJson.FlowerStyleSimilarList[i].ImgUrl+'" /></a></li>';
      $('.xiangshimianliao').append(str);
    }

    $('.xiangshimianliao').find('a').bind('click',function(){
      var href = $(this).attr('data-picid');
      ajaxLoad(href);
    });
  }

  //加载第n张图片
  function setBigImg(objJson){
   // $('#j-lb-pic').hide();
    setNextOrPrev(objJson);
    $('.gallery').attr('src',objJson.CurrentImgUrl);
    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
    objImg.w = this.width;
    objImg.h = this.height;
    setConstrainImg(objImg,'#j-lb-pic','.img-wrapper','.main-right');
    //$('#j-lb-pic').show();
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
    var leftSide_w = $(leftSide).outerWidth()||$(leftSide).width();
    if($(leftSide).css('display') == 'none'){
        leftSide_w = 0;
    }
    if(h>winH&&l_w_ratio>=1){
        h = winH;
        w = winH*w_l_ratio;

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
     if((winH-60-h)>0){
        tmpTop = (winH-60-h)/2;
    }else{
       h = h-65;
    }
   // $('#j-lb-main').width(winW-leftSide_w);
    //$(parentDiv).css({'top':tmpTop,'left':tmpLeft});
    console.log(leftSide_w);
    $(parentDiv).css({'width':(winW-leftSide_w),'height':(h-120)});
    $(imgObj).css({'top':tmpTop,'left':tmpLeft,'width':w,'height':h});
  }


  //全屏功能
  function clickFullScreen(){
    $('#j-lb-fullscreen').bind('click',function(){

        if($('#j-lb-side').css('display') == 'none'){
          $('#j-lb-side').css('display','block');
        }else{
          $('#j-lb-side').css('display','none');
        }

        $('.z-piccmt-on').fullScreen({
          'callback':function(isFullScreen){
              if(isFullScreen){
               $('#j-lb-side').fadeOut();
              }else{
                $('#j-lb-side').fadeIn();
              }
          }
        })
    });
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
    $('.ctrl-prev').show();
    $('.ctrl-next').show();

    if(!bigImg.NextPageUrl || bigImg.NextPageUrl.length==0){
      $('.ctrl-next').hide();
    }
    if(!bigImg.PrevPageUrl ||bigImg.PrevPageUrl.length==0){
      $('.ctrl-prev').hide();
    }
  }

  //入口
  function initPage(objJson){
    $(document.body).css("overflow","hidden");
    commonDetail.buildDescHTML(objJson); //生成详情描述HTML
    bindScrollBigImg(objJson);
    loadOtherFabrics(objJson);
    mousewheel(objJson);
  }

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

////////////////////////////////入口/////////////////////////////////////

  $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var url = baseURL+'?'+params;
    ajaxLoad(url);
  });


   var w;
    var h;

    $(window).resize(function(){
       // h = $(window).height();
       // $(".gallery-img").height(h-113);
       // $(".main-right").height(h-133);
    });

    $(document).ready(function(){
       // h = $(window).height();
       // $(".gallery-img").height(h-113);
       // $(".main-right").height(h-133);
    });

//接口
exports.initPage = initPage;


});