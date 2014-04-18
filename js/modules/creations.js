var creationModule = angular.module('creations', []);

creationModule.controller('creationsController', function($scope){
  $scope.display = function(){
    summonFrame();
  }
});