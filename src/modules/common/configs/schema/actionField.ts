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

    var defaults = [
      sfField,
      ngModel,
      ngModelOptions,
      condition,
      args => {
        if (!args.form.displayKey) {
          return;
        }
        var key = args.form.displayKey;
        var displayValue;
        if (!args.state.modelValue) {
          var strKey = sfPathProvider.stringify(key).replace(/"/g, '&quot;');
          displayValue = args.state.modelName || 'model';

          if (strKey) {
            displayValue += (strKey[0] !== '[' ? '.' : '') + strKey;
          }
        } else {
          displayValue = args.state.displayValue;
        }

        var nodes = args.fieldFrag.querySelectorAll('[sf-field-display]');
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          var conf = n.getAttribute('sf-field-display');
          if (!conf || conf === '') {
            n.setAttribute('ng-model', displayValue);
          } else if (conf === 'replaceAll') {
            var attributes = n.attributes;
            for (var j = 0; j < attributes.length; j++) {
              if (
                attributes[j].value &&
                attributes[j].value.indexOf('$$name') !== -1
              ) {
                attributes[j].value = attributes[j].value.replace(
                  /\$\$name\$\$/g,
                  displayValue
                );
              }
            }
          } else {
            var val = n.getAttribute(conf);
            if (val && val.indexOf('$$name$$')) {
              n.setAttribute(conf, val.replace(/\$\$name\$\$/g, displayValue));
            } else {
              n.setAttribute(conf, displayValue);
            }
          }
        }
      }
    ];

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
