var oldFrame;
var oldFramePosition;
function summonFrame(){
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

  var finalPosition = {
    x: camera.position.x/2,
    y: camera.position.y/2,
    z: camera.position.z/2,
    rotX: camera.rotation.x,
    rotY: camera.rotation.y,
    // rotZ: camera.rotation.z
  };

  var frameTween = new TWEEN.Tween(pos).
    to(finalPosition, 3000).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function(){
      frame.position.set(pos.x, pos.y, pos.z);
      frame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    }).start();
  frameTween.onComplete(function(){
    // oldFrame = frame
  });

  // //place old frame to new position. This way we continually recreate a new statue
  //need to deal with async issues- old frame overwriting new frame
  // if(oldFrame){
  //   var pos = {
  //     x: oldFrame.position.x,
  //     y: oldFrame.position.y,
  //     z: oldFrame.position.z,
  //     rotX: oldFrame.rotation.x,
  //     rotY: oldFrame.rotation.y,
  //     rotZ: oldFrame.rotation.z
  //   };
  //   var newPos = generateFramePosition();
  //   var oldFrameTween = new TWEEN.Tween(pos).
  //     to(newPos, 3000).
  //     easing(TWEEN.Easing.Cubic.InOut).
  //     onUpdate(function(){
  //       oldFrame.position.set(pos.x, pos.y, pos.z);
  //       oldFrame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
  //     }).start();
  // }
}

function showContent(name){
  console.log('yar');
  panel[name].html.style.display = 'block';
  var opacity = {value:0};
  var opacityTween= new TWEEN.Tween(opacity).
    to({value:1}, 1000).
    easing( TWEEN.Easing.Cubic.InOut ).
    onUpdate(function(){
      panel[name].html.style.opacity = opacity.value;
    }).start();
}