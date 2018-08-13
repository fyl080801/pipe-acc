import { DefaultFormTypes } from '../../../common/configs/enums/defaultFormTypes';

export var categoryForm = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory
) => {
  return {
    formParams: schemaFormParams({
      properties: {
        name: {
          title: '名称',
          type: 'string',
          required: true
        }
      }
    }),
    form: ['name']
  };
};

export var equipmentTypeForm = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory
) => {
  return {
    formParams: schemaFormParams({
      properties: {
        name: {
          title: '名称',
          type: 'string',
          required: true
        },
        description: {
          title: '描述',
          type: 'string'
        }
      }
    }),
    form: [
      {
        type: DefaultFormTypes.section,
        htmlClass: 'row',
        items: [
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-6',
            items: ['name']
          }
        ]
      },
      'description'
    ]
  };
};
