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
    //find out what route we just navigated to and let our statue know so it can handle text fly in and 
    //camera rotation
    updateStatue($location.path().replace(/\//,""));

  });
});