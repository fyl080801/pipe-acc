import angular = require('angular');
import 'app/application';
import 'angular-simple-logger';
import 'ui-leaflet';
import 'leaflet-dom-markers';
import '../../../bower_components/ngDraggable/ngDraggable';

export = angular.module('modules.broadcast.configs', [
  'ui.router',
  'ngDraggable',
  'ui-leaflet'
]);
