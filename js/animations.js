var oldFrame;
var oldFramePosition;

function summonFrame() {
  //pick a random panel from the statue to fly to camera
  var frame = _.sample(frames);

  var pos = {
    x: frame.position.x,
    y: frame.position.y,
    z: frame.position.z,
    rotX: frame.rotation.x,
    rotY: frame.rotation.y,
    rotZ: frame.rotation.z
  };

  var target = new THREE.Object3D();
  console.log(target.rotation);
  target.lookAt(camera.position);
  console.log(target.rotation);
  var finalPosition = {
    x: camera.position.x / 2,
    y: camera.position.y / 2,
    z: camera.position.z / 2,
    rotX: target.rotation.x,
    rotY: target.rotation.y,
    rotZ: target.rotation.z
  };

  var frameTween = new TWEEN.Tween(pos).
  to(finalPosition, 5000).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    frame.position.set(pos.x, pos.y, pos.z);
    frame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    
  }).start();
  frameTween.onComplete(function() {
    // var xAxis = new THREE.Vector3(0, 1, 0);
    // rotateAroundObjectAxis(frame, xAxis, Math.PI/2);
  });
}

function rotateAroundObjectAxis(object, axis, radians) {
  object.lookAt(camera.position);
  var rotObjectMatrix = new THREE.Matrix4();
  rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

  object.matrix.multiply(rotObjectMatrix);
  object.rotation.setFromRotationMatrix(object.matrix);

}


function showContent(name) {
  console.log('yar');
  panel[name].html.style.display = 'block';
  var opacity = {
    value: 0
  };
  var opacityTween = new TWEEN.Tween(opacity).
  to({
    value: 1
  }, 1000).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    panel[name].html.style.opacity = opacity.value;
  }).start();
}