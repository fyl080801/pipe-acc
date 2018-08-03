import mod = require('modules/acc/module');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';

class Controller {
  private _map: L.Map;

  static $inject = [
    '$scope',
    '$element',
    'modules/acc/factories/mapControl',
    'modules/common/services/requestService'
  ];
  constructor(
    private $scope,
    private $element: JQLite,
    private mapControl: acc.factories.IMapLayerFactory,
    private requestService: common.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    this._map = $scope.map;

    mapControl({
      templateUrl: 'modules/acc/components/gis/gisTools.html',
      controller: 'modules/acc/components/gis/gisTools',
      resolve: {
        mapInstance: () => {
          return this._map;
        }
      }
    }).addTo($scope.map);
  }
}

mod.controller('modules/acc/components/gis/index', Controller);
