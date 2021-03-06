var viziApp = angular.module('viziApp', ['ngRoute', 'ngAnimate', 'frames', 'ngTouch', 'angular-carousel']);

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
  })
  .otherwise({
    redirectTo: '/'
  });

});


viziApp.controller('rootController', function($rootScope, $location){
  var throttledUpdateStatue = _.throttle(updateStatue, 500, {trailing: false});
  $rootScope.$on('$locationChangeStart', function(){
    //find out what route we just navigated to and let our statue know so it can handle text fly in and 
    //camera rotation
    throttledUpdateStatue($location.path().replace(/\//,""));

  });
});