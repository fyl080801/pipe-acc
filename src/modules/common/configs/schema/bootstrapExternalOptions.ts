import boot = require('modules/common/configs');
import angular = require('angular');

boot.config([
  'schemaFormProvider',
  'schemaFormDecoratorsProvider',
  'sfPathProvider',
  function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
    var i, externalOptions;

    externalOptions = function(name, schema, options) {
      var schema = schema || {};
      var stringType = schema.type === 'string' ? 'string' : schema.type;

      if (angular.isArray(stringType)) {
        stringType = !!schema.type.indexOf('string');
      }

      if (stringType && schema.links && typeof schema.links === 'object') {
        for (i = 0; i < schema.links.length; i++) {
          if (schema.links[i].rel === 'options') {
            var related = /({)([^}]*)(})/gm;
            var source = /{{([^}]*)}}/gm;
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'select-external';
            f.optionSource = schema.links[i].href.replace(
              related,
              '$1$1 model.$2 | _externalOptionUri $3$3'
            );
            f.options = [];
            f.schema = schema;
            f.parameters = [];

            var matched = f.optionSource.match(source);

            while ((matched = source.exec(f.optionSource)) !== null) {
              f.parameters.push(matched);
            }
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
          }
        }
      }
    };

    schemaFormProvider.defaults.string.unshift(externalOptions);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'select-external',
      'modules/common/configs/schema/externalOptions.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'select-external',
      'modules/common/configs/schema/externalOptions.html'
    );
  }
]);
