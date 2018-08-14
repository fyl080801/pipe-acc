import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope', 'listPromise'];
  constructor(private $scope, private listPromise) {
    $scope.vm = this;
    $scope.listPromise = listPromise;
    $scope.list = listPromise ? listPromise.list : [];
  }

  select(item) {
    this.$scope.$close(item);
  }
}

mod.controller('modules/manage/controllers/popupSelector', Controller);
