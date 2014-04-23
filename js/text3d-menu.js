function Menu3D(){
  this.menu = {
    'header': {},
    'team': {},
    'projects': {}
  };
  this.createMenuItem = function(name, category){
    var item = this.menu[category][name] = new THREE.Object3D();


    var html = document.createElement('a');
    html.innerText = name;
    html.className = 'statueText';
    html.href = '#/' + name;
    item.frontContainer = new THREE.Object3D();
    item.frontContent = new THREE.CSS3DObject(html);
    item.frontContent.scale.multiplyScalar(1/30.5);
    item.frontContainer.add(item.frontContent);
    item.add(item.frontContainer);

    var htmls = document.createElement('a');
    htmls.innerText = name;
    htmls.className = 'statueText';
    htmls.href = '#/' + name;

    item.backContainer = new THREE.Object3D();
    item.backContent =  new THREE.CSS3DObject(htmls);
    item.backContent.scale.multiplyScalar(1/30.5);
    item.backContainer.add(item.backContent);
    item.add(item.backContainer);


    // var anchor = chooseTextAnchor();
    // item.frontContainer.position.set(anchor.position.x, anchor.position.y, anchor.position.z + anchor.geometry.height/2);
    // item.backContainer.position.set(anchor.position.x, anchor.position.y, anchor.position.z - anchor.geometry.height/2);
    // item.backContainer.rotation.y = Math.PI;

    scene.add(item);
  };
}