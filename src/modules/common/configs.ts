import angular = require('angular');
import 'app/application';
import '../../../bower_components/angular-ui-tree/dist/angular-ui-tree';
import 'schema-form-bootstrap';

export = angular.module('modules.common.configs', [
  'ui.router',
  'ui.tree',
  'schemaForm'
]);
