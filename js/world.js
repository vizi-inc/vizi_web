var scene;
var camera;
var refractCamera;
var controls;
var renderer, cssRenderer;
var panel = [];
var frames = [];
var navigation;
var clock = new THREE.Clock();

//When you click on tab, the text
//try fonts
//pt sans
// vizi text in yellow from marina's pinterest

var world = new World();
world.init();

function World(){
  var controlsEnabled = false;
  this.init = function(){
    
    //RENDERERS
    var canvasYOffset = 40;
    var canvasElement = document.getElementById('three-canvas');
    renderer = new THREE.CanvasRenderer();
    renderer.domElement.style.position = "fixed";
    canvasElement.appendChild(renderer.domElement);
    renderer.setClearColor(0x9cafb3);

    cssRenderer = new THREE.CSS3DRenderer();
    canvasElement.appendChild(cssRenderer.domElement);

    scene = new THREE.Scene();

    //CAMERA
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 50000);
    // camera.position.set(-150, 140, 100);
    camera.position.set(0, 0, 140);
    camera.lookAt(0, 0, 0);

    //CONTROLS
    if(controlsEnabled){
      controls = new THREE.TrackballControls(camera);
    }



    //STATUE
    this.statue = new Statue();
    this.statue.init();



  };


  //UPDATE LOOP*******************************************
  this.render = function(){
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };

  this.update = function(){
    if(controlsEnabled){
      controls.update();
    }
    TWEEN.update();
      camera.lookAt(scene.position);
    this.statue.update();


  };

}



// handle resizing windows
window.onload = function(){
  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();
  
};

function onWindowResize(){

    renderer.setSize( window.innerWidth, window.innerHeight );
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

var tick = function(){
  world.update();
  world.render();
};

tick();

