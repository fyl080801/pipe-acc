import { GroupLayer } from 'modules/acc/components/gisSettings/builder/layers/groupLayer';
import { TileLayer } from 'modules/acc/components/gisSettings/builder/layers/tileLayer';
import { MarkerLayer } from 'modules/acc/components/gisSettings/builder/layers/markerLayer';
import { GeoJsonLayer } from 'modules/acc/components/gisSettings/builder/layers/geoJsonLayer';

export var layerTypes: {
  [key: string]: ((layer: acc.gis.model.IMapLayer) => acc.gis.IMapLayerEntity);
} = {
  group: layer => {
    return new GroupLayer(layer);
  },
  tileLayer: layer => {
    return new TileLayer(layer);
  },
  markers: layer => {
    return new MarkerLayer(layer);
  },
  geoJson: layer => {
    return new GeoJsonLayer(layer);
  }
};

export var layerTypeEnums = [
  {
    type: 'tileLayer',
    name: '瓦片图层'
  }
];
