import L = require('leaflet');

L['AjaxGeoJSON'] = L.GeoJSON.extend({
  initialize: function(url, options, geojsonOptions) {
    L.GeoJSON.prototype['initialize'].call(this, null, options);
    this.url = url;
    this.options = options;
    this.geojsonLayer = new L.GeoJSON(null, geojsonOptions);
  },
  onAdd: function(map) {
    this._map = map;
    var _this = this;
    L.GeoJSON.prototype.onAdd.call(this, map);

    $.ajax({
      url: this.url,
      method: 'GET',
      success: response => {
        _this.geojsonLayer.addData(response);
        map.addLayer(_this.geojsonLayer);
      }
    });
  },
  onRemove: function(map) {
    map.removeLayer(this.geojsonLayer);
    L.GeoJSON.prototype.onRemove.call(this, map);
  }
});
