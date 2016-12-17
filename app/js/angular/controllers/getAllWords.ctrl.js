reminder.controller('getAllWords', function ($scope, $interval) {
  $scope.words = [];


  $scope.removeWord = function (id) {
    $.post("removeWord", {
      id: id
    }).done(function (res) {
      if (!res.success) {
        return false;
      }
      $scope.reloadWords();
    });
  };

  $scope.changeWord = function (word) {
    word.canChange = true;
  };

  $scope.cancelChange = function (word) {
    word.canChange = false;
  };

  $scope.updateWord = function (word) {
    $.post("/updateWord", {
      id: word.id,
      ru: word.ru,
      en: word.en
    }).done(function (res) {
      if (!res.success) {
        return false
      }
      $scope.reloadWords();
    });
  };

  $scope.reloadWords = function () {
    $.get("/getAllWords", function (data) {
      $scope.words = data;
      $scope.$apply();
    });
  };

  $scope.reloadWords();

});
