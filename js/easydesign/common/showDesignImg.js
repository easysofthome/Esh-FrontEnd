define(function (require, exports, module) {
  require('jquery');

  //当前显示图片索引
  var curIndex = 0;
 // require('js/easydesign/common/jquery.fullscreen');
  var baseUrl = '/images/production/easydesign/designFabrics/';
  var objJson = {'objFabricImg':
    [{'src':baseUrl+'bedroom_02_fabric.jpg'},
    {'src':baseUrl+'bedroom_03_fabric.jpg'},
    {'src':baseUrl+'bedroom_04_fabric.jpg'},
    {'src':baseUrl+'bedroom_fabric_real.png'},
    {'src':baseUrl+'flower.png'},
    {'src':baseUrl+'icon-huaxing-21.png'},
    {'src':baseUrl+'icon-huaxing-22.png'},
    {'src':baseUrl+'icon-huaxing-23.png'}],
    'objFabricImg_full':
    [{'src':baseUrl+'1755360e-d12b-4e5e-963c-75a6596b0725.png'},
    {'src':baseUrl+'6e1868ac-eb4f-44a1-a148-a3244701c0c5.png'}]
  };

  var objImg = {};
  //动态加载数据
  function loadOtherFabrics(objJson){

    if(!objJson) return;
    if(objJson.objFabricImg.length <=0) return;

    for(var i=0;i<objJson.objFabricImg.length;i++){
      $('#j-resemble').append(' <li class="resembleLi">'+
        '<a class="list" href="javaScript:void(0);" data-picid="">'+
        '<div style="border: 1px solid rgb(192, 192, 192); background-image: url('+
          objJson.objFabricImg[i].src+');"> </div></a></li>');

    }


    setBigImg(objJson,0);
  }

  //加载第n张图片
  function setBigImg(objJson,index){

    curIndex = index;
    setNextOrPrev(index,objJson.objFabricImg_full.length);

    $('#j-lb-pic').attr('src',objJson.objFabricImg_full[index].src);

    //获取图片的原始尺寸
    $("<img/>").attr("src", 'http://'+window.location.host+objJson.objFabricImg_full[index].src).load(function() {
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


  //鼠标滚轮，上一张、下一张
  function mousewheel(){
     // jquery 兼容的滚轮事件
    $(document).on("mousewheel DOMMouseScroll", function (e) {

      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

      if (delta > 0){
          // 向上滚
         prevImg(objJson);
      }else if (delta < 0){
          // 向下滚
         nextImg(objJson);
      }
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

  //为相似花型绑定click事件
  function similarFlowersClick(){
      $('#j-resemble li').bind('click',function(){
           setBigImg(objJson,1);
      });
  }


  $(document).ready(function () {
    bindScrollBigImg();
    $(document.body).css("overflow","hidden");
    loadOtherFabrics(objJson);
    similarFlowersClick();
    mousewheel();
    //clickFullScreen();
  });

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

});