define(function (require, exports, module) {
  require('jquery');

  var $login = $('#user_login');
  var $reg = $('#user_reg');
  var $userName = $('#username');
  var $logout = $('#user_logout');
  var $vip = $('#vipService');
  var url = '';



  var loginInfoObj = {
  'isLogin':true,
  'memberName':'',
  'MemberID':'',
  'IsVip':false,
  'znxCount':0,
  }


  var loginObj = {
 loadLoginInfo : function(result){
    if(result){
      loginInfoObj.isLogin = result.Success;
      loginInfoObj.memberName = result.LOGIN_NAME;
      loginInfoObj.MemberID = result.MEMBER_ID;
      loginInfoObj.IsVip = result.IsVip == 1 ? true : false;
      loginObj.setZNX(result);
      loginObj.showHeaderInfo(loginInfoObj);
    }
  },
  showHeaderInfo : function(data){
    if(data){
      if(data.isLogin){
        loginObj.loggedIn(data);
      }else{
        loginObj.noLogin();
      }
    }
  },
  noLogin : function(){
      var loginHTML = $('<a id="user_login" href="/html/VIP/common/regLog/login.html">登录</a>');
      var regHTML = $('<a id="user_reg" href="/html/VIP/common/regLog/register.html">注册</a>');
    if($('.user').length > 0 ){
      var $loginWrapper = $('<div class="login"></div>');
      $loginWrapper.append(loginHTML);
      $loginWrapper.append(regHTML);
      $('.user').append($loginWrapper);
      loginObj.showVIP(false);
    }else{
       loginObj.showVIP(false);
       loginHTML.addClass('lf butt_right');
       regHTML.addClass('lf butt_right');
       $('.header-top').find('.top').prepend(regHTML);
       $('.header-top').find('.top').prepend(loginHTML);
    }

  },
  showVIP : function(IsVip){
    var $vipWrapper = '';
    var $consumer = $('<a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA0NzY0MV8yNjc2MDVfNDAwMDg3NTgxNV8yXw"></a>');
    $consumer.append('<span class="service"></span>客户服务');
    if(!IsVip){
      $vipWrapper = $('<a href="/html/VIP/common/Pay/purchase.html" id="isNotVip" class="vip-ser"></a>');
      $vipWrapper.append('<span class="vip"></span>开通VIP会员');
    }else{
      $vipWrapper = $('<a href="/html/VIP/common/Pay/purchase.html" id="isNotVip" class="vip-ser"></a>');
      $vipWrapper.append('点击续费');
    }
    if($('.user').length > 0 ){
      $('.user').append($vipWrapper);
      $('.user').append($consumer);
    }else{
      $vipWrapper.addClass('lf butt_right');
      $consumer.addClass('lf butt_right');
      $('.header-top').find('.top').prepend($consumer);
      $('.header-top').find('.top').prepend($vipWrapper);
    }

  },
  loggedIn : function(data){
    var $loginWrapper = $('<div class="login"></div>');
    var $userName = $('<a id="username" href="/html/VIP/common/index.html">'+data.memberName+'<i>'+data.znxCount+'</i></a>');
    var $logout = $('<a id="user_logout" href="javascript:void(0)">退出</a>');
    if($('.user').length > 0 ){
      $loginWrapper.append($userName);
      $loginWrapper.append($logout);
      $('.user').append($loginWrapper);
      loginObj.showVIP(data.IsVip);
    }else{
      loginObj.showVIP(data.IsVip);
      $logout.addClass('lf butt_right');
      $userName.addClass('lf butt_right');
      $('.header-top').find('.top').prepend($logout);
      $('.header-top').find('.top').prepend($userName);
    }


    $('#user_logout').bind('click',function(){
      if(exports.userLogout){
        exports.userLogout();
      }else{
        loginObj.userLogout();
      }
  });
  },
  setZNX : function(result){
    loginInfoObj.znxCount = result.znxCount;
  },
  userLogout : function(){
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
  }

  $.ajax({
      type: 'post',
      url: url,
      data: '' ,
      dataType: 'jsonp',
      beforeSend:function(){
      },
      success: function(data){
        loginObj.loadLoginInfo(data);
      },
      error : function() {
        console.log('---ajax加载异常---');
      }
    });



  exports.userLogout;
  exports.loadLoginInfo=loginObj.loadLoginInfo;
});