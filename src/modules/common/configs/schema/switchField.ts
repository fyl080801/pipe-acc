import boot = require('modules/common/configs');
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

    var switchField = (name, schema, options) => {
      if (schema.type === 'boolean' && schema.format == 'html') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = ExtendFormFields.switch;
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.boolean.push(switchField);

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      ExtendFormFields.switch,
      base + 'switchField.html'
    );

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.switch,
      base + 'switchField.html'
    );
  }
}

boot.config(Config);
