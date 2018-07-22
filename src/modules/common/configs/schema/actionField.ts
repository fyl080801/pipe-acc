import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

class Config {
  static $inject = [
    'schemaFormDecoratorsProvider',
    'schemaFormProvider',
    'sfPathProvider'
  ];
  constructor(
    schemaFormDecoratorsProvider: common.schema.ISchemaFormDecoratorsProvider,
    schemaFormProvider: common.schema.ISchemaFormProvider,
    sfPathProvider: common.schema.ISfPathProvider
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

    schemaFormProvider.defaults.boolean.push(field);

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      ExtendFormFields.actionField,
      base + 'actionField.html'
    );

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.actionField,
      base + 'actionField.html'
    );
  }
}

class Controller {
  static $inject = ['$scope', '$q'];
  constructor(private $scope, private $q: ng.IQService) {
    $scope.af = this;
    $scope.callbackDefer = $q.defer();
    $scope.callbackDefer.promise.then(result => {
      (this.$scope.form.callback || angular.noop)(result);
    });
  }

  action() {
    (this.$scope.form.action || angular.noop)(
      this.$scope.form,
      this.$scope.callbackDefer
    );
  }
}

function directive(): ng.IDirective {
  return {
    controller: Controller
  };
}

boot.config(Config).directive('exActionField', directive);
