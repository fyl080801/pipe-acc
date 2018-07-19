import cfg = require('modules/manage/configs');
import angular = require('angular');

class Provider implements manage.IJExcelEditorProvider {
  static $inject = ['$provide'];
  static suffix = 'JExcelEditor';
  constructor(private $provide) {}

  register(name: string | object, factory: Function) {
    if (angular.isObject(name)) {
      var editors = {};
      angular.forEach(name, (editor, key) => {
        editors[key] = this.register(key, editor);
      });
      return editors;
    } else {
      return this.$provide.factory(name + Provider.suffix, factory);
    }
  }

  $get = [
    '$injector',
    $injector => {
      return name => {
        return $injector.get(name + Provider.suffix);
      };
    }
  ];
}

cfg.provider('$jexcelEditor', Provider);
