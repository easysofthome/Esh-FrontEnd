/*
基础信息，保存、获取cookie，时间对象的格式化
*/
define(function (require, exports, module) {

    var cookieHelp = {
        SetCookie: function (name, value) {
            var argv = arguments;
            var argc = arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
        },
        GetCookie: function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    return this.getCookieVal(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        }, DeleteCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.GetCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";Path=/";
        }, getCookieVal: function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        }
    };
    var dateHelp = {
        NewDate: function (str) {
            str = str.split('-');
            var day = str[2].split(' ');
            var hour = day[1].split(':');
            day = day[0];
            var date = new Date();
            date.setUTCFullYear(str[0], str[1] - 1, day);
            date.setHours(hour[0], hour[1], hour[2]);
            return date;
        }
    };
    /**
    * 时间对象的格式化;
    */
    Date.prototype.format = function (format) {
        /*
        * eg:format="yyyy-MM-dd hh:mm:ss";
        */
        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "")
    				.substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
    					: ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    var c = navigator.userAgent.toLowerCase();
    var b = c.match(/msie ([\d.]+)/) ? c.match(/msie ([\d.]+)/)[1] : undefined;
    var f = typeof (b) != "undefined";
    var k = b && parseInt(b) == 6;
    var i = b && parseInt(b) == 7;
    var h = b && parseInt(b) == 8;
    var g = b && parseInt(b) == 9;
    var l = /applewebkit/.test(c);
    var d = c.match(/opera\/([\d.]+)/);
    var browserHelp = {
        ieVersion: b,
        isIE: f,
        isIE6: k,
        isIE7: i,
        isIE8: h,
        isIE9: g,
        isWebKit: l,
        isOpera: d
    };


    var urlHelp = {
        replaceParam: function (key, value) {
            var _href = location.href;
            var qIndex = _href.indexOf('?');
            var para = location.href.substring(qIndex + 1);
            var url = location.href.substring(0, qIndex);
            var paraArr = para.split('&');
            var parakey, paravalue, _para, newpara = [], exist = false;
            for (var j = 0, len = paraArr.length; j < len; j++) {
                _para = paraArr[j].split('=');
                parakey = _para[0];
                paravalue = _para[1];
                if (key == parakey) {
                    paravalue = value;
                    exist = true;
                }
                newpara.push(parakey + '=' + paravalue);
            }
            if (!exist) {
                newpara.push(key + '=' + value);
            }
            return url + '?' + newpara.join('&');
        },
        getValueByKey: function (key) {
            var _href = location.href;
            var qIndex = _href.indexOf('?');
            var para = location.href.substring(qIndex + 1);

            var paraArr = para.split('&');
            var parakey, paravalue, _para, exist = false;
            for (var j = 0, len = paraArr.length; j < len; j++) {
                _para = paraArr[j].split('=');
                parakey = _para[0];
                paravalue = _para[1];
                if (key == parakey) {
                    exist = true;
                    break;
                }

            }
            if(exist){
                return paravalue;
            }else{
                return -1;
            }
        },
        getValueByKey_URL: function (url,key) {
           // eval('/^[\-]?[0-9]+\.{0,1}[0-9]{0,'+pointNum+'}$/');
           // var reg = eval('/(^|\\?|&)'+key+'=([\\s\\S]*)(&|$)/');
            var reg = new RegExp('(^|\\?|&)'+key+'=([\\s\\S]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
            var r = url.match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }
    };


    var priFun = {};
    priFun.addScriptHelp = {
        base: function (url) {
            if (!url)return;
            var doc = document;
            var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
            var baseElement = head.getElementsByTagName("base")[0];
            var IS_CSS_RE = /\.css(?:\?|$)/i;
            var isCSS = IS_CSS_RE.test(url);
            var node = doc.createElement(isCSS ? "link" : "script");

//            if (charset) {
//                var cs = isFunction(charset) ? charset(url) : charset;
//                if (cs) {
//                    node.charset = cs;
//                }
//            }
            if (isCSS) {
                node.rel = "stylesheet";
                node.href = url;
            } else {
                node.async = true;
                node.src = url;
            }

            baseElement ?
                head.insertBefore(node, baseElement) :
                head.appendChild(node);
        }
    };

    var addScriptHelp = {
        addCssLink: function (rel) {
            priFun.addScriptHelp.base(rel);
        },
        addScriptLink: function (src) {
            priFun.addScriptHelp.base(src);
        }
    };



    //直接添加一个css文本
    var addCss = function (cssText) {
        var style = document.createElement('style'),  //创建一个style元素
        head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        if (style.styleSheet) { //IE
            var func = function () {
                try { //防止IE中stylesheet数量超过限制而发生错误
                    style.styleSheet.cssText = cssText;
                } catch (e) {
                }
            }
            //如果当前styleSheet还不能用，则放到异步中则行
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else { //w3c
            //w3c浏览器中只要创建文本节点插入到style元素中就行了
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style); //把创建的style元素插入到head中
    }

     /** 手机号验证*/
    function validtaePhoneNum (value) {
        var reg = {
            "86": "^(13|15|18|14|17)[0-9]{9}$"  //中国
        };
        var flag;
        var regPhone = new RegExp(reg[86]);
        if(regPhone.test(value)){
            flag = true;
        }else{
            flag = false;
        }
        return flag;
    }


    /** 邮箱验证 */
    function phoneRule (value) {
      var email = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"; //邮件
      var flag;
      var regMail = new RegExp(email);
      if(regMail.test(value)){
          flag = true;
      }else{
          flag = false;
      }
      return flag;
    }

    //验证码倒计时
    function countdown(waitColdeClass,id,startNum,endNum,endText,phoneId,callback){
        $("#"+id).unbind("click");
        var mySatartNum = parseInt(startNum);
        var myEndNum = parseInt(endNum);
        $("#"+id).css("background-color", "#B3B3B3");
        $(".validateCodeTip").show();
        if(callback){callback();}
        continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,phoneId,callback);
    }

    function continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,phoneId,callback){

        var timer =window.setTimeout(function(){

            $("#"+id).html(mySatartNum--);
            //alert(mySatartNum);
            if(mySatartNum <= myEndNum){
                $("#"+id).css("background-color", "#00a2ca");
                $(".validateCodeTip").hide();
                $("#"+id).html(endText);
                mySatartNum = parseInt(startNum);
                bindClick_countdown(waitColdeClass,id,mySatartNum,myEndNum,endText,phoneId,callback);
                return;
            }else{
                continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,phoneId,callback);
            }
        },1000);
    }

    //绑定click
    function bindClick_countdown(waitColdeClass,id,startNum,endNum,endText,phoneId,callback){
        $("#"+id).bind("click",function(){
            if(phoneId){
               // $("#"+phoneId).trigger("focus");
                //$("#"+phoneId).trigger("focusout");
                if(!$("#"+phoneId).valid()){

                    return;
                }


        }
            countdown(waitColdeClass,id,startNum,endNum,endText,phoneId,callback);

        });
    }

    //全选
    function selectAllOrNone_ck(checkboxName,flag){
        $("input:checkbox[name='"+checkboxName+"']").attr("checked",flag);
    }

    //验证正数 不包含0、负数
    function validatePositiveNum(value){
        var reg = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
        return reg.test(value);
    }
     //验证数字包含负数 0
    function validateNum(value){
        var reg = new RegExp("^[\-]?[0-9]+\.{0,1}[0-9]*$");
        return reg.test(value);
    }

     //验证数字 不包含负数 包含0、整数、小数
    function validateNum_plus(value){
        var reg = new RegExp("^[0-9]+\.{0,1}[0-9]*$");
        return reg.test(value);
    }

    //验证数字 可以是负数 小数 正数 ,自定义小数位数
    function validateNumPointNum(value,pointNum){
        var reg = eval('/^[\-]?[0-9]+\.{0,1}[0-9]{0,'+pointNum+'}$/');
        return reg.test(value);
    }

    //验证数字 可以 小数 正数 ,自定义小数位数
    function validateNumPointNum_plus(value,pointNum){
        var reg = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
        if (isNaN(value)) {
            return false;
        }

        var s = value.toString();
        if(s.indexOf('.')>0){
            if(((s.length-1)-s.indexOf('.'))>pointNum){
                return false;
            }
        }
        if(!reg.test(value)){

            return false;
        }

        return true;
    }

    //验证数字 可以是负数 小数 正数
    function validateAllNum(value){
        var reg = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[0-9][0-9]*))$");
        return reg.test(value);
    }

    //大于0的整数
    function validatePositiveInt(value){
        var reg = new RegExp("^[1-9]\d*$");
        return reg.test(value);
    }

    ///////////////////////////////////// 银行卡号Luhm校验////////////////////////////////////////////
     //Description:  银行卡号Luhm校验

    //Luhm校验规则：16位银行卡号（19位通用）:

    // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
    // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
    // 3.将加法和加上校验位能被 10 整除。
    function bankCoardCheck(bankno){
        var errorMsg = "";

        var num = /^\d*$/;  //全数字
        if (!num.exec(bankno)) {
            errorMsg = "银行卡号必须全为数字！";
            return errorMsg;
        }

        //开头6位
        var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(bankno.substring(0, 2))== -1) {
            errorMsg = "银行卡号开头6位不符合规范！";
            return errorMsg;
        }

        if (bankno.length < 16 || bankno.length > 19) {
            errorMsg = "银行卡号长度必须在16到19之间！";
            return errorMsg;
        }
        return errorMsg;

        //暂时不进行luhm验证
        var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

        var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9

        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
                else
                arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
            arrOuShu.push(newArr[j]);
        }

        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }

        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;

        if(lastNum==luhm){
            errorMsg = "";
            return errorMsg;
        }else{
            errorMsg = "无效的银行卡号，请重新输入！";
            return errorMsg;
        }
    }

