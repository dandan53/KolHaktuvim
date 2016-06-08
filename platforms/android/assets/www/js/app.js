// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
//        title: 'System warning',
        template: 'האם אתה בטוח שאת/ה רוצה לצאת מהאפליקציה?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.refualist', {
      cache: false,
      url: '/refualist',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })

  .state('app.iluilist', {
        cache: false,
        url: '/iluilist',
        views: {
          'menuContent': {
            templateUrl: 'templates/list.html',
            controller: 'ListCtrl'
          }
        }
      })

  .state('app.search', {
          cache: false,
          url: '/search',
          views: {
            'menuContent': {
              templateUrl: 'templates/search.html',
              controller: 'SearchCtrl'
            }
          }
        })

  .state('app.add', {
        cache: false,
        url: '/add',
        views: {
          'menuContent': {
            templateUrl: 'templates/editperson.html',
            controller: 'EditPersonCtrl'
          }
        }
      })

  .state('app.remove', {
        cache: false,
        url: '/remove',
        views: {
          'menuContent': {
            templateUrl: 'templates/editperson.html',
            controller: 'EditPersonCtrl'
          }
        }
      })

  .state('app.refuapray', {
    url: '/refuapray',
    views: {
      'menuContent': {
        templateUrl: 'templates/refuapray.html'//,
        //controller: 'PlaylistCtrl'
      }
    }
  })

.state('app.iluipray', {
    url: '/iluipray',
    views: {
      'menuContent': {
        templateUrl: 'templates/iluipray.html'//,
        //controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'//,
        //controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
});
