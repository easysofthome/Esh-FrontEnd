define(function (require, exports, module) {
  require('jquery');
////////////////////////////////////////测试用json数据////////////////////////////////////////
 //卧室
  var beddingroomJson = {'vrBigImg':'/images/production/easydesign/simulateFabric/01_simulateFabric_vr.jpg',
  'vrFabricImg':[{'src':'/images/production/easydesign/simulateFabric/01_simulateFabric.jpg','href':'/images/production/easydesign/simulateFabric/01_simulateFabric_vr.jpg'},
                 {'src':'/images/production/easydesign/simulateFabric/02_simulateFabric.jpg','href':'/images/production/easydesign/simulateFabric/02_simulateFabric_vr.jpg'},
                 {'src':'/images/production/easydesign/simulateFabric/03_simulateFabric.jpg','href':'/images/production/easydesign/simulateFabric/03_simulateFabric_vr.jpg'},
                 {'src':'/images/production/easydesign/simulateFabric/04_simulateFabric.jpg','href':'/images/production/easydesign/simulateFabric/04_simulateFabric_vr.jpg'}]};

/////////////////////////////////////////////////页面构建////////////////////////////////////////////////////

  //场景对比页
  //胡庆龙 2016-5-5
  var simulationFn = {};

  //初始化所有需要项
  simulationFn.initAll = function(){

  //隐藏面料选择列表
  this.swichFabricList();

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
    $(".simulation_all img").eq(0).attr("src",jsonData.cdnPath+jsonData.vrBigImg);
    loadFabricList(jsonData);
  }

  //动态加载面料列表图片
  var loadFabricList = function(jsonData){
    var selClass = "";
    var fabricListSize = jsonData.vrFabricImg.length;
    //右侧面料列表
    for(var i=0;i<fabricListSize;i++){
      if(i===0){
        selClass = "selectedFabric";
      }else{selClass="";}
      var $li = $("<li tag='"+i+"' class=\'"+selClass+"\'><img src=\'"+jsonData.cdnPath+jsonData.vrFabricImg[i].src+ "\' /></li>");
      $li.bind('click',function(){
        $(".simulation_all img").eq(0).attr("src",jsonData.cdnPath+jsonData.vrFabricImg[$(this).attr('tag')].href);
      });
      $("#fabricListview").append($li);
   }
  }


  $(document).ready(function () {
    var cdnPath = $('#hidCdnPath').val();
    beddingroomJson.cdnPath=cdnPath;
    //隐藏滚动条
    $(document.body).css("overflow","hidden");
    simulationFn.loadRoomImg(beddingroomJson);
    //初始化场景对比页
    simulationFn.initAll();
  });

  });