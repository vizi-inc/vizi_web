function handleProjectRotation(frame, projCategory){
  var rotationTime = 3000; 
  //Set up the tween rotation
  var curRot = {y : frame.rotation.y};
  var targetRot = {y: frame.rotation.y + 2 * Math.PI};
  var projTween = new TWEEN.Tween(curRot).
    to(targetRot, rotationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    repeat(1000).
    yoyo(true).
    onUpdate(function(){
      frame.rotation.y = curRot.y;
    }).start();
}