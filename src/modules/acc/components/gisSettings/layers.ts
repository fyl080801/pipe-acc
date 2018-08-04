import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller('modules/acc/components/gisSettings/layers', Controller);
