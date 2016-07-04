define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/laydate/laydate');

/////////////////////////////////// 日期选择 //////////////////////////////////////////
  var startDate = {
      elem: '#startDate',
      event: 'focus',
      format: 'YYYY-MM-DD', // 分隔符可以任意定义
      festival: true, //显示节日
      min: laydate.now(), //设定最小日期为当前日期
      max: '2099-06-16 23:59:59', //最大日期
      choose: function(datas){ //选择日期完毕的回调
          endDate.min = datas; //开始日选好后，重置结束日的最小日期
          endDate.start = datas //将结束日的初始值设定为开始日
      }
  }

  var endDate = {
      elem: '#endDate',
      event: 'focus',
      format: 'YYYY-MM-DD', // 分隔符可以任意定义
      festival: true, //显示节日
      min: laydate.now(), //设定最小日期为当前日期
      max: '2099-06-16 23:59:59', //最大日期
      choose: function(datas){ //选择日期完毕的回调
          startDate.max = datas; //结束日选好后，重置开始日的最大日期
      }
  }

  $('#startDate').bind('focus',function(){
      laydate(startDate);
  });

   $('#endDate').bind('focus',function(){
      laydate(endDate);
  })

/////////////////////////////////// 日期非空验证 //////////////////////////////////////////
//预留功能
function validDate(){
  var sdate = $('#startDate').val();
  var edate = $('#endDate').val();
}

});