require('js/front/common/dropDownPanel/dropDownPanel'], function (o) {

    });
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
        //确定
        $('.tab-box').find('.access_butt').bind('click',function(){
            that.btnOKCallback($(this));
        });
        //查找
        $('.sortbox .intbox').children('a').click(function(){

        });
         //默认排序 OrderBy=0
        $('.sortbox .sort_def').children('a').click(function(){
            $('#OrderBy').val(0);
        });
        //价格排序 OrderBy=3/4
        $('.sortbox .sort_price').children('a').click(function(){
            var sortPrice_cur = $('#OrderBy').val();
            var sortPrice = '';
            //如果当前是价格正排序3则置为反排序4
            if(sortPrice == '3'){
                sortPrice = '4';
            //反之亦然
            }else if(sortPrice == '4'){
                sortPrice = '3';
            //如果当前是默认排序0则置为价格正排序3
            }else if(sortPrice == '0'){
                sortPrice = '3';
            }
            $('#OrderBy').val(sortPrice);
            //ajax
        });
        //选择地区回调
        this.selCityCb();
    }
    //选择地区
    choosePage.selCityCb = function(){
        o.callback = function (e) {
            var code = $(e).attr('data');
            $('AreaCityCode').val(code);
        }
    }
    //获取查询参数
    choosePage.processSelParam = function(){
        //排序参数 0为默认排序,3为价格正排序,4为价格倒排序
        var defSort = $('#OrderBy').val();
        var defSortCity = $('#AreaCityCode').val();

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

