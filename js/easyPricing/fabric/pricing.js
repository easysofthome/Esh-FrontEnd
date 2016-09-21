define(function(require, exports, module) {
    require('js/front/easydata/common/selCity'); //城市下拉选择
    require('tip');
    var layer = require('layer');
    //私有属性
    var _fn = {
        pricingParamPart:'.fabricbox',//核价操作部分
        pricingRet:'.pricePart',//核价结果部分
        typeIndex : 0,      //选择单选框的index
        pricingPartH : 0,    //核价操作部分高度
        radioGroup:'#priceType',
        priceFabricParam:'#fabricParam'
    };
    //对象
    var priceObj = function(){
        _fn.init();
    };
    //共有函数
    priceObj.prototype={
        start : function(){
            _fn.start();
        }
    }
    //静态方法
    priceObj.selFactoryCb = function(data){
        if(_fn.$factory_flag){
            _fn.$factory_flag.parent().prev('td').html(data.fName+' '+data.fPrice+' '+data.fCode);
        }
    }
    //初始化
    _fn.init = function(){
        _fn.load();
        _fn.bindEvent();
    }
    //界面加载时执行
    _fn.load = function(){
        _fn.pricingPartH = $(_fn.pricingParamPart).height();
        _fn.originalHTML = $(_fn.priceFabricParam).html();
    }
    ///////////////////////////////操作DOM//////////////////////////////

    //开始核价
    _fn.start = function(){
        var index = _fn.typeIndex = _fn.getChekedIndex(_fn.radioGroup);
        _fn.pricingPartHide();
        _fn.toTop();
        $(_fn.pricingRet).show().children('div').hide();
        _fn.processHTML();//构建核价的面料参数 数据
        $('#fabricParam').fadeIn(300);//父容器 核价面料参数 显示
        switch (index){
            case 0:
                $('#matFactoryList').fadeIn(); //与您匹配的面料供应商
                break;
            case 1:
                $('#selFactoryPrice').show().find('.butt_box').show(); //请选择各环节的工厂报价
                break;
            case 2:
                $('#selFactoryPrice').show().find('.butt_box').show(); //请选择各环节的工厂报价
                break;
            case 3:
                $('#priceRet').show();//您的询价结果
                break;
        }
    }
    //隐藏核价操作部分
    _fn.pricingPartHide = function(){
        $(_fn.pricingParamPart).animate({height: 0, opacity: 0}, "slow",function(){$(this).hide()});
    }
    //显示核价操作部分
    _fn.pricingPartShow = function(cb){
        $(_fn.pricingParamPart).show().animate({height: _fn.pricingPartH, opacity: 1}, 500,function(c){
            if(cb){
                cb();
            }
        });
    }
    _fn.pricingRetHide = function(cb){
        $(_fn.pricingRet).fadeOut(500,function(){
            if(cb){
                cb();
            }
        });
    }
    _fn.askPrice  = function(){
        $('#priceRet').show();
    }
    _fn.toTop = function(){
        $('html,body').scrollTop(0);
    }
    _fn.toBottom = function(){
        $('html,body').animate({scrollTop:$('body')[0].scrollHeight},'slow');
    }
    _fn.getChekedIndex = function(selector){
        var index = 0;
        $(selector+' input[type="radio"]').each(function(i){
            if($(this).attr('checked')){
                index = i;
                return;
            }
        });
        return index;
    }
    //生成核价页数据
    _fn.processHTML = function(){
        $(_fn.priceFabricParam).html(_fn.originalHTML);
        var $ul = $('<ul class="clearfix inf_box"></ul>');
        var $li = $('<li class="lf"></li>');
        var $span = $('<span class="inf_data"></span>');
        var $fabricParam = $(_fn.priceFabricParam);
        //起 订 量
        $span.html($('#OrderQuantityID option:selected').text());
        $li.html('起订量 :   '+$span[0].outerHTML)
        $ul.append($li[0].outerHTML);

        //织造种类
        var weavingType = $('.WeavingType').find('input[type="radio"]:checked').next('span').text();
        $span.html(weavingType);
        $li.html('织造种类 :   '+ $span[0].outerHTML);
        $ul.append($li[0].outerHTML);

        //面料门幅
        $span.html($('#FabricWidth').val());
        $li.html('面料门幅 :   '+$span[0].outerHTML);
        $ul.append($li[0].outerHTML);

        //纱线种类数量 经纬密
        _fn.processHTML_partA($li,$ul,$span);

        //经纱 纱线列表
        _fn.processHTML_partB($li,$ul);

        //染织方式
        var DyeingType = $('#dyed-method input[type="radio"]:checked').next('span').text();
        $span.html(DyeingType)
        $li.html('染织方式 :   '+ $span[0].outerHTML);
        $ul.append($li[0].outerHTML);

        //染色 印花 色织
       $('.AddItem').children('.js-tab:visible').children('div').each(function(){
            var dTitle = $(this).find('.AddItem_tit').html();
            $(this).find('input[type="radio"]:checked').each(function(){
                var dItmeTxt = $(this).next('span').html();
                $span.html(dItmeTxt)
                $li.html(dTitle+'   '+ $span[0].outerHTML);
                $ul.append($li[0].outerHTML);
            });
        });
        var yeWorksAftertreatmentTxt = '染厂后处理 :   ';
        //染厂后处理
        $li.html(yeWorksAftertreatmentTxt).addClass('log_li');
        $('#yeWorksAftertreatment').find('input[type="checkbox"]:checked').each(function(){
            var checkedTxt = $(this).parent().text();
            $span.html(checkedTxt+'   ');
            $li.append($span[0].outerHTML);
        });
        $ul.append($li[0].outerHTML);
        var otherAftertreatmentTxt = '其他后处理 :   ';
        //其他后处理
        $li.html(otherAftertreatmentTxt);
        $('#otherAftertreatment').find('input[type="checkbox"]:checked').each(function(){
            var checkedTxt = $(this).parent().text();
            $span.html(checkedTxt+'   ');
            $li.append($span[0].outerHTML);
        });
        $ul.append($li[0].outerHTML);
        $fabricParam.append($ul);

    }

    //纱线种类数量 经纬密
    _fn.processHTML_partA = function($li,$ul,$span){
        var yarnTypeNumTxt = $('.yarnTypeNum input[type="radio"]:checked').next('span').text();
        if(yarnTypeNumTxt == '单经单纬'){
            $span.html('单经单纬');
            $li.html('纱线种类数量 :   '+$span[0].outerHTML);
            $ul.append($li[0].outerHTML);
            $span.html('1*1');
            $li.html('经纬密 :   '+$span[0].outerHTML);
            $ul.append($li[0].outerHTML);
        }else{
            var k=1;
            var j=1;
            var warpRet = '';
            var abbRet = '';
            $('#warp_num_box').find('input').each(function(i){
                k=i;
                var tag_w = '';
                var tag_w_w = '';
                if(k>0){
                    tag_w = '+';
                    tag_w_w = '*';
                }
                warpRet += (tag_w+$(this).val());

            });
            $('#abb_num_box').find('input').each(function(i){
                j=i;
                var tag_a = ''
                var tag_a_a = '';
                if(j>0){
                    tag_a = '+';
                }
                abbRet += (tag_a+$(this).val());
            });
            $span.html(k+'经'+j+'纬');
            $li.html('纱线种类数量 :   '+$span[0].outerHTML);
            $ul.append($li[0].outerHTML);
            $span.html(warpRet+'*'+abbRet);
            $li.html('经纬密 :   '+$span[0].outerHTML);
            $ul.append($li[0].outerHTML);
           // $fabricParam($ul);
        }
    }
    //经纱 纱线列表
    _fn.processHTML_partB = function($li,$ul) {
        var $listLi = $li.addClass('yarntype_box');
        $listLi.empty() ;
        var $div_base = $('<div class="clearfix yarn_para"></div>');
        var $div_sub = $('<div class="lf para_words"></div>');
        var $span = $('<span class="lf para_tit"></span>');
        var $p = $('<p class="lf inf_data"></p>');
        //用户选择 单经单纬 ：多经多纬
        var yarnTypeNumTxt = $('.yarnTypeNum input[type="radio"]:checked').next('span').text();
        var eachClass = yarnTypeNumTxt == '单经单纬'?'.singleWarpWeft':'.multiWarpWeft';
        $(eachClass).each(function(){
            $(this).find('li').each(function () {
                $div_sub.empty();
                var para_tit = $(this).find('.para_tit').html()
                $span.html(para_tit);
                //成分
                var yarnComponentVal = $(this).find('.yarnComponent').val();
                $p.html('成分：' +yarnComponentVal);
                $div_sub.append($p[0].outerHTML);
                //粗细
                var yarnthicknessVal = $(this).find('.yarnthickness').val();
                $p.html('粗细：' +yarnthicknessVal);
                $div_sub.append($p[0].outerHTML);
                //股线
                var foldedYarnsVal = $(this).find('.foldedYarns').val();
                $p.html('股线：' +foldedYarnsVal);
                $div_sub.append($p[0].outerHTML);
                //成分比
                var ratioConstituentsVal = $(this).find('.ratioConstituents').val();
                $p.html('成分比：' +ratioConstituentsVal);
                $div_sub.append($p[0].outerHTML);
                //将DIV放入父级DIV
                $div_base.html($span[0].outerHTML+$div_sub[0].outerHTML);
                //父级DIV放入LI
                $listLi.append($div_base[0].outerHTML);
            });
        });

        //LI放入UL
        $ul.append($listLi[0].outerHTML);
        $li.removeClass('yarntype_box');
    }

    _fn.startLoadData = function(){
        $('#matFactoryList .tab-box tbody').html('<tr><td colspan="5" style="text-align: center;">正在加载。。。。</td></tr>');
    }

    _fn.endLoadData = function(){
        $('#matFactoryList .tab-box tbody').html('加载完成');
    }

    /////////////////////事件////////////////////
    //注册事件
    _fn.bindEvent = function(){
        //返回
        $('#matFactoryList,#selFactoryPrice,#priceRet').find('.butt_return').bind('click',function(){
            _fn.pricingRetHide();
            _fn.pricingPartShow(function(){
                _fn.toBottom();
            });

        });
        //核价
        $('#selFactoryPrice').find('.butt_pricing').bind('click',function(){
            $(this).parent().hide();
            _fn.askPrice();
        });
        //选择工厂
        $('.btn').on("click", function(){
            var that = this;
            _fn.$factory_flag  = $(this);
            var layerHref = $(this).attr('data-href');
            $.layer({
                type: 2,
                title: false,
                area: ['965px', '540px'],
                border: [5, 0.3, '#000'],
                shade: [0.8, '#000'],
                shadeClose: true,
                offset: [($(window).height() - 500)/2+'px',''],
                closeBtn: [0, true], //默认关闭按钮
                shift: 'top',
                fix : false,
                iframe: {src: $(that).attr('data-href')},
                success: function (layer) {}
            });
        });
        //检索与您匹配的面料供应商
        $('#searchFactoryName').bind('change keydown',function(){
            _fn.startLoadData();
        });
    }


/////////////////////入口///////////////////////


    module.exports = priceObj;

    //测试用 跳过表单验证
    var o = new priceObj();

    $('#startPrice').on('click', function() {
        o.start();
    });

    //提供全局对象
    window.priceObjPage = priceObj;
});

