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
  })
  .when('/contact', {
    templateUrl: 'partials/contact.html',
  });

});

viziApp.controller('rootController', function($rootScope, $location){
  $rootScope.$on('$locationChangeStart', function(){

    //Make sure we set oldFrameIndex to null since now we don't have any active frames!
  });
});