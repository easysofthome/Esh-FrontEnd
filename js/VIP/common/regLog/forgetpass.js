define(function (require, exports, module) {
  require('jquery');
  require('js/front/lib/validation/validation');
  require('tip');
  require('js/front/lib/synchroInputText');

 $('.placeholder,.user_name>input').on('click focus',function  () {
    if($(this).hasClass('placeholder')){
      $(this).hide();
      $(this).siblings('input').focus();
    }else{
      $(this).siblings('span').hide();
    }
  });
  $('.user_name>input').blur(function  () {
    if($(this).val()===''){
      $(this).siblings('span').show();
    }
  });

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
      showTip(obj,msg,"inner-left","top",50,5);
      break;
    case "rightBottom":
      showTip(obj,msg,"inner-left","bottom",0,5);
      break;
    default:
      showTip(obj,msg,"right","center",0,0);
  }
}


/////////////////////////////////// 文本框输入提示 （银行卡、手机号） //////////////////////////////////////////
    //tag为如何格式化，例如手机号是### #### ####
   $(document).ready(function () {
    $('#userName').inputTip({
      tag:'userName',
      marginTop:0,
      width:$('#userName').width()
    });
   });

/////////////////////////////// 表单验证部分 ///////////////////////////////////
//错误信息提示点
  var icons = {
      error: '<i class="i-error"></i>',
      weak: '<i class="i-pwd-weak"></i>',
      medium: '<i class="i-pwd-medium"></i>',
      strong: '<i class="i-pwd-strong"></i>'
  };


   /** 自定义规则 用户名验证 */
  function userRule (element, value) {
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
             $(element).poshytip('destroy');
             setMsgPosition(element,'请输入正确的手机号或邮箱地址',$(element).attr("errorMsgPosition"));

        }else{
            $(element).poshytip('destroy');
        }
        return flag;
    }

function addRule(){
  $.validator.addMethod('checkUser', function (value, element, param) {
            return this.optional(element) || userRule($(element), value);
        }, 'addMethod');
  //密码
  $.validator.addMethod('strength', function (value, element, param) {
      return this.optional(element) || pwdStrengthRule($(element), value);
  // 避免重复验证(存在按键绑定验证checkPwd())
  //}, icons.weak + '有被盗风险,建议使用字母、数字和符号两种及以上组合');
  }, 'addMethod');
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

    function pwdStrengthRule(element, value) {
        $(element).poshytip('destroy');
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

        } else {

        }
        if (pwdStrength[level] !== undefined) {
            setMsgPosition(element,pwdStrength[level].msg,$(element).attr("errorMsgPosition"));
        }
        return flag;
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

  // form
  var form = $("#forgetpassForm");


  /** 表单验证 */
  var validator;
  function validate() {
    addRule();
      validator = form.validate({
          //忽略
          ignore: '.ignore',
          submitHandler: function (form) {
            allCallback();
            return false;
          },
          onfocusout:function(element){
              $(element).valid();
          },
          errorPlacement: function(error, element) {
            if(error.text().length==0||error.text()=='addMethod')return;
              $(element).poshytip('destroy');
              if(error.text().length > 0){
                   setMsgPosition(element,error.text(),$(element).attr("errorMsgPosition"));
              }
              return true;
          },
          success:function(element){
              $(element).poshytip('destroy');
          },
          rules: {
              userName: {
                  required: true,
                  checkUser: true
              },
              identifyCode: {
                  required: true
              },
              messageCode: {
                  required: true
              },
              newPwd: {
                  required: true,
                  strength: true
              },
              reNewPwd : {
                  required: true,
                  equalTo: '#newPwd'
              }
          },
          messages: {
              userName: {
                  required: icons.error + '手机号或邮箱不能为空'
              },
              identifyCode: {
                  required: icons.error + '验证码不能为空！'
              },
              messageCode: {
                  required: icons.error + '验证码不能为空！'
              },
              newPwd: {
                  required: icons.error + '请输入密码',
              },
              reNewPwd: {
                  required: icons.error + '请再次输入密码',
                  equalTo: icons.error + '两次密码输入不一致'
              }
          }
      });
  }
$('.butt_forpass').bind('click',function(){
  form.submit();
});

//发送验证码
function sendMessageCode(){
    //$.ajax();
}
//获取验证码
function validMessageCode(){
  var msgCode = $('#messageCode').val();
   //$.ajax();
   return true;
}

function allCallback(){
   if(exports.callbackStep1){
     exports.callbackStep1();
   }
   if(exports.callbackStep2){
     if(validMessageCode()){
       exports.callbackStep2();
     }
   }
   if(exports.callbackStep3){
       exports.callbackStep3();
   }
}

validate();

exports.callbackStep1;
exports.callbackStep2;
exports.callbackStep3;
exports.callbackStep4;
});