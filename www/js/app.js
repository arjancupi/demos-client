// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'ionic.rating',
  'jett.ionic.scroll.sista',
  'ionic-native-transitions',
  'ngFileUpload'
])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
  url: 'http://localhost:8080/api'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'LoginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    // Each tab has its own nav history stack:a
    .state('tab.dash', {
      url: '/dash',
      abstract: true,
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html'
        }
      }
    })

    // Each tab has its own nav history stack:a
    .state('tab.dash.popular', {
      url: '/popular',
      views: {
        'popular': {
          templateUrl: 'templates/tab-dash-popular.html',
          controller: 'DashCtrl'
        }
      }
    })

    // Each tab has its own nav history stack:a
    .state('tab.dash.recent', {
      url: '/recent',
      views: {
        'recent': {
          templateUrl: 'templates/tab-dash-recent.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.create', {
      url: '/create',
      views: {
        'tab-create': {
          templateUrl: 'templates/tab-create.html',
          controller: 'CreateCtrl'
        }
      }
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  })
  // TODO fix behavious desktop/mobile false for mobile
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(true);

    // Or for only a single platform, use
    // if( ionic.Platform.isAndroid() ) {
    // $ionicConfigProvider.scrolling.jsScrolling(false);
    // }
  });
