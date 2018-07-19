import cfg = require('modules/manage/configs');
import angular = require('angular');
import { EditorBase } from 'modules/manage/configs/jexcel/editorBase';

class ModalEditor extends EditorBase {
  onEdit(cell: JQLite, value: any): angular.IPromise<any> {
    return this.$modal.open(
      angular.extend(
        {
          scope: angular.extend(this.$rootScope.$new(), { $value: value })
        },
        this.options
      )
    ).result;
  }
  constructor(
    private $modal: ng.ui.bootstrap.IModalService,
    private $rootScope: ng.IRootScopeService,
    private options: ng.ui.bootstrap.IModalSettings
  ) {
    super();
  }
}

class Config {
  static $inject = ['$jexcelEditorProvider'];
  constructor($jexcelEditorProvider: manage.IJExcelEditorProvider) {
    $jexcelEditorProvider.register('modalEditor', [
      '$modal',
      '$rootScope',
      (
        $modal: ng.ui.bootstrap.IModalService,
        $rootScope: ng.IRootScopeService
      ) => {
        return (options: ng.ui.bootstrap.IModalSettings) => {
          return new ModalEditor($modal, $rootScope, options);
        };
      }
    ]);
  }
}

cfg.config(Config);
