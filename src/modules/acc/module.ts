import angular = require('angular');
import 'modules/acc/configs/run';
import 'modules/acc/configs/site';
import 'modules/acc/configs/httpConfig';
import 'modules/acc/configs/schemaFormDefaults';

export = angular.module('modules.acc', ['modules.acc.configs']);
