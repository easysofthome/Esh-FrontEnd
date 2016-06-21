define(function (require, exports, module) {
  require('jquery');

  var objJson = {
    'CurrentImgUrl':'/images/production/easydesign/designFabrics/panorama_3.jpg','NextPageUrl':'','PrevPageUrl':''
  };

  //动态加载数据
  function loadOtherFabrics(objJson){

    setBigImg(objJson,0);
  }

  //加载第n张图片
  function setBigImg(objJson){
    $('#j-lb-picwp').hide();
    setNextOrPrev(objJson);

    //获取图片的原始尺寸
    setConstrainImg('#j-lb-picwp','#j-lb-side');
    var options = "panorama="+objJson.CurrentImgUrl+"&focus=350&pan=180&start=true&infoText=&width="+$('#panoramaShow').width()+"&height="+$('#panoramaShow').height();

    $('#panoramaShow').attr('src',"/html/easydesign/scene/panoramaShow.html?"+options);
    $('#j-lb-picwp').show();

  }

  //设置页面尺寸及top left值 可以自适应页面大小
  function setConstrainImg(parentDiv,leftSide){
    var winH = $(window).height();
    var winW = $(window).width();

    var leftSide_w = $(leftSide).width();

    $('#j-lb-main').width(winW-leftSide_w);
    $('#j-lb-main').height(winH);
    $('#j-side-cnt').height(winH);


    $(parentDiv).css({'top':0,'left':0});
    $(parentDiv).css({'width':'100%','height':'100%'});
    console.log(winW);
    $('#panoramaShow').css({'top':10,'left':10,'width':winW-leftSide_w-20,'height':winH-80});

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
      // mousewheel(objJson);
  }

  $(window).resize(function(event) {
      setConstrainImg('#j-lb-picwp','#j-lb-side');
  });

  /////////////////////////全景图入口/////////////////////////////////////

 $(document).ready(function () {
    var params = window.location.search.replace(/^\?/, '');
    var baseURL = $('#hidAjaxUrl').val();
    var curImgUrl = $('#hidCurrentImgUrl').val();
    initPage(objJson);
    $.ajax({
      type: 'post',
      url: baseURL+'?'+params,
      data: '' ,
      dataType: 'json',
      success: function(data){
        data.CurrentImgUrl = curImgUrl;
        initPage(data);
      },
      error : function() {
        console.log('---场景详情页异常---');
      }
    });

    });




});