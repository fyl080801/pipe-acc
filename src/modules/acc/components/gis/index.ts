import mod = require('modules/acc/module');
import angular = require('angular');
import { MapDefaults } from 'modules/acc/configs/mapDefaults';
import { ToolsEvents } from 'modules/acc/components/gis/indexEvents';

interface Scope extends ng.IScope {
  [key: string]: any;
}

class Controller {
  static $inject = [
    '$scope',
    '$element',
    'modules/acc/factories/mapControl',
    'modules/common/services/requestService',
    'leafletData'
  ];
  constructor(
    private $scope: Scope,
    private $element: JQLite,
    private mapControl,
    private requestService: common.services.IRequestService,
    private leafletData
  ) {
    $scope.vm = this;
    $scope.area = MapDefaults();

    $scope.$on(ToolsEvents.LoactionChanged, (evt, area) => {
      $scope.area = area;
    });

    leafletData.getMap().then((map: L.Map) => {
      mapControl({
        templateUrl: 'modules/acc/components/gis/gisTools.html',
        controller: 'modules/acc/components/gis/gisTools',
        scope: $scope.$new(),
        resolve: {
          mapInstance: () => {
            return map;
          }
        }
      }).addTo(map);
    });
  }
}

mod.controller('modules/acc/components/gis/index', Controller);
