function handleProjectRotation(frame, projCategory){
  var rotationTime = 3000; 
  //Set up the tween rotation
  var curRot = {y : frame.rotation.y};
  var targetRot = {y: frame.rotation.y + 2 * Math.PI};
  var projTween = new TWEEN.Tween(curRot).
    to(targetRot, rotationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    // repeat(1).
    // yoyo(true).
    onUpdate(function(){
      frame.rotation.y = curRot.y;
    }).start();
    projTween.onComplete(function(){
      //switch out panel for the next one in the projectsMap array
      frame.children[0].html.style.display = "none";
      frame.remove(frame.children[0]);
      var projObj = projectsMap[projCategory];
      projObj.currentIndex++;
      if(projObj.currentIndex === projObj.projects.length){
        //We have reached then end of our projects, start over
        projObj.currentIndex = 0;
      }
      var newPanelName = projObj.projects[projObj.currentIndex].id;

      panels[newPanelName].html.style.display = 'block';
      panels[newPanelName].html.style.opacity = 1;
      frame.add(panels[newPanelName]);
    });
}

