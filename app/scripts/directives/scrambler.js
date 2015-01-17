'use strict';

angular.module('openDoorApp.directives.scrambler', [])
.directive('scrambler', function($log, $timeout, Word) {

  function scrambleString(mystr) {
    // taken from stackoverflow
    return mystr.split('').sort(function(){return 0.5-Math.random()}).join('');
  }

  return {
    restrict: 'E',
    link: function(scope, element) {

      scope.reset = function() {
        scope.success = false;
        scope.badguess = false;
        scope.showWordArea = false;
        scope.typedWord = [];
        scope.newWord();
      };

      scope.newWord = function() {
        Word.getNewWord().then(function(word) {
          $log.log(word);
          scope.unscrambledWord = word;
          scope.scrambledWord = scrambleString(word);
          scope.scrambledArr = scope.scrambledWord.split('');
          scope.showWordArea = true;
        }, scope.newWord);
      };

      scope.reshuffle = function() {
        if (scope.scrambledWord) {
          scope.scrambledWord = scrambleString(scope.scrambledWord);
          scope.scrambledArr = scope.scrambledWord.split('');
          scope.typedWord = [];
        }
      };

      scope.addChar = function(event, newChar) {
        var idx = scope.scrambledArr.indexOf(newChar);
        if (idx > -1) {
          delete scope.scrambledArr[idx];
          scope.typedWord.push(newChar);
          if (scope.typedWord.join('') === scope.unscrambledWord) {
            scope.success = true;
            // start the animation early
            $timeout(function() {
              scope.showWordArea = false;
            }, 500);
            $timeout(scope.reset, 1000);
          } else if (scope.typedWord.length === scope.unscrambledWord.length) {
            scope.badguess = true;
            $timeout(function() {
              scope.typedWord = [];
              scope.scrambledArr = scope.scrambledWord.split('');
              scope.badguess = false;
            }, 500);
          }
        }
      };

      scope.removeChar = function() {
        var strippedChar = scope.typedWord.pop();
        if (strippedChar) {
          for (var i=0; i<scope.scrambledArr.length; i++) {
            if (scope.scrambledArr[i] === undefined && scope.scrambledWord[i] === strippedChar) {
              scope.scrambledArr[i] = strippedChar;
              break;
            }
          }
        }
      };

      scope.$on('backspace', scope.removeChar);
      scope.$on('keypress', scope.addChar);

      scope.reset();
    },
    templateUrl: '/views/partials/scrambler.html'
  };
});
