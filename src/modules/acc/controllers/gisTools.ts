import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope', '$modal'];
  constructor(private $scope, private $modal: ng.ui.bootstrap.IModalService) {
    $scope.vm = this;
  }

  test() {
    this.$modal.open({
      templateUrl: 'modules/acc/components/monitor/voiceAlert.html'
    });
  }

  // 过滤设备
  eqFilter() {
    this.$modal.open({
      templateUrl: 'modules/acc/components/gis/equipmentFilter.html'
    });
  }
}

mod.controller('modules/acc/controllers/gisTools', Controller);
