export var MapDefaults = () => {
  return {
    defaults: {
      attributionControl: false,
      zoomControl: false,
      maxZoom: 20,
      controls: {
        layers: {
          visible: false,
          position: 'topright',
          collapsed: true
        }
      },
      center: {
        lat: 0,
        lng: 0,
        zoom: 1
      }
    },
    layers: {
      overlays: {
        // bbbb: {
        //   name: '',
        //   url:
        //     'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
        //   type: 'xyz',
        //   visible: true
        // },
        // xxx: {
        //   name: '',
        //   type: 'group',
        //   visible: true,
        //   layerOptions: {
        //     layers: []
        //   }
        // }
      }
    },
    markers: {}
  };
};
