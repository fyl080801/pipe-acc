import { LayerEntityBase } from 'modules/acc/components/gisSettings/builder/layers/layerEntityBase';
import L = require('leaflet');
import { layerTypes } from 'modules/acc/components/gisSettings/builder/layerTypes';
import { LayerTriggers } from 'modules/acc/components/gisSettings/builder/enums';

// group 每次触发事件都要对children都执行一遍对应事件
export class GroupLayer extends LayerEntityBase {
  private _layersMap: { [key: string]: acc.gis.IMapLayerEntity };

  constructor(layer: acc.gis.model.IMapLayer) {
    super(layer);

    var lay = layer as acc.gis.model.ILayerGroup;

    this._layersMap = {};

    $.each(lay.children, (idx, item) => {
      this._layersMap[item.uuid] = layerTypes[item.type](item);
    });

    var ls = [];
    $.each(this._layersMap, (name, item) => {
      ls.push(item.entity);
    });

    this.entity = L.layerGroup(ls, lay.options);

    $.each(this._layersMap, (name, item) => {
      item.trigger(LayerTriggers.被添加, this.entity as L.LayerGroup<any>);
    });

    this._triggers[LayerTriggers.被添加] = (map: L.Map) => {
      this.entity.addTo(map);
    };
  }
}
