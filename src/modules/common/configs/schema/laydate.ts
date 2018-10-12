import boot = require('modules/common/configs');
import laydate = require('js/laydate');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var tmp = 'modules/common/configs/schema/laydate.html';

directive.$inject = ['sfPath'];

function directive(sfPath): ng.IDirective {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      laydate['render'](
        $.extend(
          {
            elem: instanceElement.get(0),
            done: (value, date, enddate) => {
              var modelPath: string = sfPath.normalize(
                instanceAttributes['ngModel'],
                '.'
              );
              var pathArray = modelPath.split('.');
              var modelValue = null;
              for (var i = 0; i < pathArray.length; i++) {
                if (i === pathArray.length - 1) {
                  if (modelValue === null) {
                    scope[pathArray[i]] = value;
                  } else {
                    modelValue[pathArray[i]] = value;
                  }
                  scope.ngModel.$setViewValue(value);
                } else {
                  modelValue =
                    modelValue === null
                      ? scope[pathArray[i]]
                      : modelValue[pathArray[i]];
                }
              }

              scope.$apply();
            }
          },
          scope.form.layOptions
        )
      );
    }
  };
}

/**
 *
 */
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
        if (args.form.validators) {
          var ngModelElement = args.fieldFrag.querySelector('[ng-model]');
          if (ngModelElement) ngModelElement.setAttribute('sf-validators', '');
        }
      }
    ];

    var field = (name, schema, options) => {
      if (
        schema.type === 'string' &&
        schema.format === ExtendFormFields.laydate
      ) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = ExtendFormFields.laydate;
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(field);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.laydate,
      tmp,
      defaults
    );

    schemaFormDecoratorsProvider.createDirective(ExtendFormFields.laydate, tmp);
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

boot
  .config(Config)
  .run(Run)
  .directive('laydate', directive);
