import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

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
    var base = 'modules/common/configs/schema/';

    var field = (name, schema, options) => {
      if (schema.type === 'boolean' && schema.format == 'html') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = ExtendFormFields.actionField;
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.push(field);

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      ExtendFormFields.actionField,
      base + 'actionField.html',
      sfBuilderProvider.stdBuilders
    );

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.actionField,
      base + 'actionField.html'
    );
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

boot.config(Config).directive('exActionField', directive);
