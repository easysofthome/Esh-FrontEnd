define(function (require, exports, module) {
  require('js/front/common/module/switchMatch.css');
  require('jquery');
  require('js/front/lib/placeholder');

  var width,height;
  var _this;

  function init(inputDiv){
    _this = $(inputDiv);
    getAttr(inputDiv);              //得到div宽高
    initHtml(inputDiv);             //构造html结构

    initSet(inputDiv);              //设置样式
    initHover(inputDiv);            //鼠标经过事件
    initClick(inputDiv + ' ul');    //鼠标点击事件
  }

  function getAttr(inputDiv){
    // width = _this.width() + parseInt(_this.css('padding-top')) + parseInt(_this.css('padding-bottom'));
    // height = _this.height() + parseInt(_this.css('padding-left')) + parseInt(_this.css('padding-right'));

    width = _this.width();
    height = _this.height();
  }

  function initSet (inputDiv) {
    getAttr(inputDiv);
    _this.find('span.input-tri').css('top',height/2-4);

    _this.find('input')
        .css('padding-top',height/5)
        .css('padding-bottom',height/5)
        .css('padding-left',height/5)
        .css('padding-right',height/5)
        .css('width',width-height*2/5+1)
        .css('height',height-height*2/5-1);

    // 设置顶部偏移
    var offsetH = getHeight(inputDiv);
    setTop(inputDiv,offsetH);
  }

  // 设置顶部偏移
  function setTop (inputDiv,h) {
    $(inputDiv+ ' ul').css('top',h);
  }
  // 计算高度
  function getHeight(inputDiv){
    var obj = $(inputDiv);
    var h = obj.height();
    h += parseInt(obj.css('padding-top'));
    h += parseInt(obj.css('padding-bottom'));
    return h;
  }

  function initHtml (inputDiv) {
    var placeholder = $(inputDiv).find('span').html();
    $(inputDiv).find('span').remove();
    var id = $(inputDiv).attr('inputId');
    var inputvalue = $(inputDiv).attr('inputvalue');
    var inputTri = '<span class="input-tri"></span>';
    var inputHtml = '<input type="text" placeholder="'+ placeholder +'" id="'+ id +'" value="'+ inputvalue +'"/>';
    $(inputDiv).find('ul').before(inputHtml).before(inputTri);
  }

  function initHover (inputDiv) {
    $(inputDiv + '>input').on('mouseover', function(event) {
      $(this).siblings('ol,ul').show();
    });
    $(inputDiv).hover(
      function(event) {

      },function () {
        $(this).find('ol,ul').hide();
      }
    );
  }

  // 点击事件
  function initClick (selObj) {
    $(selObj + '>li').on('click', function(event) {
      $(this).parent().hide();
      $(this).parent().siblings('input').val($(this).text())
    });
  }

  exports.init = init;

  exports.initHover = initHover;

  exports.initClick = initClick;

});