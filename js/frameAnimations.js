var animationTime = 1500;
var frameToCameraDistance = 0.8;
var oldName;
var activeFrame= null;
var animating = false;
var projectTimeout;
var projectRotateInterval = 4000;



function swapFrames(name) {
  console.log('CURRENT CATEGORY', currentCategory);

  //make sure this panel exists
  if (!Object.prototype.hasOwnProperty.call(panels, name)){
    console.log("This panel doesn't exist!");
    return;
  }

  if(animating === true){
    console.log("WE ARE ALREADY ANIMATING. GO AWAY!");
    return;
  }

  //If we are animating a frame already, don't start animating another one.
  //pick a random panel from the statue to fly to camera
  var frame = nameFrameHash[name];
  if(!frame){
    console.warn("THERE IS NO FRAME WITH THAT NAME");
    return;
  }


  animating = true;

//******NEW FRAME**********************************
  panels[name].html.style.display = 'block';
  frame.add(panels[name]);

  var pos = {
    x: frame.position.x,
    y: frame.position.y,
    z: frame.position.z,
    rotX: frame.rotation.x,
    rotY: frame.rotation.y,
    rotZ: frame.rotation.z,
    opacity: 0
  };

  var target = camera.clone();
  // target.lookAt(camera.position);
  target.translateZ(-40);
  var finalPosition = {
    x: target.position.x,
    y: target.position.y,
    z: target.position.z,
    rotX: target.rotation.x,
    rotY: target.rotation.y,
    rotZ: target.rotation.z,
    opacity: 1
  };
  var frameTween = new TWEEN.Tween(pos).
  to(finalPosition, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function() {
    frame.position.set(pos.x, pos.y, pos.z);
    frame.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    if(frame.children[0]){
      frame.children[0].html.style.opacity = pos.opacity;
    }
  }).start();

  frameTween.onComplete(function(){
    
    //We want to have special rotating frames for projects, to show individual projects for each project type
    if(currentCategory == 'projects'){
      handleProjectFrame(frame, name);
    }

    animating = false;
    setTimeout(function(){
      //Give the previously active frame a chance to set itself to null, then reset it to this frame
      activeFrame = frame;

    }, 100);

  });

  //If we don't have an active frame, we want to tween out the text
  if(!activeFrame){
    itemsOut();

  }
  discardFrame(false);
}

function discardFrame(bringItemsIn){
  
  if(!activeFrame){
    return;
  }
  console.log('DISCARD FRAME');
  //Clear settimouts we might have had for projects frames
  clearTimeout(projectTimeout);


  var curPos = {
    x: activeFrame.position.x,
    y: activeFrame.position.y,
    z: activeFrame.position.z,
    rotX: activeFrame.rotation.x,
    rotY: activeFrame.rotation.y,
    rotZ: activeFrame.rotation.z,
    opacity: 1
  };

var targetPos = generateFramePosition();
targetPos.rotX = Math.PI/2;
targetPos.rotY = 0;
targetPos.rotZ = 0;

targetPos.opacity = 0;
var frameTween = new TWEEN.Tween(curPos).
  to(targetPos, animationTime).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function(){
    if(!activeFrame){
      return;
    }
    activeFrame.position.set(curPos.x, curPos.y, curPos.z);
    activeFrame.rotation.set(curPos.rotX, curPos.rotY, curPos.rotZ);
    if(activeFrame.children[0]){
      activeFrame.children[0].html.style.opacity = curPos.opacity;
    }
  }).start();
  //We have to remove old frame!
  frameTween.onComplete(function(){
    if(!activeFrame){
      return;
    }
    if(bringItemsIn){
      itemsIn(currentCategory);
    }
    if(activeFrame.children.length > 0){
      activeFrame.remove(activeFrame.children[0]);
    }
    //Set this to null immediately upon finishing, well let the new frame set itself to active after this
    activeFrame = null;
  });
}


function rotateAroundObjectAxis(object, axis, radians) {
  object.lookAt(camera.position);
  var rotObjectMatrix = new THREE.Matrix4();
  rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

  object.matrix.multiply(rotObjectMatrix);
  object.rotation.setFromRotationMatrix(object.matrix);

}

function handleProjectFrame(frame, name){
  //do a setTimeout to rotate this every x seconds
  var curRot = {rotY: frame.rotation.y};
  var targetRot = {rotY: frame.rotation.y + 2 * Math.PI};
  var rotateTween = new TWEEN.Tween(curRot).
  to(targetRot, 2000).
  easing(TWEEN.Easing.Cubic.InOut).
  onUpdate(function(){
    frame.rotation.y = curRot.rotY;
  }).start();
  rotateTween.onComplete(function(){
    var element = frame.children[0].html;
    var currentProjectIndex = projectsMap[name].currentIndex;
    var $oldElement = projectsMap[name].projects.eq(currentProjectIndex);
    var newElement = projectsMap[name].projects.get(++currentProjectIndex);
    newElement.style.display = 'block';
    $oldElement.replaceWith(newElement);
  });

  projectTimeout = setTimeout(function(){
    handleProjectFrame(frame, name);
  }, projectRotateInterval);

}

