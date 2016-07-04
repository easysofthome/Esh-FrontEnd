define(function (require, exports, module) {
  // 提供重写接口
  exports.overwrite;

  require('jquery');
  var switchMatch = require('js/front/common/module/switchMatch');

  var placeholder = require('placeholder');
  // 重置按钮
  $('#reset').on('click', function() {
    $(':input').val('');
    placeholder.init();
    $('.sel-port li').each(function(index, el) {
      $(this).find("span.add-port").html("+");
    });
  });
  //搜索按钮
  $('#search').on('click', function() {
    if($('#sel-country>input').val().trim() == ''){
      alert("请选择国家");
      $('#sel-country>input').focus();
      $('#sel-country .sel-country').show();
      return;
    }else if($('#sel-pro>input').val().trim() == ''){
      alert("请选择产品");
      $('#sel-pro>input').focus();
      $('#sel-pro .sel-pro').show();
      return;
    }
    if(exports.overwrite) exports.overwrite();
  });


  // 选择匹配度、合作可能性、合作风险、生产淡旺季
    // $('#sel-match>input,#sel-possible>input,#sel-risk>input,.sel_season>input,.port>input').on('mouseover', function(event) {
    //   $(this).siblings('ol,ul').show();
    // });
    // $('#sel-match,#sel-possible,#sel-risk,.sel_season,.port').hover(function(event) {

    // },function () {
    //   $(this).find('ol,ul').hide();
    // });
    // // 点击选择
    // $('.sel-match li,.sel-possible li,.sel-risk li,.short_season li').on('click', function(event) {
    //   $(this).parent().hide();
    //   $(this).parent().siblings('input').val($(this).text())
    // });
    switchMatch.init("#esh-sel1");
    switchMatch.initHover(".port");
    // switchMatch.initClick(".sel-match");


  // 添加、删除港口
    var inputObj = $(".sel-port").siblings('input');
    var Temp;

    $('.sel-port span.add-port').on('click', function() {
      var portName = $(this).siblings('span').html();
      var inputVal = inputObj.val();
      if($(this).html() == "+"){
        $(this).html("－");
        if(inputVal == "" || inputVal == "请输入港口名称"){
          inputObj.val(portName);
        }else{
          inputObj.val(inputVal + "," + portName);
        }
      }else{
        $(this).html("+");
        // 如果删除的是第一个
        if(inputVal.split(',')[0] == portName){
          // 如果只有一个港口时
          if(inputVal.split(',').length == 1){
            Temp = '';
          }else{
            Temp = inputVal.replace(portName + ',','');
          }
        }else{
          Temp = inputVal.replace(','+portName,'');
        }
        inputObj.val(Temp);
      }
    });



    //为港口查询文本框绑定keyup事件
    $(".sel-port").siblings('input').bind('keyup', function(event) {

      doRefreshPortList();
    });

    //手动输入或删除港口时更新下拉列表状态
    //胡庆龙   2016-4-29
    function doRefreshPortList(){
      //搜索值
      var searchPortName = $(".sel-port").siblings('input').val();

      var portNameList = {};
      var inputNameArray = [];

      //搜索框为空
      if(searchPortName.length == 0 && searchPortName.split(",").length == 0){
        return;
      }
      //搜索框只有一个港口
      else if(searchPortName.length > 0 && searchPortName.split(",").length == 0){
        inputNameArray.push(searchPortName);
      }else{
        inputNameArray = searchPortName.split(",");
      }

      //获取所有港口及‘-’或‘+’对应ID
      $(".sel-port li").each(function(){
          var name = $(this).find(".port-name").text();
          var oprId = $(this).find(".add-port").attr("id");
          portNameList[name] = oprId;

      });

      //更新下拉列表状态
        refreshPortList(inputNameArray,portNameList,function(portNameOprId){
           $("#"+portNameOprId).text("+");
      },function(portNameOprId){
           $("#"+portNameOprId).text("－");
      });

    }


    //判断数组array的值是否为对象obj的key,如果不是执行回调函数callback_add，否则执行callback_del
    //
    function refreshPortList(array1,obj,callback_add,callback_del){

      if(array1.length == 0 || typeof(obj) == "undefined"){
        return;
      }

      for(var i = 0;i < array1.length;i++){

          for(var k in obj) {

            if(array1[i] == k){
              continue;
            }
            //回调函数，如果输入框内没有相应港口名称，改为‘+’
            callback_add(obj[k]);
          }

        }

        for(var i = 0;i < array1.length;i++){
           //回调函数，如果输入框内有相应港口名称，改为‘-’
          callback_del(obj[array1[i]]);

        }

      }






});
