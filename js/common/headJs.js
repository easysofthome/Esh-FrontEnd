define([], function (require, exports, module) {
    //headjsState:uninit:未初始化,
    var qqTxCode = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA0NzY0MV8yNjc2MDVfNDAwMDg3NTgxNV8yXw";
    require.async(['layer'], function (obj) {
        layer = obj;
    });
    var $ = require('jquery'), layer,
        STATUS = {
            uninit: 0,
            init: 1,
            GetLoginState: 2,
            LoginStateReturn: 3,
            createElm: 4,
            createElmed: 5
        };
    $('.homeHeader').show();
    /* 侧栏 */
    var autoMenuHeight = function () {
        var ctt, meu, ch, mh;

        ctt = $('.uc-content');
        meu = $('.uc-menu');
        ch = ctt.outerHeight() + 30;
        mh = meu.outerHeight();

        if (ch > mh) {
            meu.css({
                'height': ch
            });
        }
    },
    loginUrl = '/Member/ashx/login.ashx', loginOutReload = false,
        headInit = {
            init: function (config) {
                module.exports.state = STATUS.init;

                $(function () {
                    headscript();

                });
                LoginCheck();
                inittoolBar();
                if (config && config.loginOutReload) {
                    loginOutReload = true;
                }
            }
        },
        headscript = function () {
            var menuList = $('#J_Menu li');
            var subMenuEl = $('#J_subMenus');
            var menuEl = $('#J_Menu');
            var childMenuEl = $('#J_subMenus dd>a');
            var subMenuEls = $('.sub-menu');
            var coords = [];
            var lastPoint = {};
            var downMoveEnd = {};
            var getCoords = function () {
                var coords_Arr;
                coords_Arr = [];
                $.each(menuList, function (o, i) {
                    var coord;
                    coord = {
                        'start': $(i).offset().left,
                        'end': $(i).offset().left + $(i).width(),
                        'elm': $(i)
                    };
                    if (typeof ($(i).attr("data-menu")) == "undefined") {
                        $(i).on('mouseleave', function (e) {
                            return hideSubmenu();
                        });
                    }
                    return coords_Arr.push(coord);
                });
                return coords_Arr;
            };
            var setPaddingLeft = function () {
                var pyWidth = 60;
                var documentWidth = $(this.document).width();
                if (documentWidth < 1738) {
                    if (documentWidth > 1500) {
                        pyWidth = 150;
                    } else if (documentWidth > 1300) {
                        pyWidth = 280;
                    } else if (documentWidth > 1150) {
                        pyWidth = 350;
                    } else {
                        pyWidth = 450;
                    }
                }
                coords = getCoords();
                return $.each(menuList, function (o, i) {
                    var sub_menu, menuId, menuType, _left, _menu_width;
                    sub_menu = $('#' + $(i).attr('data-menu'));
                    menuId = sub_menu.find('.first');
                    menuType = $(i).attr('data-case');
                    if (menuType === 'one') {
                        _left = $(i).find('h2').offset().left - 115;
                    } else if (menuType === 'two') {
                        _left = $('.header-inner nav').offset().left - pyWidth;
                    } else if (menuType === 'three') {
                        _menu_width = $(window).width() > 1024 ? 290 : 370;
                        _left = menuEl.offset().left + menuEl.width() - _menu_width - parseInt($(i).css('padding-right'));
                    }
                    //if (sub_menu.hasClass('menu_hengxiang')) {
                    //    sub_menu.find('.firstwindth').css({
                    //        width: '430px'
                    //    });
                    //}
                    return $(menuId).css({
                        marginLeft: _left
                    });
                    //return $(menuId).css({
                    //    left: _left,
                    //    position: 'absolute'
                    //});

                });
            };
            var showSubmenu = function (li) {
                var menuId, rowEl;
                rowEl = $(li);
                menuId = '#' + rowEl.attr('data-menu');
                rowEl.addClass('selected').siblings().removeClass('selected');
                return $(menuId).addClass('show').siblings().removeClass('show');
            };
            var hideSubmenu = function () {
                subMenuEl.find('.sub-menu').removeClass('show');
                return menuList.removeClass('selected');
            };
            var getDirection = function (e, xy) {
                var currentPoint, dir;
                currentPoint = {
                    x: e.pageX,
                    y: e.pageY
                };
                if (xy === 'y') {
                    if (lastPoint.y > currentPoint.y) {
                        dir = 'up';
                    } else if (lastPoint.y < currentPoint.y) {
                        dir = 'down';
                    } else if (lastPoint.y = currentPoint.y) {
                        dir = 'hor';
                    }
                } else {
                    if (lastPoint.x > currentPoint.x) {
                        dir = 'left';
                    } else if (lastPoint.x < currentPoint.x) {
                        dir = 'right';
                    } else if (lastPoint.x = currentPoint.x) {
                        dir = 'hor';
                    }
                }
                lastPoint = currentPoint;
                return dir;
            };
            var ie = '';
            if (window.ActiveXObject) {
                var ua = navigator.userAgent.toLowerCase();
                ie = ua.match(/msie ([\d.]+)/)[1];
            }

            if (ie !== 6.0) {
                setPaddingLeft();
                menuEl.on('mouseleave', function (e) {
                    var _e;
                    _e = e;
                    return setTimeout(function () {
                        var _left, _width;
                        _left = menuEl.offset().left;
                        _width = menuEl.width();
                        if (((_e.pageX < _left || _e.pageX > _left + _width) && _e.pageY < 75) || _e.pageY < 0) {
                            return hideSubmenu();
                        }
                    }, 400);
                }).on('mousemove', function (e) {
                    var dir, el;
                    dir = getDirection(e, 'y');
                    if (dir === 'up' || dir === 'hor') {
                        el = {};
                        return $.each(coords, function (o, i) {
                            if (i.start < e.pageX && e.pageX < i.end) {
                                return showSubmenu(i.elm);
                            }
                        });
                    } else {
                        clearTimeout(downMoveEnd);
                        return downMoveEnd = setTimeout(function () {
                            if (e < 75) {
                                el = {};
                                return $.each(coords, function (o, i) {
                                    if (i.start < e.pageX && e.pageX < i.end) {
                                        return showSubmenu(i.elm);
                                    }
                                });
                            }
                        }, 1800);
                    }
                });
                subMenuEls.on('mouseleave', function (e) {
                    var dir, _left, _width;
                    dir = getDirection(e, 'y');
                    if (dir === 'down') {
                        hideSubmenu();
                    }
                    if (dir === 'up') {
                        _left = menuEl.offset().left;
                        _width = menuEl.width();
                        if (e.pageX < _left || e.pageX > _left + _width) {
                            return hideSubmenu();
                        }
                    }
                });


                //childMenuEl.on('focus', function () {
                //    var dataMenu;
                //    dataMenu = $(S.DOM.parent(this, '.sub-menu')).attr('id');
                //    return showSubmenu(S.DOM.children(menuEl, 'li[data-menu="' + dataMenu + '"]'));
                //});
                $(window).on('resize', setPaddingLeft);
                //$(document.body).on('click', function (e) {
                //    if (!S.DOM.contains(subMenuEl, $(e.target)) && !S.DOM.contains(menuEl, $(e.target))) {
                //        return hideSubmenu();
                //    }
                //});
                return $('#J_Menu li').on('singleTap', function (e) {
                    if ($(this).hasClass('selected')) {
                        return hideSubmenu();
                    }
                });
            } else {
                $('.sub-menu').css({
                    'top': 0,
                    'filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100) !important',
                    'display': 'none'
                });
                $('.first').css({
                    'margin-left': '5%'
                });
                menuList.on('mouseenter', function (e) {
                    $(this).addClass('selected').siblings().removeClass('selected');
                    $('#' + $(this).attr('data-menu')).show();
                    return $('#' + $(this).attr('data-menu')).siblings().removeClass('show');
                });
                subMenuEls.on('mouseleave', function () {
                    return subMenuEls.hide();
                });
                return $('#J_Logined').on('mouseenter', function () {
                    return $(this).addClass('hover');
                }).on('mouseleave', function () {
                    return $(this).removeClass('hover');
                });
            }

        }, //检查用户是否登录
        LoginCheck = function (callBackFunction) {
            module.exports.state = STATUS.GetLoginState;
            $.getJSON('/Member/ashx/login.ashx?callback=?', { action: 'loginCheck' }, function (result) {
                if (result) {
                    module.exports.state = STATUS.LoginStateReturn;
                    if (callBackFunction) callBackFunction();
                    //    if (result.Success) {
                    //注册登出事件
                    require.async('check_browser_close', function (initcheckOut) {
                        initcheckOut();
                    });
                    // }
                    $(function () {
                        InitElemt(result.Success, result);
                        module.exports.state = STATUS.createElmed;
                        module.exports.eventObj.trigger('createElmed');

                    });

                }
            });
        },

        inittoolBar = function () {

            /* 顶部导航 */
            var changeCurrentLightLeft = function (dom) {

                if (dom.length <= 0) {
                    return;
                }

                $('.uc-current-light')
                    .css({
                        'left': dom.position().left,
                        'width': dom.outerWidth()
                    })
                    .removeClass('uc-current-light-hide');
            };

            $('.uc-nav-list a').mouseenter(function () {
                changeCurrentLightLeft($(this));
            });

            $('.uc-nav-list ul').mouseleave(function () {
                changeCurrentLightLeft($('.uc-nav-list .current'));
            });

            changeCurrentLightLeft($('.uc-nav-list .current'));



            autoMenuHeight();
        }, //退出
logOut = function () {
    //if (call != undefined)
    //    that.funLoginoutCall = call;
    var script = document.createElement("script");
    script.src = loginUrl + "?action=loginOut&t=" + new Date().getTime();
    script.id = "scloginout";
    document.body.appendChild(script);
},
InitElemt = function (Success, memberInfo) {
    module.exports.state = STATUS.createElm;
    //var headElm = $('.hd-simple');
    var appHtml = '<div class="eshapp"><div class="app-title"><a class="user-uid" target="_blank" href="javascript:void(0);">易家纺下载区</a>  <i></i></div><div class="app-content" style="left: -500px; height: 0px; width:100px;"><div class="app-yjf clearfix"><div class="clearfix"><strong>APP客户端</strong><div class="clearfix"><div class="lf"><img class="appLoadApple" src="/Static/Images/apple.png"></div><div class="lf"><a href="javascript:void(0);" target="_blank" class="btn-app-apple">Iphone</a><a href="/AppDownload" target="_blank" class="btn-app-download">下载</a></div></div><div class="f-mt10"><div class="lf"><img class="appLoadAndroid" src="/Static/Images/android.png"></div><div class="lf"><a href="javascript:void(0);" target="_blank" class="btn-app-android">Android</a><a href="/AppDownload" target="_blank" class="btn-app-download">下载</a></div></div></div><div class="f-mt10"><strong>PC客户端</strong><div class=""><a href="/Download" target="_blank" class="btn-app-download" style="margin-left:50px;">PC客户端下载</a></div></div></div></div></div>';
    //    if (headElm[0]) {
    //        if (Success) {
    //            loginInfo.isLogin = true;
    //            loginInfo.memberName = memberInfo.LOGIN_NAME;
    //            loginInfo.MemberID = memberInfo.MEMBER_ID;

    //            headElm.append('     <div class="y-row hd-layer"><div class="y-span3"><a class="aliyun-logo logoysh" href="javascript:void(0)" title="打造家纺第一品牌"  ></a></div><div class="y-span9 y-last"><div class="aliyun-login y-hide"><span class="li-spacing"></span><div class="top2"><a href="http://www.easysofthome.com/English.html" target="_blank" class="img rg" style="padding-left:14px"><img src="/Images/us.gif" >&nbsp;English</a><span class="li-spacing"></span><a href="http://www.easysofthome.com/" class="img rg" ><img src="/Images/cn.gif">&nbsp;中文</a>    </div><span class="li-spacing"></span><a class="lnk-message" href="/Member/MessageCenter" target="_blank" title="站内信" hidefocus="" >0</a></div><div class="aliyun-user">                 <a class="lnk-user" href="/MemberIndex" hidefocus=""><span><span class="user-uid">' + loginInfo.memberName + '</span><i></i></span></a><div class="user-list"><ul><li><a href="javascript:void(0)" title="" target="_self" hidefocus="">退出</a></li></ul></div></div></div>        </div>');
    //            $('.hd-simple .aliyun-user .user-list a').click(logOut);
    //            $('.hd-simple .aliyun-user').mouseenter(function () {
    //                var t = $(this), lnk, menu, lnkPos;

    //                lnk = t.find('.lnk-user');
    //                menu = t.find('.user-list');

    //                lnk.addClass('lnk-user-selected lnk-user-rotate');
    //                lnkPos = lnk.offset();

    //                menu
    //                    .css({
    //                        'left': lnkPos.left,
    //                        'width': lnk.outerWidth(),
    //                        'height': 31
    //                    });
    //            }).mouseleave(function (ev) {
    //                var t = $(this), lnk, menu;

    //                lnk = t.find('.lnk-user');
    //                menu = t.find('.user-list');
    //                lnk.removeClass('lnk-user-selected lnk-user-rotate');
    //                menu
    //                      .css({
    //                          'height': 0
    //                      });
    //            });
    //            GetZNX(memberInfo.znxCount);
    //        } else {
    //            headElm.append('     <div class="y-row hd-layer"><div class="y-span3"><a class="aliyun-logo logoysh" href="javascript:void(0)" title="打造家纺第一品牌"  >' +
    //                '</a></div><div class="y-span9 y-last"><div class="aliyun-login y-hide">' +
    //                '<span class="li-spacing"></span><div class="top2">' +
    //                '<a href="http://www.easysofthome.com/English.html" target="_blank" class="img rg" style="padding-left:14px">' +
    //                '<img src="/Images/us.gif" >&nbsp;English</a><a href="http://www.easysofthome.com/" class="img rg" ><img src="/Images/cn.gif">&nbsp;中文</a>' +
    //                '<a href="/Registered" id="btn" class="rg">注册</a><a href="/login/Login" class="rg">登录</a></div>' +
    //                '<div class="aliyun-user">' +
    //                '</div></div>        </div>');
    //        }
    //    } else {
    var headElm = $('.top1');
    if (headElm[0]) {
        if (Success) {
            loginInfo.isLogin = true;
            loginInfo.memberName = memberInfo.LOGIN_NAME;
            loginInfo.MemberID = memberInfo.MEMBER_ID;
            var isVip = memberInfo.IsVip == 1 ? "续费VIP会员" : "开通VIP会员";
            headElm.html('<a href="http://www.easysofthome.com/English.html" target="_blank" class="img rg"><span  class="english"></span>&nbsp;English</a><span class="li-spacing"></span><a href="'+qqTxCode+'" target="_blank" class="img rg">客服服务</a><span class="li-spacing"></span>' +
            //APP客户端下载
                    '' + appHtml + '<span class="li-spacing"></span>' +
                    '<a href="/RenewVIP" class="img rg"><i class="vipimg"></i>&nbsp;' + isVip + '</a><span class="li-spacing"></span>' +
            //会员基本信息
                    '<div class="eshUser rg"><div class="lnk-user"><a class="user-uid"  id="mcLink" target="_blank" href="/MemberIndex">' + loginInfo.memberName + '</a>' +
                    ' <a class="lnk-message">0</a> <i></i></div><div class="user-list" style="left: -500px;  height: 0px;"><div class="user-list-info"><div class="user-list-info-pic"><a target="_blank" href="/MemberIndex" >' +
                    '<img id="mProfile" src="' + memberInfo.headImg + '" style="border-radius: 10px;"></a></div><div class="user-list-info-txt"><span>现金余额：</span><br><a class="num-highlight" id="mPrepayMoney" href="/MemberIndex" target="_blank">￥' + memberInfo.Money + '</a><a href="/AcountManger/recharge" target="_blank" id="lnk_charge" >充值</a></div>' +
                    '</div><ul><li><a href="/Member/Index">设置个人资料</a></li><li><a href="/AcountManger/Index">账户管理</a></li><li><a href="/membercenter/designlist">我的设计</a></li><li><a href="/MemberCenter/mctasklist">我的协作</a></li><li><a href="/MemberCenter/MyDataSearchCriteria">我的数据</a></li><li><a href="/Member/MessageCenter" target="_blank" >消息中心<span class="num-highlight" id="mMessageCount">(0)</span></a></li><li><a href="/Member/personalleter" target="_blank" >私信<span class="num-highlight">(' + memberInfo.inboxLetterCount + ')</span></a></li><li><a target="_self" id="lnk_logout" href="javascript:void(0)" >退出</a></li></ul></div></div>');
            GetZNX(memberInfo.znxCount);
            var fnTimer;
            $('.top1 .eshUser').mouseenter(function () {
                fnTimer = setTimeout(function () {
                    var lnk, menu, lnkPos;

                    lnk = $('.lnk-user');
                    menu = $('.user-list');

                    lnk.addClass('lnk-user-selected lnk-user-rotate');
                    lnkPos = lnk.offset();

                    menu.css({
                        'left': lnkPos.left,
                        'width': Math.max(menu.outerWidth() || 120, lnk.outerWidth()),
                        'height':270
                    });
                }, 250);
            }).mouseleave(function (ev) {
                clearTimeout(fnTimer);
                var lnk, menu;
                lnk = $('.lnk-user');
                menu = $('.user-list');
                lnk.removeClass('lnk-user-selected lnk-user-rotate');

                menu.css({
                    'left': -500,
                    'height': 0
                });
            });
            $('.lnk-message').css('float', 'none');
            $('#lnk_logout').click(logOut);
            GetApp();

        } else {
            headElm.html('<a href="http://www.easysofthome.com/English.html" class="img rg"><span  class="english"></span>&nbsp;English</a><span class="li-spacing"></span><a href="'+qqTxCode+'" target="_blank" class="img rg">客服服务</a><span class="li-spacing"></span>' +
            //APP客户端下载 lnk-user-selected lnk-user-rotate
                '' + appHtml + '<span class="li-spacing"></span>' +
                '<a href="/RenewVIP" target="_blank" class="img rg"><i class="vipimg"></i>&nbsp;开通VIP会员</a><span class="li-spacing"></span><a href="/Registered" id="btn"  class="img rg">注册</a><span class="li-spacing"></span><a href="/login/Login" class="img rg headloginbtn" >登录</a>');
            GetApp();
        }
    }

    //}
};
    //loginOutcall
    window.loginOutcall = function (d) {
        //that.Islogin = false;
        //that.funLoginoutCall();
        if (loginOutReload) location.reload();
        else $('.top1').html('<a href="/login/Login">登录</a><a href="/Registered" id="btn">注册</a><a href="' + qqTxCode + '" target="_blank" class="img rg">客服服务</a><a href="http://www.easysofthome.com/English.html" class="img"><img class="englist" src="" width="20" height="11"/>&nbsp;English</a>');
        //$("#scloginout").remove();
        //$("#loginInfo").html('欢迎来到易家纺！');
        //$(".top1").html('<a href="' + homeurl + '/login/Login">登录</a><a href="' + homeurl + '/Registered" id="btn">注册</a><a href="#" class="img"><img src="/Images/cn.gif"/>&nbsp;中文</a><a href="" class="img"><span  class="english"></span>&nbsp;English</a>');

    };
    var loginInfo = {
        isLogin: false,
        memberName: '',
        MemberID: ''
    },
    GetApp = function () {
        var fnApp;
        $('.top1 .eshapp').mouseenter(function () {
            fnApp = setTimeout(function () {
                var lnk, menu, lnkPos;

                lnk = $('.app-title');
                menu = $('.app-content');

                lnk.addClass('lnk-user-selected lnk-user-rotate');
                lnkPos = lnk.offset();

                menu.css({
                    'left': lnkPos.left,
                    'width': 220,
                    'height': 280
                });
            }, 250);
        }).mouseleave(function (ev) {
            clearTimeout(fnApp);
            var lnk, menu;
            lnk = $('.app-title');
            menu = $('.app-content');
            lnk.removeClass('lnk-user-selected lnk-user-rotate');

            menu.css({
                'left': -500,
                'height': 0
            });
        });
    },
    //获取站内信
GetZNX = function (znxCount) {
    var msg = $('.lnk-message span');
    if (!msg[0]) msg = $('.lnk-message');
    msg.text(znxCount);
    var znxem = $('#ZNXem');
    if (znxem[0]) znxem.text(znxCount);
    if ((znxCount - 0)) {
        msg.addClass('has-message');
        var msgli = $('#mMessageCount');
        if (msgli[0]) {
            msgli.text('(' + znxCount + ')');
        }
    }
    $('.hd-simple .load-hide').removeClass('load-hide');
};
    ///更新用户层包括余额和站内信信息
    var updateMemberPanel = function () {
        if ($('.top1')[0]) {
            $.getJSON('/Member/ashx/login.ashx?callback=?', { action: 'loginCheck' }, function (result) {
                if (result) {
                    if (result.Success) {
                        $('#mPrepayMoney').text('￥' + result.Money);
                        var msgPanel = $('#mMessageCount');
                        msgPanel.text('(' + result.znxCount + ')');
                        msgPanel.parent().parent().next().find('.num-highlight').text('(' + result.inboxLetterCount + ')');
                    }
                }
            });
        }
    };
    var currentInBoxId = '';
    var currentInBoxType = '';
    var currentMsgSoure = '';
    //私信提示模块
    // var getInBox = function (index) {
    //     $.getJSON('/MemberCenter/Setting/ashx/PersonalLetter.ashx?d='+new Date(), { action: 'getnewInbox', currentInBoxId: currentInBoxId, currentInBoxType: currentInBoxType, currentMsgSoure: currentMsgSoure }, function (data) {
    //         var html = data.Data;
    //         var htmlObj = $(html);
    //         var qMsgs= $("#q-msgs .strp-noti")
    //         qMsgs.append(htmlObj).find("li").eq(index).css({
    //             top: "130px"
    //         }).animate({
    //             top: 0
    //         }, 500);
    //         if (index == 1) {
    //             qMsgs.find('li').eq(0).remove();
    //             updateMemberPanel();
    //         }
    //         currentInBoxId = htmlObj.data('id');
    //         currentInBoxType = htmlObj.data('type');
    //         currentMsgSoure = data.soure;
    //         htmlObj.find('.know').click(function () {
    //             getInBox(1);
    //         });
    //     });

    // };
    // getInBox(0);
    $(function() {
        $('.addressTips span').click(function() {
            $('.addressTips').remove();
            $('.introduce').css({
                top:100
            })
        })
    })


    module.exports = headInit;
    module.exports.headjsState = STATUS;
    module.exports.state = STATUS.uninit;
    module.exports.eventObj = $({});
    module.exports.InitElemt = InitElemt;
    module.exports.autoMenuHeight = autoMenuHeight;
    module.exports.updateMemberPanel = updateMemberPanel;
    module.exports.loginInfo = loginInfo;
    //头部js创建完成之后回调函数（目前主要用于大首页引导用户注册和数据平台提醒用户登录之后能够获得的权限页面）
    module.exports.bindCreateHeadElmFn = function (fn) {
        if (module.exports.state > STATUS.createElm) fn && setTimeout(fn, 10);
        else {
            module.exports.eventObj.bind('createElmed', function () {
                fn && setTimeout(fn, 10);
            });
        }
    }
});


















