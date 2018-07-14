import angular = require('angular');
import 'modules/acc/configs/run';
import 'modules/acc/configs/site';
import 'modules/acc/configs/httpConfig';

export = angular.module('modules.acc', ['modules.acc.configs']);
