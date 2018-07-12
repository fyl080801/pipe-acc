import L = require('leaflet');
import angular = require('angular');
import 'proj4leaflet';

export class MapBuilder implements acc.IMapBuilder {
  map() {
    return this._map;
  }

  private _map: L.Map;
  private _defaults: L.MapOptions = {
    attributionControl: false,
    zoomControl: false
  };

  constructor(
    private element: string | HTMLElement,
    private options?: L.MapOptions
  ) {
    var crs = new L.Proj.CRS(
      'EPSG:900913',
      '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
      {
        resolutions: (() => {
          var level = 19;
          var res = [];
          res[0] = Math.pow(2, 18);
          for (var i = 1; i < level; i++) {
            res[i] = Math.pow(2, 18 - i);
          }
          return res;
        })(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
      }
    );

    this._map = L.map(
      element,
      angular.extend(
        this._defaults,
        {
          crs: crs
        },
        options
      )
    );

    new L.TileLayer(
      'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518',
      {
        maxZoom: 18,
        minZoom: 3,
        subdomains: ['0', '1', '2'],
        tms: true
      }
    ).addTo(this._map);

    this._map.setView([39.91349, 116.407945], 15);
  }
}
