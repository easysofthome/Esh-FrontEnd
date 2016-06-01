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
        replacePara: function (key, value) {
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
    function countdown(waitColdeClass,id,startNum,endNum,endText,callback){
        $("#"+id).unbind("click");
        var mySatartNum = parseInt(startNum);
        var myEndNum = parseInt(endNum);
        $("#"+id).css("background-color", "#B3B3B3");
        $(".validateCodeTip").show();
        if(callback){callback();}
        continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,callback);
    }

    function continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,callback){

        var timer =window.setTimeout(function(){

            $("#"+id).html(mySatartNum--);
            //alert(mySatartNum);
            if(mySatartNum <= myEndNum){
                $("#"+id).css("background-color", "#00a2ca");
                $(".validateCodeTip").hide();
                $("#"+id).html(endText);
                mySatartNum = parseInt(startNum);
                bindClick_countdown(waitColdeClass,id,mySatartNum,myEndNum,endText,callback);
                return;
            }else{
                continueTimer(waitColdeClass,id,mySatartNum,startNum,myEndNum,endText,callback);
            }
        },1000);
    }

    //绑定click
    function bindClick_countdown(waitColdeClass,id,startNum,endNum,endText,phoneId,callback){
        $("#"+id).bind("click",function(){
            if(phoneId){
            $("#"+phoneId).trigger("focus");
            $("#"+phoneId).trigger("focusout");
            if($("#"+phoneId).parent().find('.input-tip span').text().length>0){
                return;
            }


        }
            countdown(waitColdeClass,id,startNum,endNum,endText,callback);

        });
    }


    module.exports.addCSS = addCss;
    module.exports.cookieHelp = cookieHelp;
    module.exports.dateHelp = dateHelp;
    module.exports.browserHelp = browserHelp;
    module.exports.urlHelp = urlHelp;
    module.exports.addScriptHelp = addScriptHelp;
    module.exports.validtaePhoneNum = validtaePhoneNum;
    module.exports.phoneRule = phoneRule;
    module.exports.bindClick_countdown = bindClick_countdown;



});