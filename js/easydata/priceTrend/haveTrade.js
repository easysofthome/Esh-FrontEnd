define(function ( require, exports, module) {
  var AmCharts = require('serial');

  AmCharts.makeChart("chinapricefig1",
    {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY",
      "theme": "default",
      "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true
      },
      // "url": "/js/lib/amcharts/images/dragIcon.gif",
      "chartCursor": {
        "enabled": true,
        "animationDuration": 0,
        "categoryBalloonDateFormat": "YYYY"
      },
      "chartScrollbar": {
        "enabled": true
      },
      "trendLines": [],
      "graphs": [
        {
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "最高价",
          "valueField": "highest"
        },
        {
          "bullet": "square",
          "id": "AmGraph-2",
          "title": "平均价",
          "valueField": "average"
        },
        {
          "bullet": "round",
          "id": "AmGraph-3",
          "title": "最低价",
          "valueField": "lowest"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          // "title": "中国出口价格年度变化"
        }
      ],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "enabled": true,
        "useGraphSettings": true
      },
      // "titles": [
      //   {
      //     "id": "Title-1",
      //     "size": 15,
      //     "text": ""
      //   }
      // ],
      "dataProvider": [
        {
          "date": "2011",
          "highest": 30,
          "average": 15,
          "lowest": 10
        },
        {
          "date": "2012",
          "highest": 50,
          "average": 35,
          "lowest": 25
        },
        {
          "date": "2013",
          "highest": 80,
          "average": 44,
          "lowest": 20
        },
        {
          "date": "2014",
          "highest": 60,
          "average": 40,
          "lowest": 30
        },
        {
          "date": "2015",
          "highest": 70,
          "average": 60,
          "lowest": 40
        },
        {
          "date": "2016",
          "highest": 60,
          "average": 50,
          "lowest": 40
        }
      ]
    }
  );
  AmCharts.makeChart("chinapricefig2",
    {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY-MM",
      "theme": "default",
      "categoryAxis": {
        "minPeriod": "MM",
        "parseDates": true
      },
      "chartCursor": {
        "enabled": true,
        "categoryBalloonDateFormat": "MMM YYYY"
      },
      "chartScrollbar": {
        "enabled": true
      },
      "trendLines": [],
      "graphs": [
        {
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "最高价",
          "valueField": "higest"
        },
        {
          "bullet": "square",
          "id": "AmGraph-2",
          "title": "平均价",
          "valueField": "average"
        },
        {
          "bullet": "round",
          "id": "AmGraph-3",
          "title": "最低价",
          "valueField": "lowest"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1"
        }
      ],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "enabled": true,
        "useGraphSettings": true
      },
      "titles": [],
      "dataProvider": [
        {
          "date": "2011-01",
          "higest": 8,
          "average": 5,
          "lowest": 5
        },
        {
          "date": "2011-02",
          "higest": 6,
          "average": 7,
          "lowest": 5
        },
        {
          "date": "2011-03",
          "higest": 2,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2011-04",
          "higest": 1,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2011-05",
          "higest": 2,
          "average": 1,
          "lowest": 5
        },
        {
          "date": "2011-06",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2011-07",
          "higest": 6,
          "average": 8,
          "lowest": 5
        },
        {
          "date": "2011-08",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2011-09",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2011-10",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2011-11",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2011-12",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-01",
          "higest": 8,
          "average": 5,
          "lowest": 5
        },
        {
          "date": "2012-02",
          "higest": 6,
          "average": 7,
          "lowest": 5
        },
        {
          "date": "2012-03",
          "higest": 2,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2012-04",
          "higest": 1,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2012-05",
          "higest": 2,
          "average": 1,
          "lowest": 5
        },
        {
          "date": "2012-06",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-07",
          "higest": 6,
          "average": 8,
          "lowest": 5
        },
        {
          "date": "2012-08",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-09",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-10",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-11",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2012-12",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-01",
          "higest": 8,
          "average": 5,
          "lowest": 5
        },
        {
          "date": "2013-02",
          "higest": 6,
          "average": 7,
          "lowest": 5
        },
        {
          "date": "2013-03",
          "higest": 2,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2013-04",
          "higest": 1,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2013-05",
          "higest": 2,
          "average": 1,
          "lowest": 5
        },
        {
          "date": "2013-06",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-07",
          "higest": 6,
          "average": 8,
          "lowest": 5
        },
        {
          "date": "2013-08",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-09",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-10",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-11",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2013-12",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-01",
          "higest": 8,
          "average": 5,
          "lowest": 5
        },
        {
          "date": "2014-02",
          "higest": 6,
          "average": 7,
          "lowest": 5
        },
        {
          "date": "2014-03",
          "higest": 2,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2014-04",
          "higest": 1,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2014-05",
          "higest": 2,
          "average": 1,
          "lowest": 5
        },
        {
          "date": "2014-06",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-07",
          "higest": 6,
          "average": 8,
          "lowest": 5
        },
        {
          "date": "2014-08",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-09",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-10",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-11",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2014-12",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-01",
          "higest": 8,
          "average": 5,
          "lowest": 5
        },
        {
          "date": "2015-02",
          "higest": 6,
          "average": 7,
          "lowest": 5
        },
        {
          "date": "2015-03",
          "higest": 2,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2015-04",
          "higest": 1,
          "average": 3,
          "lowest": 5
        },
        {
          "date": "2015-05",
          "higest": 2,
          "average": 1,
          "lowest": 5
        },
        {
          "date": "2015-06",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-07",
          "higest": 6,
          "average": 8,
          "lowest": 5
        },
        {
          "date": "2015-08",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-09",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-10",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-11",
          "higest": 3,
          "average": 2,
          "lowest": 5
        },
        {
          "date": "2015-12",
          "higest": 3,
          "average": 2,
          "lowest": 5
        }
      ]
    }
  );

});
