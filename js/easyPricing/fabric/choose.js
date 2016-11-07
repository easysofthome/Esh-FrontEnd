define(function(require, exports, module) {
    require('jquery');
    var dropDownPanel = require('js/front/common/dropDownPanel/dropDownPanel');
    //选择工厂页对象
    var choosePage = {
        selBaseUrl :'/Pricing/Fabric/FindGreyClothFactory',
        observer:parent.window.observer,
        noDataHtml:'<tr><td colspan=5>没有匹配的数据！</td></tr>',
        dataTableSelector:'.TheBinding-box .tab-box tbody',
        dataTableLoadHtml:'<tr><td colspan=5><div class="loading"></div></td></tr>'
    }
    //初始化
    choosePage.init = function(){
        this.bindEvent();
        //将父页面序列化的值放入隐藏域
        $("#hideparm").val(this.getFormParams());
    }
    //坯布页面加载后执行
    choosePage.greyFabricInit = function(){
        this.greyFabricBindEvent();
         //页面加载后自动查询数据
        this.searchAjax();
    }
    //事件绑定
    choosePage.bindEvent = function(){
        var that = this;
        //确定
        $('.tab-box').find('.access_butt').bind('click',function(){
            that.btnOKCallback($(this));
        });
        //选择地区回调
        that.selCityCb();
    }
    //坯布页面事件绑定
    choosePage.greyFabricBindEvent = function(){
        var that = this;
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
    }
    //选择地区
    choosePage.selCityCb = function(){
        dropDownPanel.callback = function (e) {
            var code = $(e).children('span').attr("data");
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
            '&FactoryName=',selKeyword,
            '&PageIndex='+this.pagination.curPageIndex
        ].join()).replace(/=,/g,'=').replace(/,&/g,'&');
        return selDataParm;
    }
    //查询Ajax
    choosePage.searchAjax = function(){
        var that = this;
        var selDataParm = this.getSelParam();
        that.ajaxLoad(true);
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
    //数据加载等待
    choosePage.ajaxLoad = function(noFinished){
        var $table = $(this.dataTableSelector);
        if(noFinished){
            $table.html(this.dataTableLoadHtml);
        }
    }
    //查询后数据渲染
    choosePage.searchCallback = function(data){
        var that = this;
        var len = data.GreyClothFactorys.length;
        var $table = $(that.dataTableSelector);
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
                $td.removeClass('fPrice');
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
            $table.html($tr);
            //渲染页码
            that.pagination.init(data);
        }else{
            $table.html(that.noDataHtml);
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
    //页码对象
    choosePage.pagination = {
        that:choosePage,
        curPageIndex:1,
        pageSize:10,
        pageCount:0,
        $pagination : $('.TheBinding-box .next-box'),
        init:function(data){
            this.curPageIndex = data.PageIndex;
            this.pageSize = data.PageSize;
            this.pageCount = Math.ceil(data.TotalItemCount/parseInt(this.pageSize));
            if(this.curPageIndex<=1&&this.pageCount>1){
                this.showPageBtn('.nextPage');
            }else if(this.curPageIndex>1){
                this.showPageBtn('.prevPage');
            }else if(this.pageCount<=1){
                this.hidePageBtn('.nextPage');
                this.hidePageBtn('.prevPage');
                this.hidePageBtn('.firstPage');
                this.hidePageBtn('.endPage');
            }
            //绑定分页事件
            this.bindEvent();
        },
        goPage:function(){
            this.searchAjax();
        },
        nextPage:function(){
            this.curPageIndex++;
            if(this.curPageIndex>=this.pageCount){
                this.hidePageBtn('.nextPage');
            }else{
               this.goPage();
            }
        },
        prevPage:function(){
            this.curPageIndex--;
            if(this.curPageIndex<=0){
                this.hidePageBtn('.prevPage');
            }else{
                this.goPage();
            }
        },
        firstPage:function(){
            this.PageIndex = 1;
            this.goPage();
        },
        endPage:function(){
            this.curPageIndex = this.pageCount;
            this.goPage();
        },
        bindEvent:function(){
            var _that = this;
            //下一页
            this.$pagination.find('.nextPage').click(function(){
                _that.nextPage();
            });
            //上一页
            this.$pagination.find('.prevPage').click(function(){
                _that.prevPage();
            });
            //首页
            this.$pagination.find('.firstPage').click(function(){
                _that.firstPage();
            });
            //尾页
            this.$pagination.find('.endPage').click(function(){
                _that.endPage();
            });
        },
        hidePageBtn:function(selector){
            this.$pagination.find(selector).hide();
        },
        showPageBtn:function(selector){
            this.$pagination.find(selector).show();
        }
    }

    //入口
    choosePage.init();
    //坯布页面接口
    module.exports.greyFabricInit = choosePage.greyFabricInit;
    module.exports.getFormParams = choosePage.getFormParams;

});

