define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/jquery.loadImage/jquery.loadImage');

/////////////////////////////////////////////////页面构建////////////////////////////////////////////////////

  //场景对比页
  //胡庆龙 2016-5-5
  var simulationFn = {};

  //初始化所有需要项
  simulationFn.initAll = function(){

  //隐藏面料选择列表
  this.swichFabricList();

  this.initPosition();

  }

  //页面加载时场景标题定位
  simulationFn.initPosition = function(){
    this.centerAlign("realSceneTitleId",30,30);
    this.centerAlign("vsMark",-60,0,-60);
    this.centerAlign("selectFabricLeft",-152,30,0);
  }

  //居中定位,top值自定义
  //胡庆龙 2016-5-4
  simulationFn.centerAlign= function(objId,paddingLeft,topNum,paddingTop){
    if(!paddingLeft)paddingLeft=0;
    var tempTop = 0;
    if(topNum===0) {
      var winHeight = $(window).height();
      var mytop = winHeight/2 + paddingTop;
      tempTop = mytop;
    }else{
      tempTop = topNum;
    }

    //获取页面宽度
    var windowWidth = $(window).width();
    var myLeft = windowWidth/2 + paddingLeft;
    var myTop = tempTop;

    $("#"+objId)[0].style.top = myTop + "px";
    $("#"+objId)[0].style.left = myLeft + "px";
  }


  //选择面料
  //点击选择面料隐藏下拉列表
  simulationFn.swichFabricList = function(){
    $(".selectFabricHeader").click(function(){
       $(".selectFabricList").slideToggle();
       $(".desSelectFabric").slideToggle();
    });
  }

  //动态加载场景对比页面图片
  simulationFn.loadRoomImg = function(jsonData){
    $(".simulation_all img").eq(0).LoadImage({'imgSrc':jsonData.cdnPath+jsonData.realBigImg,'container':'.simulation_left'});
    $(".simulation_all img").eq(1).LoadImage({'imgSrc':jsonData.cdnPath+jsonData.vrBigImg,'container':'.simulation_right'});
    loadFabricList(jsonData);
  }

  //动态加载面料列表图片
  var loadFabricList = function(jsonData){
    var selClass = "";
    var fabricListSizeL = jsonData.realFabricImg.length;
    var fabricListSizeR = jsonData.vrFabricImg.length;
    //右侧面料列表
    for(var i=0;i<fabricListSizeR;i++){
      if(i===0){
        selClass = "selectedFabric";
      }else{selClass="";}
      var $li = $("<li tag='"+i+"' class=\'"+selClass+"\'><img /></li>");
      $li.find('img').LoadImage({'imgSrc':jsonData.cdnPath+jsonData.vrFabricImg[i].src,'container':$li,'spin_size':'small'});
      $li.bind('click',function(){
        $(".simulation_all img").eq(1).LoadImage({'imgSrc':jsonData.cdnPath+jsonData.vrFabricImg[$(this).attr('tag')].href,'container':'.simulation_right'});
        $(this).parent().find('.selectedFabric').removeClass('selectedFabric');
        $(this).addClass("selectedFabric");
      });
      $("#fabricListview_right").append($li);
   }
   //左侧面料列表
   if(fabricListSizeL===1){
        $(".selectFabricList_left span").css("height",134);
   }
   for(var k=0;k<fabricListSizeL;k++){
      $("#fabricListview_left").append("<li><img src=\'"+jsonData.cdnPath+jsonData.realFabricImg[k]+ "\' /></li>");
   }
  }


  $(document).ready(function () {
    //初始化场景对比页
    simulationFn.initAll();

  });

  //页面尺寸改变时场景标题定位
  $(window).resize(function() {
    simulationFn.initPosition();
  });

exports.loadSimulation = simulationFn.loadRoomImg;

});