define(function (require, exports, module) {

  require('jquery');
  var switchMatch = require('js/easydata/common/switchMatch');

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
    switchMatch.initHover("#sel-match");
    switchMatch.initHover(".port");
    switchMatch.initClick(".sel-match");


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
});
