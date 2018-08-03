import mod = require('modules/acc/module');

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$state',
    'mapInstance',
    'modules/common/services/requestService'
  ];
  constructor(
    private $scope,
    private $modal: ng.ui.bootstrap.IModalService,
    private $state: ng.ui.IStateService,
    private mapInstance: L.Map,
    private requestService: common.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.areas = [];
  }

  test() {
    this.$modal.open({
      templateUrl: 'modules/acc/components/monitor/voiceAlert.html'
    });
  }

  loadAreas() {
    this.requestService
      .url('/api/acc/location/favorite')
      .options({
        showLoading: false
      })
      .get()
      .result.then((result: acc.gis.model.ILocation[]) => {
        this.$scope.areas = result;
        if (result.length > 0) {
          this.changeLocation(result[0]);
        }
      });
  }

  changeLocation(area: acc.gis.model.ILocation) {
    this.mapInstance.setView(
      {
        lat: area.properties.mapview.centerLat,
        lng: area.properties.mapview.centerLng
      },
      area.properties.mapview.zoom,
      {
        animate: true
      }
    );
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

mod.controller('modules/acc/components/gis/gisTools', Controller);
