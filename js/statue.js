var panels = {};
var menuItems = {};
var frames = [];
var fakeFrames = [];
var flatFrames = [];

function Statue(){
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;
  var elementSize = 1024;
  var frameSize = (10*elementSize)/630;

  this.init = function(){
    this.generate();
    this.newPanel('futurego');
    this.newPanel('razer');
    this.newPanel('tony');
    this.newPanel('dave');
    this.newPanel('eric');
    this.newPanel('tc');

    this.newMenuItem('team');
    this.newMenuItem('tech');
    this.newMenuItem('projects');
    this.newMenuItem('contact');
    //let these items be added to dom before attaching click handlers
    setTimeout(function(){
      $('.statueText').on('click', function(){
        enterSecondLevel();
      });
    }, 100);

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

      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      scene.add(mesh);
      frames.push(mesh);
      if(pos.rotX === Math.PI/2){
        flatFrames.push(mesh);
      }
    }

    for(i = 0; i < numFakeFrames; i++){
      geo = new THREE.BoxGeometry(_.random(5, 50), _.random(5, 50), _.random(0.1, 1));
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      scene.add(mesh);
      if(pos.rotX === Math.PI/2){
        flatFrames.push(mesh);
      }

    }

  };

  this.newPanel = function(name){
    panels[name] = new THREE.Object3D();
    panels[name].html = document.getElementById(name);
    panels[name].html.style.overflow = 'hidden';
    panels[name].html.style.width = elementSize + 'px';
    panels[name].html.style.height = elementSize + 'px';
    panels[name].html.style.opacity = 0;
    panels[name].content = new THREE.CSS3DObject(panels[name].html);
    panels[name].content.scale.multiplyScalar(1/63.5);
    panels[name].add(panels[name].content);

    //Now add a menu item for this panel

  };

  this.newMenuItem = function(name){
    menuItems[name] = new THREE.Object3D();
    var html = document.createElement('div');
    html.innerText = name;
    html.className = 'statueText';
    menuItems[name].html = html;
    menuItems[name].content = new THREE.CSS3DObject(menuItems[name].html);
    menuItems[name].content.scale.multiplyScalar(1/30.5);
    menuItems[name].add(menuItems[name].content);

    var backName = name + 'r';

    menuItems[backName] = new THREE.Object3D();
    html = document.createElement('div');
    html.innerText = name;
    html.className = 'statueText';

    menuItems[backName].html = html;
    menuItems[backName].content = new THREE.CSS3DObject(menuItems[backName].html);
    menuItems[backName].content.scale.multiplyScalar(1/30.5);
    menuItems[backName].add(menuItems[backName].content);


    var anchor = chooseTextAnchor();
    menuItems[name].position.set(anchor.position.x, anchor.position.y, anchor.position.z + anchor.geometry.height/2);
    menuItems[backName].position.set(anchor.position.x, anchor.position.y, anchor.position.z - anchor.geometry.height/2);
    menuItems[backName].rotation.y = Math.PI;

    scene.add(menuItems[name]);
    scene.add(menuItems[backName]);
  };


  this.update = function(mesh){
    // menuItems.team.position.z += 0.01;
  };

}

function chooseTextAnchor(){
  //pick a frame to temporarily anchor text to
  var frame;
  do{
    frame = _.sample(flatFrames);
  }
  while(frame.alreadyChosen);
  frame.alreadyChosen = true;
  return frame;
}

function generateFramePosition(){
  var bounds = 40;
  var pos =  {
    x: _.random(-bounds/2,bounds),
    y: _.random(-bounds,bounds),
    z: _.random(0,bounds),
    rotX: 0,
    rotY: 0,
    rotZ: 0
  };
  if(Math.random() > 0.2){
    pos.rotX = Math.PI/2;
  }
  // if(Math.random() > 0.4){
  //   pos.rotY = Math.PI/2;
  // }
  return pos;
}

