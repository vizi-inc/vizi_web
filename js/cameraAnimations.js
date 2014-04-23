function rotateCamera(direction){
  var theta = Math.PI/3 * direction;
  var x = camera.position.x;
  var z = camera.position.z;

  var currentPos = {
    x: x, 
    y: camera.position.y,
    z: z
  };

  var finalPos = {
    x: x * Math.cos(theta) + z * Math.sin(theta),
    y: camera.position.y,
    z: z * Math.cos(theta) - x * Math.sin(theta)
  };


  var camTween = new TWEEN.Tween(currentPos).
  to(finalPos, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function(){
    camera.position.set(currentPos.x, currentPos.y, currentPos.z);
  }).start();


}