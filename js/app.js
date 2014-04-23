var viziApp = angular.module('viziApp', ['ngRoute', 'frames']);

viziApp.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'partials/about.html'
  })

  .when('/team', {
    templateUrl: 'partials/team.html',
    controller: 'framesController'
  })

  .when('/projects', {
    templateUrl: 'partials/creations.html',
    controller: 'framesController'
  })

  .when('/tech', {
    templateUrl: 'partials/tech.html',
  });

});

viziApp.controller('rootController', function($rootScope, $location){
  $rootScope.$on('$locationChangeStart', function(){
    discardFrame();
    if($location.path() !== '/' && $location.path() !== ''){
      enterSecondLevel();
    }
    else if ($location.path() === '/'){
      enterFirstLevel();
    }
    oldFrameIndex = null;  
    

    //Make sure we set oldFrameIndex to null since now we don't have any active frames!
  });
});