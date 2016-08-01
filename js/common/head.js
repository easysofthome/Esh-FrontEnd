define(function (require, exports, module) {
    var baseUrl = "http://test.easysofthome.com/"
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
  'loginUrl':baseUrl+'Member/ashx/login.ashx'
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
      var loginHTML = $('<a id="user_login" href="' + baseUrl + 'Account/Home/Login.aspx">登录</a>');
      var regHTML = $('<a id="user_reg" href="' + baseUrl + 'Account/Home/Register.aspx">注册</a>');
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
        $vipWrapper = $('<a href="' + baseUrl + '/VIPPay" id="isNotVip" class="vip-ser"></a>');
      $vipWrapper.append('<span class="vip"></span>开通VIP会员');
    }else{
        $vipWrapper = $('<a href="' + baseUrl + '/VIPPay" id="isNotVip" class="vip-ser"></a>');
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
    var $userName = $('<a id="username" href="' + baseUrl + 'Account/Home/Index.aspx">' + data.memberName + '<i>' + data.znxCount + '</i></a>');
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

  },
  setZNX : function(result){
    loginInfoObj.znxCount = result.znxCount;
  },
  //登出请求
  userLogout : function(){
  $.getJSON(loginInfoObj.loginUrl+'?callback=?', { action: 'loginOut' }, function (result) {
                if (result) {
                   //注册登出事件
                  window.location =baseUrl + 'Account/Home/Login.aspx';
                }
            });
  }
  }
  //登出后刷新页面
  window.loginOutcall = function (result) {
      if(result.Success){
        location.reload();
      }
  };

  //判断登录状态
  $.getJSON(loginInfoObj.loginUrl+'?callback=?', { action: 'loginCheck' }, function (result) {
                if (result) {
                   loginObj.loadLoginInfo(result);
                   //注册登出事件
                  $('#user_logout').bind('click',function(){
                      if(exports.userLogout){
                        exports.userLogout();
                      }else{
                        loginObj.userLogout();
                      }
                  });
                }
            });


  exports.userLogout;
  exports.loadLoginInfo=loginObj.loadLoginInfo;
});