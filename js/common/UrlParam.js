define(function (require, exports, module) {
    //分析url
    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }
    //替换myUrl中的同名参数值,如果没有参赛则追加
    var replaceUrlParams = function (Url, newParams) {
        var myUrl = parseURL(Url);
        for (var x in newParams) {
            var hasInMyUrlParams = false;
            for (var y in myUrl.params) {
                if (x.toLowerCase() == y.toLowerCase()) {
                    myUrl.params[y] = newParams[x];
                    hasInMyUrlParams = true;
                    break;
                }
            }
            //原来没有的参数则追加
            if (!hasInMyUrlParams) {
                myUrl.params[x] = newParams[x];
            }
        }
        var _result = myUrl.port + myUrl.path + "?";
        if (myUrl.protocol && myUrl.host) {
            _result = myUrl.protocol + "://" + myUrl.host + ":" + myUrl.port + myUrl.path + "?";
        } 
        for (var p in myUrl.params) {
            _result += (p + "=" + myUrl.params[p] + "&");
        }
        if (_result.substr(_result.length - 1) == "&") {
            _result = _result.substr(0, _result.length - 1);
        }
        if (myUrl.hash != "") {
            _result += "#" + myUrl.hash;
        }
        return _result;
    };
    exports.replaceUrlParams = replaceUrlParams;
    exports.replaceParams = function (Url, arrayParamName, arrayParamValue) {
        var myUrl = parseURL(Url);
        for (var i = 0; i < arrayParamName.length; i++) {
            var hasInMyUrlParams = false;
            for (var y in myUrl.params) {
                if (arrayParamValue[i].toLowerCase() == y.toLowerCase()) {
                    myUrl.params[y] = arrayParamValue[i];
                    hasInMyUrlParams = true;
                    break;
                }
            }
            //原来没有的参数则追加
            if (!hasInMyUrlParams) {
                myUrl.params[arrayParamName[i]] = arrayParamValue[i];
            }
        }
        var _result = myUrl.port + myUrl.path + "?";
        if (myUrl.protocol && myUrl.host) {
            _result = myUrl.protocol + "://" + myUrl.host + ":" + _result;
        } 
        for (var p in myUrl.params) {
            _result += (p + "=" + myUrl.params[p] + "&");
        }
        if (_result.substr(_result.length - 1) == "&") {
            _result = _result.substr(0, _result.length - 1);
        }
        if (myUrl.hash != "") {
            _result += "#" + myUrl.hash;
        }
        return _result;
    };

    //将所有para返回作为参数,无法返回原有参数中剩余的值
    exports.GetUrlPara = function (paras) {
        var paraArr = new Array();
        for (var key in paras) {
            var $eml = paras[key], val, defaultValue;
            if ($eml instanceof jQuery) {
                val = $eml.val();
                defaultValue = $eml.data('defaultValue');
            } else {
                val = $eml;
            }
            if (val && (!defaultValue || defaultValue != val)) {
                paraArr.push(key + "=" + encodeURIComponent(val));
            }
        }
        return paraArr.join('&');
    };

    //根据url参数名获取url参数值
    exports.getParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值

    };

});
