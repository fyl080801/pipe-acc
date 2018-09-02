var xyz = (schemaFormParams: common.factories.ISchemaFormParamsFactory) => {
  return {
    formParams: schemaFormParams({
      properties: {
        name: {
          title: '名称',
          type: 'string',
          required: true
        },
        url: {
          title: '地址',
          type: 'string',
          required: true
        }
      }
    }),
    form: ['name', 'url']
  };
};
// http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}

var group = (schemaFormParams: common.factories.ISchemaFormParamsFactory) => {
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

var ajaxGeoJson = (
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
        url: {
          title: '地址',
          type: 'string',
          required: true
        }
      }
    }),
    form: ['name', 'url']
  };
};

export var LayerForms = {
  xyz: xyz,
  group: group,
  ajaxGeoJSON: ajaxGeoJson
};
