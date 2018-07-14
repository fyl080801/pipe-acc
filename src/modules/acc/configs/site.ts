import cfg = require('modules/acc/configs');

class Config {
  static $inject = ['$provide', '$appConfig'];
  constructor($provide, $appConfig) {
    var settings = JSON.parse(
      document.getElementById('app').getAttribute('data-site')
    );
    settings.prefix = settings.prefix ? '/' + settings.prefix : '';

    $appConfig.siteSettings = settings;
  }
}

cfg.config(Config);
