// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','angular-lodash','angular-md5','facebook','toaster'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  .config([
    'FacebookProvider',
    function(FacebookProvider) {
     //var myAppId = '754907324579701';
     var myAppId = '793563737380726';
     FacebookProvider.init(myAppId);
     
    }
  ])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $httpProvider.interceptors.push('sessionInjector');

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller:'LoginCtrl'
    })
    .state('app.offers', {
      url: "/offers",
      templateUrl: "templates/offers.html",
      controller:'OffersCtrl'
    })
    .state('app.products', {
      url: "/products",
      templateUrl: "templates/products.html",
      controller:'ProductsCtrl'
    })
    .state('app.contact', {
      url: "/contact",
      templateUrl: "templates/contact.html"
    })
    .state('app.error', {
      url: "/error",
      template:'error'
    });
  // if none of the above states are matched, use this as the fallback
  if(localStorage.token && localStorage.token !== null){
    $urlRouterProvider.otherwise('/app/offers');
  }else{
    $urlRouterProvider.otherwise('/app/login');
  }
 
});

