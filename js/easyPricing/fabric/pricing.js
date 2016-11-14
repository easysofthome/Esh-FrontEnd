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
        priceFabricParam:'#fabricParam',
        selFactoryParam:{
            yarn:[],//纱线列表
            reprocessing:'',//后处理以','分割
            dyedMethod:''//染织方法


        }//保存选择工厂报价的必要数据
    };
    /**
     * 核价页面对象，主要实现核价功能的页面操作，将原先多个页面的功能整合到一个页面（多页面传参不好控制） 包括样式、数据不涉及前后台数据交互
     */
    var priceObj = function(){
        _fn.init();
    };
    //共有函数
    priceObj.prototype = {
        start : function(){
            _fn.start();
            _fn.bindSelFactory();
        }
    }
    //初始化
    _fn.init = function(){
        this.load();
        this.bindEvent();
        this.subscribe();
    }
    //界面加载时执行
    _fn.load = function(){
        this.pricingPartH = $(this.pricingParamPart).height();
        this.originalHTML = $(this.priceFabricParam).html();
    }
    ///////////////////////////////操作DOM//////////////////////////////

    //开始核价
    _fn.start = function(){
        //选中的核价方式
        //index：核价方式（1.直接采购成品面料2.选择坯布+染色（印花）3选择纱线+织造+染色（印花））4.采用易家纺系统核价
        var index = this.typeIndex = this.getChekedIndex(this.radioGroup);
        this.pricingPartHide();
        this.toTop();
        $(this.pricingRet).show().children('div').hide();
        this.processHTML_priceParam(index);//构建核价的面料参数 数据
        $('#fabricParam').fadeIn(300);//父容器 核价面料参数 显示
        switch (index){
            case '0':
                $('#matFactoryList').fadeIn(); //与您匹配的面料供应商
                break;
            case '1':
                $('#selFactoryPrice').show().find('.butt_box').show(); //请选择各环节的工厂报价
                this.factory.processHTML_selFactoryPrice_f_c();
                break;
            case '2':
                $('#selFactoryPrice').show().find('.butt_box').show(); //请选择各环节的工厂报价
                this.factory.processHTML_selFactoryPrice_y_w_c();
                break;
            case '3':
                $('#priceRet').show();//您的询价结果
                break;
            default:
               $('#matFactoryList').fadeIn(); //与您匹配的面料供应商
               $('#priceRet').show();//您的询价结果
               break;
        }
    }
    //隐藏核价操作部分
    _fn.pricingPartHide = function(){
        $(this.pricingParamPart).animate({height: 0, opacity: 0}, "slow",function(){$(this).hide()});
    }
    //显示核价操作部分
    _fn.pricingPartShow = function(cb){
        $(this.pricingParamPart).show().animate({height: this.pricingPartH, opacity: 1}, 500,function(c){
            if(cb){
                cb();
            }
        });
    }
    _fn.pricingRetHide = function(cb){
        $(this.pricingRet).fadeOut(500,function(){
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
    //获取选中的radio的索引
    _fn.getChekedIndex = function(selector){
        var selVal = $(selector+' input[type="radio"]:checked').val();
        return selVal;
    }
    //生成核价页您面料参数数据
    _fn.processHTML_priceParam = function(index){
        var that = this;
        $(this.priceFabricParam).html(this.originalHTML);
        var $ul = $('<ul class="clearfix inf_box"></ul>');
        var $li = $('<li class="lf"></li>');
        var $span = $('<span class="inf_data"></span>');
        var $fabricParam = $(this.priceFabricParam);
        //起 订 量
        $span.html($('#OrderQuantityId option:selected').text());
        $li.html('起订量 :   '+$span[0].outerHTML)
        $ul.append($li[0].outerHTML);

        //织造种类
        var weavingType = $('#fabricForm').find('input[name="WeavingType"]:checked').next('span').text();
        $span.html(weavingType);
        $li.html('织造种类 :   '+ $span[0].outerHTML);
        $ul.append($li[0].outerHTML);

        //面料门幅
        $span.html($('#fabricWidth').val());
        $li.html('面料门幅 :   '+$span[0].outerHTML);
        $ul.append($li[0].outerHTML);

        //纱线种类数量 经纬密
        this.processHTML_priceParam_partA($li,$ul,$span);

        //经纱 纱线列表
        this.processHTML_priceParam_partB($li,$ul,index);

        //染织方式
        var DyeingType = $('#dyed-method input[type="radio"]:checked').next('span').text();
        //存储织造种类
        this.selFactoryParam.dyedMethod = DyeingType;
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
        that.selFactoryParam.reprocessing = '';
        $('#yeWorksAftertreatment').find('input[type="checkbox"]:checked').each(function(i){
            var symbol = i>0?',':'';
            var checkedTxt = $(this).parent().text();
            //存储染厂后处理
            that.selFactoryParam.reprocessing +=(symbol+$(this).val());
            $span.html(checkedTxt+'   ');
            $li.append($span[0].outerHTML);
        });
        $ul.append($li[0].outerHTML);
        var otherAftertreatmentTxt = '其他后处理 :   ';
        //其他后处理
        $li.html(otherAftertreatmentTxt);
        $('#otherAftertreatment').find('input[type="checkbox"]:checked').each(function(){
            var symbol = that.selFactoryParam.reprocessing.length>0?',':'';
            var checkedTxt = $(this).parent().text();
            //存储其他后处理
            that.selFactoryParam.reprocessing +=(symbol+$(this).val());
            $span.html(checkedTxt+'   ');
            $li.append($span[0].outerHTML);
        });
        $ul.append($li[0].outerHTML);
        $fabricParam.append($ul);

    }

    //纱线种类数量 经纬密
    _fn.processHTML_priceParam_partA = function($li,$ul,$span){
        var yarnTypeNumTxt = $('.yarnTypeNum input[type="radio"]:checked').next('span').text();
        if(yarnTypeNumTxt == '单经单纬'){
            $span.html('单经单纬');
            $li.html('纱线种类数量 :   '+$span[0].outerHTML);
            $ul.append($li[0].outerHTML);
            $span.html($(singleWarpSpinnerNum).val()+'*'+$(singleabbSpinnerNum).val());
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
    _fn.processHTML_priceParam_partB = function($li,$ul,index) {
      var that = this;
      //清空纱线列表
      that.selFactoryParam.yarn = [];
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
          var thatLi = this;
          $div_sub.empty();
          var para_tit = $(this).find('.para_tit').html()
          $span.html(para_tit);
          //成分
          var yarnComponentVal = $(this).find('input[dataName="YarnSpecName"]').val();
          $p.html('成分：' +yarnComponentVal);
          $div_sub.append($p[0].outerHTML);
          //粗细
          var yarnthicknessVal = $(this).find('input[dataName="YarnNum"]').val();
          $p.html('粗细：' +yarnthicknessVal);
          $div_sub.append($p[0].outerHTML);
          //股线
          var foldedYarnsVal = $(this).find('input[dataName="StrandsNum"]').val();
          $p.html('股线：' +foldedYarnsVal);
          $div_sub.append($p[0].outerHTML);
          //成分比
          var ratioConstituentsVal = $(this).find('input[dataName="ComponentRatio"]').val();
          $p.html('成分比：' +ratioConstituentsVal);
          $div_sub.append($p[0].outerHTML);
          //将DIV放入父级DIV
          $div_base.html($span[0].outerHTML+$div_sub[0].outerHTML);
          //父级DIV放入LI
          $listLi.append($div_base[0].outerHTML);
          //记录下选择各环节的工厂报价所需的参数
          if(index==1||index==2){
              var fName = $(this).children('span:first').text(); //工厂名称
              var factoryId = $(this).find('input[dataName="FactoryYarnMId"]').attr('name');
              var urlParams = that.factory.symbolJoin(thatLi,[
                'FabricElementId','YarnSpecName','YarnSpecNum','StrandsNum','ComponentRatio','HolesNum','Technology','YarnSpecNumUnit'],'dataName');
              that.selFactoryParam.yarn.push({fName:fName,urlParams:urlParams,factoryId:factoryId});
          }
        });
      });

      //LI放入UL
      $ul.append($listLi[0].outerHTML);
      $li.removeClass('yarntype_box');
    }
    /**
     * [工厂报价选择]
     * 生成HTML 为‘选择工厂’按钮绑定click事件并指定url及参数
     * @type {Object}
     */
    _fn.factory = {
      testUrl:false,
      //testUrl:'/html/easyPricing/fabric/choose.html?',
      pThis :_fn,
      baseUrl:'/Pricing/Fabric/',
      tagArray :['可做坯布的','染色','印花','色织','后处理','','织造'],
      //HTML（选择坯布+染色（印花））
      processHTML_selFactoryPrice_f_c : function(){
        var $table = $('<table class="tab-box"></table>');
        var $tbody = $('<tbody></tbody>');
        //可做坯布的工厂
        $tbody.append(this.greyClothFactory());
        //'染色','印花','色织' 工厂
        $tbody.append(this.getDyedMethod(this.pThis.selFactoryParam.dyedMethod));
        //后处理工厂
        $tbody.append(this.afterProcessFactory());
        $table.html($tbody);
        //先清空Table再放入Table
        $('#selFactoryPrice').children('.tab-box').remove();
        $('#selFactoryPrice').children('.tit_box').after($table);
      },
       //生成选择工厂HTML（选择纱线+织造+染色（印花））
      processHTML_selFactoryPrice_y_w_c : function(){
        var $table = $('<table class="tab-box"></table>');
        var $tbody = $('<tbody></tbody>');
        $tbody.append(this.yarnSpecFactory());
        //织造工厂
        $tbody.append(this.weavingFacytory());
        //'染色','印花','色织' 工厂
        $tbody.append(this.getDyedMethod(this.pThis.selFactoryParam.dyedMethod));
        //后处理工厂
        $tbody.append(this.afterProcessFactory());
        $table.html($tbody);
        //先清空Table再放入Table
        $('#selFactoryPrice').children('.tab-box').remove();
        $('#selFactoryPrice').children('.tit_box').after($table);
      },
      //得到染织方法
      getDyedMethod : function(key){
        var ret = '';
        switch(key){
          case this.tagArray[1]:
            ret = this.dyeingColourationFactory();
            break;
          case this.tagArray[2]:
            ret = this.dyeingPrintingFactory();
            break;
          case this.tagArray[3]:
            ret = this.dyeingYarnDyedFactory();
            break;
        }
        return ret;
      },
      //纱线列表
      yarnSpecFactory:function(){
        var trs = '';
        var yarns = this.pThis.selFactoryParam.yarn;
        var len = yarns.length;
        for(var i =0;i<len;i++){
          var tr = this.processTd({
            fName:yarns[i].fName.replace(/\：$/,'')+'工厂',
            url:this.testUrl?this.testUrl+yarns[i].urlParams:this.baseUrl+'/ChooseYarnSpecFactory?'+yarns[i].urlParams,
            factoryId:yarns[i].factoryId
          });
          trs += tr;
        }
        return trs;

      },
      //可做坯布的工厂
      greyClothFactory:function(){
        return this.processTd({
            fName:this.tagArray[0]+'工厂',
            url:this.testUrl?this.testUrl+params:this.baseUrl+'ChooseGreyClothFactory',
            factoryId:'GreyClothFactoryId'
        });
      },
      //染色工厂
      dyeingColourationFactory:function(){
        var params = this.symbolJoin('body',
          ['DyeingMaterial','FabricTotalWeight','FabricWidth','DyeingColorRequirements']);
        return this.processTd({
            fName:this.tagArray[1]+'工厂',
            url:this.testUrl?this.testUrl+params:this.baseUrl+'ChooseDyeingColourationFactory?'+params,
            factoryId:'DyeingColourationMId'
        });
      },
      //印花工厂
      dyeingPrintingFactory:function(){
        var params = this.symbolJoin('body',
          ['DyeingMaterial','DyeingColourFastnessGrade','FabricWidth','DyeingIsPositionFlower','FlowerLoop','DyeingColorNum','DyeingDyeRequirement','DyeingPrintingProcessRequirements']);
        return this.processTd({
            fName:this.tagArray[2]+'工厂',
            url:this.testUrl?this.testUrl+params:this.baseUrl+'ChooseDyeingPrintingFactory?'+params,
            factoryId:'DyeingPrintingMId'
        });
      },
      //色织工厂
      dyeingYarnDyedFactory:function(){
        var params = this.symbolJoin('body',
          ['FabricMaterials','DyeingProcessRequirements']);
        return this.processTd({
            fName:this.tagArray[3]+'工厂',
            url:this.testUrl?this.testUrl+params:this.baseUrl+'ChooseDyeingYarnDyedFactory?'+params,
            factoryId:'DyeingYarnDyedFactoryId'
        });
      },
      //织造工厂
      weavingFacytory:function(){
        var params = this.symbolJoin('body',
          ['WovenMaterial','ChaineDensityLength','WeavingType','DyeingType','FabricWidth','OrderQuantityId']);
        return this.processTd({
            fName:this.tagArray[6]+'工厂',
            url:this.testUrl?this.testUrl+params:this.baseUrl+'ChooseWeavingFactory?'+params,
            factoryId:'WeavingProcessMId'
        });
      },
      //后处理工厂
      afterProcessFactory:function(){
        //后处理没有选择，则返回空，页面则不会显示
        if(this.pThis.selFactoryParam.reprocessing.length==0) return '';
        return this.processTd({
            fName:this.tagArray[4]+'工厂',
            url:this.testUrl?this.testUrl+this.pThis.selFactoryParam.reprocessing:this.baseUrl+'ChooseAfterProcessesFactory?SelectAfterProcessIDs='+this.pThis.selFactoryParam.reprocessing,
            factoryId:''
        });
      },
      /**
       * 从页面获取表单元素值
       * sel 容器selector
       * arrayName 表单元素name数组
       */
      symbolJoin:function(sel,arryName,attr){
        var myAttr = attr || 'name';
        var len = arryName.length;
        var p = '';
        for(var i=0;i<len;i++){
          var symbol = i>0?'&':'';
          var val = $(sel).find('input['+myAttr+'="'+arryName[i]+'"]');
          if(!val||!val.attr('name')){
            val = $(sel).find('select['+myAttr+'="'+arryName[i]+'"]');
            if(val&&val.attr('name')){
              p += (symbol+ val.attr(myAttr)+'='+val.val());
            }
          }else{
             p += (symbol+ val.attr(myAttr)+'='+val.val());
          }
        }
        return p;

      },
      //生成tr td部分
      processTd : function(opt){
        var myopt = {
            btnName:'选择工厂'
        }
        var opts = $.extend(myopt,opt);
        var $tr = $('<tr></tr>');
        var $td = $('<td></td>');
        var $span = $('<span></span>');
        $td.addClass('name').text(opts.fName);
        $tr.append($td[0].outerHTML);
        $td.attr('class','lf').empty();
        $tr.append($td[0].outerHTML);
        $td.attr('class','operation');
        $span.attr('data-href',opts.url).attr('class','btn-save btn').text(opts.btnName);
        $span.attr('factoryId',opt.factoryId);
        $td.html($span[0].outerHTML);
        $tr.append($td[0].outerHTML);
        return $tr[0].outerHTML;
      }
    }

    //检索与您匹配的面料供应商 加载提示
    _fn.startLoadData = function(){
        $('#matFactoryList .tab-box tbody').html('<tr><td colspan="5" style="text-align: center;">正在加载。。。。</td></tr>');
    }
    //去掉加载提示
    _fn.endLoadData = function(){
        $('#matFactoryList .tab-box tbody').html('加载完成');
    }

    /////////////////////事件////////////////////
    //注册事件
    _fn.bindEvent = function(){
        var that = this;
        //返回
        $('#matFactoryList,#selFactoryPrice,#priceRet').find('.butt_return').bind('click',function(){
            that.pricingRetHide();
            that.pricingPartShow(function(){
                that.toBottom();
            });
        });
        //核价
        $('#selFactoryPrice').find('.butt_pricing').bind('click',function(){
          if(that.validEmptyFactory()){
            $(this).parent().hide();
            that.askPrice();
          }else{
            layer.msg('请选择工厂报价！',2,{
              shade:[0, '#000'],
              type:0
            });
          }

        });

        //检索与您匹配的面料供应商
        $('#searchFactoryName').bind('change keydown',function(){
            that.startLoadData();
        });
    }
    //选择工厂报价不能为空
    _fn.validEmptyFactory = function(){
      var tag = false;
      $('#selFactoryPrice .tab-box tr').each(function(){
        var text = $(this).children('td:nth-child(2)').text().replace(/\s/g,'');
        if(text.length>0){
          tag = true;
          return;
        }
      });
      return tag;
    }
    //选择工厂事件
    _fn.bindSelFactory = function(){
        var that = this;
         //选择工厂
        $('.btn').on("click", function(){
            var _that = this;
            that.$factory_flag  = $(this);
            var layerHref = $(this).attr('data-href');
            $.layer({
                type: 2,
                title: false,
                area: ['965px', '300px'],
                border: [5, 0.3, '#000'],
                shade: [0.8, '#000'],
                shadeClose: true,
                offset: [($(window).height() - 500)/2+'px',''],
                closeBtn: [0, true], //默认关闭按钮
                shift: 'top',
                fix : false,
                iframe: {src: $(_that).attr('data-href')},
                success: function (layer) {}
            });
        });
     }
     //订阅功能
     _fn.subscribe = function(){
        var that = this;
        //订阅选择工厂数据 添加工厂名称、价格、code
        observer.subscribe('factoryCallback',function(data){
            if(that.$factory_flag){
              that.$factory_flag.parent().prev('td').html(data.fName+' '+data.fPrice);
            }
        });
        //订阅选择工厂数据 给不同工厂的隐藏域factoryID赋值
         observer.subscribe('factoryCallback',function(data){
          if(that.$factory_flag){
            var fPriceName = that.$factory_flag.attr('factoryId');
            if(fPriceName.length>0){
              //$('#fabricForm').find('input[name="'+fPriceName+'"]').val(data.fId);
              $('input[name="'+fPriceName+'"]').val(data.fCode);
            }
          }
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

