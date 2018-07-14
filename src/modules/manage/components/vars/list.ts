import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.vm = this;
  }
}

mod.controller('modules/manage/components/vars/list', Controller);
