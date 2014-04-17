function Flower()
{
  var petals = [];
  this.init = function(){
    var numPetals = 100;
    petals = [];
    var angleIncrement = (Math.PI*2)/numPetals;
    var radius = 50;
    var flowerOrigin = new THREE.Vector3(0, 0, 0);

    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, 0, 0));
    geo.vertices.push(new THREE.Vector3(10, 0, 0));
    geo.vertices.push(new THREE.Vector3(5, 10, 0));
    geo.faces.push(new THREE.Face3(0,1,2));
    

    for(var i = 0; i < numPetals; i++){
      var currentAngle = i * angleIncrement;
      var x = flowerOrigin.x + (radius * Math.cos(currentAngle));
      var z = flowerOrigin.z + (radius * Math.sin(currentAngle));
      var color = new THREE.Color();
      redComponent = MathHelpers.randFloatRange(0.5, 0.6);
      color.setRGB(redComponent, 0.2, 0.7);
      var material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: color});
      petal = new THREE.Mesh(geo, material );

      petal.position.x = x;
      petal.position.z = z;

      var rotationMatrix = new THREE.Matrix4();
      rotationMatrix.lookAt(petal.position, flowerOrigin, new THREE.Vector3(0, 1, 0));
      petal.quaternion.setFromRotationMatrix(rotationMatrix);
      petals.push(petal);
      scene.add(petal);

    }
  };

  this.update = function() {
    _.each(petals, function(petal){
      petal.rotation.x = petal.rotation.x * 0.001;
    });
    
  };
}