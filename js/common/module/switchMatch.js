define(function (require, exports, module) {
  require('js/common/module/switchMatch.css');
  require('jquery');

  // <div id="sel-match" class="clearfix">
  //   <input class="int_110 lf esh-input" type="text" placeholder="请选择"/>
  //   <i></i>
  //   <ol class="esh-sel none">
  //     <li class="match">高</li>
  //     <li class="match">中</li>
  //     <li class="match">低</li>
  //   </ol>
  // </div>
  var width,height;

  function init(inputDiv){
    initHover(inputDiv);
    initHtml(inputDiv);
    initSet(inputDiv);
  }

  function getAttr(inputDiv){
    width = $(inputDiv).width();
    height = $(inputDiv).height();
    alert(width+height);
  }

  setTop(getHeight());

  function setTop (h) {
    $('.esh-sel').css('top',h);
  }

  function getHeight(inputDiv){
    var obj = $('.esh-input');
    var h = obj.height();
    h += parseInt($('.esh-input').css('padding-top'));
    h += parseInt($('.esh-input').css('padding-bottom'));
    return h;
  }


  function initSet (inputDiv) {
    getAttr(inputDiv);
  }

  function initHtml (inputDiv) {
    var placeholder = $(inputDiv).find('span').html();
    var id = $(inputDiv).attr('inputId');
    var inputHtml = '<input type="text" id="'+ id +'"/>';
    $(inputDiv).find('ul').before(inputHtml);
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

  module.exports.init = init;

  module.exports.initHover = initHover;

  // 点击事件
  // module.exports.initClick = function (selObj) {
  //   $(selObj + '>li').on('click', function(event) {
  //     $(this).parent().hide();
  //     $(this).parent().siblings('input').val($(this).text())
  //   });
  // }
});