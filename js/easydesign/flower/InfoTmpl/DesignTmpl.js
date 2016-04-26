define(['js/lib/layer/laytpl.js'], function (require, exports, module) {
    var laytpl = require("js/lib/layer/laytpl.js"),
        tmplTypeNumber,
        //通用部分
        detailTmplPart = {
            common: ['<div id="lb-info">',
                '<h3>{{d.name}}</h3> ',
                '<div class="desc clearfix">',
                '{{# for(var i = 0, len = d.property.length; i < len; i++){ }}',
                '{{d.property[i]}}',
                '{{# } }}',
                '<br/></div></div>',
                '<div id="lb-author"><a class="avatar" target="_blank"{{# if(d.isMember){ }} href="{{d.ownerHref}}" {{# } }}>',             
                '<img src="{{d.ownerImg}}"><span class="name">设计师：{{d.owner}}</span>',
                '</a>     </div>{{# if(d.status != "1"){ }}',
                '<div class="warning"><div class="alert-base alert-warning"><strong>提示：</strong>{{d.operateMsg}}</div>',
                '</div>{{# } }}<div class="warning">{{# if(d.status == 2){ }}<a id="toLogin" href="javaScript:;">登录</a> ',
                '<a id="toRegistered"  href="/Registered" target="_blank">注册</a>',
                '{{# } }}{{# if(d.isShowBuy){ }}<a id="toPay" data-paymenttype="1" href="javaScript:;">购买</a>',
                '{{# } }}'].join(''),
            flowerTmplsuff: ' <a target="_blank" href="/member/addflower">上传花型</a>{{# if(d.status==1){ }} <a target="_blank" href="/Download">使用此花型设计面料</a> {{# } }}</div>',
            fabricTmplsuff: ' <a target="_blank" href="/member/addfabric">上传面料</a>{{# if(d.status==1){ }} <a target="_blank" href="/Download">使用此面料设计成品</a> {{# } }}</div>',
            qualityTmplsuff: '{{# if(d.status==1){ }} <a target="_blank" href="/Download">使用此品质样设计面料</a> {{# } }}</div>',
            swTmplsuff: '{{# if(d.stylelistUrl){ }}<a target="_blank" href="{{d.stylelistUrl}}">清单列表</a>{{# } }} <a target="_blank" href="/Download">去设计成品</a></div>',
            loadSoftware: '{{# if(d.status==1){ }} <a target="_blank" href="/Download">使用此场景设计成品</a>{{# } }} </div>'
          
        },
         //详情模版
        detailTmpl = {
            //===========================================1：花型模版==================================
            1: [detailTmplPart.common, detailTmplPart.flowerTmplsuff].join(''),
            //===================================================2:面料模版=========================
            2: [detailTmplPart.common, detailTmplPart.fabricTmplsuff].join(''),
            //============================================================3:品质样模版=================================
            3: [detailTmplPart.common, detailTmplPart.qualityTmplsuff].join(''),
            //============================================================4:三维模版=================================
            4: [detailTmplPart.common, detailTmplPart.swTmplsuff].join(''),
            //============================================================5:场景=================================
            5: [detailTmplPart.common, detailTmplPart.loadSoftware].join(''),
            //============================================================6:模型=================================
            6: detailTmplPart.common
            //============================================================10:设计首页模版模版=================================
        },
         
        operationBtn = {
            //登录注册按钮
            LoginAndRegBtn: '{{# if(d.status == 2){ }}  <a  class="btn-collect j-collect" id="loginBtn"  href="javaScript:;">登录</a><a  class="btn-collect j-collect" href="/Registered" target="_blank">注册</a>{{# } }}',
            //购买按钮
            buyBtn: '{{# if(d.isShowBuy){ }} <a id="buyBtn" class="btn-collect j-collect" href="javaScript:;">购买</a>{{# } }}',
            flowerTmplsuff: ' <a class="btn-collect j-collect" target="_blank" href="/member/addflower/">上传花型</a>{{# if(d.status==1){ }} <a class="btn-collect j-collect" target="_blank" href="/Download">使用此花型设计面料</a> {{# } }}',
            fabricTmplsuff: ' <a class="btn-collect j-collect" target="_blank" href="/member/addfabric/">上传面料</a>{{# if(d.status==1){ }} <a class="btn-collect j-collect" target="_blank" href="/Download">使用此面料设计成品</a> {{# } }}',
            qualityTmplsuff: '{{# if(d.status==1){ }} <a class="btn-collect j-collect" target="_blank" href="/Download">使用此品质样设计面料</a> {{# } }}',
            swTmplsuff: '{{# if(d.stylelistUrl){ }}<a target="_blank" href="{{d.stylelistUrl}}">清单列表</a>{{# } }} <a class="btn-collect j-collect" target="_blank" href="/Download">去设计成品</a> ',
            loadTmplsuff: '{{# if(d.status==1){ }} <a class="btn-collect j-collect" target="_blank" href="/Download">使用此场景设计成品</a> {{# } }}'
        },
    //操作按钮模版
        operationBtnTmpl = {
            1: [
            '<p class="opt-1">',
            operationBtn.LoginAndRegBtn, operationBtn.buyBtn,operationBtn.flowerTmplsuff,
            '</p>'
            ].join(''),
            2: ['<p class="opt-1">', operationBtn.LoginAndRegBtn,operationBtn.fabricTmplsuff, '</p>'].join(''),
            3: ['<p class="opt-1">', operationBtn.LoginAndRegBtn,operationBtn.qualityTmplsuff, '</p>'].join(''),
            4: ['<p class="opt-1">', operationBtn.LoginAndRegBtn,operationBtn.swTmplsuff, '</p>'].join(''),
            5: ['<p class="opt-1">', operationBtn.LoginAndRegBtn,operationBtn.loadTmplsuff, '</p>'].join(''),
            6: ['<p class="opt-1">', operationBtn.LoginAndRegBtn, '</p>'].join('')

        };

    //==================================================================================================================
    var renderdetailPanel = function (data, fn) {
        var temp = detailTmpl[tmplTypeNumber];
        laytpl(temp).render(data, fn);
    };
    var renderoperationBtn = function (data, fn) {
        var temp = operationBtnTmpl[tmplTypeNumber];
        laytpl(temp).render(data, fn);
    };
    exports.initTmpl = function (type) {
        if (!type) return null;
        tmplTypeNumber = type;
        return {
            renderdetailPanel: renderdetailPanel,
            renderoperationBtn: renderoperationBtn
        };
    };
});