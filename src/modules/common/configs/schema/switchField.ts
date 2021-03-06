import boot = require('modules/common/configs');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var tmp = 'modules/common/configs/schema/switchField.html';

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
    var ngModel = sfBuilderProvider.builders.ngModel;
    var sfField = sfBuilderProvider.builders.sfField;
    var condition = sfBuilderProvider.builders.condition;

    var defaults = [sfField, ngModel, ngModelOptions, condition];

    var switchField = (name, schema, options) => {
      if (
        schema.type === 'boolean' &&
        schema.format === ExtendFormFields.switch
      ) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = ExtendFormFields.switch;
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.boolean.unshift(switchField);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.switch,
      tmp,
      defaults
    );

    schemaFormDecoratorsProvider.createDirective(ExtendFormFields.switch, tmp);
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
