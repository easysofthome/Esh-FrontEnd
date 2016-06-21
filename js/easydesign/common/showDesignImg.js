define(function (require, exports, module) {
  require('jquery');

 // require('js/easydesign/common/jquery.fullscreen');
  var objJson = {'FlowerStyleSimilarList':
    [{'ImgUrl':'/images/production/easydesign/designFabrics/bedroom_02_fabric.jpg','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/bedroom_03_fabric.jpg','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/bedroom_04_fabric.jpg','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/bedroom_fabric_real.png','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/flower.png','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/icon-huaxing-21.png','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/icon-huaxing-22.png','ImgLink':''},
    {'ImgUrl':'/images/production/easydesign/designFabrics/icon-huaxing-23.png','ImgLink':''}],
    'CurrentImgUrl':'/images/production/easydesign/designFabrics/1755360e-d12b-4e5e-963c-75a6596b0725.png','NextPageUrl':'','PrevPageUrl':''
  };


  var objImg = {};
  //动态加载数据
  function loadOtherFabrics(objJson){

    if(!objJson) return;
    setBigImg(objJson);
    if(objJson.FlowerStyleSimilarList.length <=0) return;

    for(var i=0;i<objJson.FlowerStyleSimilarList.length;i++){
      $('#j-resemble').append(' <li class="resembleLi">'+
        '<a class="list" href="'+objJson.FlowerStyleSimilarList[i].ImgLink+'" data-picid="">'+
        '<div style="border: 1px solid rgb(192, 192, 192); background-image: url('+
          objJson.FlowerStyleSimilarList[i].ImgUrl+');"> </div></a></li>');

    }



  }

  //加载第n张图片
  function setBigImg(objJson){
    setNextOrPrev(objJson);

    $('#j-lb-pic').attr('src',objJson.CurrentImgUrl);

    //获取图片的原始尺寸
    $("<img/>").attr("src", objJson.CurrentImgUrl).load(function() {
    objImg.w = this.width;
    objImg.h = this.height;
    setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
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

    if(h>winH&&l_w_ratio>=1){
        h = winH;
        w = winH*w_l_ratio;

    }else if(w>winW&&l_w_ratio<=1){

        w = winW;
        h = winW*l_w_ratio;
    }

    var tmpTop = 0;
    var tmpLeft =0;

    if((winW-w)!=0){
        tmpLeft = (winW-leftSide_w-w)/2;
    }

    //$('#j-side-cnt').height(winH);

    $('#j-lb-main').width(winW-leftSide_w);
    $('#j-lb-main').height(winH);
    $('#j-side-cnt').height(winH);

    $(parentDiv).css({'top':tmpTop,'left':tmpLeft});
    $(parentDiv).css({'width':w,'height':h});

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

       window.open(objJson.NextPageUrl,'_self');
    });

    $('.ctrl-prev').bind('click',function(){
       window.open(objJson.PrevPageUrl,'_self');
    });
  }


  //鼠标滚轮，上一张、下一张
  function mousewheel(objJson){
     // jquery 兼容的滚轮事件
    $(document).on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
          // 向上滚
         window.open(objJson.NextPageUrl,'_self');
      }else if (delta < 0){
          // 向下滚
         window.open(objJson.PrevPageUrl,'_self');
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

  //为相似花型绑定click事件
  function similarFlowersClick(objJson){
      // $('#j-resemble li').bind('click',function(){
      //      setBigImg(objJson,0);
      // });
  }


  function initPage(objJson){
    bindScrollBigImg(objJson);
    $(document.body).css("overflow","hidden");
    loadOtherFabrics(objJson);
   // similarFlowersClick(objJson);
    mousewheel(objJson);
    //clickFullScreen();
  }


  $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('hidAjaxUrl').val();
   // initPage(objJson);
    $.ajax({
      type: 'post',
      url: baseURL+'?'+params,
      data: '' ,
      dataType: 'json',
      success: function(data){
        initPage(data);
      },
      error : function() {
        console.log('---花型详情页异常---');
      }
    });




  });

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

  exports.initPage = initPage;
});