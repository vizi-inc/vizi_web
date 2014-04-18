var creationModule = angular.module('creations', []);

creationModule.controller('creationsController', function($scope){
  $scope.display = function($event){
    summonFrame();
    showContent($event.target.id);
  }
});