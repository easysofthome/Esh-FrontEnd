define(function (require, exports, module) {
  require('jquery');


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
  this.swichFabricList();

  //this.initPosition();

  }

  //页面加载时场景标题定位
  simulationFn.initPosition = function(){
   // this.centerAlign("realSceneTitleId",30,30);
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
        $('.simulation_all img').eq(0).attr(
          'src','/images/production/easydesign/'+ roomName +"/"+imgId+'_vr.jpg');
      }
    });
  }

  //动态加载场景对比页面图片
  simulationFn.loadRoomImg = function(listId,fabricNum,roomName,baseUrl,callback){

    $(".simulation_all img").eq(0).attr("src", baseUrl + roomName +"/01_"+ roomName + "_vr.jpg");

    loadFabricList(listId,fabricNum,roomName,baseUrl,callback);

  }

  //动态加载面料列表图片 与图片文件夹名绑定，修改图片所在文件夹名会导致图片无法显示
  var loadFabricList = function(id,num,roomName,baseUrl,callback){
    var selClass = "";
    for(var i=1;i<=num;i++){
      if(i===1){
        selClass = "selectedFabric";
      }else{selClass="";}
      $("#"+id).append("<li id=\'" + "0"+i +'_'+roomName+"\' class=\'"+selClass+"\'>"+
        "<img src=\'"+baseUrl +roomName+"/" + "0"+ i +'_'+roomName  + ".jpg\' /></li>");
    }

    callback(roomName);
  }


  $(document).ready(function () {
    //隐藏滚动条
    $(document.body).css("overflow","hidden");
    var fabricLisId = "fabricListview";
    var baseUrl = "/images/production/easydesign/";

    simulationFn.loadRoomImg(fabricLisId,4,"simulateFabric",baseUrl,function(name){
         simulationFn.switchSelectedFabric(name);

         //初始化场景对比页
        simulationFn.initAll();

      });

    });




  });