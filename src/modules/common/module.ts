import angular = require('angular');
import 'modules/common/configs/site';
import 'modules/common/configs/httpConfig';
import 'modules/common/configs/location';
import 'modules/common/configs/schemaFormDefaults';
import 'modules/common/configs/schema/panel';
import 'modules/common/configs/schema/switchField';
import 'modules/common/configs/schema/actionField';
import 'modules/common/configs/schema/display';
import 'modules/common/configs/schema/cascadeField';
import 'modules/common/configs/schema/angularExternalOptions';
import 'modules/common/configs/schema/bootstrapExternalOptions';
import 'modules/common/extend/table/ngTableModule';

export = angular.module('modules.common', ['modules.common.configs']);
