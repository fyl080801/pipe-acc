import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var base = 'modules/common/configs/schema/';

class PanelConfig {
  static $inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider'];
  constructor(
    schemaFormDecoratorsProvider: common.schema.ISchemaFormDecoratorsProvider,
    sfBuilderProvider: common.schema.ISfBuilderProvider
  ) {
    var defaults = [
      sfBuilderProvider.builders.sfField,
      sfBuilderProvider.builders.ngModelOptions,
      sfBuilderProvider.builders.condition,
      sfBuilderProvider.builders.transclusion
    ];

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.panel,
      base + 'panel.html',
      defaults
    );

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.container,
      base + 'container.html',
      defaults
    );
  }
}

class Run {
  static $inject = ['$templateCache'];
  constructor($templateCache: ng.ITemplateCacheService) {
    $templateCache.put(
      base + 'panel.html',
      '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div ng-if="!form.notitle" class="panel-heading"> <i ng-if="form.titleIcon && form.titleIcon.length>0" class="{{form.titleIcon}}"></i> <span ng-bind="form.title"></span></div><div sf-field-transclude="items"></div></div>'
    );

    $templateCache.put(
      base + 'container.html',
      '<div class="panel-body {{form.htmlClass}}" sf-field-transclude="items"></div>'
    );
  }
}

boot.config(PanelConfig).run(Run);
