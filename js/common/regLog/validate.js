define(function (require, exports, module) {
    require('js/lib/validation/validation');

    // input
    var form = $("#register-form");
    var form_account = $("#form-account");
    // var form_email = $("#form-email");
    //密码
    var form_pwd = $("#form-pwd");
    //手机
    // var form_phone = $("#form-phone");
    //获取手机验证码
    var btn_getcode = $("#getCode");
    var auth_code = $("#authCode");
    var auth_code_tit = $("#authCodeTit");
    //图片验证码
    // var imgAuthCode = $("#imgAuthCode");
    //手机验证码
    // var phone_code = $("#phoneCode");
    //手机绑定状态
    var state = $("#state");
    //*** var uuid = $("#uuid").val();
    //选择手机号码国家
    // var selectCountry = $("#select-country");
    var icons = {
        def: '<i class="i-def"></i>',
        error: '<i class="i-error"></i>',
        weak: '<i class="i-pwd-weak"></i>',
        medium: '<i class="i-pwd-medium"></i>',
        strong: '<i class="i-pwd-strong"></i>'
    };

    function init() {
        // initPlaceholer();
        // setAuthcode();
        // checkAccount();
        //海外手机注册
        //phoneCountry();
        // checkEmail();
        checkPwd();
        //getPhoneCode();
        validate();
        //注册协议
        // agreen();
        bindEvent();
    }
/** 限制输入字符长度 **/
    function getStringLength (str) {
        if(!str){
            return;
        }
        var bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            //判断是中文还是英文字符
            if (/^[\u0000-\u00ff]$/.test(c)){
                bytesCount += 1;
            }
            else{
                bytesCount += 2;
            }
        }
        return bytesCount;
    }
    function resetStringLength (length,_id) {
        _id='#'+_id;
        while(getStringLength($(_id).val())>length){
                $(_id).val($(_id).val().substring(0,$(_id).val().length-1));
        }
    }
    function bindEvent () {
        $('input[type=password],input[type=text]').bind('input', function() {
            var _id = $(this).attr('id');
            switch(_id){
                case 'form-account':
                    resetStringLength(50,_id);
                    break;
                case 'authCode':
                    resetStringLength(6,_id);
                    break;
                case 'form-equalTopwd':
                case 'form-pwd':
                    resetStringLength(20,_id);
                    break;
                // 25个中文字符
                case 'company-name':
                    resetStringLength(50,_id);
                    break;
                // 50个英文字符
                case 'company-name-en':
                    resetStringLength(100,_id);
                    break;
                default: break;
            }
        });
        // btn_getcode.bind('click', function(){
        //     // if(!ishidden){
        //     //     validateAuthCode();
        //     // }else{
        //             // getPhoneCode();
        //     // }
        // });

    }
/** /限制输入字符长度 **/

/** 表单验证 */
    var validator;

    function validate() {
        addrules();
        validator = form.validate({
            //忽略
            ignore: '.ignore',
            submitHandler: function (form) {
                //提交表单
                formSubmit(form);
                //阻止表单提交
                return false;
            },
            onkeyup: false,
            errorPlacement: function(error, element) {
                error.appendTo( element.siblings('.input-tip') );
            },
            rules: {
                //用户名
                RegName: {
                    required: true,
                    user: true,
                    checkUser: true
                },
                //密码
                Pwd: {
                    required: true,
                    rangelength: [6, 20],
                    strength: true,
                    same: '#form-account'
                },
                RePwd: {
                    required: true,
                    equalTo: '#form-pwd'
                },
                CompanyName:{
                    required: true
                },
                CompanyNameEn: {
                    required: true
                },
                AuthCode: {
                    required: true,
                    minlength: 6
                },
                Identity: {
                    required: true
                },
                CompanyType: {
                    required: true
                },
                AgreeProtocol: {
                    required: true
                }
            },
            messages: {
                RegName: {
                    required: icons.error + '请输入用户名',
                    rangelength: icons.error + '长度只能在{0}-{1}个字符之间'
                },
                Pwd: {
                    required: icons.error + '请输入密码',
                    rangelength: icons.error +
                    '长度只能在{0}-{1}个字符之间'
                },
                RePwd: {
                    required: icons.error + '请再次输入密码',
                    equalTo: icons.error + '两次密码输入不一致'
                },
                CompanyName:{
                    required: icons.error + '请输入公司名称'
                },
                CompanyNameEn: {
                    required: icons.error + '请输入公司英文名称'
                },
                AuthCode: {
                    required: icons.error + '请输入验证码',
                    minlength: icons.error + '请输入六位验证码'
                },
                Identity: {
                    required: icons.error + '请选择您的身份'
                },
                CompanyType: {
                    required: icons.error + '请选择您的企业类型'
                },
                AgreeProtocol: {
                    required: icons.error + '请同意注册协议'
                }
            }
        });
    }
    //验证规则
    function addrules() {
        //用户名
        $.validator.addMethod('user', function (value, element, param) {
            return this.optional(element) || (userRule($(element),value))[0];
        }, '');
        $.validator.addMethod('checkUser', function (value, element, param) {
            if((userRule($(element),value))[1]=='phone'){
                auth_code_tit.html("手机验证码：");
            }else{
                auth_code_tit.html("邮箱验证码：");
                // checkEmail($(element),
                //     function () {
                //         var label_txt = isMobile ? '手机' : '邮箱';
                //         var validateCode = $('#validate-code');
                //         if (validateCode.hasClass('none')) {
                //             validateCode.removeClass('none');
                //             validateCode.find('.label').html("<b class='ftx04'>*</b>" + label_txt + '验证码');
                //         }
                //     },
                //     function function_name (element) {
                //         $(element).parent().find('.input-tip').html('<span>' + "该帐号已存在，立刻<a href='./Login.html'>登录</a>" + '</span>');
                //     }
                // );
            }
        }, '');
        //密码
        $.validator.addMethod('strength', function (value, element, param) {
            return this.optional(element) || pwdStrengthRule($(element), value);
        // 避免重复验证(存在按键绑定验证checkPwd())
        //}, icons.weak + '有被盗风险,建议使用字母、数字和符号两种及以上组合');
        }, '');
        $.validator.addMethod('same', function (value, element, param) {
            var target = $(param);
            return value !== target.val();
        }, icons.error + '密码与用户名相似，有被盗风险，请更换密码');
    }
/** 用户名验证 */
    function userRule (element, value) {
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
        var flag = new Array();
        var regPhone = new RegExp(reg[86]);
        var regEmail = new RegExp(email);
        if(regPhone.test(value)){
            flag[0] = true;
            flag[1] = 'phone';  //手机验证成功
        }else if(regEmail.test(value)){
            flag[0] = true;
            flag[1] = 'email';  //邮箱验证成功
        }
        if(!flag[0]){
            element.parent().find('.input-tip').html('<span class="error">' + icons.error + '格式有误' +'</span>');
        }else{
            element.parent().find('.input-tip').html('');
        }
        return flag;
    }
/** /用户名验证 */

/** 密码 **/
    // checkpwd
    var weakPwds = ["123456", "123456789", "111111", "5201314",
        "12345678", "123123", "password", "1314520", "123321",
        "7758521", "1234567", "5211314", "666666", "520520",
        "woaini", "520131", "11111111", "888888", "hotmail.com",
        "112233", "123654", "654321", "1234567890", "a123456",
        "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com",
        "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com",
        "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123",
        "147258", "987654321", "100200", "zxcvbnm", "123456a",
        "521521", "7758258", "111222", "110110", "1314521",
        "11111111", "12345678", "a321654", "111111", "123123",
        "5201314", "00000000", "q123456", "123123123", "aaaaaa",
        "a123456789", "qq123456", "11112222", "woaini1314",
        "a123123", "a111111", "123321", "a5201314", "z123456",
        "liuchang", "a000000", "1314520", "asd123", "88888888",
        "1234567890", "7758521", "1234567", "woaini520",
        "147258369", "123456789a", "woaini123", "q1q1q1q1",
        "a12345678", "qwe123", "123456q", "121212", "asdasd",
        "999999", "1111111", "123698745", "137900", "159357",
        "iloveyou", "222222", "31415926", "123456", "111111",
        "123456789", "123123", "9958123", "woaini521", "5201314",
        "18n28n24a5", "abc123", "password", "123qwe", "123456789",
        "12345678", "11111111", "dearbook", "00000000", "123123123",
        "1234567890", "88888888", "111111111", "147258369",
        "987654321", "aaaaaaaa", "1111111111", "66666666",
        "a123456789", "11223344", "1qaz2wsx", "xiazhili",
        "789456123", "password", "87654321", "qqqqqqqq",
        "000000000", "qwertyuiop", "qq123456", "iloveyou",
        "31415926", "12344321", "0000000000", "asdfghjkl",
        "1q2w3e4r", "123456abc", "0123456789", "123654789",
        "12121212", "qazwsxedc", "abcd1234", "12341234",
        "110110110", "asdasdasd", "123456", "22222222", "123321123",
        "abc123456", "a12345678", "123456123", "a1234567",
        "1234qwer", "qwertyui", "123456789a", "qq.com", "369369",
        "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130",
        "81251310", "502058", "162534", "690929", "601445",
        "1814325", "as1230", "zz123456", "280213676", "198773",
        "4861111", "328658", "19890608", "198428", "880126",
        "6516415", "111213", "195561", "780525", "6586123",
        "caonima99", "168816", "123654987", "qq776491",
        "hahabaobao", "198541", "540707", "leqing123", "5403693",
        "123456", "123456789", "111111", "5201314", "123123",
        "12345678", "1314520", "123321", "7758521", "1234567",
        "5211314", "520520", "woaini", "520131", "666666",
        "RAND#a#8", "hotmail.com", "112233", "123654", "888888",
        "654321", "1234567890", "a123456"
    ];
    var pwdStrength = {
        1: {
            reg: /^.*([\W_])+.*$/i,
            msg: icons.weak + '有被盗风险,建议使用字母、数字和符号两种及以上组合'
        },
        2: {
            reg: /^.*([a-zA-Z])+.*$/i,
            msg: icons.medium + '安全强度适中，可以使用三种以上的组合来提高安全强度'
        },
        3: {
            reg: /^.*([0-9])+.*$/i,
            msg: icons.strong + '你的密码很安全'
        }
    };

    function pwdStrengthRule(element, value) {
        var level = 0;
        var typeCount=0;
        var flag = true;
        var valueLength=getStringLength(value);
        if (valueLength < 6) {
            element.parent().removeClass('form-item-valid').removeClass(
                'form-item-error');
            element.parent().next().find('span').removeClass('error').html(
                $(element).attr('default'));
            return;
        }

        for (var key in pwdStrength) {
            if (pwdStrength[key].reg.test(value)) {
                typeCount++;
            }
        }
        if(typeCount==1){
            if(valueLength>10){
                level=2;
            }else{
                level=1;
            }
        }else if(typeCount==2){
            if(valueLength<11&&valueLength>5){
                level=2;
            }
            if(valueLength>10){
                level=3;
            }
        }else if(typeCount==3){
            if(valueLength>6){
                level=3;
            }
        }

        if ($.inArray(value, weakPwds) !== -1) {
            flag = false;
        }
        if (flag && level > 0) {
            element.parent().removeClass('form-item-error').addClass(
                'form-item-valid');
        } else {
            element.parent().addClass('form-item-error').removeClass(
                'form-item-valid');
        }
        if (pwdStrength[level] !== undefined) {
            // pwdStrength[level]>3?pwdStrength[level]=3:pwdStrength[level];
            element.parent().find('.input-tip').html('<span>' + pwdStrength[level].msg + '</span>');
        }
        return flag;
    }
    /** 按键抬起时检查密码 **/
    function checkPwd() {
        form_pwd.on('keyup', function (e) {
            var value = $(this).val();
            pwdStrengthRule(form_pwd, value);
        });
    }
/** 密码 **/

/** 检查邮箱 **/
var nameold, morePinOld, emailResult;
var namestate = false;

function checkEmail(element, succedCallback, errorCallBack) {
    value = element.val();
    // var email = strTrim(value);
    // if (!namestate || nameold != email) {
    //     if (nameold != email) {
    //         nameold = email;

    //         $.getJSON("http://www.easysofthome.com/Member/ashx/Register/checkUnique.ashx?email=" + email + "&r=" + Math.random(), function (date) {

    //             emailResult = date.Data;
    //             if (date.Data == 0) {
    //                 namestate = true;
    //             }
    //             if (date.Data == 1) {
    //                 if (errorCallBack) {
    //                     errorCallBack();
    //                 }
    //                 namestate = false;
    //             }
    //         });
    //     }
    //     else {
    //         namestate = false;
    //         if (emailResult == 1) {
    //             validateSettings.error.run(option, "该帐号已存在，立刻<a  class='flk13' href='/login/Login'>登录</a>");
    //         }
    //         if (emailResult == 2) {
    //             validateSettings.error.run(option, "邮箱地址不正确，请重新输入");

    //         }
    //         if (emailResult == 3) {
    //             validateSettings.error.run(option, "<span>中国雅虎邮箱已经停止服务,请您换一个邮箱</span>");
    //         }
    //     }
    // }
    // else {
    //     validateSettings.succeed.run(option);
    // }
}
/** /检查邮箱 **/
/** 发送验证码 **/
// function sendVCode() {
//     var btn = $(this);
//     if (btn.attr("disabled") == 'disabled') {
//         return;
//     }
//     var num = strTrim($('#regName').val());
//     var isMobile = validateRules.isMobile(num);
//     var isEmail = validateRules.isEmail(num);
//     if (!isMobile && !isEmail) {
//         return;
//     } else {
//         var ashxUrl = '/Member/ashx/' + (isMobile ? 'SendVCMsgHandler.ashx' : 'SendEmailVC.ashx');
//         var paraName = isMobile ? 'phone' : 'email';
//         var para = {};
//         para[paraName] = num;
//         para['txtInviteCode'] = $('#txtInviteCode').val();
//         $("#dyMobileButton").html("正在发送验证码");
//         btn.removeClass().addClass("btn btn-15").attr("disabled", "disabled");
//         $.getJSON(ashxUrl, para, function (data) {
//             if (data.success) {
//                 countDown();
//                 if (data.errorMessage.length === 6)
//                     alert(data.errorMessage);
//             } else {
//                 countDownStop();
//                 alert(data.existMsg || data.errorMessage || '发送失败');
//             }
//         })
//     }
// }
// var delayTime = 120;
// function countDownStop() {
//     delayTime = 120;
//     $("#dyMobileButton").html("获取验证码");
//     $("#sendCode").removeClass().addClass("btn").removeAttr("disabled");
// }

// function countDown() {
//     delayTime--;
//     $("#dyMobileButton").html(delayTime + '秒后重新获取');
//     if (delayTime == 0) {
//         countDownStop();
//     } else {
//         setTimeout(countDown, 1000);
//     }
// }

// function strTrim(str) {
//     return str.replace(/(^\s*)|(\s*$)/g, "");
// }
/** /发送验证码 **/

    //提交表单
    // function formSubmit(form) {
    //     $btnRegister = $("#form-register");
    //     //海外手机注册
    //     //phoneNoWithCountryCode=selectCountry.attr('country_id')+form_phone.val();
    //     //var param = $(form).serialize().replace(/phone=\d+/,'phone='+phoneNoWithCountryCode);
    //     var param = $(form).serialize();
    //     var ajaxurl = '../register/regService?';
    //     if (registerType == 'email') {
    //         ajaxurl = '../register/sendRegEmail?'
    //     }
    //     $.ajax({
    //         type: 'post',
    //         url: ajaxurl + location.search.substring(1),
    //         contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //         data: param,
    //         cache:false,
    //         beforeSend: function () {
    //             $btnRegister.text('正在注册..');
    //         },
    //         error: function () {
    //             showDialog('网络繁忙，请稍后再试');
    //         },
    //         success: function (response) {
    //             if (response) {
    //                 var obj = eval(response);
    //                 if (obj.info) {
    //                     if (obj.info == '短信验证码不正确或已过期!') {
    //                         console.log('showerror');
    //                         showMobileCodeError()
    //                     } else {
    //                         showDialog(obj.info);
    //                     }
    //                 }
    //                 if (obj.noAuth) {
    //                     window.location = obj.noAuth;
    //                 }
    //                 if (obj.success == true) {
    //                     if(obj.dispatchUrl.indexOf("jdpay.com")!=-1){
    //                         jQuery.getJSON("//sso.jd.com/setCookie?t=sso.jdpay.com&callback=?",function(){
    //                             successRedirectURL(obj.dispatchUrl);
    //                         });
    //                     }else{
    //                         successRedirectURL(obj.dispatchUrl);
    //                     }
    //                 }
    //             }
    //             $btnRegister.text('立即注册');
    //         }
    //     });
    // }





























    init();
});