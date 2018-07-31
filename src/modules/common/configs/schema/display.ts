import boot = require('modules/common/configs');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

var base = 'modules/common/configs/schema/';

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
    // var field = (name, schema, options) => {
    //   if (
    //     (schema.type === 'string' || schema.type === 'number') &&
    //     schema.format == 'html'
    //   ) {
    //     var f = schemaFormProvider.stdFormObj(name, schema, options);
    //     f.key = options.path;
    //     f.type = ExtendFormFields.display;
    //     options.lookup[sfPathProvider.stringify(options.path)] = f;
    //     return f;
    //   }
    // };

    // schemaFormProvider.defaults.string.unshift(field);
    // schemaFormProvider.defaults.number.unshift(field);

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.display,
      base + 'display.html'
    );

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      ExtendFormFields.display,
      base + 'display.html',
      sfBuilderProvider.stdBuilders
    );
  }
}

boot.config(Config);
