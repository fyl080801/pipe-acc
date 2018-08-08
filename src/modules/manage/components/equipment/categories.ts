import mod = require('modules/manage/module');
import angular = require('angular');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller('modules/manage/components/equipment/categories', Controller);
