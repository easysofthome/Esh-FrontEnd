define(function(require, exports, module) {
//观察者模式
var observer = (function(){
    var subscribes = {};
    var content = [];
    var _update = function(data){

    }
    var subscribe = function(id,update){
        var ob = {};
        ob.id = id;
        ob.update = update || _update;
        content.push(ob);
    }
    var publish = function(id,data){
        var len = content.length;
        for(var i=0;i<len;i++ ){
            if(content[i].id==id){
                content[i].update(data);
            }
        }

    }
    var unsubscribe = function (id) {
        var len = content.length;
        for(var i=0;i<len;i++ ){
            if(content[i].id==id){
                content[i].splice(i,1);;
            }
        }
    }

    return {
        publish:publish,
        subscribe:subscribe,
        unsubscribe:unsubscribe
    }
})();

module.exports = observer;
});