import { extend } from '../acc/index';

declare namespace manage {
  type JExcelEditorFunction = (...args: any[]) => jexcel.IEditor;

  interface IJExcelEditorProvider extends ng.IServiceProvider {
    register(
      name: string | object,
      factory: Function | ng.Injectable<JExcelEditorFunction>
    );
  }
}

export as namespace manage;
export = manage;
