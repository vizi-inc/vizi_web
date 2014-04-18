var viziApp = angular.module('viziApp', ['ngRoute']);

viziApp.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'partials/about.html'
  })

  .when('/team', {
    templateUrl: 'partials/team.html'
  })

  .when('/creations', {
    templateUrl: 'partials/creations.html'
  })

  .when('/tech', {
    templateUrl: 'partials/tech.html'
  });

});