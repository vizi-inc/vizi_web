function Statue(){
  var refractCamera = new THREE.CubeCamera(0.1, 5000, 512);
  var glassWindow;

  this.init = function(){
    this.generate();
    newPanel('about', [10, 10, 10], [0.1,0.1]);
  };

  this.generate = function(){
    var numSlabs = 11;
    var rFR = MathHelpers.randFloatRange;
    var material1 = new THREE.MeshBasicMaterial({color: 0xeaf9e2, side: THREE.DoubleSide});
    var material2 = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent:true, opacity: 0.0});
    var materials = [];
    materials.push(material1);
    materials.push(material1);
    materials.push(material2);
    materials.push(material2);
    materials.push(material1);
    materials.push(material1);
    var geo;
    for(var i =0; i < numSlabs; i++){

      geo = new THREE.BoxGeometry(_.random(5, 50), _.random(0.5, 1), _.random(5, 40));
      var mesh = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
      var pos = generateFramePosition();
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      scene.add(mesh);
      frames.push(mesh);
    }

  };

  this.update = function(mesh){
 
  };

}

function generateFramePosition(mesh){
  var bounds = 50;
  var pos =  {
    x: _.random(-bounds,bounds),
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

function newPanel(name, pos, size){
  var scale = 8;
  panel[name] = new THREE.Object3D();
  scene.add(panel[name]);
  panel[name].html = document.getElementById(name);
  panel[name].position.set(pos[0], pos[1], pos[2]);
  panel[name].html.style.overflow = 'scroll';
  panel[name].html.style.width = size[0] * 100 * scale+'px';
  panel[name].html.style.height = size[1] * 100 * scale+'px';

  panel[name].content = new THREE.CSS3DObject(panel[name].html);
  // panel[name].content.scale = new THREE.Vector3(0.01/scale, 0.01/scale, 1)

  panel[name].add(panel[name].content);
}