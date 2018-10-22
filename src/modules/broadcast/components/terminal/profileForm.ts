import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.vm = this;
    $scope.$data = {
      file: null
    };

    $scope.$on('$binFileChanged', (evt, val) => {
      $scope.$data.file = val;
    });
  }
}

mod.controller('modules/broadcast/components/terminal/profileForm', Controller);
