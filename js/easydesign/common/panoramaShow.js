 define(function (require, exports, module) {
  require('jquery');
  var loadImageObj = require('loadImage');
  var Detector =require('js/front/lib/panoramaShow/Detector');
  var THREE;
  if (Detector.webgl) {
    THREE = require('js/front/lib/panoramaShow/three.min');
  }
  window.THREE = THREE;
  var PhotoSphereViewer =require('js/front/lib/panoramaShow/Photo-Sphere-Viewer');
  var AC_OETags = require('js/front/lib/panoramaShow/AC_OETags');


  var intObj = {};
  var paramObj = {
      'options':'',
      getParams:function(url) {
        var ret = {};
        var seg = url.search.replace(/^\?/, '').split('&');
        var len = seg.length;
        var i = 0;
        var s;
        for (; i < len; i++) {
            if (!seg[i]) {
                continue;
            }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
        }
        return ret;
      },
      'width':0,
      'height':0,
      'imgURL':''
    };

    var sUlr = paramObj.getParams(window.location);
    paramObj.width = sUlr['width'];
    paramObj.height = sUlr['height'];
    paramObj.imgURL = sUlr['panorama'];
    paramObj.options = window.location.search.replace(/^\?/, '');

//for H5 support webGL
(function(){

  intObj.initFlashPanoH5 = function(){
    var PSV = new PhotoSphereViewer({
      // Panorama, given in base 64
      panorama: paramObj.imgURL,

      // Container
      container: 'container',

      // Deactivate the animation
      time_anim: false,

      // Display the navigation bar
      navbar: true,

      // Resize the panorama
      size: {
        width: paramObj.width,
        height: paramObj.height
      },

      // No XMP data
      usexmpdata: false
    });
  }



})();


(function(){
      var container;
      var camera, scene, renderer;
      var fov = 70,
      texture_placeholder,
      isUserInteracting = false,
      onMouseDownMouseX = 0, onMouseDownMouseY = 0,
      lon = 0, onMouseDownLon = 0,
      lat = 0, onMouseDownLat = 0,
      phi = 0, theta = 0,
      w =0,h=0;

     intObj.init = function() {
        w = paramObj.width;
        h = paramObj.height;
        var mesh;
        container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( fov, w / h, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
        scene = new THREE.Scene();
        mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ),
          new THREE.MeshBasicMaterial( {map:
            THREE.ImageUtils.loadTexture( paramObj.imgURL,null,function(img){
              //确定浏览器支持WebGL
              if (Detector.webgl) {
                animate();
              }else{
                //flash for ie10-ie6
                console.log('flash for ie10-ie6 ');
              }
        }) } ) );

        mesh.scale.x = -1;
        scene.add( mesh );
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( w, h );
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseleave', onDocumentMouseLeave, false );
        document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
        document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);
        window.addEventListener( 'resize', onWindowResize, false );
      }

      function onWindowResize() {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize( w, h );
      }

      function onDocumentMouseDown( event ) {
        event.preventDefault();
        isUserInteracting = true;
        onPointerDownPointerX = event.clientX;
        onPointerDownPointerY = event.clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
      }

      function onDocumentMouseMove( event ) {
        if ( isUserInteracting ) {
          lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
          lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
        }
      }

      function onDocumentMouseUp( event ) {
        isUserInteracting = false;
      }
      function onDocumentMouseLeave( event ) {
        isUserInteracting = false;
      }

      function onDocumentMouseWheel( event ) {

        // WebKit

        if ( event.wheelDeltaY ) {

          fov -= event.wheelDeltaY * 0.05;

        // Opera / Explorer 9

        } else if ( event.wheelDelta ) {

          fov -= event.wheelDelta * 0.05;

        // Firefox

        } else if ( event.detail ) {

          fov += event.detail * 1.0;

        }

        camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );
        render();

      }

      function animate() {
        requestAnimationFrame( animate );
        render();
      }

      function render() {
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.Math.degToRad( 90 - lat );
        theta = THREE.Math.degToRad( lon );

        camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
        camera.target.y = 500 * Math.cos( phi );
        camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

        camera.lookAt( camera.target );

        /*
        // distortion
        camera.position.x = - camera.target.x;
        camera.position.y = - camera.target.y;
        camera.position.z = - camera.target.z;
        */

        renderer.render( scene, camera );

      }

})();

//for ie10-ie6 only support flash
(function(){
  var requiredMajorVersion = 9;
  var requiredMinorVersion = 0;
  var requiredRevision = 28;
 intObj.initFlashPano = function(){
   // Version check based upon the values defined in globals
   var hasRequestedVersion = AC_OETags.DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
   if (hasRequestedVersion) {
      AC_OETags.AC_FL_RunContent(
          'wrapperID','container',
          "src", "http://cjmx.easysofthome.com/rmpanoplayer",
          "FlashVars",paramObj.options,
          "menu","false",
          "width", paramObj.width,
          "height", paramObj.height,
          "align", "middle",
          "id", "Main",
          "quality", "high",
          "wmode", "transparent",
          "bgcolor", "#333333",
          "name", "Main",
          "allowFullScreen","true",
          "allowScriptAccess","sameDomain",
          "type", "application/x-shockwave-flash",
          "pluginspage", "http://www.adobe.com/go/getflashplayer"
      );
    } else {  // flash is too old or we can't detect the plugin
      var alternateContent = '为了您正常观看，请安装flash'
      + '<a href=http://www.adobe.com/go/getflash/>点击安装</a>';
      document.write(alternateContent);  // insert non-flash content
    }
 }

})();


    //确定浏览器支持WebGL
    if (Detector.webgl) {
      //intObj.init();
      intObj.initFlashPanoH5();
    }else{
      //flash for ie10-ie6
      intObj.initFlashPano();
    }

});