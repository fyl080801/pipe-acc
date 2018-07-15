import mod = require('modules/acc/module');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';

class Controller {
  static $inject = ['$scope', '$element', 'modules/acc/factories/mapControl'];
  constructor(
    private $scope,
    private $element: JQLite,
    private mapControl: acc.IMapLayerFactory
  ) {
    $scope.vm = this;
    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    mapControl({
      templateUrl: 'modules/acc/views/gisTools.html'
    }).addTo($scope.map);
  }
}

mod.controller('modules/acc/components/gis/index', Controller);
