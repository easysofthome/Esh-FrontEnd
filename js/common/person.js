define(function (require, exports, module) {
    require('jquery');
    var jQueryAjax = require('jQueryAjax'),
        alertify = require('alertify'),
    regValidate = require('js/app/Member/register/RegisterjdValidate');
    var sendVCode = regValidate.sendVCode;
    var validatePrompt = regValidate.validatePrompt, validateFunction = regValidate.validateFunction, checkInviteCode = regValidate.checkInviteCode, validateRegName = regValidate.validateRegName, ckType = regValidate.ckType, validateRules = regValidate.validateRules, validateSettings = regValidate.validateSettings,
  createParam = jQueryAjax.createParam,
     Register = {
         init: function () {
             var th = Register;
             $(".changimg").click(function () {
                 $('#vcImg').attr('src', "/validateCode.hxl?t=4&n=" + new Date().getTime().toString());
                 return false;
             });
             $("#ckBoxInviteCode").change(function () {
                 if (this.checked)
                     $("#txtInviteCode").show();
                 else {
                     $("#txtInviteCode").hide();
                     $("#txtInviteCode_error").removeClass().text("");
                    // $("#txtInviteCode").val("");
                 }
             });
             $('#vcImg').attr('src', "/validateCode.hxl?t=4&n=" + new Date().getTime().toString());
             th.bindPWDLevel();
         },
         bindPWDLevel: function () {
             $('#pwd').bind('keyup', function (e) {
                 var $el = $(e.currentTarget);
                 var level = PwdLevelGetter.getLevel($el.val());
                 $el.removeClass('input-pwd-low');
                 $el.removeClass('input-pwd-normal');
                 $el.removeClass('input-pwd-good');
                 $el.removeClass('input-pwd-high');
                 $('#removeli').remove();
                 //  $el.next().remove();
                 if ($el.val() != '') {
                     if (level == 0) {
                         $el.addClass('input-pwd-low');
                     } else if (level == 1) {
                         $el.addClass('input-pwd-normal');
                     } else if (level == 2) {
                         $el.addClass('input-pwd-good');
                     } else if (level == 3) {
                         $el.addClass('input-pwd-high');
                     }
                 }
             });
         }
     };
    var initqylx = function () {
        var typeStr = $('#TypeStr').val();
        if (typeStr) {
            var typeObj = eval(typeStr);
            $('[name=MEMBER_TYPE]').change(function () {
                hasTypefun(typeObj);
            });
            hasTypefun(typeObj);
        }
    };

    var hasTypefun = function (typeObj) {
        $("#purpose").val('');
        $("#purpose").attr("sta", '');
        $("#purpose_succeed").removeClass("succeed");
        var obj;
        var name = $('input:radio:checked').val();
        for (var i = 0, len = typeObj.length; i < len; i++) {
            if (typeObj[i].NAME == name) {
                obj = typeObj[i];
                break;
            }
        }
        var children = obj && obj.children;
        if (children && children.length > 0) {
            var str = new Array();
            for (var j = 0, len1 = children.length; j < len1; j++) {
                var childernObj = children[j];
                str.push([
                '<input id="ENTERPRISETYPEID' + childernObj.ENTERPRISETYPEID + '" tabindex="13" class="checkbox" name="COMPANY_TYPE"  type="checkbox" value="' + childernObj.ENTERPRISETYPEID + '"><label class="pad" for="ENTERPRISETYPEID' + childernObj.ENTERPRISETYPEID + '">' + childernObj.NAME + '</label>'
            ]);
                if ((j + 1) % 5 == 0)
                    str.push(['<br/>']);
            }
            $('#qylxdiv').html(str.join(' '));
        } else {
            $('#qylxdiv').html('<span class="label">零售商暂无企业类型</span>');
            $("#purpose_error").html("");
            $("#purpose_error").removeClass();
            $("#purpose_succeed").addClass("succeed");
            $("#purpose").val('1');
            $("#purpose").attr("sta", 2);
        }
        $("input:checkbox[name='COMPANY_TYPE']").unbind('click');
        $("input:checkbox[name='COMPANY_TYPE']").bind("click", function () {
            var value1 = $("#purpose").val();
            var value2 = $(this).val();
            if ($(this).attr("checked") == 'checked') {
                if (value1.indexOf(value2) == -1) {
                    $("#purpose").val(value1 + value2);
                    $("#purpose").attr("sta", 2);
                    $("#purpose_error").html("");
                    $("#purpose_error").removeClass();
                    $("#purpose_succeed").addClass("succeed");
                }
            } else {
                if (value1.indexOf(value2) != -1) {
                    value1 = value1.replace(value2, "");
                    $("#purpose").val(value1);
                    if ($("#purpose").val() == "") {
                        $("#purpose").attr("sta", 0);
                        $("#purpose_succeed").removeClass("succeed");
                    }
                }
            }
        });
    };


    //获得密码强度
    var PwdLevelGetter = {
        getLevel: function (value) {
            if (value.match(/^\d{1,7}$/)) {
                return 0;
            } else if (value.match(/^[a-zA-Z]{1,7}$/)) {
                return 0;
            } else if (value.match(/^[^a-zA-Z0-9]{1,7}$/)) {
                return 0;
            } else if (value.match(/^\d{8,}$/)) {
                return 1;
            } else if (value.match(/^[a-zA-Z]{8,}$/)) {
                return 1;
            } else if (value.match(/^[^a-zA-Z0-9]{8,}$/)) {
                return 1;
                //字母和数字组合2-7位
            } else if (value.match(/^[a-zA-Z0-9]{2,7}$/) && value.match(/[a-zA-Z]+/) && value.match(/\d+/)) {
                return 1;
                //符号和数字组合2-7位
            } else if (value.match(/^[^a-zA-Z]{2,7}$/) && value.match(/[^a-zA-Z0-9]+/) && value.match(/\d+/)) {
                return 1;
                //符号和字母合2-7位
            } else if (value.match(/^[^\d]{2,7}$/) && value.match(/[^a-zA-Z0-9]+/) && value.match(/[a-zA-Z]+/)) {
                return 1;
                //字母和数字组合8-16位
            } else if (value.match(/^[a-zA-Z0-9]{8,}$/) && value.match(/[a-zA-Z]+/) && value.match(/\d+/)) {
                return 2;
                //符号和数字组合8-16位
            } else if (value.match(/^[^a-zA-Z]{8,}$/) && value.match(/[^a-zA-Z0-9]+/) && value.match(/\d+/)) {
                return 2;
                //符号和字幕合8-16位
            } else if (value.match(/^[^\d]{8,}$/) && value.match(/[^a-zA-Z0-9]+/) && value.match(/[a-zA-Z]+/)) {
                return 2;
                //符号、数字和字母合3-7位
            } else if (value.match(/^.{3,7}$/) && value.match(/\d+/) && value.match(/[a-zA-Z]+/) && value.match(/[^a-zA-Z0-9]+/)) {
                return 2;
                //符号、数字和字母合8-16位
            } else if (value.match(/^.{8,}$/) && value.match(/\d+/) && value.match(/[a-zA-Z]+/) && value.match(/[^a-zA-Z0-9]+/)) {
                return 3;
            }
            return 0;
        }
    };

    var initYanzheng = function () {
        $.extend(
    validateFunction, {
        regValidate: function () {
            var array = ["#regName", "#pwd", "#pwdRepeat", '#authcode'];
            $("#regName").jdValidate(validatePrompt.regName, validateFunction.regName, true);
            $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
            $("#validateNum").jdValidate(validatePrompt.validateNum, validateFunction.validateNum, true);
            $("#pwdRepeat").jdValidate(validatePrompt.pwdRepeat, validateFunction.pwdRepeat, true);
            if ($("#purpose").length > 0) {
                $("#purpose").jdValidate(validatePrompt.purpose, validateFunction.purpose, true);
                array.push("#purpose");
            }
            $('#authcode').jdValidate(validatePrompt.authcode, validateFunction.authcode, true);
            return validateFunction.FORM_submit(array);
        },
        purpose: function (option) {
            var purpose = $("input:checkbox[@name='COMPANY_TYPE']");
            if (validateRules(purpose)) {
                validateSettings.succeed.run(option);
            } else {
                validateSettings.error.run(option, option.prompts.isNull);
            }
        },
        authcode: function (option) {
            var bool = validateRules.isNull(option.value);
            if (bool) {
                validateSettings.error.run(option, option.prompts.error);
                return;
            } else {
                validateSettings.succeed.run(option);
            }
        }
    });
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd);
        $("#pwdRepeat").jdValidate(validatePrompt.pwdRepeat, validateFunction.pwdRepeat);
        $("#regName").jdValidate(validatePrompt.regName, validateFunction.regName);
        $("#mobileCode").jdValidate(validatePrompt.mobileCode, validateFunction.mobileCode);
        $("#txtInviteCode").jdValidate(validatePrompt.InviteCode, validateFunction.InviteCode);
        $("#validateNum").jdValidate(validatePrompt.validateNum, validateFunction.validateNum);

    };
    var isSubmit = false;
    function checkReadMe() {
        if ($("#readme").attr("checked") == "checked") {
            $("#protocol_error").removeClass().addClass("error hide");
            return true;
        } else {
            $("#protocol_error").removeClass().addClass("error");
            return false;
        }
    }
    function agreeonProtocol() {
        if ($("#readme").attr("checked") == "checked") {
            $("#protocol_error").removeClass().addClass("error hide");
            return true;
        }
    }
    function protocolReg() {
        $("#closeBox").click();
        $('#readme').attr('checked', 'checked');
        reg();
    }
    function reg(isnext) {
        if (isSubmit) {
            return;
        }
        var agreeProtocol = checkReadMe();
        var regNameok = validateRegName();
        var type = ckType();
        var inviteCode = checkInviteCode();
        isSubmit = true;

        var passed = validateFunction.regValidate() && regNameok && agreeProtocol && type && inviteCode;
        //pageTracker._trackEvent('Button', 'Regist', 'Normal');
        if (passed) {
            if (isnext == 1 || isnext == 2) {
                $("#registNextOne").attr({ "disabled": "disabled" }).removeClass().addClass("btn-img next-step wait-btn");
            } else {
                $("#registsubmit").attr({ "disabled": "disabled" }).removeClass().addClass("btn-img btn-regist wait-btn");
            }
            $.ajaxjson("/Member/ashx/MemberRegister.ashx", createParam("reg", "", "personRegForm") + "&cd=" + $("#authcode").val() + "&invitaCode=" + $("#txtInviteCode").val() + "&validateNum=" + $('#validateNum').val(), function (d) {
                if (d.Success) {
                    isSubmit = false;
                    if (isnext == 1) {
                        var registType = $("#registNextOne").attr("data-type");
                        window.location = "/RegisteredInfo?registType=" + registType;
                    } else {
                        //现在是注册后就直接登录
                        window.location = "/Index";
                        //                        alertify.set({
                        //                            labels: {
                        //                                ok: "立即登录",
                        //                                cancel: "取消"
                        //                            }
                        //                        });
                        //                        alertify.confirm("注册成功！ 现在登录吗？？", function (e) {
                        //                            if (e) {
                        //                                window.location = "/login/Login";
                        //                            }
                        //                        });
                    }
                }
                else {
                    if (d.Message == '帐号已经被注册') {
                        alertify.confirm(d.Message + "！ 现在登录吗？？", function (e) {
                            if (e) {
                                window.location = "/login/Login";
                            }
                        });

                    } else {
                        msg.alert(d.Message);
                        $('#vcImg').attr('src', "/validateCode.hxl?t=4&n=" + new Date().getTime().toString());
                    }
                    isSubmit = false;
                }

                if (isnext == 1 || isnext == 2) {
                    $("#registNextOne").removeAttr("disabled").removeClass().addClass("btn-img next-step");
                } else {
                    $("#registsubmit").removeAttr("disabled").removeClass().addClass("btn-img btn-regist");
                }
            }, { Message: "正在提交,请稍后...", LoadingType: 2, IsShowLoading: false });
        } else {
            $("#registsubmit").removeAttr("disabled").removeClass().addClass("btn-img btn-regist");
            $("#registNextOne").removeAttr("disabled").removeClass().addClass("btn-img next-step");
            isSubmit = false;
        }
    }

    function popupReg() {
        var agreeProtocol = checkReadMe();
        var passed = validateRegName() && validateFunction.regValidate() && agreeProtocol;
        if (passed) {
            $("#popupRegButton").attr({ "disabled": "disabled" }).removeClass().addClass("btn-img btn-regist wait-btn");
            $.ajax({
                type: "POST",
                url: "../reg/regService?r=" + Math.random(),
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $("#popupPersonRegForm").serialize(),
                success: function (result) {
                    if (result) {
                        var obj = eval(result);
                        if (obj.info) {
                            alert(obj.info);
                            verc();
                            $("#popupRegButton").removeAttr("disabled").removeClass().addClass("btn-img btn-regist");
                            return;
                        }
                        if (obj.noAuth) {
                            verc();
                            window.parent.location = obj.noAuth;
                            return;
                        }
                        if (obj.success == true) {
                            window.parent.jdModelCallCenter.init(true);
                            return;
                        }
                    }
                }
            });
        } else {
            $("#popupRegButton").removeAttr("disabled").removeClass().addClass("btn-img btn-regist");
        }
    }

    function popupContinueReg() {
        $("#protocolContent").removeClass().addClass("regist-bor hide");
        $("#popupPersonRegForm").show();

        popupReg();
    }

    function showProtocol() {
        $("#popupPersonRegForm").hide();
        $("#protocolContent").removeClass().addClass("regist-bor");
    }
    $('#registsubmit').click(function () {
        reg(0);
    });
    $("#registNextOne").click(function () {
        reg(1);
    });

    $('#sendCode').click(sendVCode);
    window.protocolReg = new regValidate.protocolReg(reg);
    window.showHideProtocol = regValidate.showHideProtocol;
    module.exports.initqylx = initqylx;
    module.exports.init = Register.init;
    module.exports.initYanzheng = initYanzheng;
});

