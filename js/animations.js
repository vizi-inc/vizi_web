var oldFrameIndex;
var animating = false;
var animationTime = 3000;

function summonFrame() {
  //If we are animating a frame already, don't start animating another one.
  if(animating){
    return;
  }
  animating = true;
  //pick a random panel from the statue to fly to camera
  var frameIndex;
  do{
    frameIndex = _.random(0, frames.length-1);
  }
  while(frameIndex === oldFrameIndex);

  var frame = frames[frameIndex];
  

  var pos = {
    x: frame.position.x,
    y: frame.position.y,
    z: frame.position.z,
    rotX: frame.rotation.x,
    rotY: frame.rotation.y,
    rotZ: frame.rotation.z
  };

  var target = new THREE.Object3D();
  target.lookAt(camera.position);
  var finalPosition = {
    x: camera.position.x / 2 + 2,
    y: camera.position.y / 2,
    z: camera.position.z * 0.9,
    rotX: target.rotation.x,
    rotY: target.rotation.y,
    rotZ: target.rotation.z
  };
  var frameTween = new TWEEN.Tween(pos).
  to(finalPosition, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    frame.position.set(pos.x, pos.y, pos.z);
    frame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    
  }).start();
  frameTween.onComplete(function(){
    oldFrameIndex = frameIndex;
    animating = false;
  });

  //If we already have a frame up, then put that one back into the statue
  if(oldFrameIndex){
    var oldFrame = frames[oldFrameIndex];
    var oldFramePos = {
    x: oldFrame.position.x,
    y: oldFrame.position.y,
    z: oldFrame.position.z,
    rotX: oldFrame.rotation.x,
    rotY: oldFrame.rotation.y,
    rotZ: oldFrame.rotation.z
  };

    var targetPos = generateFramePosition();
    var oldFrameTween = new TWEEN.Tween(oldFramePos).
      to(targetPos, animationTime).
      easing(TWEEN.Easing.Cubic.InOut).
      onUpdate(function(){
        oldFrame.position.set(oldFramePos.x, oldFramePos.y, oldFramePos.z);
        oldFrame.rotation.set(oldFramePos.rotX, oldFramePos.rotY, oldFramePos.rotZ);
      }).start();
  }
}

function rotateAroundObjectAxis(object, axis, radians) {
  object.lookAt(camera.position);
  var rotObjectMatrix = new THREE.Matrix4();
  rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

  object.matrix.multiply(rotObjectMatrix);
  object.rotation.setFromRotationMatrix(object.matrix);

}


function showContent(name) {
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