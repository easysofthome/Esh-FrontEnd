define(function (require, exports, module) {
  require('js/front/common/module/switchMatch.css');
  require('jquery');
  require('js/front/lib/placeholder');

  var switchMatch = {
    width: 0,
    heiht: 0,
    _this: '',
    getAttr: function (inputDiv){
      var that = this;
      width = that._this.width();
      height = that._this.height();
    },
    initSet: function  (inputDiv) {
      var that = this;
      that.getAttr(inputDiv);
      that._this.find('span.input-tri').css('top',height/2-4);

      that._this.find('input')
          .css('padding-top',height/5)
          .css('padding-bottom',height/5)
          .css('padding-left',height/5)
          .css('padding-right',height/5)
          .css('width',width-height*2/5+1)
          .css('height',height-height*2/5-1);

      // 设置顶部偏移
      var offsetH = this.getHeight(inputDiv);
      switchMatch.setTop(inputDiv,offsetH);
    },
    // 设置顶部偏移
    setTop: function  (inputDiv,h) {
      $(inputDiv+ ' ul').css('top',h);
    },
    // 计算高度
    getHeight: function (inputDiv){
      var obj = $(inputDiv);
      var h = obj.height();
      h += parseInt(obj.css('padding-top'));
      h += parseInt(obj.css('padding-bottom'));
      return h;
    },
    initHtml: function (inputDiv) {
      var placeholder = $(inputDiv).find('span').html();
      $(inputDiv).find('span').remove();
      var id = $(inputDiv).attr('inputId');
      var inputvalue = $(inputDiv).attr('inputvalue');
      var inputTri = '<span class="input-tri"></span>';
      var inputHtml = '<input type="text" placeholder="'+ placeholder +'" id="'+ id +'" value="'+ inputvalue +'"/>';
      $(inputDiv).find('ul').before(inputHtml).before(inputTri);
    },
    initHover: function (inputDiv) {
      $(inputDiv + '>input').on('mouseover', function(event) {
        $(this).siblings('ol,ul').show();
      });
      $(inputDiv).hover(
        function(event) {

        },function () {
          $(this).find('ol,ul').hide();
        }
      );
    },
    // 点击事件
    initClick: function (selObj) {
      $(selObj + '>li>a').on('click', function(event) {
        $(this).parents('.esh-sel')
               .find('input').val($(this).text())
               .siblings('ul').hide();
      });
    },
    init: function (inputDiv){
      switchMatch._this = $(inputDiv);
      switchMatch.getAttr(inputDiv);              //得到div宽高
      switchMatch.initHtml(inputDiv);             //构造html结构
      switchMatch.initSet(inputDiv);              //设置样式
      switchMatch.initHover(inputDiv);            //鼠标经过事件
      switchMatch.initClick(inputDiv + ' ul');    //鼠标点击事件
    }
  };

  exports.init = switchMatch.init;

  exports.initHover = switchMatch.initHover;

  exports.initClick = switchMatch.initClick;

});