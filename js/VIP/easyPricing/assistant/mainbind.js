define(function(require, exports, module){
    require('jquery');
    var layer = require('layer');

    $('.btn').on("click", function(){

        var that = this;
        var layerHref = $(this).attr('data-href');

        $.layer({
            type: 2,
            title: false,
            area: ['865px', '440px'],
            border: [5, 0.3, '#000'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 360)/2+'px',''],
            closeBtn: [0, true], //默认关闭按钮
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function (layer) {}
        });

    });

    $('.upload').on("click", function(){

        var that = this;
        var layerHref = $(this).attr('data-href');

        $.layer({
            type: 2,
            title: false,
            closeBtn: [0, true], //默认关闭按钮
            border: [5, 0.3, '#000'],
            area: ['1200px','auto'],
            shade: [0.8, '#000'],
            shadeClose: true,
            offset: [($(window).height() - 360)/2+'px',''],
            shift: 'top',
            fix : false,
            iframe: {src: $(that).attr('data-href')},
            success: function (layer) {}
        });

    });


});