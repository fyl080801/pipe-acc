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

var geoJson = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory
) => {};

export var LayerForms = {
  xyz: xyz,
  group: group,
  geoJson: geoJson
};
