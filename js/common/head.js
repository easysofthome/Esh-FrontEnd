define(function (require, exports, module) {
  require('jquery');
  exports.userLogout;
  exports.showHeaderInfo=showHeaderInfo;
  var $login = $('#user_login');
  var $reg = $('#user_reg');
  var $userName = $('#username');
  var $logout = $('#user_logout');
  var $vip = $('#vipService');
  var url = '';

  $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'jsonp',
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
      if(data.isLogin){
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
    $('#isNotVip').show();
    $('#isVip').hide();
  }
  function loggedIn(data){
    $login.hide();
    $reg.hide();
    $userName.show().html(data.memberName+'<i>'+data.znxCount+'</i>');
    $logout.show();
    if(data.IsVip){
      //$vip.html('VIP剩余天数:'+data.vipEndDate+',易豆数:'+data.beansNum);
      $('#isVip').show();
      $('#isNotVip').hide();
    }else{
      $('#isNotVip').show();
      $('#isVip').hide();
    }
  }
  function userLogout(){
    var logoutUrl = '';
    $.ajax({
      type: 'post',
      url: logoutUrl,
      data: '' ,
      dataType: 'jsonp',
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