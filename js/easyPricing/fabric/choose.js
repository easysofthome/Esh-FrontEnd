define(function(require, exports, module) {
    require('jquery');
    require('js/front/easydata/common/selCity'); //城市下拉选择
    var observer = parent.window.observer;
    $('.tab-box').find('.access_butt').bind('click',function(){
        var trOjb =  $(this).parent().parent();
        var data = {};
        data.fName = trOjb.find('.fName').text();
        data.fPrice = trOjb.find('.fPrice').text();
        data.fCode = trOjb.find('.fCode').attr('dataVal');
        data.fId = $(this).attr('dataFactoryId');
        //发布选择工厂绑定的数据
        observer.publish('factoryCallback',data);
        var index = parent.layer.getFrameIndex(window.name)
        parent.layer.close(index);
    });

});

