import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.vm = this;
  }
}

mod.controller('modules/broadcast/components/terminal/profileForm', Controller);
