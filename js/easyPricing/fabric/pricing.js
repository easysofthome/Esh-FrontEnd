define(function(require, exports, module) {
    require('js/front/easydata/common/selCity'); //城市下拉选择
    //私有对象
    var _fn = {
        pricingParamPart:'.fabricbox',//核价操作部分
        pricingRet:'.pricePart',//核价结果部分
        typeIndex : 0,      //选择单选框的index
        pricingPartH : 0,    //核价操作部分高度
        radioGroup:'#priceType'
    };
    var priceObj = function(){
        _fn.init();
    };
    //共有函数
    priceObj.prototype={
        start : function(){
            _fn.start();
        }
    }

    //初始化
    _fn.init = function(){
        _fn.load();
        _fn.bindEvent();
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
    //开始核价
    _fn.start = function(){
        var index = _fn.typeIndex = _fn.getChekedIndex(_fn.radioGroup);
        _fn.pricingPartHide();
        $('html,body').scrollTop(0);
        $(_fn.pricingRet).show().children('div').hide();
        $('#fabricParam').fadeIn(300);//父容器 您要核价的面料参数 显示
        switch (index){
            case 0:
                $('#matFactoryList').fadeIn(); //与您匹配的面料供应商
                break;
            case 1:
                $('#selFactoryPrice').show(); //请选择各环节的工厂报价
                break;
            case 2,3:
                $('#priceRet').show();//您的询价结果
                break;
        }
    }

    //界面加载时执行
    _fn.load = function(){
        _fn.pricingPartH = $(_fn.pricingParamPart).height();
    }
    //注册事件
    _fn.bindEvent = function(){
        $('#matFactoryList,#selFactoryPrice,#priceRet').find('.butt_return').bind('click',function(){
            _fn.pricingRetHide();
            _fn.pricingPartShow();
        });
        $('#selFactoryPrice').find('.butt_pricing').bind('click',function(){
            $(this).parent().hide();
            _fn.askPrice();
        });
    }

    //接口
    module.exports.init = function(){
        return new priceObj();
    }


});

