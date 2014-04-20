function Statue(){
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;

  this.init = function(){
    this.generate();
    newPanel('futurego');
    newPanel('car');
    newPanel('tony');
    newPanel('eric');
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
    var geo = new THREE.BoxGeometry(10, 10, 1);
    var mesh, pos;
    for(var i =0; i < numFrames; i++){

      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      scene.add(mesh);
      frames.push(mesh);
    }

    for(i = 0; i < numFakeFrames; i++){
      geo = new THREE.BoxGeometry(_.random(5, 50), _.random(5, 50), _.random(0.1, 1));
      mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      scene.add(mesh);
    }

  };

  this.update = function(mesh){
 
  };

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
  if(Math.random() > 0.4){
    pos.rotX = Math.PI/2;
  }
  if(Math.random() > 0.4){
    pos.rotY = Math.PI/2;
  }
  return pos;
}

function newPanel(name){
  panels[name] = new THREE.Object3D();
  panels[name].html = document.getElementById(name);
  panels[name].html.style.overflow = 'scroll';
  panels[name].html.style.width = '611px';
  panels[name].html.style.height = '611px';
  panels[name].html.style.opacity = 0;
  panels[name].content = new THREE.CSS3DObject(panels[name].html);
  panels[name].content.scale.multiplyScalar(1/63.5);
  panels[name].add(panels[name].content);
}