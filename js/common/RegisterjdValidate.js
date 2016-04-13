define(['jquery'], function (require, exports, module) {
    require.async('js/common/smartFocus/jquery.smartFocus', function (obj) { })
    var weakPwdArray = ["123456", "123456789", "111111", "5201314", "12345678", "123123", "password", "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini", "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321", "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com", "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm", "123456a", "521521", "7758258", "111222", "110110", "1314521", "11111111", "12345678", "a321654", "111111", "123123", "5201314", "00000000", "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314", "a123123", "a111111", "123321", "a5201314", "z123456", "liuchang", "a000000", "1314520", "asd123", "88888888", "1234567890", "7758521", "1234567", "woaini520", "147258369", "123456789a", "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999", "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926", "123456", "111111", "123456789", "123123", "9958123", "woaini521", "5201314", "18n28n24a5", "abc123", "password", "123qwe", "123456789", "12345678", "11111111", "dearbook", "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321", "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili", "789456123", "password", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456", "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc", "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110", "asdasdasd", "123456", "22222222", "123321123", "abc123456", "a12345678", "123456123", "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369", "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534", "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111", "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525", "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541", "540707", "leqing123", "5403693", "123456", "123456789", "111111", "5201314", "123123", "12345678", "1314520", "123321", "7758521", "1234567", "5211314", "520520", "woaini", "520131", "666666", "RAND#a#8", "hotmail.com", "112233", "123654", "888888", "654321", "1234567890", "a123456"];

    require('./register/jdThickBox.js');

    function verc() {
        $("#JD_Verification1").click();
    }

    var validateRegExp = {
        decmal: "^([+-]?)\\d*\\.\\d+$", //浮点数
        decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
        decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
        decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
        decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
        decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
        intege: "^-?[1-9]\\d*$", //整数
        intege1: "^[1-9]\\d*$", //正整数
        intege2: "^-[1-9]\\d*$", //负整数
        num: "^([+-]?)\\d*\\.?\\d+$", //数字
        num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
        num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
        ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
        chinese: "[\\u4e00-\\u9fa5]+", //仅中文
        color: "^[a-fA-F0-9]{6}$", //颜色
        date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        idcard: "^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
        ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
        letter: "^[A-Za-z]+$", //字母isNull
        letter_l: "^[a-z]+$", //小写字母
        letter_u: "^[A-Z]+$", //大写字母
        mobile: "^0?(13|15|18|14)[0-9]{9}$", //手机
        notempty: "^\\S+$", //非空
        password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
        fullNumber: "^[0-9]+$", //数字
        picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
        qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
        rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
        tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
        url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
        username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //户名
        deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$", //单位名
        zipcode: "^\\d{6}$", //邮编
        realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
        companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
        companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
        companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$"
    };
    //主函数
    (function ($) {
        $.fn.jdValidate = function (option, callback, def) {
            var ele = this;
            var id = ele.attr("id");
            var type = ele.attr("type");
            var rel = ele.attr("rel");
            var _onFocus = $("#" + id + validateSettings.onFocus.container);
            var _succeed = $("#" + id + validateSettings.succeed.container);
            var _isNull = $("#" + id + validateSettings.isNull.container);
            var _error = $("#" + id + validateSettings.error.container);
            if (def == true) {
                var str = ele.val();
                var tag = ele.attr("sta");
                if (str == "" || str == "-1") {
                    validateSettings.isNull.run({
                        prompts: option,
                        element: ele,
                        isNullEle: _isNull,
                        succeedEle: _succeed
                    }, option.isNull);
                } else if (tag == 1 || tag == 2) {
                    return;
                } else {
                    callback({
                        prompts: option,
                        element: ele,
                        value: str,
                        errorEle: _error,
                        succeedEle: _succeed
                    });
                }
            } else {
                if (typeof def == "string") {
                    ele.val(def);
                }
                if (type == "checkbox" || type == "radio") {
                    if (ele.attr("checked") == true) {
                        ele.attr("sta", validateSettings.succeed.state);
                    }
                }
                switch (type) {
                    case "text":
                    case "password":
                        ele.bind("focus", function () {
                            var str = ele.val();
                            if (str == def) {
                                ele.val("");
                            }
                            validateSettings.onFocus.run({
                                prompts: option,
                                element: ele,
                                value: str,
                                onFocusEle: _onFocus,
                                succeedEle: _succeed
                            }, option.onFocus, option.onFocusExpand);
                        })
                        .bind("blur", function () {
                            var str = ele.val();
                            if (str == "") {
                                ele.val(def);
                            }
                            if (validateRules.isNull(str)) {
                                validateSettings.isNull.run({
                                    prompts: option,
                                    element: ele,
                                    value: str,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                }, "");
                            } else {
                                callback({
                                    prompts: option,
                                    element: ele,
                                    value: str,
                                    errorEle: _error,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                });
                            }
                        });
                        break;
                    default:
                        if (rel && rel == "select") {
                            ele.bind("change", function () {
                                var str = ele.val();
                                callback({
                                    prompts: option,
                                    element: ele,
                                    value: str,
                                    errorEle: _error,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                });
                            })
                        } else {
                            ele.bind("click", function () {
                                callback({
                                    prompts: option,
                                    element: ele,
                                    errorEle: _error,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                });
                            })
                        }
                        break;
                }
            }
        }
    })(jQuery);

    //配置
    var validateSettings = {
        onFocus: {
            state: null,
            container: "_error",
            style: "focus",
            run: function (option, str, expands) {
                if (!validateRules.checkType(option.element)) {
                    option.element.removeClass(validateSettings.INPUT_style2).addClass(validateSettings.INPUT_style1);
                }
                option.succeedEle.removeClass(validateSettings.succeed.style);
                option.onFocusEle.removeClass().addClass(validateSettings.onFocus.style).html(str);
                if (expands) {
                    expands();
                }
            }
        },
        isNull: {
            state: 0,
            container: "_error",
            style: "null",
            run: function (option, str) {
                option.element.attr("sta", 0);
                if (!validateRules.checkType(option.element)) {
                    if (str == "") {
                        option.element.removeClass(validateSettings.INPUT_style2).removeClass(validateSettings.INPUT_style1);
                    } else {
                        option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    }
                }

                option.succeedEle.removeClass(validateSettings.succeed.style);
                if (str == "") {
                    option.isNullEle.removeClass().addClass(validateSettings.isNull.style).html(str);
                } else {
                    option.isNullEle.removeClass().addClass(validateSettings.error.style).html(str);
                }
            }
        },
        error: {
            state: 1,
            container: "_error",
            style: "error",
            run: function (option, str) {
                option.element.attr("sta", 1);
                if (!validateRules.checkType(option.element)) {
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                }

                option.succeedEle.removeClass(validateSettings.succeed.style);
                option.errorEle.removeClass().addClass(validateSettings.error.style).html(str);

            }
        },
        succeed: {
            state: 2,
            container: "_succeed",
            style: "succeed",
            run: function (option) {
                option.element.attr("sta", 2);
                option.errorEle.empty();
                if (!validateRules.checkType(option.element)) {
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                }

                option.succeedEle.addClass(validateSettings.succeed.style);
                option.errorEle.removeClass();
            }
        },
        INPUT_style1: "highlight1",
        INPUT_style2: "highlight2"
    }

    //验证规则
    var validateRules = {
        isChinese: function (str) {
            return new RegExp(validateRegExp.chinese).test(str);
        },
        isNull: function (str) {
            return (str == "" || typeof str != "string");
        },
        betweenLength: function (str, _min, _max) {
            return (str.length >= _min && str.length <= _max);
        },
        isUid: function (str) {
            return new RegExp(validateRegExp.username).test(str);
        },
        fullNumberName: function (str) {
            return new RegExp(validateRegExp.fullNumber).test(str);
        },
        isPwd: function (value) {
            if (value.match(/[^a-zA-Z0-9]+/) && value.match(/[a-zA-Z]+/)) {
                return true;
            }

            if (value.match(/\d+/) && value.match(/[a-zA-Z]+/)) {
                return true;
            }

            if (value.match(/[^a-zA-Z0-9]+/) && value.match(/\d+/)) {
                return true;
            }
            return false;
        },
        isPwdRepeat: function (str1, str2) {
            return (str1 == str2);
        },
        isEmail: function (str) {
            return new RegExp(validateRegExp.email).test(str);
        },
        isTel: function (str) {
            return new RegExp(validateRegExp.tel).test(str);
        },
        isMobile: function (str) {
            return new RegExp(validateRegExp.mobile).test(str);
        },
        checkType: function (element) {
            return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
        },
        isRealName: function (str) {
            return new RegExp(validateRegExp.realname).test(str);
        },
        isCompanyname: function (str) {
            return new RegExp(validateRegExp.companyname).test(str);
        },
        isCompanyaddr: function (str) {
            return new RegExp(validateRegExp.companyaddr).test(str);
        },
        isCompanysite: function (str) {
            return new RegExp(validateRegExp.companysite).test(str);
        },
        weakPwd: function (str) {
            for (var i = 0; i < weakPwdArray.length; i++) {
                if (weakPwdArray[i] == str) {
                    return true;
                }
            }
            return false;
        }
    };
    //验证文本
    var validatePrompt = {
        regName: {
            onFocus: "用户名 (只能用邮箱和手机)",
            succeed: "",
            isNull: "用户名",
            error: {
                beUsed: "该用户名已被使用，请重新输入用户名。如果您是&quot;{1}&quot;，请立刻<a href='/login.aspx' class='flk13'>登录</a>",
                badLength: "<span>用户名长度只能在4-20位字符之间,且不能为纯数字和email</span>",
                cbadLength: "<span>中文用户名长度只能在4-12位字符之间,且不能为纯数字和email</span>",
                badFormat: "用户名只能由中文、英文、数字及“_”、“-”组成",
                fullNumberName: "用户名不能是纯数字",
                notEmail: "请不要将email作为用户名",
                mustEmailOrMobile: "用户名只能是邮箱或者手机"
            },
            onFocusExpand: function () {
                $("#morePinDiv").removeClass().addClass("intelligent-error hide");
            }
        },
        validateNum: {
            onFocus: "输入验证码,将账号设定为绑定手机(邮箱)", //若填写则默认将帐号设置为绑定邮箱或手机,选填
            isNull: "请输入手机(邮箱)验证码"
        },
        pwd: {
            onFocus: "<span>密码必须为6-20位，且至少包含英文、数字和符号中的两种</span>",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在6-20位字符之间",
                badFormat: "密码必须包含英文、数字和符号中的两种",
                simplePwd: "<span>该密码比较简单，有被盗风险，建议您更改为复杂密码，如字母+数字的组合</span>",
                weakPwd: "<span>该密码比较简单，有被盗风险，建议您更改为复杂密码</span>"
            },
            onFocusExpand: function () {
                $("#pwdstrength").hide();
            }
        },
        pwdRepeat: {
            onFocus: "请再次输入密码",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在6-20位字符之间",
                badFormat2: "两次输入密码不一致",
                badFormat1: "密码必须包含英文、数字和符号中的两种"
            }
        },
        protocol: {
            onFocus: "",
            succeed: "",
            isNull: "请先阅读并同意《易上弘用户注册协议》",
            error: ""
        },
        empty: {
            onFocus: "",
            succeed: "",
            isNull: "",
            error: ""
        }, purpose: {
            onFocus: "",
            succeed: "",
            isNull: "请选择公司类型",
            error: ""
        }, authcode: {
            onFocus: "",
            succeed: "",
            isNull: "请输入验证码",
            error: ""
        }, txtCompanyNamePerson: {
            onFocus: "请输入单位名称",
            succeed: "",
            isNull: "",
            error: {
                badLength: "单位名称长度只能在1-60位字符之间,一个汉字占3个字符"
            }
            //            ,
            //            onFocusExpand: function () {
            //                $("#CompanyNamePerson_error").removeClass().addClass("intelligent-error hide");
            //            }
        }, InviteCode: {
            onFocus: "请输入邀请码",
            succeed: "",
            isNull: "请输入邀请码",
            error: ""
        }
    };

    var nameold, morePinOld, emailResult;
    var namestate = false;
    //回调函数
    var validateFunction = {
        regName: function (option) {
            $("#intelligent-regName").empty().hide();
            var errorCallBack = function () {
                var validateCode = $('#validate-code');
                if (!validateCode.hasClass('none')) {
                    validateCode.addClass('none');
                    validateCode.find('input').val('');
                }
            }

            var regName = option.value;
            var isMobile = validateRules.isMobile(regName);
            var isEmail = validateRules.isEmail(regName);
            if (validateRules.isNull(regName) || regName == '用户名') {
                option.element.removeClass(validateSettings.INPUT_style2).removeClass(validateSettings.INPUT_style1);
                $("#regName_error").removeClass().empty();
                return;
            }
            if (!(isMobile || isEmail)) {
                errorCallBack();
                validateSettings.error.run(option, option.prompts.error.mustEmailOrMobile);
                return;
            }
            $("#mobileCodeDiv").removeClass().addClass("item hide");
            $("#authcodeDiv").show();

            checkEmail(option, function () {
                var label_txt = isMobile ? '手机' : '邮箱';
                var validateCode = $('#validate-code');
                if (validateCode.hasClass('none')) {
                    validateCode.removeClass('none');
                    validateCode.find('.label').html("<b class='ftx04'>*</b>" + label_txt + '验证码');
                }
            }, errorCallBack);
            return;
            //            if (regName.length > 4 && regName.length <= 20) {
            //                if (validateRules.isChinese(regName) && regName.length > 12) {
            //                    validateSettings.error.run(option, option.prompts.error.cbadLength);
            //                    return;
            //                }
            //                if (validateRules.fullNumberName(regName)) {
            //                    validateSettings.error.run(option, option.prompts.error.fullNumberName);
            //                    return;
            //                }
            //                if (validateRules.isEmail(regName)) {
            //                    validateSettings.error.run(option, option.prompts.error.notEmail);
            //                    return;
            //                }
            //                if (!validateRules.isUid(regName)) {
            //                    validateSettings.error.run(option, option.prompts.error.badFormat);
            //                    return;
            //                }
            //                $("#mobileCodeDiv").removeClass().addClass("item hide");
            //                $("#authcodeDiv").show();
            //                checkEmail(option);
            //                return;

            //            } else {
            //                validateSettings.error.run(option, option.prompts.error.badLength);
            //                return;
            //            }
            //         else {
            //            validateSettings.error.run(option, option.prompts.error.badLength);
            //            return;
            //        }

            //
            //if (validateRules.isMobile(regName)) {
            //    checkMobile(option);
            //    return;
            //}
            //$("#mobileCodeDiv").removeClass().addClass("item hide");
            //$("#authcodeDiv").show();
        },
        validateNum: function (option) {
            var num = option.value;
        },
        CompanyNamePerson: function (option) {
            var cnpName = option.value;
            $("#intelligent-regName").empty().hide();
            if (validateRules.isNull(cnpName)) {
                option.element.removeClass(validateSettings.INPUT_style2).removeClass(validateSettings.INPUT_style1);
                $("#CompanyNamePerson_error").removeClass().empty();
                return;
            }
            var length = validateRules.betweenLength(option.value, 4, 20);
            if (!length) {
                validateSettings.error.run(option, option.prompts.error.badLength);
            }

        },
        pwd: function (option) {
            var str1 = option.value;
            var regName = $("#regName").val();
            if ((validateRules.isNull(regName) == false) && (regName != '用户名') && regName == str1) {
                $("#pwdstrength").hide();
                validateSettings.error.run(option, "<span>您的密码与账户信息太重合，有被盗风险，请换一个密码</span>");
                return;
            }

            var str2 = $("#pwdRepeat").val();
            var format = validateRules.isPwd(option.value);
            var length = validateRules.betweenLength(option.value, 6, 20);

            $("#pwdstrength").hide();
            if (!length && format) {
                validateSettings.error.run(option, option.prompts.error.badLength);
            } else if (!length && !format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else if (length && !format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                option.element.removeClass();
                option.element.addClass('text').addClass('highlight1');
                validateSettings.succeed.run(option);
            }
            if (str2 == str1) {
                $("#pwdRepeat").focus();
            }
        },
        pwdRepeat: function (option) {
            var str1 = option.value;
            var str2 = $("#pwd").val();
            var length = validateRules.betweenLength(option.value, 6, 20);
            var format2 = validateRules.isPwdRepeat(str1, str2);
            var format1 = validateRules.isPwd(str1);
            if (!length) {
                validateSettings.error.run(option, option.prompts.error.badLength);
            } else {
                if (!format1) {
                    validateSettings.error.run(option, option.prompts.error.badFormat1);
                } else {
                    if (!format2) {
                        validateSettings.error.run(option, option.prompts.error.badFormat2);
                    }
                    else {
                        validateSettings.succeed.run(option);
                    }
                }
            }
        },

        mobileCode: function (option) {
            var bool = validateRules.isNull(option.value);
            if (bool) {
                validateSettings.error.run(option, option.prompts.error);
                return;
            } else {
                validateSettings.succeed.run(option);
            }
        },
        protocol: function (option) {
            if (option.element.attr("checked") == true) {
                option.element.attr("sta", validateSettings.succeed.state);
                option.errorEle.html("");
            } else {
                option.element.attr("sta", validateSettings.isNull.state);
                option.succeedEle.removeClass(validateSettings.succeed.style);
            }
        },
        checkGroup: function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].checked) {
                    return true;
                }
            }
            return false;
        },
        checkSelectGroup: function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].value == -1) {
                    return false;
                }
            }
            return true;
        },

        FORM_submit: function (elements) {
            var bool = true;
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).attr("sta") == 2) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
            }

            return bool;
        }, InviteCode: function (elements) {
            var value = elements.value;
            if (value.indexOf("邀请码") != -1) {
                validateSettings.isNull.run({
                    prompts: elements.prompts,
                    element: elements.element,
                    value: value,
                    isNullEle: elements.isNullEle,
                    succeedEle: elements.succeedEle
                }, "");
            } else {
                $.getJSON("/Member/ashx/Register/checkInviteCode.ashx", { inviteCode: value, isperson: $('#isperson').val() == '1' }, function (data) {
                    if (data != null) {
                        //0 可以使用   1：已被使用  2：邀请码错误
                        if (data.useState == "0") {
                            //elements.errorEle.text("");
                            //elements.errorEle.removeClass().addClass("blank");

                            validateSettings.succeed.run(elements);
                        }
                        else if (data.useState == "1") {
                            elements.errorEle.text("此邀请码已被使用");
                            //elements.errorEle.removeClass().addClass("error");
                            //elements.element.removeClass().addClass("text highlight2");
                            validateSettings.error.run(elements);
                        }
                        else if (data.useState == "2") {
                            elements.errorEle.text("邀请码错误");
                            //elements.errorEle.removeClass().addClass("error");
                            //elements.element.removeClass().addClass("text highlight2");
                            validateSettings.error.run(elements);
                        }
                        else if (data.useState == "3") {
                            elements.errorEle.text("您使用的是企业邀请码,无法邀请个人");
                            validateSettings.error.run(elements);
                        }
                    }
                });
            }
        }
    };



    function selectMe(option) {
        $("#morePinDiv").removeClass().addClass("intelligent-error hide");
        $("#regName").val(option.value);
        $("#regName").blur();
    }

    function checkEmail(option, succedCallback, errorCallBack) {
        var email = option.value;
        var email = strTrim(option.value);
        //var format = validateRules.isEmail(email);
        //var format2 = validateRules.betweenLength(email, 0, 50);
        //if (!format) {
        //    validateSettings.error.run(option, "邮箱地址不正确，请重新输入");
        //} else {
        //    if (!format2) {
        //        validateSettings.error.run(option, "邮箱地址长度应在4-50个字符之间");
        //    } else {
        if (!namestate || nameold != email) {
            if (nameold != email) {
                nameold = email;
                option.errorEle.html("<em style='color:#999'>检验中……</em>");
                $.getJSON("/Member/ashx/Register/checkUnique.ashx?email=" + escape(option.value) + "&r=" + Math.random(), function (date) {

                    emailResult = date.Data;
                    if (date.Data == 0) {
                        validateSettings.succeed.run(option);
                        namestate = true;
                        if ($("#mail")) {
                            $("#mail").val(option.value);
                        }
                        if (succedCallback) succedCallback();
                    }
                    if (date.Data == 1) {
                        if (errorCallBack) {
                            errorCallBack();
                        }
                        validateSettings.error.run(option, "该帐号已存在，立刻<a  class='flk13' href='/login/Login'>登录</a>");
                        namestate = false;
                    }
                });
            }
            else {
                namestate = false;
                if (emailResult == 1) {
                    validateSettings.error.run(option, "该帐号已存在，立刻<a  class='flk13' href='/login/Login'>登录</a>");
                }
                if (emailResult == 2) {
                    validateSettings.error.run(option, "邮箱地址不正确，请重新输入");

                }
                if (emailResult == 3) {
                    validateSettings.error.run(option, "<span>中国雅虎邮箱已经停止服务,请您换一个邮箱</span>");
                }
            }
        }
        else {
            validateSettings.succeed.run(option);
        }
        //  }
        // }
    }
    //发送验证码
    function sendVCode() {
        var btn = $(this);
        if (btn.attr("disabled") == 'disabled') {
            return;
        }
        var num = strTrim($('#regName').val());
        var isMobile = validateRules.isMobile(num);
        var isEmail = validateRules.isEmail(num);
        if (!isMobile && !isEmail) {
            return;
        } else {
            var ashxUrl = '/Member/ashx/' + (isMobile ? 'SendVCMsgHandler.ashx' : 'SendEmailVC.ashx');
            var paraName = isMobile ? 'phone' : 'email';
            var para = {};
            para[paraName] = num;
            para['txtInviteCode'] = $('#txtInviteCode').val();
            $("#dyMobileButton").html("正在发送验证码");
            btn.removeClass().addClass("btn btn-15").attr("disabled", "disabled");
            $.getJSON(ashxUrl, para, function (data) {
                if (data.success) {
                    countDown();
                    if (data.errorMessage.length === 6)
                        alert(data.errorMessage);
                } else {
                    countDownStop();
                    alert(data.existMsg || data.errorMessage || '发送失败');
                }
            })
        }
    }

    var delayTime = 120;
    function countDownStop() {
        delayTime = 120;
        $("#dyMobileButton").html("获取验证码");
        $("#sendCode").removeClass().addClass("btn").removeAttr("disabled");
    }

    function countDown() {
        delayTime--;
        $("#dyMobileButton").html(delayTime + '秒后重新获取');
        if (delayTime == 0) {
            countDownStop();
        } else {
            setTimeout(countDown, 1000);
        }
    }

    function strTrim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    var emailSurfixArray = ['@163.com', '@126.com', '@qq.com', '@sina.com', '@gmail.com', '@sohu.com', '@vip.163.com', '@vip.126.com', '@188.com', '@139.com', '@yeah.net'];

    //function moreName(event) {
    //    var sval = this.value;
    //    event = event ? event : window.event;
    //    var keyCode = event.keyCode;
    //    var vschool = $('#intelligent-regName');
    //    if (keyCode == 40 || keyCode == 38 || keyCode == 13) {
    //        var tipindex = $("#hnseli").val() == "" ? -1 : $("#hnseli").val();
    //        var fobj;
    //        if (keyCode == 40) {
    //            tipindex++;
    //            if (tipindex == vschool.find("li").length) {
    //                tipindex = 0;
    //                vschool.find("li").eq(vschool.find("li").length - 1).css("background-color", "");
    //            }
    //            fobj = vschool.find("li").eq(tipindex);
    //            vschool.find("li").eq(tipindex - 1).css("background-color", "");
    //            fobj.css("background-color", "#EEEEEE");
    //            $("#regName").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
    //            $("#schoolid").val(fobj.attr("value"));
    //            $("#hnseli").val(tipindex);
    //            return;
    //        } else if (keyCode == 38) {
    //            tipindex--;
    //            if (tipindex <= -1) {
    //                tipindex = vschool.find("li").length - 1;
    //                vschool.find("li").eq(0).css("background-color", "");
    //            }
    //            vschool.find("li").eq(tipindex + 1).css("background-color", "");
    //            fobj = vschool.find("li").eq(tipindex);
    //            fobj.css("background-color", "#EEEEEE");
    //            if (fobj.html() != null) {
    //                $("#regName").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
    //                $("#schoolid").val(fobj.attr("value"));
    //            }
    //            $("#hnseli").val(tipindex);
    //            return;
    //        } else if (keyCode == 13) {
    //            $("#hnseli").val("-1");
    //            if ($("#regName").val().length >= 1) {
    //                var combinedValue = vschool.find("li").eq(tipindex).html();
    //                if (combinedValue != null) {
    //                    $("#regName").val(combinedValue.replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
    //                }
    //                vschool.empty().hide();
    //                if ($("#schoolid").val() != "") {
    //                    $("#hnschool").val("1");
    //                    $("#hnschool").attr("sta", 2);
    //                    $("#regName").blur();
    //                } else {
    //                    $("#hnschool").val("-1");
    //                    $("#hnschool").attr("sta", 0);
    //                    $("#regNamel_error").html("");
    //                    $("#regName_succeed").removeClass("succeed");
    //                }
    //                return;
    //            }
    //        }
    //    } else {
    //        //hide morePin
    //        $("#morePinDiv").removeClass().addClass("intelligent-error hide");

    //        if (sval != "") {
    //            var userinput = sval;
    //            var oldSval = "";
    //            var pos = sval.indexOf("@");
    //            if (pos >= 0) {
    //                oldSval = sval.substring(0, pos);
    //            }

    //            $("#schoolid").val("");
    //            $("#hnseli").val("-1");
    //            var html = "";
    //            if (/[\u4E00-\u9FA5]/g.test(sval) || sval.indexOf("-") > -1 || sval.indexOf("_") > -1) {
    //                html = "<li>" + sval + "</li>";
    //            } else {
    //                if (oldSval != '') {
    //                    sval = oldSval;
    //                }
    //                if (userinput.indexOf("@") == 0) {
    //                    sval = "";
    //                }
    //                html = "<li>" + userinput + "</li>";
    //                var partSurfix = initEmailSurfixArray(userinput);
    //                if (partSurfix != null) {
    //                    for (var i = 0; i < partSurfix.length; i++) {
    //                        html += "<li>" + sval + partSurfix[i] + "</li>";
    //                    }
    //                }
    //            }
    //            if (sval.length > 25) {
    //                $('#intelligent-regName').hide();
    //            } else {
    //                $('#intelligent-regName').show();
    //                $('#intelligent-regName').html(html).find("li").mousedown(function () {
    //                    $("#regName").val($(this).html());
    //                    $("#schoolid").val($(this).attr("value"));
    //                    $("#hnseli").val("-1");
    //                });
    //            }
    //        } else {
    //            $('#intelligent-regName').html("").hide();
    //            $("#schoolid").val("");
    //            $("#hnseli").val("-1");
    //        }
    //    }
    //}

    //$("#regName").keyup(moreName);
    //$("#regName").focus(moreName);

    function initEmailSurfixArray(str) {
        var pos = str.indexOf("@");
        if (pos < 0 || pos == (str.length - 1)) {
            return emailSurfixArray;
        }
        var inputSurfix = str.substring(pos, str.length);
        var suitableSurfixArray = [];
        var j = 0;
        for (var i = 0; i < emailSurfixArray.length; i++) {
            if (emailSurfixArray[i].indexOf(inputSurfix) == 0) {
                suitableSurfixArray[j] = emailSurfixArray[i];
                j++;
            }
        }

        return suitableSurfixArray;
    }



    //$("#regName").blur(function () {
    //    setTimeout(function () {
    //        if ($("#schoolid").val() == "") {
    //            $("#schoolinput").val("");
    //            $("#hnschool").val("-1");
    //            $("#hnschool").attr("sta", 0);
    //            $("#schoolinput_succeed").removeClass("succeed");
    //        } else {
    //            $("#hnschool").val("1");
    //            $("#hnschool").attr("sta", 2);
    //            $("#schoolinput_error").html("");
    //            $("#schoolinput_succeed").addClass("succeed");
    //        }
    //        $('#intelligent-school').hide().empty();
    //        $("#hnseli").val("-1");
    //    }, 200)
    //})

    // 用户协议
    $(function () {
        $("#privacyPromises").click(function () {
            jQuery.jdThickBox({
                type: "text",
                title: "隐私承诺",
                width: 922,
                height: 450,
                source: "<div class=\" regist-2013\">" +
                "<div class=\"regist-bor\">" +
                "<div class=\"mc\">" +
                "<div id=\"protocol-con\">" +
                " <h4>网站隐私条款</h4>" +
                "<h2>" +
                       " 1、承诺：<br/>" +
                       "</h2>" +
               "<p>" +
                        "我们致力于保护您在使用我们网站时所提供的私隐、私人资料以及个人的资料( 统称\"个人资料\" ), 使我们在收集、使用、储存和传送个人资料方面符合(与个人资料私隐有关的法律法规) 及消费者保护方面的最高标准。" +
                    "</p>" +

               "<p>为确保您对我们在处理个人资料上有充分信心, 您切要详细阅读及理解隐私政策的条文。<br/>" +
               "特别是您一旦使用我们的网站, 将被视为接受、同意、承诺和确认:</p>" +
               "<p>" +
                        "(1)您在自愿下连同所需的同意向我们披露个人资料; <br/>" +
                        "(2)您会遵守本隐私政策的全部条款和限制; <br/>" +
                        "(3)您在我们的网站上作登记、资料会被收集; <br/>" +
                        "(4)您同意日后我们对隐私政策的任何修改; <br/>" +
                        "(5)您同意我们的分公司、附属公司、雇员、就您可能会感兴趣的产品和服务与您联络( 除非您已经表示不想收到该等讯息)。<br/>" +
                    "</p>" +

                 "<h2>" +
                            "2、被收集的个人资料的种类 " +
                    "</h2>" +
                        "<p>" +
                            "经您同意, 我们会收集、管理和监控个人资料。为了向您提供我们的各项服务, <br/>" +
                             "您需要供給那些我们认为为达到你的指示和进一步改善我们的服务所需的个人资料和不具名的资料, 包括但不限于: " +
                        "</p>" +
                        "<h3>" +
                            "2.1、个人和企业资料<br/>" +
                            "</h3>" +
                        "<p>" +
                            "个人包括您的姓名、性别、年龄、出生日期、QQ、身份证号、电话号码、传真号码、住址或通讯地址、电子邮箱地址等。 <br/>" +
                            "企业包括您的企业名称、工商执照、电话号码、地址、电子邮箱等。" +
                        "</p>" +
                        "<h2>" +
                            "2.2、不具名的资料<br/>" +
                            "</h2>" +
                         "<p>" +
                             "收集个人资料及不具名的资料的目的及用途如下: <br/>" +
                            "(1)当您使用我们的网站时, 能辨认及确认您的身份;<br/>" +
                            "(2)让您使用我们的网站时得到为您而设的感受;<br/>" +
                            "(3)我们的顾客服务人员有需要时可以与您联系;<br/>" +
                            "(4)统计我们网站使用量的数据;<br/>" +
                            "(5)令您使用我们网站时更方便;<br/>" +
                            "(6)为改进我们的产品、服务及网站内容而进行市场研究调查;<br/>" +
                            "(7)为我们搞的活动、市场销售和推广计划收集资料;<br/>" +
                            "(8)遵守法律、政府和监管机关的规定, 包括但不限于对个人资料披露及通知的规定;;<br/>" +
                            "(9)让我们及可能处于您住的国家之外的我们的分公司、附属公司、关联公司、雇员、代理人、服务伙伴或其它跟我们合作的第三者进行产品及/或服务的推广;<br/>" +
                            "(10)就我们提供的各项服务, 分析、核对及/或审查您的信用、付款及/或地位;<br/>" +
                            "(11)处理在您要求下的任何付款指示, 直接扣帐及/或信用安排;<br/>" +
                            "(12)使您能运作您的账户及/或使我们能从账户支取尚欠的服务费;<br/>" +
                        "</p>" +
                        "<br/>" +
                        "<p>" +
                                "保存个人资料及不具名资料<br/>" +
                                "您提供给我们的个人资料及不具名资料, 只保留到搜集的目的已达到的时候, 除非应适用的法律法规之规定而继续保留。 <br/>" +
                            "<p>" +
                            "<br/>" +
                        "<p>" +
                                "个人资料的拥有权及披露<br/>" +
                                "在我们网站上所搜集的一切资料都由我们所拥有, 不会出租或出售给任何无关的第三方。然而, 个人资料可以披露给: <br/>" +
                            "<p>" +
                            "<br/>" +
                        "<p>" +
                                "直销<br/>" +
                                "一旦向我们提供了您的个人资料, 您可能会收到我们或我们的分公司而发给你的电话、电邮和直销通讯。<br/>" +
                                "若您不希望收到我们的直销和推广资料, 请联系我们。我们会尊重您的要求, 不再在直销活动上使用您的个人资料。 <br/>" +
                            "<p>" +
                            "<br/>" +
                         "<p>" +
                                "个人资料的保护<br/>" +
                                "我们实施妥适的实物、电子、管理及技术方面的措施来保护和保障您的个人资料的安全。<br/>" +
                                "我们尽力确保通过我们网站所搜集的任何个人资料皆免于任何与我们无关的第三者的滋扰。我们采取的安全措施包括但不限于: <br/>" +
                                "(1)实物措施: 存有您个人资料的记录会被存放在有锁的地方<br/>" +
                                "(2)电子措施: 存有您个人资料的电脑数据会被存放在受严格登入限制的电脑系统和存储媒体上。<br/>" +
                                "(3)管理措施: 只有经我们授权的职员才能接触到您的个人资料, 这些职员需要遵守我们个人资料保密的内部守则。<br/>" +
                                "(4)技术措施: 可能采用如Secure Socket Layer Encryption这种加密技术来输送您的个人资料。<br/>" +
                                "(5)其它措施:  我们的网络服务器受到\"防火墙\"的保护。<br/>" +
                                "<br/>" +
                                "若您知悉我们的网站上有任何安全方面的漏洞, 请不要遟疑去联絡我们, 使我们可以尽快采取妥适的行动。<br/>" +
                                "尽管实施了上述技术和保安的措施, 我们不能保证资料在互联网上的输送绝对安全, <br/>" +
                                "因此我们不能绝对保证您通过我们网站提供给我们的个人资料在一切时候都是安全的。<br/>" +
                                "对任何因未经授权而接触您个人资料所发生的事件我们一槪不承担责任, 于这方面产生或导致的任何损失或损害, 我们也不负责赔偿。" +
                            "<p>" +
                            "<br/>" +
                          "<p>" +
                                "未成年人<br/>" +
                                "若任何家长或监护人相信有未成年人在未经家长或监护人批准或同意下向我们提供了个人资料, <br/>" +
                                "请随便联系我们的客户服务部, 以确保该资料被除去, 并从我们的促销名单中撤下。<br/>" +
                            "<p>" +
                            "<br/>" +
                            "<p>" +
                                "接达及更正个人资料,您有权:<br/>" +
                                "(1)查询我们是否持有您的任何个人资料; <br/>" +
                                "(2)接达我们所持有的您的个人资料; <br/>" +
                                "(3)要求我们更正任何不正确的个人资料; <br/>" +
                                "(4)不时地征询有关我们所持有的个人资料的性质, 政策和执行方法。 <br/>" +
                                "然而在法律允许的极端有限的情况下,我们可以不允许您接达您的个人资料, 例如: <br/>" +
                                "1)如您接达及得到您个人资料可能会对您有危险; <br/>" +
                                "2)当您的个人资料可能会影响一项正在进行的调查;  <br/>" +
                                "3)当您的个人资料涉及到法庭程序, 并且可能受到发现的限制。 <br/>" +
                                "4)当您的个人资料涉及一项商业上敏感的决策过程;<br/>" +
                                "5)当另外一個人的个人资料也包含在同一份记录中。<br/>" +
                                "6)若您欲接达或更正个人资料, 或索取有关个人资料的政策、执行方法和被持有的个人资料的种类,<br>" +
                                " 应致函到我们的下列的地址。要求接达或更正资料可能要付合理的处理费用。<br/>" +
                            "<p>" +
                            "<br/>" +
                             "<p>" +
                                "安全保管您的密码<br/>" +
                                "除了我们致力确保您的个人资料存放和处理的安全外, 您不应向任何人披露您的登录密码或帐户资料, 以保护您的个人资料。<br/>" +
                                "每当您登录我们网站时, 尤其是当您使用他人的电脑或者是公共的互联网终端机时, 请记着操作完毕后一定要点击退出。<br/>" +
                                "您的努力和协助对于我们保护您的个人资料绝对有帮助。<br/>" +
                            "<p>" +
                            "<br/>" +
                             "<p>" +
                                "隐私政策的修改<br/>" +
                                "本隐私政策可以不时( 无需事先向您通知)被修改。任何对隐私政策的修改都会刊登在我们网站上。<br/>" +
                            "<p>" +
                            "<br/>" +
                             "<p>" +
                                "联系我们<br/>" +
                                "若您对我们的隐私政策有任何问题或忧虑, 欢迎随时联系我们。<br/>" +
                            "<p>" +

                "</div>" +
                "      <div class=\"btnt\">" +
                "         <input  class=\"btn-img\"  type=\''button\" value='同意并继续' onclick='protocolReg();'/>" +
                "     </div>" +
                "</div>" +
                "</div>" +
                "</div>",
                _autoReposi: true
            });
        });

        $('#protocol').click(function () {
            jQuery.jdThickBox({
                type: "text",
                title: "易上弘用户注册协议",
                width: 922,
                height: 450,
                source: "<div class=\" regist-2013\">" +
                "<div class=\"regist-bor\">" +
                "<div class=\"mc\">" +
                "<div id=\"protocol-con\">" +
                " <h4>易上弘用户注册协议</h4>" +

               "<p>" +
                       " 尊敬的客户：<br>" +
                        "欢迎您注册成为易家纺网站用户。在注册前请您仔细阅读如下服务条款：<br>" +
                        "本服务协议双方为易家纺网站与本网站用户，本服务协议具有合同效力，适用于您使用易家纺网站所提供的各项工具、软件、信息和服务（以下简称服务）。用户确认本服务协议后，本服务协议即在用户和本网站之间产生法律效力。无论用户事实上是否在注册之前认真阅读了本服务协议，只要客户按照本网站注册程序成功注册为用户，或者以任何方式进入并使用易家纺网站的服务，即表示您已充分阅读、理解并同意自己已经与易家纺订立本协议，且您接受本协议的所有条款和条件。" +
                    "</p>" +
                "    <h5> 一、总则</h5>" +

               "<p>1.1  本网站各项内容和服务的所有权和运作权归杭州易上弘网络技术有限公司所有。</p>" +

                "<p>1.2  本网站可随时自行全权决定更改本协议的任意条款。如条款有任何变更，易家纺网仅将在网站上发布新条款予以公示，用户应当及时关注并同意，本站不承担通知义务。如用户不同意相关变更，则必须停止使用服务。经修订的条款一经在本网站公布后，立即自动生效。一旦用户继续使用服务，则表示用户已接受经修订的条款，当用户与易家纺发生争议时，应以最新的条款为准。除另行明确声明外，任何使服务范围扩大或功能增强的新内容均受本协议约束。</p>" +

                "<p>1.3  本协议内容包括协议正文及所有易家纺已经发布或将来可能发布的各类规则，本站的通知、公告、声明或其它类似内容是本协议不可分割的一部分，与本协议正文具有同等法律效力。</p>" +
                "    <h5>二、服务内容及收费</h5>" +

                "    <p>" +
                "        2.1  网站的具体内容由本网站根据实际情况提供。</p>" +

                "    <p>" +
                "       2.2  本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。" +
                "    </p>" +
                  "    <p>" +
                "       2.3  本网站目前处于测试阶段，提供的各项服务暂时免费。但易家纺保留收费的权利，有权在正式营运后的任何时间对网站用户实行全部或部分功能收费服务制。" +
                "    </p>" +
                  "    <p>" +
                "      2.4  易家纺保留在无须发出书面通知，仅在易家纺网站公示的情况下，暂时或永久地更改或停止部分或全部服务的权利，且对用户和任何第三方均无需承担任何责任。如果不同意所改动的内容，用户可以主动取消获得的本网站服务。如果用户继续享用本网站服务，则视为接受服务条款的变动。" +
                "    </p>" +
                "    <h5> 三、用户账户</h5>" +

                "<p>3.1  本网站的服务，仅供能够根据相关法律合法签署具有法律约束力的合约的自然人、法人和其他组织使用。易家纺可随时自行全权决定拒绝向任何服务对象提供服务。服务不会提供给被暂时或永久中止资格的易家纺会员。</p>" +
                    "p>3.2  有关用户资料<br>用户同意：<br>⑴ 提供真实、准确、完整和能反映当前情况的资料。<br>⑵ 同意接收来自本网站的信息。<br>⑶ 不断更新注册资料，符合真实、准确、完整和能反映当前情况的要求。所有原始键入的资料将引用为注册资料。<br>" +
                        "⑷提供任何不真实、不准确、不完整或不能反映当前情况的资料，或易家纺有合理理由怀疑该等资料不真实、不准确、不完整或不能反映当前情况，本网站有权暂停或终止用户的注册身份及资料，并拒绝用户在目前或将来对服务(或其任何部份)&nbsp;以任何形式使用。" +
                    "</p><p>3.3  电子邮件用户在注册时应当选择稳定性及安全性相对较好的电子邮箱，并且同意接受并阅读本网站发往用户的各类电子邮件。如用户未及时从自己的电子邮箱接受电子邮件或因用户电子邮箱或用户电子邮件接收及阅读程序本身的问题使电子邮件无法正常接收或阅读的，只要本网站成功发送了电子邮件，应当视为用户已经接收到相关的电子邮件。电子邮件在发信服务器上所记录的发出时间视为送达时间。" +
                         "</p><p>3.4  用户的帐号、密码和安全性<br>在用户按照注册页面提示填写信息、阅读并同意本协议并完成全部注册程序后或以其他易家纺允许的方式实际使用易家纺网站服务时，用户即成为易家纺会员（亦称会员），易家纺根据会员注册名和密码确认用户的身份。用户须自行负责对自己的会员注册名和密码保密，且须对自己在会员注册名和密码下发生的所有活动（包括但不限于发布信息资料、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。用户如发现任何人未经授权使用自己的会员注册名或密码，或发生违反保密规定的任何其他情况，应立即修改帐号密码并妥善保管，如有必要，应通知易家纺。<br>" +
                            "易家纺不能也不会对因用户未能遵守本款规定而发生的任何损失或损毁负责。易家纺对因用户名、密码保管不严或因黑客原因造成账号失窃，产生的后果（包括但不限于用户的任何损失）不承担任何责任。<br>" +
                             "用户或本网站可随时根据实际情况中断一项或多项服务。对于免费用户，易家纺可自行全权决定以任何理由（包括但不限于用户违反本协议，或超过90天未登录网站等），随时中断服务。对于收费用户，应基于合理的怀疑且经电子邮件通知的情况下实施上述终止服务的行为。<br>" +
                             "用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站服务不满，用户可以行使如下权利：<br>(1) 不再使用本网站信息服务。<br>(2) 通知本网站停止对该用户的服务。<br>" +
                             "结束用户服务后，用户使用本网站服务的权利马上中止。从那时起，用户没有权利，本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。" +
                         "</p>" +
                "    <h5> 四、使用规则</h5>" +

               "<p>4.1  遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。</p>" +
                   "<p>4.2  用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：<br>" +
                        "⑴违反宪法确定的基本原则的；<br>⑵危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br>⑶损害国家荣誉和利益的；<br>⑷煽动民族仇恨、民族歧视，破坏民族团结的；<br>" +
                       "⑸破坏国家宗教政策，宣扬邪教和封建迷信的；<br>⑹散布谣言，扰乱社会秩序，破坏社会稳定的；<br>⑺散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；" +
                        "<br>⑻侮辱或者诽谤他人，侵害他人合法权益的；<br>⑼煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；" +
                        "<br>⑽以非法民间组织名义活动的；<br>⑾发布虚假或者欺诈信息<br>⑿含有法律、行政法规禁止的其他内容的。</p>" +
                    "<p>4.3  用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；</p>" +
                    "<p>4.4  当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；</p><p>" +
                        "4.5 用户应遵循以下原则<br>" +
                        "(1)不得为任何非法目的而使用本网站服务；<br>(2)遵守所有与网络服务有关的网络协议、规定和程序；<br>(3)不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为；" +
                        "<br>(4) 遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的<br>" +
                        "⑸不得利用本站进行任何不利于本站的行为。<br>" +
                        "⑹不得使用任何装置、软件或例行程序干预或试图干预易家纺网站的正常运作。不得采取任何将不合理或不合比例的庞大负载加诸易家纺网络结构的行动。用户不得向任何第三者披露密码，或与任何第三者共用密码，或为任何未经易家纺书面同意的目的使用密码。<br>" +
                        "如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。" +
                    "</p><p>4.6  本站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其帐号的服务。</p><p>4.7  当用户违反本协议，易家纺有权要求关联方中止、终止对同一实际用户提供部分或全部服务，且在易家纺网站及关联方经营或实际控制的任何网站公示用户的违约情况。</p>" +
                    "<p>4.8  当用户向易家纺关联公司作出任何形式的承诺，且相关公司已确认您违反了该承诺，易家纺有权立即按您的承诺约定的方式对您的账户采取限制措施，包括但不限于中止或终止向用户提供服务，并公示相关公司确认的您的违约情况。用户了解并同意易家纺无须就相关确认与用户核对事实，或另行征得用户用户的同意，且易家纺无须就此限制措施或公示行为向用户承担任何的责任。</p>" +
                    "<p>4.9  易家纺对用户提供的资料无法进行控制或者核实，其他用户提供的资料有可能是不准确的，有时是错误的，甚至带有欺诈的，请在使用时自行判断，本站对此不负任何责任。</p>" +
                    "<p>4.10  本站服务提供的部分信息来自互联网，对这部分信息的真实性和有效性，本站不负任何责任。</p>" +
                "    <h5> 五、隐私保护</h5>" +
                "<p>5.1  本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：<br>(1)事先获得用户的明确授权；" +
                        "<br>(2)根据有关的法律法规要求；<br>(3)按照相关政府主管部门的要求；<br>(4)为维护社会公众的利益。" +
                    "</p><p>5.2  本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。</p>" +
                    "<p>5.3易家纺网站拥有用户所提供资料的独家的、全球通用的、永久的、免费的许可使用权利(并有权在多个层面对该权利进行再授权)，在不透露单个用户隐私资料的前提下，有权对用户数据库进行分析并对用户数据库进行商业上的利用，包括但不限于对用户数据库(全部或部份地)&nbsp;使用、复制、修订、改写、发布、翻译、分发、执行和展示或制作其派生作品或以现在已知或日后开发的任何形式、媒体或技术，将用户资料纳入其他作品内。</p>" +
                "    <h5>六、版权声明</h5>" +
                "<p>6.1  本站的所有信息，包括但不限于：文字、软件、图片、音频、视频、图表等；本站特有的标识、版面设计、编排方式等。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所有版权均归杭州易上弘网络技术有限公司享有或与作者共同享有。未经本站书面许可，不得任意复制、转载、再造这些内容，或创造与内容有关的派生产品。</p>" +
                    "<p>6.2  用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的诉讼费用和律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、帐号和其它知识产权的追索费。</p>" +
                    "<p>6.3  使用本站的任何内容均应注明“来源于易家纺网”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。</p>" +
                    "<p>6.4 本站享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p>" +
                    "<p>6.5  本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。</p>" +
                    "<p>6.6  恶意转载本站内容的，本站保留将其诉诸法律的权利。</p>" +
                "    <h5> 七、责任声明</h5>" +
                 "<p>7.1  用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，易家纺网对此不承担任何责任。</p>" +
                    "<p>7.2  本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性，但会在能力范围内，避免出错。</p>" +
                    "<p>7.3  本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任，且不认可该等网站或资源上或可从该等网站或资源获取的任何内容、宣传、产品、服务或其他材料。</p>" +
                    "<p>7.4  对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p><p>7.5  本网站的任务发布平台、交易平台等版块，本站仅作为信息提供商，提供网上洽谈及交易的场所，信息系用户自行发布，且可能存在风险，易家纺不能保证其真实性、有效性和合法性，易家纺对双方的具体交易及在交易中的利益关系不负任何责任，用户应自行承担由此产生的责任和损失。</p>" +
                    "<p>7.6   对于本站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：<br>(1)本站向用户免费提供的各项网络服务；" +
                        "<br>(2)本站向用户赠送的任何产品或者服务。</p><p>7.7   因用户违反本协议，或违反了法律或侵害了第三方的权利，而使第三方对易家纺及其关联公司、董事、职员、代理人提出索赔要求（包括司法费用和其他专业人士的费用），用户必须赔偿给易家纺及其关联公司、董事、职员、代理人，使其等免遭损失。</p>" +
                    "<p>7.8  易家纺转让本协议无需经用户同意。</p>" +
                "    <h5> 八、附则</h5>" +
                "<p>8.1  本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。</p>" +
                    "<p>8.2  如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>" +
                    "<p>8.3  本协议的条款标题仅为方便参阅而设，并不以任何方式界定、限制、解释或描述该条款的范围或限度。</p>" +
                    "<p>8.4  易家纺未就用户或其他人士的某项违约行为采取行动，并不表明易家纺撤回就任何继后或类似的违约事件采取行动的权利。</p>" +
                    "<p>8.5  本协议解释权及修订权归杭州易上弘网络技术有限公司所有。</p>  " +
                "    <h5> 用户已认真阅读并完全认可上述协议内容，并自愿成为本网站用户。</h5>" +
                "</div>" +
                "      <div class=\"btnt\">" +
                "         <input  class=\"btn-img\"  type=\''button\" value='同意并继续' onclick=\"protocolReg();\"/>" +
                "     </div>" +
                "</div>" +
                "</div>" +
                "</div>",
                _autoReposi: true
            });
        });
    });

    exports.protocolReg = function (callBack) {
        var _callBack = callBack;
        return function () {
            $("#closeBox").click();
            $('#readme').attr('checked', 'checked');
            _callBack();
        };
    };

    exports.showHideProtocol = function () {
        var protocolNode = $('.protocol-box');
        if (!protocolNode.is(':hidden')) {
            protocolNode.hide();
        } else {
            protocolNode.show();
        }
        return false;
    }

    function ckType() {
        var personType = $('[name=MEMBER_TYPE]').val();
        if (validateRules.isNull(personType)) {
            $("#PersonTypeErro").html("必须选一个类型").show().attr({ "class": "error" });
            return false;
        }
        return true;
    }
    function validateRegName() {
        var loginName = $("#regName").val();
        if (validateRules.isNull(loginName) || loginName == '用户名') {
            $("#regName").val("");
            $("#regName").attr({ "class": "text highlight2" });
            $("#regName_error").html("用户名").show().attr({ "class": "error" });
            return false;
        }
        return true;
    }
    //验证邀请码
    function validateInviteCode() {
        var isCheck = $("#ckBoxInviteCode")[0].checked;
        var inviteCode = $("#txtInviteCode").val();
        if (isCheck) {
            if (inviteCode == "" || inviteCode == null || inviteCode.indexOf("邀请码") != -1) {
                $("#txtInviteCode").removeClass().addClass("text highlight2");
                $("#txtInviteCode_error").removeClass().addClass("error");
                $("#txtInviteCode_error").text("请输入邀请码");
                $("#txtInviteCode").val("");
                return false;
            }
            else {
                var errorValue = $("#txtInviteCode_error").text().trim();
                if (errorValue != "") {
                    return false;
                }
            }
        }
        return true;
    }


    function jdThickBoxclose() {
        $(".thickclose").trigger("click")
    }
    (function (a) {
        a.fn.jdPosition = function (f) {
            var e = a.extend({ mode: null }, f || {});
            switch (e.mode) {
                default:
                case "center":
                    var c = a(this).outerWidth(), g = a(this).outerHeight();
                    var b = a.browser.isMinW(c), d = a.browser.isMinH(g);
                    a(this).css({ left: a.browser.scroll().left + Math.max((a.browser.client().width - c) / 2, 0) + "px", top: (!a.browser.isIE6) ? (d ? a.browser.scroll().top : (a.browser.scroll().top + Math.max((a.browser.client().height - g) / 2, 0) + "px")) : ((a.browser.scroll().top <= a.browser.client().bodyHeight - g) ? (a.browser.scroll().top + Math.max((a.browser.client().height - g) / 2, 0) + "px") : (a.browser.client().height - g) / 2 + "px") });
                    break;
                case "auto":
                    break;
                case "fixed":
                    break
            }
        }
    })(jQuery);
    (function ($) {
        $.extend($.browser, {
            client: function () {
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    bodyWidth: document.body.clientWidth,
                    bodyHeight: document.body.clientHeight
                };
            },
            scroll: function () {
                return {
                    width: document.documentElement.scrollWidth,
                    height: document.documentElement.scrollHeight,
                    bodyWidth: document.body.scrollWidth,
                    bodyHeight: document.body.scrollHeight,
                    left: document.documentElement.scrollLeft + document.body.scrollLeft,
                    top: document.documentElement.scrollTop + document.body.scrollTop
                };
            },
            screen: function () {
                return {
                    width: window.screen.width,
                    height: window.screen.height
                };
            },
            isIE6: $.browser.msie && $.browser.version == 6,
            isMinW: function (val) {
                return Math.min($.browser.client().bodyWidth, $.browser.client().width) <= val;
            },
            isMinH: function (val) {
                return $.browser.client().height <= val;
            }
        })
    })(jQuery);
    module.exports.validateFunction = validateFunction;
    module.exports.validatePrompt = validatePrompt;
    module.exports.validateRegName = validateRegName;
    module.exports.ckType = ckType;
    module.exports.validateRules = validateRules;
    module.exports.validateSettings = validateSettings;
    module.exports.checkInviteCode = validateInviteCode;
    module.exports.sendVCode = sendVCode;


});

