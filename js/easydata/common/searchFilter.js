define(function(require, exports, module) {

    require('jquery');
    var arrObj1 = [{min: false, max: 100 }, {min: 100, max: 300 }, {min: 300, max: 500 }, {min: 500, max: 1000 }, {min: 1000, max: 2000 }, {min: 2000, max: false } ];
    var arrObj2 = [{min: false, max: 50 }, {min: 50, max: 100 }, {min: 100, max: 200 }, {min: 200, max: 300 }, {min: 300, max: 500 }, {min: 500, max: false } ];
    var arrObj3 = [{min: false, max: 10 }, {min: 10, max: 30 }, {min: 30, max: 50 }, {min: 50, max: 100 }, {min: 100, max: 200 }, {min: 200, max: false }, ];

    var max1 = '';   // 第一个列表中选中的最大值
    var max2 = '';   // 第二个列表中选中的最大值
    var index2, index3; // 能显示的最大索引

    var index;          // 点击按钮的索引

    $('.leibie_box').on('click', '.leibie:eq(0) a', function() {
        $(this).parent().find('.current').removeClass('current');
        $(this).toggleClass('current');
        $('.leibie:eq(2) .current').removeClass('current');
        $('.leibie:eq(3)').hide();

        index = $(this).index();

        max1 = arrObj1[index].max;
        index2 = findIndex(arrObj2, index, max1);
        $('.leibie:eq(2) a').show();
        $('.leibie:eq(2) a:gt('+ index2 +')').hide();
        $('.leibie:eq(2)').show();
    }).on('click', '.leibie:eq(2) a', function() {
        $(this).parent().find('.current').removeClass('current');
        $(this).toggleClass('current');
        $('.leibie:eq(3) .current').removeClass('current');

        index = $(this).index();

        max2 = arrObj2[index].max;
        index3 = findIndex(arrObj3, index, max2);
        $('.leibie:eq(3) a').show();
        $('.leibie:eq(3) a:gt('+ index3 +')').hide();
        $('.leibie:eq(3)').show();
    }).on('click', '.leibie:eq(3) a', function() {
        $(this).parent().find('.current').removeClass('current');
        $(this).toggleClass('current');
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