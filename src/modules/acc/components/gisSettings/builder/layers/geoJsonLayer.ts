import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';

export class GeoJsonLayer extends LayerEntityBase {
  constructor(map: L.Map, layer: acc.gis.model.IMapLayer) {
    super(map, layer);
  }

  protected added() {}
}
