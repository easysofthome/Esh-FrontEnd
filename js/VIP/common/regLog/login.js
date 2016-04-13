define(function (require, exports, module) {
  require('jquery');

  $('.butt_log').on('click', function() {
    if($('.username').val()==''||$('.username').val()=='请输入手机号或邮箱'){
      alert('请输入手机号或邮箱');
      $('.username').focus();
      return false;
    }
    if($('.password').val()==''||$('.password').val()=='请输入密码'){
      alert('请输入密码');
      $('.password').focus();
      return false;
    }
    if($('.Codes').val()==''||$('.Codes').val()=='请输入验证码'){
      alert('请输入验证码');
      $('.Codes').focus();
      return false;
    }
    window.location.href="http://easysofthome.com";

  });

});