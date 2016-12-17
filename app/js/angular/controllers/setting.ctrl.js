reminder.controller('settingCtrl', function ($scope, $timeout) {
  $scope.showAlert = false;
  $scope.mySetting = [];
  $scope.options = {
    mstep: [
      {
        title: '1 секунда',
        value: 1000
      }, {
        title: '5 секунд',
        value: 5000
      }, {
        title: '10 секунд',
        value: 10000
      }, {
        title: '30 секунд',
        value: 30000
      }, {
        title: '1 минута',
        value: 60000
      }, {
        title: '3 минуты',
        value: 180000
      }, {
        title: '5 минут',
        value: 300000
      }, {
        title: '10 минут',
        value: 600000
      }, {
        title: '30 минут',
        value: 1800000
      }, {
        title: '1 час',
        value: 3600000
      }
    ]
  };

  $scope.saveStep = function (step) {
    console.log('step', step);
    $.post('/saveSettingForNotify', {
      time: step.value,
      title: step.title
    }).done(function (res) {
      if (!res.success) {
        return false;
      }
      $scope.showAlert = true;
      getMySetting();
      $timeout(function () {
        $scope.showAlert = false;
      }, 3000);
      $scope.$apply()
    });
  };

  function getMySetting() {
    $.get('/getMySettingsNotify', function (res) {
      $scope.mySetting = res;
      $scope.$apply();
    });
  }
  getMySetting();

});
