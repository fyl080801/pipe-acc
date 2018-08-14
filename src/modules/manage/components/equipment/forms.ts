import { DefaultFormTypes } from '../../../common/configs/enums/defaultFormTypes';
import { ExtendFormFields } from '../../../common/configs/enums/extendFormFields';

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

/**
 * 设备编辑表单
 * @param schemaFormParams
 * @param $modal
 * @param categorySelector
 * @param cabinSelector
 */
export var equipmentForm = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory,
  $modal,
  categorySelector,
  cabinSelector
) => {
  return {
    formParams: schemaFormParams({
      properties: {
        code: {
          title: '设备编号',
          type: 'string'
        },
        name: {
          title: '设备名称',
          type: 'string'
        },
        typeId: {
          title: '类型',
          type: 'number'
        },
        // type: {
        //   type: 'object',
        //   properties: {
        //     name: {
        //       type: 'string'
        //     }
        //   }
        // },
        typeName: {
          title: '类型名',
          type: 'string'
        },
        cabinId: {
          title: '所在舱室',
          type: 'number'
        },
        cabinName: {
          title: '所在舱室名',
          type: 'string'
        },
        remark: {
          title: '备注',
          type: 'string'
        }
      },
      required: ['code', 'name', 'categoryCode']
    }),
    form: [
      'code',
      'name',
      {
        type: 'section',
        htmlClass: 'row',
        items: [
          {
            type: 'section',
            htmlClass: 'col-md-6',
            items: [
              {
                key: 'typeId',
                displayKey: 'typeName',
                type: ExtendFormFields.actionField,
                action: (form, model) => {
                  return $modal.open(categorySelector).result;
                },
                callback: (result, model) => {
                  model.typeId = result.id;
                  model.typeName = result.name;
                }
              }
            ]
          },
          {
            type: 'section',
            htmlClass: 'col-md-6',
            items: [
              {
                key: 'cabinId',
                displayKey: 'cabinName',
                type: ExtendFormFields.actionField,
                action: (form, model) => {
                  $modal.open(cabinSelector).result.then(data => {
                    model.cabinId = data.id;
                    model.cabinName = data.name;
                  });
                }
              }
            ]
          }
        ]
      },
      {
        key: 'remark',
        type: DefaultFormTypes.textarea
      }
    ]
  };
};
