import angular = require('angular');
import 'modules/common/configs/site';
import 'modules/common/configs/httpConfig';
import 'modules/common/configs/schemaFormDefaults';
import 'modules/common/extend/table/ngTableModule';

export = angular.module('modules.common', ['modules.common.configs']);
