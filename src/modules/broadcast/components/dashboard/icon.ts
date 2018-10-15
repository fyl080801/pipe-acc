import L = require('leaflet');

export const DefaultIcon: L.IconOptions = {
  iconUrl: 'images/gis/marker-icon.png',
  shadowUrl: 'images/gis/marker-shadow.png'
};

export const BrokenIcon: L.IconOptions = {
  iconUrl: 'images/gis/marker-icon_alert.png',
  shadowUrl: 'images/gis/marker-shadow.png'
};
