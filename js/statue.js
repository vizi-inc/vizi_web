var panels = {};
var topMenuItems = {};
var frames = [];
var fakeFrames = [];

function Statue(){
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;
  var elementSize = 1024;
  var frameSize = (10*elementSize)/630;

  this.init = function(){
    this.generate();
    this.newPanel('futurgo');
    this.newPanel('razer');
    this.newPanel('tcho');
    this.newPanel('castle');
    this.newPanel('heart');
    this.newPanel('garden');
    this.newPanel('holiday');


    this.newPanel('tony');
    this.newPanel('dave');
    this.newPanel('dusan');
    this.newPanel('eric');
    this.newPanel('tc');

    this.newMenuItem('team');
    // this.newMenuItem('tech');
    // this.newMenuItem('projects');
    // this.newMenuItem('contact');
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


  };

  this.newMenuItem = function(name){

    topMenuItems[name] = new THREE.Object3D();
    var html = document.createElement('a');
    html.innerText = name;
    html.className = 'statueText';
    html.href = '#/' + name;
    topMenuItems[name].frontContainer = new THREE.Object3D();
    topMenuItems[name].frontContent = new THREE.CSS3DObject(html);
    topMenuItems[name].frontContent.scale.multiplyScalar(1/30.5);
    topMenuItems[name].frontContainer.add(topMenuItems[name].frontContent);
    topMenuItems[name].add(topMenuItems[name].frontContainer);

    var htmls = document.createElement('a');
    htmls.innerText = name;
    htmls.className = 'statueText';
    htmls.href = '#/' + name;

    topMenuItems[name].backContainer = new THREE.Object3D();
    topMenuItems[name].backContent =  new THREE.CSS3DObject(htmls);
    topMenuItems[name].backContent.scale.multiplyScalar(1/30.5);
    topMenuItems[name].backContainer.add(topMenuItems[name].backContent);
    topMenuItems[name].add(topMenuItems[name].backContainer);


    window.anchor = chooseTextAnchor();
    topMenuItems[name].frontContainer.position.set(anchor.position.x, anchor.position.y, anchor.position.z + anchor.geometry.height/2);
    topMenuItems[name].backContainer.position.set(anchor.position.x, anchor.position.y, anchor.position.z - anchor.geometry.height/2);
    topMenuItems[name].backContainer.rotation.y = Math.PI;

    scene.add(topMenuItems[name]);
  };


  this.update = function(mesh){
    // topMenuItems.team.position.z += 0.01;
  };

}

function chooseTextAnchor(){
  //pick a frame to temporarily anchor text to
  var frame;
  do{
    frame = _.sample(frames);
  }
  while(frame.alreadyChosen);
  frame.alreadyChosen = true;
  return frame;
}

function eraseAnchors(){
  _.each(frames, function(frame){
    frame.alreadyChosen = false;
  });
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

