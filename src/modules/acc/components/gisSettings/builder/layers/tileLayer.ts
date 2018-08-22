import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';
import L = require('leaflet');
import { LayerTriggers } from '../enums';

export class TileLayer extends LayerEntityBase {
  constructor(layer: acc.gis.model.IMapLayer) {
    super(layer);

    var lay = layer as acc.gis.model.ITileLayer;

    this.entity = L.tileLayer(lay.source, lay.options || {});

    this._triggers[LayerTriggers.被添加] = (map: L.Map) => {
      this.entity.addTo(map);
    };
  }
}
