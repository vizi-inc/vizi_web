var panels = {};
var topMenuItems = {};
var frames = [];
var fakeFrames = [];
var text3DMenu;
var frameNeighborThreshold = 20;
//each project category will contain an array of jquery elements - each one being an individual project
var projectsMap = {
  'environments': {},
  'products': {},
  'interfaces': {}
};



function Statue() {
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;
  var elementSize = 1024;
  var frameSize = (10 * elementSize) / 630;

  this.init = function() {
    this.generate();
    text3DMenu = new Menu3D();
    text3DMenu.init();

    //category
    this.newPanel('tcho', 'projects', 'environments');
    this.newPanel('castle', 'projects', 'environments');
    this.newPanel('garden', 'projects', 'environments');

    this.newPanel('heart', 'projects', 'interfaces');
    this.newPanel('holiday', 'projects', 'interfaces');

    this.newPanel('futurgo', 'projects', 'products');
    this.newPanel('razer', 'projects', 'products');

    //create the 3 text items for project categories
    text3DMenu.createMenuItem('environments', 'projects');
    text3DMenu.createMenuItem('interfaces', 'projects');
    text3DMenu.createMenuItem('products', 'projects');



    this.newPanel('tony', 'team');
    this.newPanel('dave', 'team');
    this.newPanel('dusan', 'team');
    this.newPanel('eric', 'team');
    this.newPanel('tc', 'team');
    this.newPanel('marina', 'team');
    this.newPanel('simo', 'team');

  };

  this.generate = function() {
    var numFrames = 7;
    var numFakeFrames = 7;
    var rFR = MathHelpers.randFloatRange;
    var material1 = new THREE.MeshBasicMaterial({
      color: 0xeaf9e2,
      side: THREE.DoubleSide
    });
    var material2 = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.0
    });
    var materials = [];
    materials.push(material1);
    materials.push(material1);
    materials.push(material1);
    materials.push(material1);
    materials.push(material2);
    materials.push(material2);
    var geo = new THREE.BoxGeometry(frameSize, frameSize, 1);
    var mesh, pos;
    for (var i = 0; i < numFrames; i++) {
      //REAL FRAMES (CONTENT CAN BE ADDED HERE)
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      //We want all frames flat for text anchoring on front and back sides
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
      frames.push(mesh);
    }

    //FAKE FRAMES (NO CONTENT)
    for (i = 0; i < numFakeFrames; i++) {
      geo = new THREE.BoxGeometry(_.random(5, 50), _.random(5, 50), _.random(0.1, 1));
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      if (Math.random() > 0.6) {
        mesh.rotation.x = Math.PI / 2;
      }
      scene.add(mesh);
    }


  };

  this.newPanel = function(name, category, projectType) {
    panels[name] = new THREE.Object3D();
    panels[name].html = document.getElementById(name);
    panels[name].html.style.overflow = 'hidden';
    panels[name].html.style.width = elementSize + 'px';
    panels[name].html.style.height = elementSize + 'px';
    panels[name].html.style.opacity = 0;
    panels[name].content = new THREE.CSS3DObject(panels[name].html);
    panels[name].content.scale.multiplyScalar(1 / 63.5);
    panels[name].add(panels[name].content);

    //generate the menu item associated with this
    if (category !== 'projects') {
      text3DMenu.createMenuItem(name, category);
    }

    //For each project subcategory, 
    if (category === 'projects') {
      projectsMap[projectType].projects = $('#' + projectType).children();
      projectsMap[projectType].currentIndex = 0;
    }
  };
}


function generateFramePosition() {
  //Make sure we don't get collisions
  var frameCollision = function(potentialPos) {
    var collision = false;
    //go through all the existing frames and make sure this one isn't too close
    _.each(frames, function(frame) {
      //get distance of this position to frame position
      var distance = potentialPos.distanceTo(frame.position);
      if(distance < frameNeighborThreshold){
        collision = true;
      }
    });
    return collision;
  };
  var potentialPos;
  var bounds = 40;
  do {
    potentialPos = new THREE.Vector3(
      _.random(-bounds / 2, bounds),
      _.random(-bounds, bounds),
      _.random(0, bounds)
    );
  }
  while (frameCollision(potentialPos));

  return potentialPos;
}



//Here we handle camera rotation and text tweening
function updateStatue(path) {
  //First we need to tween back any active panels
  discardFrame(false);
  //We need are discarding frames, so set oldFrameIndex to null
  //our little 3d router
  //We are on main page and want header text displayed
  if (path === '') {
    path = 'header';
  }
  //Now tween out the old menu items and tween in the text items for the current route we are at.
  rotateCamera();
  itemsOut();
  //We don't want to bring items in until others are on their way out
  setTimeout(function() {
    itemsIn(path);
  }, animationTime / 2);

}