////////////////////////////////格式化书数字///////////////////////////////////////
     //强制保留2位小数，如：2，会在2后面补上00.即2.00
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.floor(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

    //重写Array.indexOf方法修正ie9之前无法使用
    Array.prototype.indexOf = function(el){
        for (var i=0,n=this.length; i<n; i++){
                if (this[i] === el){
                        return i;
                }
        }
        return -1;
    }
    var EventHelper={
        /*防止用户频繁操作
         *func 回调函数
         *wait 调用时差
         *immediate true:如果没有正在执行的函数(timeout为null)，fales:先执行setTimeout
         */
        debounce:function (func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }



    module.exports.selectAllOrNone_ck = selectAllOrNone_ck;
    module.exports.addCSS = addCss;
    module.exports.cookieHelp = cookieHelp;
    module.exports.dateHelp = dateHelp;
    module.exports.browserHelp = browserHelp;
    module.exports.urlHelp = urlHelp;
    module.exports.addScriptHelp = addScriptHelp;
    module.exports.validtaePhoneNum = validtaePhoneNum;
    module.exports.phoneRule = phoneRule;
    module.exports.bindClick_countdown = bindClick_countdown;
    module.exports.validatePositiveNum = validatePositiveNum;
    module.exports.bankCoardCheck = bankCoardCheck;
    module.exports.validateNum = validateNum;
    module.exports.validateNumPointNum = validateNumPointNum;
    module.exports.validateNum_plus = validateNum_plus;
    module.exports.validatePositiveInt = validatePositiveInt;
    module.exports.toDecimal2 = toDecimal2;
    module.exports.validateAllNum = validateAllNum;
    // module.exports.toKeepDecimal2 = toKeepDecimal2;
    module.exports.validateNumPointNum_plus = validateNumPointNum_plus;
    module.exports.EventHelper = EventHelper;






});