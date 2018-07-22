import cfg = require('modules/common/configs');

class Decorator {
  static $inject = [
    '$delegate',
    '$rootScope',
    '$modal',
    '$appEnvironment',
    'app/services/popupService'
  ];
  constructor(
    $delegate,
    $rootScope,
    $modal,
    $appEnvironment,
    popupService: app.services.IPopupService
  ) {
    $delegate.doResponse = (response, defer) => {
      if (response.config.dataOnly) {
        defer.resolve(response.data, response);
      } else if (response.data.success) {
        defer.resolve(response.data.data, response);
      } else {
        $delegate.doError(
          $.extend(response, {
            statusText: response.data.message
          }),
          defer
        );
      }
    };

    $delegate.doError = (response, defer) => {
      popupService.error(response.statusText);
      defer.reject(response);
    };

    return $delegate;
  }
}

class Config {
  static $inject = ['$provide', '$httpProvider'];
  constructor($provide, $httpProvider) {
    $provide.decorator('app/factories/httpDataHandler', Decorator);
  }
}

cfg.config(Config);
