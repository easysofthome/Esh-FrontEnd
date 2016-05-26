define(function (require, exports, module) {
  require('jquery');
  require('js/easydesign/common/jquery.fullscreen');
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

    $('#j-lb-pic').attr('src',objJson.objFabricImg_full[0].src);


    //获取图片的原始尺寸
    $("<img/>").attr("src", 'http://'+window.location.host+objJson.objFabricImg_full[0].src).load(function() {
    objImg.w = this.width;
    objImg.h = this.height;
    setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
    });



  }


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

    $(parentDiv).animate({'top':tmpTop,'left':tmpLeft});
    $(parentDiv).css({'width':w,'height':h});

    $(imgObj).css({'top':tmpTop,'left':tmpLeft,'width':w,'height':h});
  }

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


  $(document).ready(function () {
    $(document.body).css("overflow","hidden");
    loadOtherFabrics(objJson);
    clickFullScreen();
  });

  $(window).resize(function(event) {
      setConstrainImg(objImg,'#j-lb-pic','#j-lb-picwp','#j-lb-side');
  });

});