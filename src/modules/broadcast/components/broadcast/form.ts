export var dailyForm = (schemaFormParams: common.factories.ISchemaFormParamsFactory) => {
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
          type: 'string',
          format: 'laydate',
          required: true
        },
        programEnd: {
          title: '结束时间',
          type: 'string',
          format: 'laydate'
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
          //format: 'switch'
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
          {
            type: 'section',
            htmlClass: 'col-md-6',
            items: [
              {
                key: 'programStart',
                layOptions: {
                  type: 'datetime',
                  format: 'yyyy-MM-dd HH:mm'
                }
                // validationMessage: {
                //   max: '不能超过最大值'
                // },
                // validators: {
                //   max: (val, model) => {
                //     return Date.parse(val) <= Date.parse(model.programEnd);
                //   }
                // }
              }
            ]
          },
          {
            type: 'section',
            htmlClass: 'col-md-6',
            items: [
              {
                key: 'programEnd',
                layOptions: {
                  type: 'datetime',
                  format: 'yyyy-MM-dd HH:mm'
                }
                // validationMessage: {
                //   min: '必须高于最小值'
                // },
                // validators: {
                //   min: (val, model) => {
                //     return Date.parse(val) >= Date.parse(model.programStart);
                //   }
                // }
              }
            ]
          }
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
      {
        type: 'section',
        htmlClass: 'row',
        items: [{ type: 'section', htmlClass: 'col-md-6', items: ['status'] }]
      }
    ]
  };
};
