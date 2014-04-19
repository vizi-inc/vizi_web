var creationModule = angular.module('creations', []);

creationModule.controller('creationsController', function($scope){
  $scope.display = function($event){
    swapFrames();
    showContent($event.target.id);
  }
});