define(function (require, exports, module) {
  require('jquery');
  require('jquery.event.move');
  require('jquery.twentytwenty');

  $('.simulation').twentytwenty();
  $(document).ready(function () {
    switch(location.search){
      case '?id1':
        $('.simulation img').eq(0).attr('src','/images/production/easydesign/bedroom1.jpg');
        $('.simulation img').eq(1).attr('src','/images/production/easydesign/bedroom2.jpg');
        break;
      case '?id2':
        $('.simulation img').eq(0).attr('src','/images/production/easydesign/bathroom1.jpg');
        $('.simulation img').eq(1).attr('src','/images/production/easydesign/bathroom2.jpg');
        break;
      case '?id3':
        $('.simulation img').eq(0).attr('src','/images/production/easydesign/drawing1.jpg');
        $('.simulation img').eq(1).attr('src','/images/production/easydesign/drawing2.jpg');
        break;
      case '?id4':
        $('.simulation img').eq(0).attr('src','/images/production/easydesign/kitchen1.jpg');
        $('.simulation img').eq(1).attr('src','/images/production/easydesign/kitchen2.jpg');
        break;
      default:
        break;
    }
  });
});