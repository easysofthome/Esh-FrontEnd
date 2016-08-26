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
  // 个性化搜索
  $('.drop_down').attr('data-state', 'close');
  $('.drop_down').on('click', function() {
    if($(this).attr('data-state') == 'close'){
      $(this).attr('data-state','open');
      $(this).find('span').removeClass('pers_under pers_under333').addClass('pers_on pers_on333');
    } else {
      $(this).attr('data-state','close');
      $(this).find('span').removeClass('pers_on pers_on333').addClass('pers_under pers_under333');
    }
    $('.leibie_box').slideToggle();
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
    // switchMatch.initHover(".port");
    // switchMatch.initClick(".sel-match");


///////////////// 添加、删除港口/////////////////////////
  var portArray = [], portTemp;

  $(document).ready(function(){
    showLabel();
  });

  function showLabel(){
    portTemp = $('[name=port]').val();
    if(!portTemp) return;
    if(portTemp.trim() == ''){
      $('.port-tag-box').html('请输入港口名称');
    } else {
      portArray = portTemp.split(',');
      $('.port-tag-box').html('<dl></dl>');
      for (var i = portArray.length - 1; i >= 0; i--) {
        $('.port-tag-box dl')
          .append(' <dd class="port-tag">' + portArray[i] + '<span>x</span></dd>');
      }
    }
  }

// 经过事件
  $('.port').on('mouseover','.port-tag-box', function() {
    $(this).siblings('ul').show();
  });
  $('.port').hover(
    function(){},
    function() {
      $(this).find('ul').hide();
    }
  );

// 增加事件
  $('.sel-port li').on('click',function(){
    portTemp = $(this).find('span').html();
    pushArray(portTemp);
    setInputValue();
  })
// 减少事件
  $('.port-tag-box').on('click','span',function(){
    portTemp = $(this).parent().html().slice(0,-14);
    portArray.remove(portTemp);
    setInputValue();
    if(portArray.length == 0){
      $('.port-tag-box').html('请输入港口名称');
    }else{
      $(this).parent().remove();
    }
  });

  function setInputValue(){
    portTemp = portArray.join(',');
    $('[name=port]').val(portTemp);
  }

  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };

  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  function pushArray (portTemp){
    var flag = 0;
    for (var i = portArray.length - 1; i >= 0; i--) {
      if(portArray[i] == portTemp){
        flag = 1;
        break;
      }
    }
    if(!flag){
      if(portArray.length == 0)
        $('.port-tag-box').html('<dl></dl>');
      if(portArray.length > 3)
        return;
      $('.port-tag-box dl').append(' <dd class="port-tag">' + portTemp + '<span>x</span></dd>');
      portArray.push(portTemp);
    }

  };


  /*
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

*/

module.exports.showLabel = showLabel;


});
