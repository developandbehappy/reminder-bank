reminder.controller('addWordCtrl', function ($scope) {
  $scope.addWords = function (ru, en) {
    $.post('/addNewWord', {
      'ru': ru,
      'en': en
    }).done(function (res) {
      if (!res.success) {
        return false
      }
      $scope.russianWord = '';
      $scope.englishWord = '';
      $scope.$apply();
    })
  }
});
