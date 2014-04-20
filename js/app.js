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

  .when('/creations', {
    templateUrl: 'partials/creations.html',
    controller: 'framesController'
  })

  .when('/tech', {
    templateUrl: 'partials/tech.html',
  });

});

viziApp.controller('rootController', function($rootScope){
  $rootScope.$on('$locationChangeStart', function(){
    discardFrame();
  });
});