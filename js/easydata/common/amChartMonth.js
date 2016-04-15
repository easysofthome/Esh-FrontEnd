define(function (require, exports, module) {
  var AmCharts = require('serial');
  module.exports.init = function (name, dataProvider) {

    AmCharts.makeChart(name,
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
        "dataProvider": dataProvider
      }
    );
  }
});