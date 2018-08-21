import { GroupLayer } from 'modules/acc/components/gisSettings/builder/layers/groupLayer';
import { TileLayer } from 'modules/acc/components/gisSettings/builder/layers/tileLayer';
import { MarkerLayer } from 'modules/acc/components/gisSettings/builder/layers/markerLayer';
import { GeoJsonLayer } from 'modules/acc/components/gisSettings/builder/layers/geoJsonLayer';

export var layerTypes: {
  [key: string]: ((map, layer) => acc.gis.IMapLayerEntity);
} = {
  group: (map, layer) => {
    return new GroupLayer(map, layer);
  },
  tileLayer: (map, layer) => {
    return new TileLayer(map, layer);
  },
  markers: (map, layer) => {
    return new MarkerLayer(map, layer);
  },
  geoJson: (map, layer) => {
    return new GeoJsonLayer(map, layer);
  }
};
