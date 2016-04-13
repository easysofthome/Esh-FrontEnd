var alias = {
    //APP

    //Common
    "login": 'js/VIP/common/regLog/login',                  // 登录



    //Lib
    'jquery': 'js/lib/jquery/jquery',    //基本库支持 ('js/lib/jquery/jquery-1.8.3')
    'layer': 'js/lib/layer/layer.min',      //弹窗
    'animateColor': 'js/lib/jquery.animate-colors/jquery.animate-colors.js',    //jquery颜色过渡动画
    "switchable": "js/lib/jquery.switchable/2.0/jquery.switchable.min",         //切换
    'animateNumber': 'js/lib/jquery.animateNumber/jquery.animateNumber.min',         //数字变化插件
    // "Amcharts": "js/lib/amcharts/amcharts.js",                               //报表图形依赖
    "serial": "js/lib/amcharts/serial",                                       //报表图形

    // 兼容
    "placeholder": "assets/placeholder"                                       //placeholder兼容

};
var comboSyntax =['&&', '&'];

if (this.seajs) {
    seajs.config({

        base: "/",
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