import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';

// group 每次触发事件都要对children都执行一遍对应事件
export class GroupLayer extends LayerEntityBase {
  //   add(layer: acc.gis.model.IMapLayer) {
  //     throw new Error('Method not implemented.');
  //   }

  //   remove(uudi: string) {
  //     throw new Error('Method not implemented.');
  //   }

  constructor(map: L.Map, layer: acc.gis.model.IMapLayer) {
    super(map, layer);
  }

  protected added() {
    // this.layer['children'];
  }
}
