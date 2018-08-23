export = {
  defaults: {
    tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
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
    baselayers: {
      xyz: {
        url:
          'http://{s}.tiles.mapbox.com/v3/milkator.press_freedom/{z}/{x}/{y}.png',
        name: 'OpenStreetMap',
        type: 'xyz'
      }
    }
    // overlays: {
    //   root: {
    //     name: 'groups',
    //     type: 'group',
    //     visible: true,
    //     layerOptions: {
    //       layers: []
    //     }
    //   }
    // }
  }
};
