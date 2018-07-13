import angular = require('angular');
import L = require('leaflet');

export = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: options => {
    L.Util.extend(this.options, options);
  },
  onAdd: (map: L.Map) => {
    this._container = L.DomUtil.create('div', 'leaflet-control-clegend');

    return this._container;
  }
});
