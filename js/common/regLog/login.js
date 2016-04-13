define(function (require, exports, module) {
  require('jquery');

  // placeholder
  $('.placeholder,.user_box>input,.password_box>input,.authcode_box>input').on('click focus',function  () {
    if($(this).hasClass('placeholder')){
      $(this).hide();
      $(this).siblings('input').focus();
    }else{
      $(this).siblings('span').hide();
    }
  });
  $('.user_box>input,.password_box>input,.authcode_box>input').blur(function  () {
    if($(this).val()===''){
      $(this).siblings('span').show();
    }
  });
  // 检查表单
  window.formCheck = function(){
    var user = $('.user_box>input'),
        password = $('.password_box>input'),
        authcode = $('.authcode_box>input');

    // 是否为空
    if(user.val().trim()===''){
      alert("请输入手机或者邮箱");
      user.focus();
      return false;
    }
    if(password.val().trim()===''){
      alert("请输入密码");
      password.focus();
      return false;
    }
    if(authcode.val().trim()===''){
      alert("请输入验证码");
      authcode.focus();
      return false;
    }
    if(authcode.val().trim().length!= 5){
      alert("验证码错误");
      authcode.focus();
      return false;
    }
    if(checkUser(user)){
      // $.$.ajax({
      //   url: '/path/to/file',
      //   type: 'default GET (Other values: POST)',
      //   dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
      //   data: {param1: 'value1'},
      // })
      // .done(function() {
      //   console.log("success");
      // })
      // .fail(function() {
      //   console.log("error");
      // })
      // .always(function() {
      //   console.log("complete");
      // });
    }
    return false;
  }
//正则检查手机号和邮箱
  function checkUser (user) {
    var reg = {
        "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
    };
    var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
    var regPhone = new RegExp(reg[86]);
    var regEmail = new RegExp(email);
    var userFlag = regPhone.test(user.val()) || regEmail.test(user.val());
    if(!userFlag){
      alert("请输入正确的手机或邮箱");
      user.focus();
      return false;
    }
    return true;
  }

});