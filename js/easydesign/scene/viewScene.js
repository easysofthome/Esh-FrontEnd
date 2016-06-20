define(function (require, exports, module) {
  require('jquery');

  //当前显示图片索引
  var curIndex = 0;
 // require('js/easydesign/common/jquery.fullscreen');
  var baseUrl = '\/images\/production\/easydesign\/designFabrics\/';
  var objJson = {
    'objFabricImg_full':
    [{'src':baseUrl+'panorama_3.jpg','width':'3500','height':'3500'},
    {'src':baseUrl+'panorama_2.jpg','width':'3000','height':'1500'}]
  };

  var objImg = {};
  //动态加载数据
  function loadOtherFabrics(objJson){

    setBigImg(objJson,0);
  }

  //加载第n张图片
  function setBigImg(objJson,index){
    $('#j-lb-picwp').hide();
    curIndex = index;
    setNextOrPrev(index,objJson.objFabricImg_full.length);


    //获取图片的原始尺寸

    objImg.w = objJson.objFabricImg_full[index].width;
    objImg.h = objJson.objFabricImg_full[index].height;
    setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
    var options = "panorama="+objJson.objFabricImg_full[index].src+"&focus=350&pan=180&start=true&infoText=&width="+$('#panoramaShow').width()+"&height="+$('#panoramaShow').height();

    $('#panoramaShow').attr('src',"/html/easydesign/scene/panoramaShow.html?"+options);
    $('#j-lb-picwp').show();

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

    //$('#j-side-cnt').height(winH);

    $('#j-lb-main').width(winW-leftSide_w);
    $('#j-lb-main').height(winH);
    $('#j-side-cnt').height(winH);


    $(parentDiv).css({'top':0,'left':0});
    $(parentDiv).css({'width':'100%','height':'100%'});

    $('#panoramaShow').css({'top':tmpTop,'left':tmpLeft,'width':w,'height':h});

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

    if(curIndex >= objJson.objFabricImg_full.length-1){

      return false;
    }

    curIndex ++;
    setBigImg(objJson,curIndex);
  }

   //上一张图片
  function prevImg(objJson){

    if(curIndex <= 0){

      return false;
    }
    curIndex --;
    setBigImg(objJson,curIndex);
  }

  //绑定上一张下一张事件
  function bindScrollBigImg(){

    $('.ctrl-next').bind('click',function(){
        nextImg(objJson);
    });

    $('.ctrl-prev').bind('click',function(){
        prevImg(objJson);
    });
  }

  //第一张  最后一张 控制链接显示与否
  function setNextOrPrev(index,length){

    $('.ctrl-prev').show();
    $('.ctrl-next').show();
    if(index<=0){
      $('.ctrl-prev').hide();
    }
    if(index>=(length-1)){
      $('.ctrl-next').hide();
    }
  }

  function operImgBymousewheel(e){
     var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
          // 向上滚
         prevImg(objJson);
      }else if (delta < 0){
          // 向下滚
         nextImg(objJson);
      }
  }

  //鼠标滚轮，上一张、下一张
  function mousewheel(){

    // if(document.getElementById("panoramaShow").contentWindow.body.attachEvent){alert();
    //    document.frames["panoramaShow"].contentWindow.document.attachEvent('onmousewheel',function(){
    //     operImgBymousewheel(e);
    //   });

    //  }

         // jquery 兼容的滚轮事件
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        operImgBymousewheel(e);
      });


    }






  /////////////////////////全景图/////////////////////////////////////





  $(document).ready(function () {
    bindScrollBigImg();
    $(document.body).css("overflow","hidden");
    loadOtherFabrics(objJson);
    mousewheel();

    //clickFullScreen();
  });

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

});