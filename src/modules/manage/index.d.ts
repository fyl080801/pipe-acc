import { extend } from '../acc/index';

declare namespace manage {
  type JExcelEditorFunction = (
    ...args: any[]
  ) => (...args: any[]) => jexcel.IEditor;

  interface IJExcelEditorProvider extends ng.IServiceProvider {
    register(
      name: string | object,
      factory: Function | ng.Injectable<JExcelEditorFunction>
    );
  }

  interface IJExcelEditorFactory {
    (...args: any[]): JExcelEditorFunction;
  }
}

export as namespace manage;
export = manage;
