import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';

export class GeoJsonLayer extends LayerEntityBase {
  constructor(layer: acc.gis.model.IMapLayer) {
    super(layer);

    var lay = layer as acc.gis.model.IGeoJson;
  }
}
