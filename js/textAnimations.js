var textAnimating = false;
var currentMenuState = 'level1';



//Here we want to rotate camera and pull first level menu text out, tween second level menu text in

function textOut(){
  var menuText = topMenuItems.team;
  //We need to pick new anchors for text, since we very likely rearranged our statue during second level menu playing
  var anchor = chooseTextAnchor();
  anchor.material = new THREE.MeshBasicMaterial();
  var frontCurrentPos = {
    x: menuText.frontContainer.position.x,
    y: menuText.frontContainer.position.y,
    z: menuText.frontContainer.position.z
  };
  var frontFinalPos = {
    x: anchor.position.x,
    y: anchor.position.y,
    z: anchor.position.z + anchor.geometry.height/2
  };

  var textTween = new TWEEN.Tween(frontCurrentPos).
    to(frontFinalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function(){
      menuText.frontContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
  }).start();
}

function textIn(){
   var menuText = topMenuItems.team;
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
}

function enterFirstLevel(){
  console.log('current menu state', currentMenuState);
  //We don't want to tween if we're already at first level
  if(textAnimating || currentMenuState === 'level1'){
    return;
  }
  rotateCamera(-1);

  //ROTATE CAMERA

}
function enterSecondLevel(){
  //If we're already at second level, dont do anything
  console.log('entering second level');
  if(currentMenuState === 'level2'){
    return;
  }
  console.log('winner');
  currentMenuState = 'level2';
  rotateCamera(1);


  _.each(topMenuItems, function(menuText){
   
  });

}