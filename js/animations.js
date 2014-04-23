var animating = false;
var animationTime = 1500;
var frameIndex;
var frameToCameraDistance = 0.8;
var oldName;



function swapFrames(name) {
  //make sure this panel exists
  if (!Object.prototype.hasOwnProperty.call(panels, name)){
    console.log("This panel doesn't exist!");
    return;
  }
  //If we are animating a frame already, don't start animating another one.
  animating = true;
  //pick a random panel from the statue to fly to camera
  do{
    frameIndex = _.random(0, frames.length-1);
  }
  while(frameIndex === oldFrameIndex);


//******NEW FRAME**********************************
  var frame = frames[frameIndex];
  panels[name].html.style.display = 'block';
  frame.add(panels[name]);

  var pos = {
    x: frame.position.x,
    y: frame.position.y,
    z: frame.position.z,
    rotX: frame.rotation.x,
    rotY: frame.rotation.y,
    rotZ: frame.rotation.z,
    opacity: 0
  };

  var target = camera.clone();
  // target.lookAt(camera.position);
  target.translateZ(-40);
  var finalPosition = {
    x: target.position.x,
    y: target.position.y,
    z: target.position.z,
    rotX: target.rotation.x,
    rotY: target.rotation.y,
    rotZ: target.rotation.z,
    opacity: 1
  };
  var frameTween = new TWEEN.Tween(pos).
  to(finalPosition, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    frame.position.set(pos.x, pos.y, pos.z);
    frame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    if(frame.children[0]){
      frame.children[0].html.style.opacity = pos.opacity;
    }
  }).start();

  frameTween.onComplete(function(){
    oldFrameIndex = frameIndex;
    oldName = name;
    animating = false;
  });

  discardFrame();
}

function discardFrame(){
  if(oldFrameIndex === null){
    return;
  }
  


  var oldFrame = frames[oldFrameIndex];
  var myName = oldName;

  var oldFramePos = {
    x: oldFrame.position.x,
    y: oldFrame.position.y,
    z: oldFrame.position.z,
    rotX: oldFrame.rotation.x,
    rotY: oldFrame.rotation.y,
    rotZ: oldFrame.rotation.z,
    opacity: 1
  };

var targetPos = generateFramePosition();
targetPos.rotX = Math.PI/2;
targetPos.rotY = 0;
targetPos.rotZ = 0;

targetPos.opacity = 0;
var oldFrameTween = new TWEEN.Tween(oldFramePos).
  to(targetPos, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function(){
    oldFrame.position.set(oldFramePos.x, oldFramePos.y, oldFramePos.z);
    oldFrame.rotation.x = oldFramePos.rotX;
    oldFrame.rotation.y = oldFramePos.rotZ;
    oldFrame.rotation.z = oldFramePos.rotY;
    if(oldFrame.children[0]){
      oldFrame.children[0].html.style.opacity = oldFramePos.opacity;
    }
  }).start();
  //We have to remove old frame!
  oldFrameTween.onComplete(function(){
    //If old frame was an iframe, erase its src to keep performance good
    $(panels[myName].html).find('iframe').attr('src', '');
    oldFrame.remove(oldFrame.children[0]);
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
  //We want the currently active frame
  var frame = frames[frameIndex];
  frame.add(panels[name]);
  panels[name].position.x -= 0.07;
  panels[name].html.style.opacity = 0;
  panels[name].html.style.display = 'block';
  var opacity = {
    value: 0
  };
  var opacityTween = new TWEEN.Tween(opacity).
  to({
    value: 1
  }, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    panels[name].html.style.opacity = opacity.value;
  }).start();
}


