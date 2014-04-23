var panels = {};
var topMenuItems = {};
var frames = [];
var fakeFrames = [];
var text3DMenu;

function Statue(){
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;
  var elementSize = 1024;
  var frameSize = (10*elementSize)/630;

  this.init = function(){
    this.generate();
    text3DMenu = new Menu3D();

    //category
    this.newPanel('futurgo', 'projects');
    this.newPanel('razer', 'projects');
    this.newPanel('tcho', 'projects');
    this.newPanel('castle', 'projects');
    this.newPanel('heart', 'projects');
    this.newPanel('garden', 'projects');
    this.newPanel('holiday', 'projects');


    this.newPanel('tony', 'team');
    this.newPanel('dave', 'team');
    this.newPanel('dusan', 'team');
    this.newPanel('eric', 'team');
    this.newPanel('tc', 'team');


  };

  this.generate = function(){
    var numFrames = 5;
    var numFakeFrames = 5;
    var rFR = MathHelpers.randFloatRange;
    var material1 = new THREE.MeshBasicMaterial({color: 0xeaf9e2, side: THREE.DoubleSide});
    var material2 = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent:true, opacity: 0.0});
    var materials = [];
    materials.push(material1);
    materials.push(material1);
    materials.push(material1);
    materials.push(material1);
    materials.push(material2);
    materials.push(material2);
    var geo = new THREE.BoxGeometry(frameSize, frameSize, 1);
    var mesh, pos;
    for(var i =0; i < numFrames; i++){
      //REAL FRAMES (CONTENT CAN BE ADDED HERE)
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      //We want all frames flat for text anchoring on front and back sides
      mesh.rotation.x = Math.PI/2;
      scene.add(mesh);
      frames.push(mesh);
    }

    //FAKE FRAMES (NO CONTENT)
    for(i = 0; i < numFakeFrames; i++){
      geo = new THREE.BoxGeometry(_.random(5, 50), _.random(5, 50), _.random(0.1, 1));
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      if(Math.random() > 0.6){
        mesh.rotation.x = Math.PI/2;
      }
      scene.add(mesh);
    }


  };

  this.newPanel = function(name, category){
    panels[name] = new THREE.Object3D();
    panels[name].html = document.getElementById(name);
    panels[name].html.style.overflow = 'hidden';
    panels[name].html.style.width = elementSize + 'px';
    panels[name].html.style.height = elementSize + 'px';
    panels[name].html.style.opacity = 0;
    panels[name].content = new THREE.CSS3DObject(panels[name].html);
    panels[name].content.scale.multiplyScalar(1/63.5);
    panels[name].add(panels[name].content);

    //generate the menu item associated with this
    text3DMenu.createMenuItem(name, category);


  };
}


function generateFramePosition(){
  var bounds = 40;
  var pos =  {
    x: _.random(-bounds/2,bounds),
    y: _.random(-bounds,bounds),
    z: _.random(0,bounds)
  };

  return pos;
}

//Here we handle camera rotation and text tweening
function updateStatue(path){
  //First we need to tween back any active panels
  discardFrame();
  //our little 3d router
  console.log(path);
  //We are on main page and want header text displayed
  if(path === ''){
    path = 'header';
  }

}

