function rotateCamera(){
  var direction = Math.random() > 0.5 ? 1 : -1;
  var theta = Math.PI * 0.5 *  direction;
  var x = camera.position.x;
  var z = camera.position.z;
  // {_x: -2.414950320276892, _y: 0.4561987430265692, _z: 2.768357218931255,
  // var camPositions = [
  //   {
  //     x: 
  //     y:
  //     z: 

  //   },
  //   {

  //   }

  // ]

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