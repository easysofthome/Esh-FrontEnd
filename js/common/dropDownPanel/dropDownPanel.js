define(function (require, exports, module) {
   require('js/front/common/dropDownPanel/dropDownPanel.css');
   require('jquery');
   exports.callback;

   var index = parent.layer.getFrameIndex(window.name);
    $('.close,.btn_close').click(function(){
      parent.layer.close(index);
    });
   $('#selCity').hover(function() {
        $('.pop-up').show();
    },function() {
        $('.pop-up').hide();
    });

    // 设置输入框的值
    var setVal = function(obj) {
        var hl = $(obj).find('span').html();
        $('.dropdownInput').val(hl);
        if(exports.callback){
          exports.callback(obj);
        }
    }
    //获取二级城市距离父容器的距离
    function leftNumToParent(targer){
      //父容器paddingLeft
      pPaddingL = parseInt($('.pop-up').css('paddingLeft').replace('px',''));
      var pL = $('.pop-up').offset().left+ pPaddingL;
      var curL = $(targer).offset().left;
      return curL - pL;
    }

    // 省份
    $('.provinces>.item').on('click', function() {
      var index = $(this).index();
       var obj = $(this).children('.sub-items');
      if(obj.is(':hidden')){
        //setVal(this);
        //获取二级城市距离父容器的距离
        leftNum = leftNumToParent(this);
        $('ul.sub-items').hide();
        //弹出的二级城市层向左对齐
        obj.css({'left':-leftNum+'px'});
        obj.show();
      }else{
        obj.hide();
      }


    })
    // 最终城市
    $('.sub-items .item').on('click', function(e) {
        if($(this).index() != 0){
            setVal(this);
        }
        $('.pop-up').hide();
        return false;
    })

    // 选择热门城市
    $('.zxcities>.item').on('click', function() {
        setVal(this);
        $('.pop-up').hide();
    })

  function Trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

});
