import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var tmp = 'modules/common/configs/schema/cascadeField.html';

class Config {
  static $inject = [
    'schemaFormDecoratorsProvider',
    'schemaFormProvider',
    'sfPathProvider',
    'sfBuilderProvider'
  ];
  constructor(
    schemaFormDecoratorsProvider: common.schema.ISchemaFormDecoratorsProvider,
    schemaFormProvider: common.schema.ISchemaFormProvider,
    sfPathProvider: common.schema.ISfPathProvider,
    sfBuilderProvider: common.schema.ISfBuilderProvider
  ) {
    var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
    // var ngModel = sfBuilderProvider.builders.ngModel;
    var sfField = sfBuilderProvider.builders.sfField;
    var condition = sfBuilderProvider.builders.condition;

    var defaults = [sfField, ngModelOptions, condition];

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.cascade,
      tmp,
      defaults
    );

    schemaFormDecoratorsProvider.createDirective(ExtendFormFields.cascade, tmp);
  }
}

class Run {
  static $inject = ['$http', '$templateCache'];
  constructor(
    $http: ng.IHttpService,
    $templateCache: ng.ITemplateCacheService
  ) {
    $http
      .get(tmp, {
        cache: $templateCache,
        headers: { Accept: 'text/html' }
      })
      .then(response => {
        $templateCache.put(tmp, response.data);
        return response.data;
      });
  }
}

boot.config(Config).run(Run);
