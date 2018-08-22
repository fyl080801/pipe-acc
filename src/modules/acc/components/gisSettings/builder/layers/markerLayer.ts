import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';

export class MarkerLayer extends LayerEntityBase {
  constructor(layer: acc.gis.model.IMapLayer) {
    super(layer);
  }

  protected added() {}
}
