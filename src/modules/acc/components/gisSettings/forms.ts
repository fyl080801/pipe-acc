import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';

// 中心
export var mapview = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory
) => {
  return {
    formParams: schemaFormParams({
      properties: {
        lng: {
          title: '中心经度',
          type: 'number'
        },
        lat: {
          title: '中心纬度',
          type: 'number'
        },
        zoom: {
          title: '缩放等级',
          type: 'number'
        }
      }
    }),
    form: ['lng', 'lat', 'zoom']
  };
};

// 图层
export var infoform = (
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
          title: '说明',
          type: 'string'
        }
      }
    }),
    form: [
      'name',
      {
        key: 'description',
        type: DefaultFormTypes.textarea
      }
    ]
  };
};
