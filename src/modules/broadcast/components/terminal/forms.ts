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
        deviceType: {
          title: '类型',
          type: 'string',
          required: true
        },
        entityType: {
          title: 'entityType',
          type: 'string',
          required: true
        },
        address: {
          title: 'IP',
          type: 'string'
        },
        valid: {
          title: '已验证',
          type: 'boolean'
        },
        status: {
          title: '状态',
          type: 'number'
        }
      }
    }),
    form: [
      'name',
      'code',
      'deviceType',
      'entityType',
      'address',
      'valid',
      'status'
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
