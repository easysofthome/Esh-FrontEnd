define(function (require, exports, module) {
  require('jquery');

  function copyToClipBoard(className){
    $("."+className).text().clone();
  }

  $("#copy_share").bind("click",function(){

      copyToClipBoard("p03");
  });

});