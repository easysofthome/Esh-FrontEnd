var alias = {
    // common
    'tools': 'js/front/common/tool/tool',

//Lib
    'jquery': 'js/front/lib/jquery/jquery',    //基本库支持 ('js/front/lib/jquery/jquery-1.8.3')
    // cookie
    'cookie': 'js/front/lib/cookie/cookie',
    'jquery.query': 'js/front/lib/jquery.query/jquery.query',               //url支持
    // 兼容
    'placeholder': 'js/front/lib/placeholder',                                       //placeholder兼容
    // 动画、过渡
    'animateColor': 'js/front/lib/jquery.animate-colors/jquery.animate-colors',       //jquery颜色过渡动画
    'animateNumber': 'js/front/lib/jquery.animateNumber/jquery.animateNumber.min',    //数字变化插件
    // 图表
    'Amcharts': 'js/front/lib/amcharts/amcharts.js',                               //报表图形依赖
    'serial': 'js/front/lib/amcharts/serial',                                       //报表图形
    // 表单
    'customSelect': 'js/front/lib/jquery.customSelect/jquery.customSelect',         //自定义下拉菜单
    'spinner': 'js/front/lib/jquery.spinner/jquery.spinner',                        //数字加减按钮
    'FancyRadioCheckBox': 'js/front/lib/RadioAndCheckBox/FancyRadioCheckBox',
    //弹窗
    'tip': 'js/front/lib/tip/jquery.poshytip',    //提醒
    'layer': 'js/front/lib/layer/layer.min',      //弹窗
    'layerExt': 'js/front/lib/layer/layer.ext',      //弹窗扩展

    // 轮播、切换
    'switchable': 'js/front/lib/jquery.switchable/2.0/jquery.switchable.min',   //切换
    'fullPage': 'js/front/lib/jquery.fullPage/jquery.fullPage.min.js',          //全屏滚动

    // 易设计图片对比
    'jquery.event.move': 'js/front/lib/jquery.event.move/jquery.event.move.js',
    'jquery.twentytwenty': 'js/front/lib/jquery.twentytwenty/jquery.twentytwenty.js',

    // seajs
    'seajs-debug': 'js/front/common/seajs/seajsdebug',
    'seajs-style': 'js/front/common/seajs/seajs-style',
    'seajs-log': 'js/front/common/seajs/seajs-log'

};

var comboSyntax =['$$', '&'];
if (this.seajs) {
    seajs.config({

        local: "/static/",
        base: "/",
        debug: true,

        comboSyntax: this.comboSyntax,
        alias: this.alias
        //comboExcludes:/.*.css/,
        // base: "http://static.easysofthome.com/Static/", //http://localhost:2323
        // preload: ['jquery'],
        //alias: alias,
        // map: [

        // ],
        //debug: true
    });

} else {
    module.exports.alias = alias;
    module.exports.comboSyntax = comboSyntax;
}
