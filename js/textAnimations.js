var textAnimating = false;
var oldCategory = null;
var nameFrameHash = {};


function itemsIn(category) {
  console.log('items in!');

  //get the menu items for the current category we are in 
  var items = text3DMenu.menu[category];
  if (!items) {
    console.warn('There are no items for category ', category);
    return;
  }
  var i = 0;
  _.each(items, function(item) {
    var frame = frames[i];
    var anchor = frame;
    itemIn(item, frame);
    i++;
    resetCallbacks(item, frame, category);

  });

  oldCategory = category;
}

function itemsOut() {
  if (!oldCategory) {
    console.log('WE DONT HAVE AN OLD CATEGORY');
    return;
  }
  var items = text3DMenu.menu[oldCategory];
  _.each(items, function(item) {
    itemOut(item);
  });


}

//We need to link the menu item to the frame it is currently anchored to
function resetCallbacks(item, frame, category) {
  var name = $(item.frontContent.element).data('name');
  //first remove previous callbacks
  $(item.frontContent.element).off();
  $(item.backContent.element).off();


  //If header we want to tween out all header texts and tween in whatever category texts 
  //without bringing up a panel
  if (category === 'header') {
    $(item.frontContent.element).on('click', function() {
      itemsOut();
      rotateCamera();
      if(text3DMenu.menu[name]){
        itemsIn(name);
      }
    });

    $(item.backContent.element).on('click', function() {
      itemsOut();
      rotateCamera();
      if(text3DMenu.menu[name]){
        itemsIn(name);
      }
    });
    //see if the menu item we clicked on has a second level
    //The name in this case is the category
    
  } else {
    //now add a callback to pull up frame this menu item is anchored
    $(item.frontContent.element).on('click', function() {
      swapFrames(name);
    });
    $(item.backContent.element).on('click', function() {
      swapFrames(name);
    });
  }
}


function itemIn(item, anchor) {
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
    z: anchor.position.z + anchor.geometry.height / 2
  };

  //rotate back container 180 degrees on yaxis so it faces backward
  item.backContainer.rotation.y = Math.PI;
  var textTween = new TWEEN.Tween(currentTextPos).
  to(finalTextPos, animationTime).
  onUpdate(function() {
    item.frontContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z);
    item.backContainer.position.set(currentTextPos.x, currentTextPos.y, currentTextPos.z - anchor.geometry.height);
  }).start();

  //make sure we keep put hash up to date with which frame our menu text is anchored to.
  textTween.onComplete(function() {
    nameFrameHash[$(item.frontContent.element).data('name')] = anchor;
  });
}

function itemOut(item) {
  //We need to pick new anchors for text, since we very likely rearranged our statue during second level menu playing
  var frontCurrentPos = {
    x: item.frontContainer.position.x,
    y: item.frontContainer.position.y,
    z: item.frontContainer.position.z
  };
  var direction = Math.random() > 0.5 ? 1 : -1;
  var frontFinalPos = {
    x: item.position.x + (300 * direction),
    y: item.position.y,
    z: item.position.z
  };

  var textTween = new TWEEN.Tween(frontCurrentPos).
  to(frontFinalPos, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    item.frontContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
    item.backContainer.position.set(frontCurrentPos.x, frontCurrentPos.y, frontCurrentPos.z);
  }).start();
}