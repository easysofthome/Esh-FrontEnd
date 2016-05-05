define(function (require, exports, module) {
  require('jquery');
  //require('jquery.event.move');
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

    //初始化场景对比页
    simulationFn.initAll();

    //将原页面中间拖动图标暂时隐藏
    $(".twentytwenty-handle").hide();
  });

  //页面尺寸改变时场景标题定位
  $(window).resize(function() {
    simulationFn.initPosition();
  });



  //场景对比页
  //胡庆龙 2016-5-5
  var simulationFn = {};

  //初始化所有需要项
  simulationFn.initAll = function(){
       //隐藏面料选择列表
       this.swichFabricList();

        //面料选择
       this.switchSelectedFabric();

       this.initPosition();
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
  simulationFn.switchSelectedFabric = function(){
    $("#fabricListview img").bind("click",function(){
    var parentClassName = $(this).parent().attr("class");
      if(parentClassName != "selectedFabric"){
        $("#fabricListview li").attr("class","");
        $(this).parent().attr("class","selectedFabric");
        var imgId = $(this).parent().attr("id");
        $('.simulation img').eq(1).attr('src','/images/production/easydesign/'+imgId+'.jpg');
      }
    });
  }



});