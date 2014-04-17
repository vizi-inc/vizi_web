function Ground()
{
  this.init = function(){
    var parameters = {
      alea: RAND_MT,
      generator: PN_GENERATOR,
      width: 1000,
      height: 1000,
      widthSegments: 100,
      heightSegments: 100,
      depth: 20,
      postgen: [ STIJL_COLORS ],
      effect: [ DESTRUCTURE_EFFECT ]
    };

    terrainGeo = TERRAINGEN.Get(parameters);
    terrainMaterial = new THREE.MeshPhongMaterial({vertexColors: THREE.VertexColors, shading: THREE.FlatShading, side: THREE.DoubleSide}); 
    terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
    scene.add(terrain);
  };
  this.update = function() {
   
  };
}