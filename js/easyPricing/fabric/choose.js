define(function(require, exports, module) {
    require('jquery');
    require('js/front/easydata/common/selCity'); //城市下拉选择
    var dropDownPanel = require('js/front/common/dropDownPanel/dropDownPanel');
    //选择工厂页对象
    var choosePage = {
        selBaseUrl :'/Pricing/Fabric/FindGreyClothFactory',
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
            //ajax请求数据
            that.searchAjax();
        });
        //默认排序 OrderBy=0
        $('.sortbox .sort_def').children('a').click(function(){
            $('#OrderBy').val(0);
            //ajax请求数据
            that.searchAjax();
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
            //ajax请求数据
            that.searchAjax();
        });
        //选择地区回调
        that.selCityCb();
    }
    //选择地区
    choosePage.selCityCb = function(){
        dropDownPanel.callback = function (e) {
            var code = $(e).children('a').attr("data");
            $('#AreaCityCode').val(code);
        }
    }
    //获取查询参数
    choosePage.getSelParam = function(){
        //排序参数 0为默认排序,3为价格正排序,4为价格倒排序
        var defSort = $('#OrderBy').val();
        var selCity = $('#AreaCityCode').val();
        var selKeyword = $('#FactoryName').val();
        var otherParam = $("#hideparm").val();
        var selDataParm = ([
            otherParam,
            '&OrderBy=',defSort,
            '&AreaCityCode=',selCity,
            '&FactoryName=',selKeyword
        ].join()).replace(/=,/g,'=').replace(/,&/g,'&');
        return selDataParm;
    }
    //查询Ajax
    choosePage.searchAjax = function(){
        var that = this;
        var selDataParm = this.getSelParam();
        $.ajax({
            type: "POST",
            url: this.selBaseUrl,
            data:selDataParm,
            dataType: "json",
            success: function (data) {
                that.searchCallback(data);
            }
        });
    }
    //查询后数据渲染
    choosePage.searchCallback = function(data){
        var that = this;
        var len = data.GreyClothFactorys.length;
        var $table = $('.TheBinding-box .tab-box');
        if(len>0){
            for(var i=0;i<len;i++){
                var obj = data.GreyClothFactorys[i];
                var $tr = $('<tr></tr>');
                var $td = $('<td></td>');
                $td.text(obj.FactoryName);
                $tr.append($td[0].outerHTML);
                $td.text(obj.AreaName);
                $td.attr('class','fName')
                $tr.append($td[0].outerHTML);
                $td.text(obj.Price);
                $td.attr('class','fPrice')
                $tr.append($td[0].outerHTML);
                $td.text(obj.LastUpdateDate);
                $tr.append($td[0].outerHTML);
                //确定按钮
                $td.html('<a href="javascript:void(0)" class="access_butt clearfix"><span class="lf confirm_bule"></span>'+
                         '<span class="lf">确定</span></a>');
                $td.attr('class','fCode').attr('dataval',obj.FactoryId);
                $tr.append($td[0].outerHTML);
                $tr.find('a').click(function(){
                    that.btnOKCallback($(this));
                });
            }
            $table.append("")($tr);
        }
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

