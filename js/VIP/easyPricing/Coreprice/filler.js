define(function(require, exports, module) {
  require('jquery');

  function bindEvent () {

    $('input[type=text]').bind('input blur', function() {
        var value = $.trim($(this).attr('value'));
        var reg = /^\d+(\.\d+)?$/;
       if(!reg.test(value)){
         alert("请输入数字！");
         $(this).focus();
         return false;
       }
      if(value.length == 0){
         alert("款式工缴不能为空！");
         $(this).focus();
         return false;
      }
      if(value.length > 20){
         alert("款式工缴不能超过20位！");
         $(this).focus();
         return false;;
      }
      return false;

    });

  }

  $(document).ready(function(){
    bindEvent ();

  });
});