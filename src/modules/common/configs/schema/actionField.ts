import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var tmp = 'modules/common/configs/schema/actionField.html';

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

    // var field = (name, schema, options) => {
    //   if (schema.type === 'string' && schema.format == 'html') {
    //     var f = schemaFormProvider.stdFormObj(name, schema, options);
    //     f.key = options.path;
    //     f.type = ExtendFormFields.actionField;
    //     options.lookup[sfPathProvider.stringify(options.path)] = f;
    //     return f;
    //   }
    // };

    // schemaFormProvider.defaults.string.unshift(field);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.actionField,
      tmp,
      defaults
    );

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.actionField,
      tmp
    );
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

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.af = this;
  }

  action() {
    if (this.$scope.form.action) {
      var promise = this.$scope.form.action(
        this.$scope.form,
        this.$scope.model
      );
      if (promise && angular.isFunction(promise.then)) {
        promise.then(result => {
          this.$scope.form.callback(result, this.$scope.model);
        });
      }
    }
  }
}

function directive(): ng.IDirective {
  return {
    controller: Controller
  };
}

boot
  .config(Config)
  .directive('exActionField', directive)
  .run(Run);
