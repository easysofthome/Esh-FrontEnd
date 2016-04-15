var alias = {
//
//Lib
    'jquery': 'js/lib/jquery/jquery',    //基本库支持 ('js/lib/jquery/jquery-1.8.3')
    // 兼容
    'placeholder': 'assets/placeholder',                                       //placeholder兼容
    // 动画、过渡
    'animateColor': 'js/lib/jquery.animate-colors/jquery.animate-colors',    //jquery颜色过渡动画
    'animateNumber': 'js/lib/jquery.animateNumber/jquery.animateNumber.min',         //数字变化插件
    // 图表
    'Amcharts': 'js/lib/amcharts/amcharts.js',                               //报表图形依赖
    'serial': 'js/lib/amcharts/serial',                                       //报表图形
    //弹窗
    'layer': 'js/lib/layer/layer.min',      //弹窗
    // 轮播、切换
    'switchable': 'js/lib/jquery.switchable/2.0/jquery.switchable.min',         //切换
    'fullPage': 'js/lib/jquery.fullPage/jquery.fullPage.min.js',          //全屏滚动
    'fullPageCss': 'js/lib/jquery.fullPage/jquery.fullPage.css'          //全屏滚动样式

};
var comboSyntax =['&&', '&'];

if (this.seajs) {
    seajs.config({

        local: "/static/",
        base: "http://182.168.1.115:2323/",
        debug: true,

        comboSyntax: this.comboSyntax,
        alias: this.alias
        // comboExcludes:/.*.css/,
        // base: "http://static.easysofthome.com/Static/", //http://localhost:2323
        // preload: ['jquery'],
        // alias: alias,
        // map: [

        // ],
        // debug: true
    });

} else {
    module.exports.alias = alias;
    module.exports.comboSyntax = comboSyntax;
}