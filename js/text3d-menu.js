function Menu3D(){
  this.menu = {
    'header': {},
    'team': {},
    'projects': {}
  };

  this.init = function(){
    this.createMenuItem('team', 'header');
    this.createMenuItem('tech', 'header');
    this.createMenuItem('projects', 'header');
    this.createMenuItem('contact', 'header');
  };

  //we need to add in top level items for header
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

    var direction = Math.random() > 0.5 ? 1 : -1;
    item.frontContainer.position.x = 200 * direction;
    item.backContainer.position.x = 200 * direction;

    scene.add(item);
  };
}


