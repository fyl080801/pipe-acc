import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope', 'modules/common/factories/ngTableRequest'];
  constructor(
    private $scope,
    private ngTableRequest: common.factories.INgTableRequestFactory
  ) {
    $scope.vm = this;
    $scope.tableParams = ngTableRequest({
      url: '',
      showLoading: false
    }).table();
  }
}

mod.controller('modules/broadcast/components/broadcast/list', Controller);
