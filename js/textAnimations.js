var textAnimating = false;


function itemsIn(category){
  console.log('items in!');

  //get the menu items for the current category we are in 
  var items = text3DMenu.menu[category];
  if(!items){
    console.warn('There are no items for category ', category);
    return;
  }
  var i = 0;
  _.each(items, function(item){
    var anchor = frames[i];
    i++;
    itemIn(item, frames[i]);
  });
}

function itemsOut(){

}


function itemIn(item, anchor){
  anchor.material = new THREE.MeshBasicMaterial();
   var currentTextPos = {
      x: item.frontContainer.position.x,
      y: item.frontContainer.position.y,
      z: item.frontContainer.position.z
    };
    var direction = Math.random() < 0.5 ? 1 : -1;
    var finalTextPos = {
      x: anchor.position.x,
      y: anchor.position.y,
      z: anchor.position.z + anchor.geometry.height/2
    };

    //rotate back container 180 degrees on yaxis so it faces backward
    item.backContainer.rotation.y = Math.PI;
    var textTween = new TWEEN.Tween(currentTextPos).
    to(finalTextPos, animationTime).
    onUpdate(function(){
      item.frontContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z);
      item.backContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z - anchor.geometry.height);
    }).start();
}

function itemOut(item){
  //We need to pick new anchors for text, since we very likely rearranged our statue during second level menu playing
  var frontCurrentPos = {
    x: item.frontContainer.position.x,
    y: item.frontContainer.position.y,
    z: item.frontContainer.position.z
  };
  var frontFinalPos = {
    x: item.anchor.position.x,
    y: anchor.position.y,
    z: anchor.position.z + anchor.geometry.height/2
  };

  var textTween = new TWEEN.Tween(frontCurrentPos).
    to(frontFinalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function(){
      item.frontContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
      item.backContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
  }).start();
}

