var viziApp = angular.module('viziApp', ['ngRoute']);

viziApp.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'partials/about.html'
  });

});