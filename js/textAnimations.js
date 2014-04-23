var textAnimating = false;
var currentMenuState = 'level1';



//Here we want to rotate camera and pull first level menu text out, tween second level menu text in

function enterFirstLevel(){
  console.log('current menu state', currentMenuState);
  //We don't want to tween if we're already at first level
  if(textAnimating || currentMenuState === 'level1'){
    return;
  }
  console.log('entering first level');
  textAnimating = true;
  var theta = -Math.PI/2;
  var x = camera.position.x;
  var z = camera.position.z;

  //ROTATE CAMERA
  // var currentPos = {
  //   x: x, 
  //   y: camera.position.y,
  //   z: z
  // };

  // var finalPos = {
  //   x: x * Math.cos(theta) + z * Math.sin(theta),
  //   y: camera.position.y,
  //   z: z * Math.cos(theta) - x * Math.sin(theta)
  // };



  // var camTween = new TWEEN.Tween(currentPos).
  // to(finalPos, animationTime).
  // easing(TWEEN.Easing.Cubic.InOut).
  // onUpdate(function(){
  //   camera.position.set(currentPos.x, currentPos.y, currentPos.z);
  // }).start();
  // camTween.onComplete(function(){
  //   textAnimating = false;
  //   currentMenuState = 'level1';
  //   eraseAnchors();
  // });

  var menuText = topMenuItems.team;
  //We need to pick new anchors for text, since we very likely rearranged our statue during second level menu playing
  // var anchor = chooseTextAnchor();
  anchor.material = new THREE.MeshBasicMaterial();
  var frontCurrentPos = {
    x: menuText.frontContainer.position.x,
    y: menuText.frontContainer.position.y,
    z: menuText.frontContainer.position.z
  };
  var frontFinalPos = {
    x: anchor.position.x,
    y: anchor.position.y,
    z:anchor.position.z
  };

  var textTween = new TWEEN.Tween(frontCurrentPos).
    to(frontFinalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function(){
      menuText.frontContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
  }).start();
  textTween.onComplete(function(){
    window.playWithMe = menuText;
    window.anchor = anchor;
  });
}
function enterSecondLevel(){
  //If we're already at second level, dont do anything
  console.log('entering second level');
  if(currentMenuState === 'level2'){
    return;
  }
  console.log('winner');
  currentMenuState = 'level2';
  var theta = Math.PI/2;
  var x = camera.position.x;
  var z = camera.position.z;
  

  //ROTATE CAMERA
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

  // var camTween = new TWEEN.Tween(currentPos).
  // to(finalPos, animationTime).
  // easing(TWEEN.Easing.Cubic.InOut).
  // onUpdate(function(){
  //   camera.position.set(currentPos.x, currentPos.y, currentPos.z);
  // }).start();

  //PULLY OUT TEXT

  _.each(topMenuItems, function(menuText){
    var currentTextPos = {
      x: menuText.frontContainer.position.x,
      y: menuText.frontContainer.position.y,
      z: menuText.frontContainer.position.z
    };
    var direction = Math.random() < 0.5 ? 1 : -1;
    var finalTextPos = {
      x: (menuText.frontContainer.position.x + 250) * direction,
      y: menuText.frontContainer.position.y,
      z: menuText.frontContainer.position.z
    };
    var textTween = new TWEEN.Tween(currentTextPos).
    to(finalTextPos, animationTime).
    onUpdate(function(){
      menuText.frontContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z);
    }).start();
  });

}