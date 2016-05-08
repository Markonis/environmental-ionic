angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('menu.map', {
    url: '/map',
    views: {
      'side-menu': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'side-menu': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('menu.allHazards', {
    url: '/all-hazards',
    views: {
      'side-menu': {
        templateUrl: 'templates/allHazards.html',
        controller: 'allHazardsCtrl'
      }
    }
  })

  .state('menu.hazard', {
    url: '/hazard/:hazardId',
    views: {
      'side-menu': {
        templateUrl: 'templates/hazard.html',
        controller: 'hazardCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/about',
    views: {
      'side-menu': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  });

$urlRouterProvider.otherwise('/side-menu/map')

});
