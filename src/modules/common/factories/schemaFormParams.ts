import mod = require('modules/common/module');
import angular = require('angular');

class SchemaFormParams implements common.services.ISchemaFormParams {
  private _options;
  private _schema;

  private _required(propertyName, isRequired?: boolean) {
    var currentSchema = this.schema();
    var requiredIndex = currentSchema.required.indexOf(propertyName);

    if (!angular.isDefined(isRequired)) {
      return requiredIndex >= 0;
    }

    if (isRequired && requiredIndex < 0) {
      currentSchema.required.push(propertyName);
    } else if (requiredIndex >= 0) {
      currentSchema.required.splice(requiredIndex, 1);
    }
    return this;
  }

  constructor(schemaFormDefaults, schema, options?) {
    this._schema = {
      type: 'object',
      properties: {},
      required: []
    };
    this._options = {};

    angular.extend(this._schema, schemaFormDefaults.schema);

    this.options(schemaFormDefaults.options);
    this.options(options);
    this.schema(schema);
  }

  options(optionsDefine?: any) {
    if (!angular.isDefined(optionsDefine)) {
      return this._options;
    }

    angular.extend(this._options, optionsDefine);
    return this;
  }

  schema(schemaDefine?: any) {
    if (!angular.isDefined(schemaDefine)) {
      return this._schema;
    }

    this._schema.type = schemaDefine.type || 'object';
    this._schema.properties = schemaDefine.properties || {};
    this._schema.required = schemaDefine.required || [];
    return this;
  }

  properties(propertiesDefine?: any) {
    var currentSchema = this.schema();

    if (!angular.isDefined(propertiesDefine)) {
      return currentSchema.properties;
    }

    currentSchema.properties = propertiesDefine;
    angular.forEach(currentSchema.properties, (item, key) => {
      this._required(key, item.required);
    });
    return this;
  }

  property(propertyName: string, propertyDefine?: any) {
    var currentSchema = this.schema();

    if (!angular.isDefined(propertyDefine)) {
      return currentSchema.properties[propertyName];
    }

    currentSchema.properties[propertyName] = propertyDefine;
    this._required(propertyName, propertyDefine.required);
    return this;
  }
}

function factory(
  schemaFormDefaults
): common.factories.ISchemaFormParamsFactory {
  return (schema, options?) => {
    return new SchemaFormParams(schemaFormDefaults, schema, options);
  };
}

factory.$inject = ['modules/common/configs/schemaFormDefaults'];

mod.factory('modules/common/factories/schemaFormParams', factory);
