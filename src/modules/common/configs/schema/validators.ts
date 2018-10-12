import cfg = require('modules/common/configs');
import angular = require('angular');

/**
 * 自定义验证
 */
class Config {
  static $inject = [
    'schemaFormDecoratorsProvider',
    'schemaFormProvider',
    'sfBuilderProvider',
    'sfPathProvider'
  ];
  constructor(
    schemaFormDecoratorsProvider,
    schemaFormProvider,
    sfBuilderProvider,
    sfPathProvider
  ) {
    var bootstrapDecorator = schemaFormDecoratorsProvider.decorator(
      'bootstrapDecorator'
    );

    var sfValidators = args => {
      if (args.form.validators) {
        var ngModelElement = args.fieldFrag.querySelector('[ng-model]');
        if (ngModelElement) ngModelElement.setAttribute('sf-validators', '');
      }
    };

    angular.forEach(bootstrapDecorator, (item, idx) => {
      if (angular.isArray(item.builder)) {
        item.builder.push(sfValidators);
      }
    });
  }
}

function directive(): ng.IDirective {
  return {
    restrict: 'AC',
    require: 'ngModel',
    link: (scope: any, element: JQLite, attrs: ng.IAttributes, ctrl: any) => {
      var form = scope.$eval(attrs.sfChanged);
      angular.forEach(form.validators, (fnItem, key) => {
        var valfn = () => {
          var validity = angular.isFunction(fnItem)
            ? fnItem(ctrl.$modelValue, scope.model, form)
            : scope.evalExpr(fnItem, {
                modelValue: ctrl.$modelValue,
                model: scope.model,
                form: form
              });

          if (scope.ngModel) {
            scope.ngModel.$setValidity(key, validity === true);
          } else {
            ctrl.$setValidity(key, validity === true);
          }
        };

        // 验证方法上来就要执行一次，不然表单第一次加载不会执行验证
        valfn();

        ctrl.$viewChangeListeners.push(valfn);
      });
    }
  };
}

cfg.config(Config).directive('sfValidators', directive);
