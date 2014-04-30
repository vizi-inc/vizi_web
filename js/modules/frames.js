var framesModule = angular.module('frames', []);

framesModule.controller('framesController', function($scope){
  $scope.display = function($event){
    var selectedTabId = $event.target.id;
    //Check to make sure we have clicked on a different tab and we are not animating
    if(animating || this.currentlySelected === selectedTabId){
      return;
    }

    this.currentlySelected = selectedTabId;
    swapFrames(selectedTabId);
  }
});