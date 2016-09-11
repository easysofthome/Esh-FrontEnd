define(function(require, exports, module) {

    require('jquery');

    // documentReady 执行 并提供对外的接口
    var domReady = function() {
        var searchValue = $('input[name=searchFilter]').val().trim();
        if(searchValue == '') return;
        var arr = JSON.parse(searchValue);

        // 根据用户信息展示
        if(arr[0].min == undefined){
            var index1 = arrIndexArea(arrObj1, arr[0]);
            if(arr.length > 1)
                index2 = arrIndexArea(arrObj2, arr[1]);
            if(arr.length > 2)
                index3 = arrIndexArea(arrObj3, arr[2]);
        } else {    // 用户搜索的结果
            var index1 = arrIndex(arrObj1, arr[0]);
            var index2 = '',index3 = '';
            if(arr.length > 1)
                index2 = arrIndex(arrObj2, arr[1]);
            if(arr.length > 2)
                index3 = arrIndex(arrObj3, arr[2]);
        }

        var showObj1 = $('.leibie:eq(0)'),
            showObj2 = $('.leibie:eq(2)'),
            showObj3 = $('.leibie:eq(3)');
        if(showObj1) showObj1.find('a:eq(' + index1 + ')').trigger("click").addClass('current');
        if(arr[1]) {
            showObj2.show().find('a:eq(' + index2 + ')').trigger("click").addClass('current');
        } else {
            showObj3.hide();
        }
        if(arr[2])
            showObj3.show().find('a:eq(' + index3 + ')').trigger("click").addClass('current');
    }

    $(document).ready(function() {
        domReady();
    });

    module.exports.override = domReady;

    // 找到所属范围
    function arrIndexArea(obj, value){
        var temp;
        for(i in obj){
            if(value > obj[i].min && !obj[i].max){
                temp = i;
            } else if(value > obj[i].min && value <= obj[i].max){
                temp = i;
            }
        }
        return temp;
    }
    // 找到要选中的列表项索引
    function arrIndex(obj,value) {
        for(i in obj){
            if(obj[i].max == value.max)
                return i;
        }
    }



//////////////// 搜索条件过滤 ///////////////////////
    var arrObj1 = [{min: false, max: 100 }, {min: 100, max: 300 }, {min: 300, max: 500 }, {min: 500, max: 1000 }, {min: 1000, max: 2000 }, {min: 2000, max: false } ];
    var arrObj2 = [{min: false, max: 10 }, {min: 10, max: 50 }, {min: 50, max: 100 }, {min: 100, max: 200 }, {min: 200, max: false }];
    var arrObj3 = [{min: false, max: 0.2 }, {min: 0.2, max: 0.5 }, {min: 0.5, max: 1 }, {min: 1, max: 5 }];

    var dataArr = [];

    var max1 = '';   // 第一个列表中选中的最大值
    var max2 = '';   // 第二个列表中选中的最大值
    var index2, index3; // 能显示的最大索引

    var index;          // 点击按钮的索引

    $('.leibie_box').on('click', '.leibie:eq(0) a', function() {
        index = $(this).index();

        // 切换current类
        if($(this).hasClass("current")) {
            $(this).removeClass('current');
            $('.leibie:eq(2)').hide();
        } else {
            $(this).parent().find('.current').removeClass('current');
            $(this).addClass('current');
            $('.leibie:eq(2)').show();
        }

        $('.leibie:eq(2) .current').removeClass('current');
        $('.leibie:eq(3)').hide();

        max1 = arrObj1[index].max;
        index2 = findIndex(arrObj2, index, max1);
        $('.leibie:eq(2) a').show();
        $('.leibie:eq(2) a:gt('+ index2 +')').hide();

        dataArr = [];
        if($(this).hasClass('current')) {
            dataArr.push(arrObj1[index]);
        }

        $('input[name=searchFilter]').val(JSON.stringify(dataArr));
    }).on('click', '.leibie:eq(2) a', function() {
        index = $(this).index();

        // 切换current类
        if($(this).hasClass("current")) {
            $(this).toggleClass('current');
            $('.leibie:eq(3)').hide();
        } else {
            $(this).parent().find('.current').removeClass('current');
            $(this).addClass('current');
            $('.leibie:eq(3)').show();
        }

        $('.leibie:eq(3) .current').removeClass('current');

        max2 = arrObj2[index].max;
        index3 = findIndex(arrObj3, index, max2);
        $('.leibie:eq(3) a').show();
        $('.leibie:eq(3) a:gt('+ index3 +')').hide();

        var indexTemp = $('.leibie:eq(0) .current').index();
        dataArr = [];
        dataArr.push(arrObj1[indexTemp]);
        if($(this).hasClass('current')){
            dataArr.push(arrObj2[index]);
        }

        $('input[name=searchFilter]').val(JSON.stringify(dataArr));

    }).on('click', '.leibie:eq(3) a', function() {
        index = $(this).index();
        // 切换current类
        if($(this).hasClass("current")) {
            $(this).toggleClass('current');
        } else {
            $(this).parent().find('.current').removeClass('current');
            $(this).addClass('current');
        }

        var indexTemp = $('.leibie:eq(0) .current').index();
        var indexTemp2 = $('.leibie:eq(2) .current').index();
        dataArr = [];
        dataArr.push(arrObj1[indexTemp]);
        dataArr.push(arrObj2[indexTemp2]);
        dataArr.push(arrObj3[index]);

        $('input[name=searchFilter]').val(JSON.stringify(dataArr));
    });


    // 找到能显示的最大索引
    function findIndex(obj,index,max) {
        var data;
        // 假如要搜索的是第二个对象
        if(obj[0] == arrObj2[0]){
            for(i in obj) {
                if(obj[i].max <= max){
                    if(obj[i].max == 0) {
                        if(arrObj1[index].max > obj[i].min){
                            data = i;
                        }
                    } else {
                        data = i;
                    }
                }
            }
        // 假如要搜索的是第三个对象
        } else if(obj[0] == arrObj3[0]) {
            for(i in obj) {
                if(obj[i].max <= max){
                    if(obj[i].max == 0) {
                        if(arrObj2[index].max > obj[i].min){
                            data = i;
                        }
                    } else {
                        data = i;
                    }
                }
            }
        }
        return data;
    }

});