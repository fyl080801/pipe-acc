export var layerBuilderForms = {
  //   group: {},
  //   tileLayer: layer => {
  //     return new TileLayer(layer);
  //   },
  //   markers: layer => {
  //     return new MarkerLayer(layer);
  //   },
  //   geoJson: layer => {
  //     return new GeoJsonLayer(layer);
  //   }
};

layerBuilderForms['tileLayer'] = (
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
        source: {
          title: '源',
          type: 'string',
          required: true
        }
      }
    }),
    form: ['name', 'source']
  };
};
