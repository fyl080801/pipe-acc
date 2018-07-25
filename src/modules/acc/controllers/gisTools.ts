import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope', '$modal', '$state'];
  constructor(
    private $scope,
    private $modal: ng.ui.bootstrap.IModalService,
    private $state: ng.ui.IStateService
  ) {
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

  // 设置
  goSettings() {
    this.$state.go('master.gissettings');
  }
}

mod.controller('modules/acc/controllers/gisTools', Controller);
