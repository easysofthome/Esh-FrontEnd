define(function(require, exports, module) {
    require('jquery');
    var pricing = parent.window.priceObjPage;
    $('.tab-box').find('.access_butt').bind('click',function(){
        var trOjb =  $(this).parent().parent();
        var data = {};
        data.fName = trOjb.find('.fName').text();
        data.fPrice = trOjb.find('.fPrice').text();
        data.fCode = trOjb.find('.fCode').attr('dataVal');
        pricing.selFactoryCb(data);
        var index = parent.layer.getFrameIndex(window.name)
        parent.layer.close(index);
    });

});

