import {
  EntityTypes,
  传输覆盖适配器
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
        }
      }
    }),
    form: ['name', 'code']
  };
};

export var terminalForm = (
  schemaFormParams: common.factories.ISchemaFormParamsFactory,
  model: any
) => {
  var entityTypes = [];

  for (var i in EntityTypes) {
    entityTypes.push({
      value: EntityTypes[i],
      name: i
    });
  }

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
        entityType: {
          title: '实体类型',
          type: 'string',
          required: true
        },
        deviceType: {
          title: '类型',
          type: 'number',
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
                titleMap: entityTypes
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
                titleMap: (() => {
                  return deviceTypeMap[model.entityType];
                })()
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
