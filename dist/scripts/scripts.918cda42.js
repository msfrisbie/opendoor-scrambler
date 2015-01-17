"use strict";angular.module("openDoorApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","restangular","openDoorApp.services.word","openDoorApp.directives.scrambler"]).config(["$routeProvider","RestangularProvider",function(a,b){b.setBaseUrl("http://api.wordnik.com"),a.when("/",{templateUrl:"views/main.html"}).otherwise({redirectTo:"/"})}]),angular.module("openDoorApp").controller("MainCtrl",["$scope",function(a){a.captureKey=function(b){if(8==b.keyCode)a.$broadcast("backspace");else{var c=String.fromCharCode(b.keyCode);c.length>0&&a.$broadcast("keypress",c.toLowerCase())}}}]),angular.module("openDoorApp.directives.scrambler",[]).directive("scrambler",["$log","$timeout","Word",function(a,b,c){function d(a){return a.split("").sort(function(){return.5-Math.random()}).join("")}return{restrict:"E",link:function(e){e.reset=function(){e.success=!1,e.badguess=!1,e.showWordArea=!1,e.typedWord=[],e.newWord()},e.newWord=function(){c.getNewWord().then(function(b){a.log(b),e.unscrambledWord=b,e.scrambledWord=d(b),e.scrambledArr=e.scrambledWord.split(""),e.showWordArea=!0},e.newWord)},e.reshuffle=function(){e.scrambledWord&&(e.scrambledWord=d(e.scrambledWord),e.scrambledArr=e.scrambledWord.split(""),e.typedWord=[])},e.addChar=function(a,c){var d=e.scrambledArr.indexOf(c);d>-1&&(delete e.scrambledArr[d],e.typedWord.push(c),e.typedWord.join("")===e.unscrambledWord?(e.success=!0,b(function(){e.showWordArea=!1},500),b(e.reset,1e3)):e.typedWord.length===e.unscrambledWord.length&&(e.badguess=!0,b(function(){e.typedWord=[],e.scrambledArr=e.scrambledWord.split(""),e.badguess=!1},500)))},e.removeChar=function(){var a=e.typedWord.pop();if(a)for(var b=0;b<e.scrambledArr.length;b++)if(void 0===e.scrambledArr[b]&&e.scrambledWord[b]===a){e.scrambledArr[b]=a;break}},e.$on("backspace",e.removeChar),e.$on("keypress",e.addChar),e.reset()},templateUrl:"/views/partials/scrambler.html"}}]),angular.module("openDoorApp.services.word",[]).factory("Word",["$q","Restangular",function(a,b){function c(){return e.getList("randomWords",{hasDictionaryDef:!0,minCorpusCount:5e3,minLength:4,maxLength:8,limit:1,api_key:"a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"}).then(function(a){return a[0].word.toLowerCase()})}var d,e=b.one("v4").one("words.json");return{getNewWord:function(){return c().then(function(b){return RegExp(/[^a-z0-9]/gi).test(b)?a.reject():(d=b,b)})},getCurrentWord:function(){return d?a.when(d):this.getNewWord()}}}]);