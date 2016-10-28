define(function(require, exports, module) {
    require('jquery');
    require('js/front/easydata/common/selCity'); //城市下拉选择
    //选择工厂页对象
    var choosePage = {
        observer:parent.window.observer
    }
    //初始化
    choosePage.init = function(){
        this.bindEvent();
    }
    //事件绑定
    choosePage.bindEvent = function(){
        var that = this;
        $('.tab-box').find('.access_butt').bind('click',function(){
            that.btnOKCallback($(this));
        });
    }
    //确定按钮回调函数
    choosePage.btnOKCallback = function($that){
        //tr对象
        var trOjb =  $that.parent().parent();
        var data = {};
        data.fName = trOjb.find('.fName').text();
        data.fPrice = trOjb.find('.fPrice').text();
        data.fCode = trOjb.find('.fCode').attr('dataVal');
        //data.fId = $(this).attr('dataFactoryId');
        data.fId = ''
        //发布选择工厂绑定的数据
        this.observer.publish('factoryCallback',data);
        var index = parent.layer.getFrameIndex(window.name)
        parent.layer.close(index);
    }
    //获取父页面form内所有参数，并序列化
    choosePage.getFormParams = function(){
        var form = $(parent.window.document).find('#fabricForm');
        if(form){
            //接口 form内所有参数
            return form.serialize();
        }
    }

    //入口
    choosePage.init();
    module.exports.getFormParams = choosePage.getFormParams;

});

