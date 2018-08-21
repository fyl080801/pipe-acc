import angular = require('angular');
import { LayerTriggers } from 'modules/acc/components/gisSettings/builder/enums';

export abstract class LayerEntityBase implements acc.gis.IMapLayerEntity {
  protected _triggers;

  protected added() {}

  constructor(public map: L.Map, public layer: acc.gis.model.IMapLayer) {
    this._triggers[LayerTriggers.被添加] = this.added;
  }

  entity: L.Layer;

  trigger(evt: LayerTriggers) {
    (this._triggers[evt] || angular.noop)();
  }
}
