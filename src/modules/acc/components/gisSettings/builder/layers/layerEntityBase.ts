import angular = require('angular');
import { LayerTriggers } from 'modules/acc/components/gisSettings/builder/enums';

export abstract class LayerEntityBase implements acc.gis.IMapLayerEntity {
  protected _triggers;

  constructor(public layer: acc.gis.model.IMapLayer) {
    this._triggers = {};
  }

  entity: L.Layer | L.LayerGroup<any>;

  trigger(evt: LayerTriggers, map: L.Map | L.LayerGroup<any>) {
    (this._triggers[evt] || angular.noop)(map);
  }
}
