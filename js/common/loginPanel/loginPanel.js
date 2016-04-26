/*
弹出登录面板
*/
define(['./loginIframe.css', 'tools', 'layer', 'headJs'], function (require, exports, module) {

    var tools = require('tools'), layerIndex, initElemt = require('headJs').InitElemt;
    require('layer');
    var logincall = function (_this, success, parameter) {
        if (!$("#username").val()) {
            layer.tips('请输入帐号', $("#username"), {
                guide: 1,
                time: 1,
                style: ['background-color:#F26C4F; color:#fff', '#F26C4F'],
                maxWidth: 240
            });
            return false;
        };
        if (!$("#password").val()) {
            layer.tips('请输入密码', $("#password"), {
                guide: 1,
                time: 1,
                style: ['background-color:#F26C4F; color:#fff', '#F26C4F'],
                maxWidth: 240
            });
            return false;
        };

        if (!$("#vcode").val()) {
            layer.tips('请输入验证码', $("#vcode"), {
                guide: 1,
                time: 1,
                style: ['background-color:#F26C4F; color:#fff', '#F26C4F'],
                maxWidth: 240
            });
            return false;
        };
        if (_this.hasClass('ajaxing')) {
            return false;
        }
        _this.addClass('ajaxing');
        _this.html('正在登录....');
        //这里涉及到跨域请求使用jsonp格式
        $.getJSON("/Member/ashx/memberlogin.ashx?callback=?", { n: $("#username").val(), p: $("#password").val(), c: $("#vcode").val(), r: $("#rem").attr("checked"), isLayOut: 1 }, function (d) {
            _this.removeClass('ajaxing');
            _this.html('登录');
            if (d.Success) {
                //loginInfo.isLogin = true;
                //loginInfo.memberName = d.Data;
                layer.close(layerIndex);
                initElemt(d.Success, d);
                if (success) success(parameter);
            } else {
                var objId = d.Data || d.LOGIN_NAME || "username";
                layer.tips(d.Message || d.MEMBER_ID, $('#' + objId), {
                    guide: 1,
                    time: 1,
                    style: ['background-color:#F26C4F; color:#fff', '#F26C4F'],
                    maxWidth: 240
                });
                $("#cdimg").attr("src", "/validateCode.hxl?s=1&t=4&n=" + new Date().getTime().toString());

            }

        });
    };
    //弹出登录框
    function showLoginForm(success, parameter) {
        var userName = tools.cookieHelp.GetCookie('reLoginName');
        var html = [
        '   <div id="popBox">',
        '<div class="Box"><div class="h_title">欢迎登录</div>',
        '<h3 id="handle"></h3>',
        '<div class="">',
        '<div class="login_box">',
        '<div class="div2">',
        '<center><table cellpadding="0" cellspacing="0">',
        '<tr>',
        '<td width="277">账户<br/><input class="input_out text" id="username" type="text" value="' + function () {
            if (userName) return userName;
            else return '';
        } () + '" /></td>',
        '</tr>',
        '<tr><td height="5px;"></td>',
        '</tr>',
        '<tr>',
        '<td>密码<br/><input class="input_out text1" id="password" type="password" /></td>',
        '</tr>',
        '<tr><td height="5px;"></td>',
        '</tr>',
        '<tr>',
        '<td>验证码<br/><input class="input_out text2" id="vcode" type="text"><img src="" width="90" height="30" id="cdimg" style="vertical-align: bottom;"></td>',
        '</tr>',
        '<tr><td height="5px;"></td></tr>',
        '<tr>',
        '<td><input  type="checkbox"  id="rem" ' + function () {
            if (userName) return 'checked="checked"';
        } () + '/>记住密码<a href="/Step1" class="ml10" target="_blank">忘记密码</a></td>',
        '</tr>',
        '<tr height="5px;"></td></tr>',
        '<tr><td style="padding:5px 0px;"><a class="enter" href="javascript:void(0)" id="loginOn">登&nbsp;&nbsp;&nbsp;&nbsp;录</a></td></tr>',
        '</table></center>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="clear"></div>',
        '</div>',
        '</div>'
    ].join('');
        layerIndex = $.layer({
            type: 1,
            title: false,
            page: {
                html: html
            },
            area: ['402px', 'auto'],
            offset: ['100px', ''],
            border: [3, 0.3, '#000', true],
            success: function () {
                var vcode = $('#cdimg');
                vcode.attr('src', "/validateCode.hxl?s=1&t=4&n=" + new Date().getTime().toString());
                vcode.click(function () {
                    vcode.attr('src', "/validateCode.hxl?s=1&t=4&n=" + new Date().getTime().toString());
                });
                $('#loginOn').click(function () {
                    logincall($(this), success, parameter);
                });
            }
        });
    }
    module.exports = showLoginForm;
});