import cfg = require('modules/common/configs');

class Config {
  static $inject = ['$provide'];
  constructor($provide) {
    $provide.decorator('$location', [
      '$delegate',
      function($delegate) {
        $delegate.search = urlString => {
          var pairs = (urlString || window.location.search)
            .substring(1)
            .split(/[&?]/);
          var res = {},
            i,
            pair;
          for (i = 0; i < pairs.length; i++) {
            pair = pairs[i].split('=');
            if (pair[1])
              res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
          return res;
        };
        return $delegate;
      }
    ]);
  }
}

cfg.config(Config);
