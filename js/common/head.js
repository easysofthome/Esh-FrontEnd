define(function (require, exports, module) {
  require('jquery');
  exports.userLogout;
  exports.showHeaderInfo=showHeaderInfo;
  var $login = $('#user_login');
  var $reg = $('#user_reg');
  var $userName = $('#username');
  var $logout = $('#user_logout');
  var url = '';

  $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'json',
      beforeSend:function(){
      },
      success: function(data){
        showHeaderInfo(data);
      },
      error : function() {
        console.log('---ajax加载异常---');
      }
    });

  $logout.bind('click',function(){
    if(exports.userLogout){
      exports.userLogout();
    }else{
      userLogout();
    }
  });

  function showHeaderInfo(data){
    if(data){
      if(data.login){
        loggedIn(data);
      }else{
        noLogin();
      }
    }
  }
  function noLogin(){
    $login.show();
    $reg.show();
    $userName.hide();
    $logout.hide();
  }
  function loggedIn(data){
    $login.hide();
    $reg.hide();
    $userName.show().html(data.username+'<i>'+data.msgNum+'</i>');
    $logout.show();
  }
  function userLogout(){
    var logoutUrl = '';
    $.ajax({
      type: 'post',
      url: logoutUrl,
      data: '' ,
      dataType: 'json',
      beforeSend:function(){
      },
      success: function(data){
        window.location = '/html/VIP/common/regLog/login.html';
      },
      error : function() {
        console.log('---ajax加载异常---');
      }
    });
  }

});