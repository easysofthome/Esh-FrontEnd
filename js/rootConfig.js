var alias = {
    // common
    'loginPanel': 'js/common/loginPanel/loginPanel',                        //登录弹窗
    'headJs': 'js/common/headJs',
    'urlParam': 'js/common/UrlParam.js',
     'tools': 'js/common/tool/tool',

//Lib
    'jquery': 'js/lib/jquery/jquery',    //基本库支持 ('js/lib/jquery/jquery-1.8.3')
    //jquery cookie
    '$.cookie': 'js/lib/jquery.cookie/jquery.cookie',
    'jquery.query': 'js/lib/jquery.query',               //url支持
    // 兼容
    'placeholder': 'js/lib/placeholder',                                       //placeholder兼容
    // 动画、过渡
    'animateColor': 'js/lib/jquery.animate-colors/jquery.animate-colors',       //jquery颜色过渡动画
    'animateNumber': 'js/lib/jquery.animateNumber/jquery.animateNumber.min',    //数字变化插件
    // 图表
    'Amcharts': 'js/lib/amcharts/amcharts.js',                               //报表图形依赖
    'serial': 'js/lib/amcharts/serial',                                       //报表图形
    // 表单
    'customSelect': 'js/lib/jquery.customSelect/jquery.customSelect',         //自定义下拉菜单
    //弹窗
    'alertify': 'js/lib/alertify/alertify',             //提醒
    'layer': 'js/lib/layer/layer.min',      //弹窗
    'lightbox': 'js/common/lightbox/lightbox',
    //相册全屏
    'fullscreen': 'js/lib/fullscreen/fullscreen',
    // 轮播、切换
    'switchable': 'js/lib/jquery.switchable/2.0/jquery.switchable.min',   //切换
    'fullPage': 'js/lib/jquery.fullPage/jquery.fullPage.min.js',          //全屏滚动
    'fullPageCss': 'js/lib/jquery.fullPage/jquery.fullPage.css',          //全屏滚动样式
    // 易设计图片对比
    'jquery.event.move': 'js/lib/jquery.event.move/jquery.event.move.js',
    'jquery.twentytwenty': 'js/lib/jquery.twentytwenty/jquery.twentytwenty.js',

    // seajs
    'seajs-debug': 'js/common/seajs/sea-debug',
    'seajs-style': 'js/common/seajs/seajs-style',
    'seajs-log': 'js/common/seajs/seajs-log'

};
var comboSyntax =['&&', '&'];

if (this.seajs) {
    seajs.config({

        local: "/static/",
        base: "http://182.168.1.115:2323/",
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