import mod = require('modules/acc/module');
import { layerTypes } from 'modules/acc/components/gisSettings/builder/layerTypes';
import { LayerTriggers } from 'modules/acc/components/gisSettings/builder/enums';

class LayerStore implements acc.services.ILayerStore {
  // 用于映射加到地图的元素
  private _layersMap: { [key: string]: acc.gis.IMapLayerEntity };

  // 先加几个简单的方法
  // 以后再考虑类似层对象层级移动后的行为
  constructor(
    private _layers: acc.gis.model.IMapLayer[],
    private _map: L.Map,
    private utility: common.services.IUtility
  ) {
    $.each(_layers, (idx, layer) => {
      this._layersMap[layer.uuid] = layerTypes[layer.type](this._map, layer);
      this._layersMap[layer.uuid].trigger(LayerTriggers.被添加);
    });
  }

  add(layer: acc.gis.model.IMapLayer) {
    layer.uuid = this.utility.uuid();
    this._layers.push(layer);
    this._layersMap[layer.uuid] = layerTypes[layer.type](this._map, layer);
    this._layersMap[layer.uuid].trigger(LayerTriggers.被添加);
  }

  remove(uuid: string) {}
}

function factory(
  utility: common.services.IUtility
): acc.factories.ILayerStoreFactory {
  return (layers: acc.gis.model.IMapLayer[], map: L.Map) => {
    return new LayerStore(layers, map, utility);
  };
}

factory.$inject = ['modules/common/services/utility'];

mod.factory('modules/acc/components/gisSettings/builder/layerStore', factory);
