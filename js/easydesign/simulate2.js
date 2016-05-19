define(function (require, exports, module) {
  require('jquery');
  require('jquery.event.move');
  require('jquery.twentytwenty');



   $('.simulation').twentytwenty();

    $(document).ready(function () {
        switch(location.search){
          case '?id1':
            $('.simulation img').eq(0).attr('src','/images/production/easydesign/bedroom1.jpg');
            $('.simulation img').eq(1).attr('src','/images/production/easydesign/bedroom2.jpg');
            break;
          case '?id2':
            $('.simulation img').eq(0).attr('src','/images/production/easydesign/bathroom1.jpg');
            $('.simulation img').eq(1).attr('src','/images/production/easydesign/bathroom2.jpg');
            break;
          case '?id3':
            $('.simulation img').eq(0).attr('src','/images/production/easydesign/drawing1.jpg');
            $('.simulation img').eq(1).attr('src','/images/production/easydesign/drawing2.jpg');
            break;
          case '?id4':
            $('.simulation img').eq(0).attr('src','/images/production/easydesign/kitchen1.jpg');
            $('.simulation img').eq(1).attr('src','/images/production/easydesign/kitchen2.jpg');
            break;
          default:
            break;
        }
      });





  //页面尺寸改变时场景标题定位
  $(window).resize(function() {
    //simulationFn.initPosition();
  });

  //场景对比页
  //胡庆龙 2016-5-5
  var simulationFn = {};

  //初始化所有需要项
  simulationFn.initAll = function(){

  //隐藏面料选择列表
  // this.swichFabricList();

  // this.initPosition();

  }

  //页面加载时场景标题定位
  simulationFn.initPosition = function(){
    this.centerAlign("realSceneTitleId",30,30);
    this.centerAlign("vsMark",-60,0,-60);
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
    });
  }

  //点击面料切换场景
  simulationFn.switchSelectedFabric = function(roomName){
    $("#fabricListview img").bind("click",function(){
    var parentClassName = $(this).parent().attr("class");
      if(parentClassName != "selectedFabric"){
        $("#fabricListview li").attr("class","");
        $(this).parent().attr("class","selectedFabric");
        var imgId = $(this).parent().attr("id");
        $('.simulation_all img').eq(1).attr(
          'src','/images/production/easydesign/'+ roomName +"/"+imgId+'_real.jpg');
      }
    });
  }

  //动态加载场景对比页面图片
  simulationFn.loadRoomImg = function(listId,fabricNum,roomName,baseUrl,callback){

    $(".simulation_all img").eq(0).attr("src", baseUrl + roomName +"/"+ roomName + "_vr.jpg");
    $(".simulation_all img").eq(1).attr("src",baseUrl + roomName +"/"+ roomName + "_01_real.jpg");

    loadFabricList(listId,fabricNum,roomName,baseUrl,callback);

  }

  //动态加载面料列表图片
  var loadFabricList = function(id,num,roomName,baseUrl,callback){
    var selClass = "";
    for(var i=1;i<=num;i++){
      if(i===1){
        selClass = "selectedFabric";
      }else{selClass="";}
      $("#"+id).append("<li id=\'" + roomName+"_0"+i +"\' class=\'"+selClass+"\'>"+
        "<img src=\'"+baseUrl +roomName+"/"+roomName + "_0" + i + "_fabric.jpg\' /></li>");
    }




    callback(roomName);
  }

//$('.simulation').twentytwenty();
  // $(document).ready(function () {

  //   var fabricLisId = "fabricListview";
  //   var baseUrl = "/images/production/easydesign/";

  //   switch(location.search){
  //     case '?id1':
  //       simulationFn.loadRoomImg(fabricLisId,4,"bedroom",baseUrl,function(name){
  //         simulationFn.switchSelectedFabric(name);
  //       } );
  //       break;
  //     case '?id2':
  //       simulationFn.loadRoomImg(fabricLisId,3,"bathroom",baseUrl,function(name){
  //         simulationFn.switchSelectedFabric(name);
  //       } );

  //       break;
  //     case '?id3':
  //      simulationFn.loadRoomImg(fabricLisId,3,"livingroom",baseUrl,function(name){
  //         simulationFn.switchSelectedFabric(name);
  //       } );
  //       break;
  //     case '?id4':
  //      simulationFn.loadRoomImg(fabricLisId,3,"diningroom",baseUrl,function(name){
  //         simulationFn.switchSelectedFabric(name);
  //       } );
  //       break;
  //     default:
  //       break;
  //   }

    //初始化场景对比页
    //simulationFn.initAll();


  // });

});