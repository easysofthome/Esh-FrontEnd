define(function (require, exports, module) {
  require('jquery');
  require('js/lib/validation/validation');

  var placehold = require('js/common/module/placehold');
  placehold.init('.veri_left>input');

    // input
    var form = $("#modifyPwd");
    //密码
    var form_pwd = $("#newPwd");

    var icons = {
        error: '<i class="i-error"></i>',
        weak: '<i class="i-pwd-weak"></i>',
        medium: '<i class="i-pwd-medium"></i>',
        strong: '<i class="i-pwd-strong"></i>'
    };

    function init() {
        checkPwd();
        validate();
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
                case 'curPwd':
                    resetStringLength(20,_id);
                    break;
                case 'newPwd':
                    resetStringLength(20,_id);
                    break;
                case 'rePwd':
                    resetStringLength(20,_id);
                    break;
                default: break;
            }
        });
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
                //密码
                curPwd: {
                    required: true
                },
                newPwd: {
                    required: true,
                    rangelength: [6,20],
                    same: '#curPwd',
                    strength: true
                },
                rePwd: {
                    required: true,
                    equalTo: '#newPwd'
                }
            },
            messages: {
                curPwd: {
                    required: icons.error + '请输入当前密码'
                },
                newPwd: {
                    required: icons.error + '请输入新密码',
                    rangelength: icons.error + '密码长度只能在{0}-{1}个字符之间',
                    same: icons.error + '新密码不能与旧密码相同。'
                },
                rePwd: {
                    required: icons.error + '请再次输入新密码',
                    equalTo: icons.error + '两次密码输入不一致'
                }
            }
        });
    }
    //验证规则
    function addrules() {
        $.validator.addMethod('same', function (value, element, param) {
            var target = $(param);
            return value !== target.val();
        }, icons.error + '新密码不能与旧密码相同');

        //密码
        $.validator.addMethod('strength', function (value, element, param) {
            return this.optional(element) || pwdStrengthRule($(element), value);
        // 避免重复验证(存在按键绑定验证checkPwd())
        //}, icons.weak + '有被盗风险,建议使用字母、数字和符号两种及以上组合');
        }, '');
    }

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
        // if (valueLength < 6) {
        //     element.parent().removeClass('form-item-valid').removeClass(
        //         'form-item-error');
        //     element.parent().next().find('span').removeClass('error').html(
        //         $(element).attr('default'));
        //     return;
        // }

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

    init();



});