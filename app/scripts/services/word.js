'use strict';

angular.module('openDoorApp.services.word', [])
.factory('Word', function($q, Restangular) {
  var currentWord
    , wordAPI = Restangular
                .one('v4')
                .one('words.json');

  function getWord() {
    return wordAPI.getList(
      'randomWords', 
      {
        hasDictionaryDef: true,
        minCorpusCount: 5000,
        minLength: 4,
        maxLength: 8,
        limit: 1,
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      }
    ).then(function(data) {
      return data[0].word.toLowerCase();
    });
  }

  return {
    getNewWord: function() {
      return getWord().then(function(word) {
        if (RegExp(/[^a-z0-9]/gi).test(word)) {
          return $q.reject();
        } else {
          currentWord = word;
          return word;
        }
      })
    },
    getCurrentWord: function() {
      if (!currentWord) {
        return this.getNewWord();
      } else {
        return $q.when(currentWord);
      }
    }
  };
});
