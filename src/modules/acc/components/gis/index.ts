import mod = require('modules/acc/module');
import { MapBuilder } from 'modules/acc/factories/mapBuilder';

class Controller {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {
    $scope.vm = this;
    $scope.map = new MapBuilder($element.find('[map-area]').get(0)).map();
  }
}

mod.controller('modules/acc/components/gis/index', Controller);
