'use strict';

angular
  .module('openDoorApp', [
    // angular modules
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    // vendor modules
    'restangular',

    // application modules
    'openDoorApp.services.word',
    'openDoorApp.directives.scrambler'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://api.wordnik.com');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=5000&minLength=4&maxLength=8&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5