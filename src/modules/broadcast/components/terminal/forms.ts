import {
  EntityTypes,
  传输覆盖适配器,
  应急广播平台,
  接收终端
} from 'modules/broadcast/configs/enums/device';

var deviceTypeMap = {};

//
deviceTypeMap[EntityTypes.传输覆盖适配器] = [];
for (var i in 传输覆盖适配器) {
  deviceTypeMap[EntityTypes.传输覆盖适配器].push({
    value: 传输覆盖适配器[i],
    name: i
  });
}

deviceTypeMap[EntityTypes.应急广播平台] = [];
for (var i in 应急广播平台) {
  deviceTypeMap[EntityTypes.应急广播平台].push({
    value: 应急广播平台[i],
    name: i
  });
}

deviceTypeMap[EntityTypes.接收终端] = [];
for (var i in 接收终端) {
  deviceTypeMap[EntityTypes.接收终端].push({
    value: 接收终端[i],
    name: i
  });
}

export var areaForm = (
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
        code: {
          title: '代码',
          type: 'string',
          required: true
        },
        pos: {
          title: '经纬度',
          type: 'string'
        }
      }
    }),
    form: [
      {
        type: 'section',
        htmlClass: 'row',
        items: [
          { type: 'section', htmlClass: 'col-md-6', items: ['name'] },
          { type: 'section', htmlClass: 'col-md-6', items: ['code'] }
        ]
      },
      {
        type: 'section',
        htmlClass: 'row',
        items: [{ type: 'section', htmlClass: 'col-md-6', items: ['pos'] }]
      }
    ]
  };
};

export var terminalForm = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory,
  model?: any
) => {
  var entityTypes = [];

  for (var i in EntityTypes) {
    entityTypes.push({
      value: EntityTypes[i],
      name: i
    });
  }

  var formMetaFunc = function() {
    var _this = this;
    this.deviceTypes = [];

    if (model) {
      this.deviceTypes = deviceTypeMap[model.entityType];
    }

    this.meta = {
      formParams: schemaFormParams({
        properties: {
          name: {
            title: '名称',
            type: 'string',
            required: true
          },
          code: {
            title: '代码',
            type: 'string',
            required: true
          },
          entityType: {
            title: '实体类型',
            type: 'string',
            required: true
          },
          deviceType: {
            title: '类型',
            type: 'string',
            required: true
          },
          address: {
            title: 'IP',
            type: 'string'
          },
          pos: {
            title: '经纬度',
            type: 'string'
          }
        }
      }),
      form: [
        {
          type: 'section',
          htmlClass: 'row',
          items: [
            { type: 'section', htmlClass: 'col-md-6', items: ['name'] },
            { type: 'section', htmlClass: 'col-md-6', items: ['code'] }
          ]
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
                  key: 'entityType',
                  type: 'select',
                  titleMap: entityTypes,
                  onChange: (modelValue, form) => {
                    _this.deviceTypes.splice(0, _this.deviceTypes.length);
                    for (var i = 0; i < deviceTypeMap[modelValue].length; i++) {
                      _this.deviceTypes.push(deviceTypeMap[modelValue][i]);
                    }
                  }
                }
              ]
            },
            {
              type: 'section',
              htmlClass: 'col-md-6',
              items: [
                {
                  key: 'deviceType',
                  type: 'select',
                  titleMap: _this.deviceTypes
                }
              ]
            }
          ]
        },
        {
          type: 'section',
          htmlClass: 'row',
          items: [
            { type: 'section', htmlClass: 'col-md-6', items: ['address'] },
            { type: 'section', htmlClass: 'col-md-6', items: ['pos'] }
          ]
        }
      ]
    };
  };

  return new formMetaFunc().meta;
  // "_id" : ObjectId("5b9dc1af7ab6223e789b3a35"),
  //   "id" : NumberInt(1),
  //   "name" : "调频广播",
  //   "deviceType" : "调频广播",
  //   "pos" : "",
  //   "code" : "adfadfad",
  //   "entityType" : "00",
  //   "typeCode" : "00",
  //   "extendCode" : "00",
  //   "address" : "192.178.1.1",
  //   "valid" : true,
  //   "status" : NumberInt(0),
  //   "parentId" : NumberInt(1)
};
