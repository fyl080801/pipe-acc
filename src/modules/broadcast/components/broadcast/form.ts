export var dailyForm = (
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
        programStart: {
          title: '开始时间',
          type: 'string'
        },
        programEnd: {
          title: '结束时间',
          type: 'string'
        },
        playDuration: {
          title: '播放周期',
          type: 'number',
          required: true
        },
        playTime: {
          title: '播放次数',
          type: 'number',
          required: true
        },
        status: {
          title: '状态',
          type: 'boolean'
        }
      }
    }),
    form: [
      {
        type: 'section',
        htmlClass: 'row',
        items: [{ type: 'section', htmlClass: 'col-md-6', items: ['name'] }]
      },
      {
        type: 'section',
        htmlClass: 'row',
        items: [
          { type: 'section', htmlClass: 'col-md-6', items: ['programStart'] },
          { type: 'section', htmlClass: 'col-md-6', items: ['programEnd'] }
        ]
      },
      {
        type: 'section',
        htmlClass: 'row',
        items: [
          { type: 'section', htmlClass: 'col-md-6', items: ['playDuration'] },
          { type: 'section', htmlClass: 'col-md-6', items: ['playTime'] }
        ]
      },
      'status'
    ]
  };
};
