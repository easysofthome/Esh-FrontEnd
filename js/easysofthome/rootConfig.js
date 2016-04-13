var alias = {
    //APP
    "index": "js/easysofthome/index",                  //首页


};
var comboSyntax =['&&', '&'];

if (this.seajs) {
    seajs.config({

        base: "/Static/",
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