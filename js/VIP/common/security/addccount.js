define(function (require, exports, module) {
    require('js/front/lib/validation/validation');
    require('js/front/lib/tip/jquery.poshytip');
    require('js/front/lib/synchroInputText');
    var placehold = require('js/front/common/module/placehold');
    //为表单验证成功后执行的函数
    exports.submitAjax;
////////////////////////////表单样式///////////////////////////////////
placehold.init('.veri_left>input');

////////////////////////////错误提示框 tip///////////////////////////////////
  function showTip(obj,msg,alignX,alignY,offsetX,offsetY){
   $(obj).poshytip({
        className: 'tip-violet',
        content: msg,
        showOn: 'none',
        alignTo: 'target',
        alignX: alignX,
        alignY: alignY,
        offsetX: offsetX,
        offsetY: offsetY
      });

    $(obj).poshytip('show');
  }

  function setMsgPosition(obj,msg,direction){
    switch(direction){
      case "right":
        showTip(obj,msg,"right","center",5,0);
        break;
      case "rightTop":
        showTip(obj,msg,"inner-left","top",-10,5);
        break;
      case "rightBottom":
        showTip(obj,msg,"inner-left","bottom",0,5);
        break;
      case "bottom":
        showTip(obj,msg,"inner-left","bottom",-17,5);
        break;
      default:
        showTip(obj,msg,"right","center",5,0);
    }
  }

/////////////////////////////////// 表单验证 //////////////////////////////////////////
    var form = $("#addccount");
    var icons = {
        error: '<i class="i-error"></i>',
        weak: '<i class="i-pwd-weak"></i>',
        medium: '<i class="i-pwd-medium"></i>',
        strong: '<i class="i-pwd-strong"></i>'
    };

    function init() {
       validate();
    }

/** 表单验证 exports.submitAjax 为表单验证成功后执行的函数 */
    var validator;
    var validatorTip = {'msg':'addMethod'};
    function validate() {
        addrules();
        addrulesAjax();
        validator = form.validate({
            //忽略
            ignore: '.ignore',
            submitHandler: function (form) {
                if(!checkPwd(true)){
                    return false;
                }
                //提交表单
                if(exports.submitAjax){
                    exports.submitAjax();
                }
                return false;
            },
             onfocusout:function(element){
              $(element).valid();
            },
            errorPlacement: function(error, element) {
                if(error.text().length==0||error.text()=='addMethod')return;
                $(element).poshytip('destroy');
                setMsgPosition(element,error.text(),$(element).attr("errorMsgPosition"));
            },
            success:function(error, element){
                if($(element).attr('id')== 'Pwd') return;
                $(element).poshytip('destroy');
            },
            rules: {
                //用户名
                RegName: {
                    required: true,
                    user: true,
                    checkUserAjax:true
                },
                section: {
                    required: true
                },
                //密码
                Pwd: {
                    required: true,
                    rangelength: [6, 20],
                },
                RePwd: {
                    required: true,
                    equalTo: '#Pwd'
                },
                remark: {
                    required: true,
                    maxlength: 400
                }
            },
            messages: {
                RegName: {
                    required: icons.error + '请输入用户名！',
                    rangelength: icons.error + '长度只能在{0}-{1}个字符之间！'
                },
                section: {
                    required: icons.error + '请输入所属部门！'
                },
                Pwd: {
                    required: icons.error + '请输入密码！',
                    rangelength: icons.error +
                    '长度只能在{0}-{1}个字符之间！'
                },
                RePwd: {
                    required: icons.error + '请再次输入密码！',
                    equalTo: icons.error + '两次密码输入不一致！'
                },
                remark: {
                    required: icons.error + '请输入备注信息！',
                    maxlength: icons.error + '备注信息过长！'
                }
            }
        });
    }
    //验证规则
    function addrules() {
        //用户名
        $.validator.addMethod('user', function (value, element, param) {
            return this.optional(element) || (userRule($(element),value))[0];
        }, validatorTip.msg);
    }

    //自定义验证方法 用于需同后台交互
    function addrulesAjax(){
        $.validator.addMethod('checkUserAjax', function (value, element) {
            return this.optional(element) || checkUserAjax($(element), value);
        }, validatorTip.msg);
    }
    /*
    验证后台是否存在该用户名，将用户名发送给后台，后台返回true/false（是否存在该用户）
    datajson是后台提供的json数据 包含请求路径:datajson.checkUserAction
    async不能为异步，需等后台执行完毕后方可继续执行前台
     */
    function checkUserAjax(element,value){
        var flag = true;
        var msg = '';
        var baseUrl = '';
        $.ajax({
            url:baseUrl+'?'+$(element).attr('name')+'='+ $(element).val(),
            async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
            dataType:"json",
            method:'post',
            success:function(exist) {
                $(element).poshytip('destroy');
                if(exist){
                    if(userRule($(element),value)[1]=='phone'){
                       msg = "该手机号已存在！";
                    }else{
                       msg = "该邮箱已存在！";
                    }
                    setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
                    flag = false;
                }else{
                    flag = true;
                }
            },
            error:function(){
                console.log('请求失败！');
            }
        });
        return flag;
    }

    /** 用户名验证 */
    function userRule (element, value) {
        $(element).poshytip('destroy');
        var msg = '';
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
        var flag = new Array();
        var regPhone = new RegExp(reg[86]);
        var regEmail = new RegExp(email);
        flag[0] = false;
        if(regPhone.test(value)){
            flag[0] = true;
            flag[1] = 'phone';  //手机验证成功
        }else if(regEmail.test(value)){
            flag[0] = true;
            flag[1] = 'email';  //邮箱验证成功
        }
        if(!flag[0]){
            msg = '请输入正确的手机号或邮箱地址';
            setMsgPosition(element,msg,$(element).attr("errorMsgPosition"));
        }
        return flag;
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
            msg: icons.medium + '<span style="color:green">安全强度适中，可以使用三种以上的组合来提高安全强度</span>'
        },
        3: {
            reg: /^.*([0-9])+.*$/i,
            msg: icons.strong + '<span style="color:green">你的密码很安全</span>'
        }
    };

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

    function pwdStrengthRule(element, value,isSubmit) {
        $(element).poshytip('destroy');
        var level = 0;
        var typeCount=0;
        var flag = true;
        var valueLength=getStringLength(value);
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
                flag = false;
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
        }
        if (flag && level > 0) {

        }
        if (pwdStrength[level] !== undefined) {
            if(!isSubmit){
                setMsgPosition(element,pwdStrength[level].msg,$(element).attr("errorMsgPosition"));
            }else if(isSubmit&&!flag){
                setMsgPosition(element,pwdStrength[level].msg,$(element).attr("errorMsgPosition"));
            }

        }
        return flag;
    }

    $('#Pwd').bind('input propertychange',function(){
        checkPwd(false);
    });

    //检查密码
    function checkPwd(isSubmit){
        var PwdVal = $('#Pwd').val();
        return pwdStrengthRule('#Pwd',PwdVal,isSubmit);
    }

    $('#addccountSubmit').bind('click',function(){
        form.submit();
    });

    $(document).ready(function () {
        $('#RegName').inputTip({
          tag:'',
          marginTop:-8
        });
  });

    init();
});