import mod = require('modules/acc/module');
import angular = require('angular');
import { ToolsEvents } from 'modules/acc/components/gis/indexEvents';

interface Scope extends ng.IScope {
  [key: string]: any;
}

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$state',
    'mapInstance',
    'modules/common/services/requestService'
  ];
  constructor(
    private $scope: Scope,
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
        angular.forEach(result, (item, idx) => {
          angular.forEach(item.properties.markers, marker => {
            marker.draggable = false;
          });
        });
        this.$scope.areas = result;
        if (result.length > 0) {
          this.changeLocation(result[0]);
        }
      });
  }

  changeLocation(area: acc.gis.model.ILocation) {
    this.mapInstance.setView(
      {
        lat: area.properties.defaults.center.lat,
        lng: area.properties.defaults.center.lng
      },
      area.properties.defaults.center.zoom,
      {
        animate: true
      }
    );
    this.$scope.$emit(ToolsEvents.LoactionChanged, area.properties);
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
