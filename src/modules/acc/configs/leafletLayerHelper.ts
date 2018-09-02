import cfg = require('modules/acc/configs');
import angular = require('angular');
import L = require('leaflet');
import 'modules/acc/extend/leaflet/ajaxGeoJSON';

cfg
  .config([
    '$provide',
    function($provide) {
      return $provide.decorator('leafletHelpers', [
        '$delegate',
        function($delegate) {
          var basicFunction = function basicFunction(layerType) {
            return {
              isLoaded: function isLoaded() {
                return angular.isDefined(layerType);
              },
              is: function is(layer) {
                if (this.isLoaded()) {
                  return layer instanceof layerType;
                }
                return false;
              }
            };
          };

          var plugins = {
            AjaxGeoJSONPlugin: basicFunction(L['AjaxGeoJSON'])
          };

          angular.extend($delegate, plugins);

          return $delegate;
        }
      ]);
    }
  ])
  .config([
    '$provide',
    function($provide) {
      return $provide.decorator('leafletLayerHelpers', [
        '$delegate',
        'leafletHelpers',
        function($delegate, leafletHelpers) {
          angular.extend($delegate.layerTypes, {
            ajaxGeoJSON: {
              createLayer: function createLayer(params) {
                if (!leafletHelpers.AjaxGeoJSONPlugin.isLoaded()) {
                  return;
                }

                var layer = new L['AjaxGeoJSON'](params.url, params.options);
                // layer.onAdd = function(map) {
                //   //this.setMap(map);
                // };
                // layer.onRemove = function() {
                //   //this.setMap(null);
                // };
                return layer;
              }
            }
          });

          return $delegate;
        }
      ]);
    }
  ]);
