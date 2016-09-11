define(function ( require, exports, module) {

  require('jquery');

  // var col1 = $('#set-table1 .vertical li').length-1;
  // var col2 = $('#set-table1 .vert_data:first li').length-1;
  // var width = $('.pricechangesbox').width()-60;
  // var w1 = width/col1;
  // var w2 = width/col2;

  // $('#set-table1 .vertical').each(function(index, el) {
  //   $(this).find('li:gt(0)').css('width',w1-3);
  // });
  // $('#set-table1 .vert_data').each(function(index, el) {
  //   $(this).find('li:gt(0)').css('width',w2-2);
  // });。

var loadObj =  require('js/front/lib/Loading/littleLoading.js');
//获取图片加载等待对象
var myloadObj = loadObj.init({
      'select':'#dataBox'
    });
//查询接口
$('.btn_01').click(function(){
  //出现
  myloadObj.show();

  setTimeout(function() {
     //消失
     myloadObj.destroy();
  }, 2000);


});



  var cols = $('#set-table1 tr:eq(1) td').length-1;
  var width = 1160-61;
  var w = width/cols;


  $('#set-table1 tr:gt(0)').each(function(index, el) {
    $(this).find('td:gt(0)').attr('width',w);
  });

  // var v = $('#set-table1 tr:eq(1)').find('td:eq(1)').width();
  // var w2 = 1160 < $('.pricechangesbox').width() ? 1160 : $('.pricechangesbox').width();
  $('#set-table1 table').css('width',1160);

  // $('.pricechangesbox tr').each(function(index, el) {
  //   $(this).find('td:eq(0)').attr('width',60);
  // });
  // var v = $('#set-table1 tr:eq(1)').find('td:eq(1)').width();
  // alert(cols);
  // alert(v);
  // alert(cols*v+61);
  // $('.pricechangesbox').css('width',cols*v+61);





  // var dataProvider1 = [
  //       {
  //         "date": "2011",
  //         "highest": 30,
  //         "average": 15,
  //         "lowest": 10
  //       },
  //       {
  //         "date": "2012",
  //         "highest": 50,
  //         "average": 35,
  //         "lowest": 25
  //       },
  //       {
  //         "date": "2013",
  //         "highest": 80,
  //         "average": 44,
  //         "lowest": 20
  //       },
  //       {
  //         "date": "2014",
  //         "highest": 60,
  //         "average": 40,
  //         "lowest": 30
  //       },
  //       {
  //         "date": "2015",
  //         "highest": 70,
  //         "average": 60,
  //         "lowest": 40
  //       },
  //       {
  //         "date": "2016",
  //         "highest": 60,
  //         "average": 50,
  //         "lowest": 40
  //       }
  //     ];
  //   var dataProvider2 = [
  //       {
  //         "date": "2011-01",
  //         "highest": 8,
  //         "average": 5,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-02",
  //         "highest": 6,
  //         "average": 7,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-03",
  //         "highest": 2,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-04",
  //         "highest": 1,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-05",
  //         "highest": 2,
  //         "average": 1,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-06",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-07",
  //         "highest": 6,
  //         "average": 8,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-08",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-09",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-10",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-11",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2011-12",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-01",
  //         "highest": 8,
  //         "average": 5,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-02",
  //         "highest": 6,
  //         "average": 7,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-03",
  //         "highest": 2,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-04",
  //         "highest": 1,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-05",
  //         "highest": 2,
  //         "average": 1,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-06",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-07",
  //         "highest": 6,
  //         "average": 8,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-08",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-09",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-10",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-11",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2012-12",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-01",
  //         "highest": 8,
  //         "average": 5,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-02",
  //         "highest": 6,
  //         "average": 7,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-03",
  //         "highest": 2,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-04",
  //         "highest": 1,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-05",
  //         "highest": 2,
  //         "average": 1,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-06",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-07",
  //         "highest": 6,
  //         "average": 8,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-08",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-09",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-10",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-11",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2013-12",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-01",
  //         "highest": 8,
  //         "average": 5,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-02",
  //         "highest": 6,
  //         "average": 7,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-03",
  //         "highest": 2,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-04",
  //         "highest": 1,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-05",
  //         "highest": 2,
  //         "average": 1,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-06",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-07",
  //         "highest": 6,
  //         "average": 8,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-08",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-09",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-10",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-11",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2014-12",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-01",
  //         "highest": 8,
  //         "average": 5,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-02",
  //         "highest": 6,
  //         "average": 7,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-03",
  //         "highest": 2,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-04",
  //         "highest": 1,
  //         "average": 3,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-05",
  //         "highest": 2,
  //         "average": 1,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-06",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-07",
  //         "highest": 6,
  //         "average": 8,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-08",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-09",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-10",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-11",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       },
  //       {
  //         "date": "2015-12",
  //         "highest": 3,
  //         "average": 2,
  //         "lowest": 5
  //       }
  //     ];

  // var amChartYear = require('js/front/easydata/common/amChartYear');
  //   amChartYear.init('chinapricefig1',dataProvider1)
  // var amCHartMonth = require('js/front/easydata/common/amCHartMonth');
  //   amCHartMonth.init('chinapricefig2',dataProvider2);
});
