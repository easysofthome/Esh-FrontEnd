define(function (require, exports, module) {
  require('jquery');
  require('js/lib/jquery.snipe/jquery.snipe');

  //当前显示图片索引
  var curIndex = 0;
 // require('js/easydesign/common/jquery.fullscreen');
  var baseUrl = '/images/production/easydesign/designFabrics/';
  var objJson = {
    'objFabricImg_full':
    [{'src':baseUrl+'767171c0-3b5f-4f63-8832-72ef851c57e4.jpg'},
    {'src':baseUrl+'c7ad1773-b42b-444f-b549-1c0f576f10f0.jpg'}]
  };

  var objImg = {};
  var display = true;
  //动态加载数据
  function loadOtherFabrics(objJson){

    setBigImg(objJson,0);
  }

  //加载第n张图片
  function setBigImg(objJson,index){

    curIndex = index;
    setNextOrPrev(index,objJson.objFabricImg_full.length);

    $('#j-lb-pic').attr('src',objJson.objFabricImg_full[index].src);


    //获取图片的原始尺寸
    $("<img/>").attr("src", 'http://'+window.location.host+objJson.objFabricImg_full[index].src).bind('load',function() {
    objImg.w = this.width;
    objImg.h = this.height;
    setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side',function(){
       snipe_len('j-lb-pic',curIndex);
     
      });
    }).each(function() {
        //解决IE8不重复加载的问题
        if (this.complete) {
          return $(this).load();
        }
    });

  }

  //显示\隐藏放大镜
  $('.snipe_len_tool').bind('click',function(){
    var isShow = $('#snipe_len').css('display');
    if(isShow != 'none'){
      $('#snipe_len').hide();
      $(this).find('span p').text('点击显示放大镜');
      display = false;
    }else{
      $('#snipe_len').show();
      $(this).find('span p').text('点击隐藏放大镜');
      display = true;
    }
    
  })

  //图片放大镜
  function snipe_len(id,index){
      //图片放大镜
      $('#'+id).snipe({
        bounds: [10,-10,-10,10],
        image: objJson.objFabricImg_full[index].src,
        moveable:true,
        visible:display
      });
  }

  //设置页面尺寸及top left值 可以自适应页面大小
  function setConstrainImg(image,imgObj,parentDiv,leftSide,callback){
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
    callback();
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

  //鼠标滚轮事件
  function mousewheelEvent(){
    // jquery 兼容
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

  //鼠标滚轮，上一张、下一张
  function mousewheel(){
    //每次鼠标在document中是，重新绑定滚轮事件（鼠标在放大镜中时，此事件失效）
    $('#j-lb-pic-ctrl,#j-lb-picwp,#j-lb-pic').bind('mouseover',function(event) {
        mousewheelEvent();
    });

    //每次鼠标在document中是，重新绑定滚轮事件（鼠标在放大镜中时，此事件失效）
    $('#snipe_len').bind('mouseleave',function(event) {
      mousewheelEvent();
    });

  }





  $(document).ready(function () {
    bindScrollBigImg();
    $(document.body).css("overflow","hidden");
    loadOtherFabrics(objJson);

    if(document.all){
        document.onselectstart= function(){return false;}; //for ie
    }else{
        document.onmousedown= function(){return false;};
        document.onmouseup= function(){return true;};
    }
    document.onselectstart = new Function('event.returnValue=false;');
    mousewheel();




    //clickFullScreen();
  });

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side',function(){
        snipe_len('j-lb-pic',curIndex);
      });
  });

});