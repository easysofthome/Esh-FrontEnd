define(function (require, exports, module) {
  require('jquery');
  var checkForm = require('js/front/VIP/common/checkForm');
  //////////////////////////事件处理入口///////////////////////////////////////////

  //报价文本框失去焦点 进行验证
  $('.dyeing ul .deydata_inp').bind('blur',function(){
      checkForm.checkPrice($(this));
  });

  //批量提交报价
  $('#batchSubmit').bind('click',function(){
    var that = this;
    if(checkForm.can_submitPrice(that)){
      //提交报价
      alert('提交报价成功');
    }
  });

  //批量删除报价
  $('#batchDelete').bind('click',function(){
    var that = this;
    if(checkForm.isCheckAll(that)){
      //提交报价
      alert('删除报价成功');
    }
  });



  //上调
  $("#batch_inc_up").bind('blur',function(){
      var that = this;
      checkForm.upAndDownRate(that,'up');
  });

  //下调
  $("#batch_inc_down").bind('blur',function(){
       var that = this;
      checkForm.upAndDownRate(that,'down');
  });

  //筛选条件 展开收缩
  $('.collapse_text').bind('click',function(){
      if ($(this).attr('show') == 'true') {
        $('#collapsible').slideUp();
        $(this).attr('show', 'false');
        $(this).html('展开');
      } else {
        $('#collapsible').slideDown();
        $(this).attr('show', 'true');
        $(this).html('收起');
      }
  });
});