var camPosIndex = 0;
function rotateCamera(){
  var direction = Math.random() > 0.5 ? 1 : -1;
  var theta = Math.PI * 0.5 *  direction;
  var x = camera.position.x;
  var z = camera.position.z;
  // {_x: -2.414950320276892, _y: 0.4561987430265692, _z: 2.768357218931255,
  var camPositions = [
    {
      x: -50.4,
      y: 88,
      z: -107

    },
    {
      x: 80,
      y: 69,
      z: -101
    },
    {
      x: 72,
      y: 54,
      z: 113
    },
    {
      x: -60,
      y: 60,
      z: 118
    }

  ];

  var currentPos = {
    x: x, 
    y: camera.position.y,
    z: z
  };
  if(camPosIndex > camPositions.length-1){
    camPosIndex = 0;
  }
  var curCamPos = camPositions[camPosIndex++];
  // var finalPos = {
  //   x: x * Math.cos(theta) + z * Math.sin(theta),
  //   y: camera.position.y,
  //   z: z * Math.cos(theta) - x * Math.sin(theta)
  // };

  var finalPos = {
    x: curCamPos.x,
    y: curCamPos.y,
    z: curCamPos.z
  };


  var camTween = new TWEEN.Tween(currentPos).
  to(finalPos, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function(){
    camera.position.set(currentPos.x, currentPos.y, currentPos.z);
  }).start();


}