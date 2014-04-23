var textAnimating = false;


function itemsIn(category){
  //Before we tween items in, we need to clear the old anchors
  eraseAnchors();
  //get the menu items for the current category we are in 
  var items = text3DMenu.menu[category];
  _.each(items, function(item){
    //give this item an anchor
    item.anchor = chooseAnchor();
    itemIn(item);
  });

}

function itemsOut(){

}


//Here we want to rotate camera and pull first level menu text out, tween second level menu text in

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
  }).start();
}

function itemIn(item){
   var currentTextPos = {
      x: item.frontContainer.position.x,
      y: item.frontContainer.position.y,
      z: item.frontContainer.position.z
    };
    var direction = Math.random() < 0.5 ? 1 : -1;
    var finalTextPos = {
      x: (item.frontContainer.position.x + 250) * direction,
      y: item.frontContainer.position.y,
      z: item.frontContainer.position.z
    };
    var textTween = new TWEEN.Tween(currentTextPos).
    to(finalTextPos, animationTime).
    onUpdate(function(){
      item.frontContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z);
    }).start();
}

function chooseAnchor(){
  
}
function eraseAnchors(){
  _.each(frames, function(frame){
    frame.alreadyChosen = false;
  });
}
