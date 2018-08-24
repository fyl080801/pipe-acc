export = {
  defaults: {
    attributionControl: false,
    zoomControl: false,
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
      root: {
        name: '',
        type: 'group',
        visible: true,
        layerOptions: {
          layers: [
            {
              name: '',
              url:
                'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
              type: 'xyz'
            }
          ]
        }
      }
    }
  }
};
