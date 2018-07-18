import mod = require('modules/acc/module');
import angular = require('angular');

function factory($timeout) {
  var delayFn = baseOptions => {
    var self = this;
    var timer = 0;
    var options = {
      callback: angular.noop,
      canceling: angular.noop,
      timeout: 1024
    };

    this.options = opts => {
      if (opts) {
        options = $.extend(options, opts);
        return self;
      }
      return options;
    };

    this.invoke = () => {
      self.cancel();
      timer = $timeout(() => {
        options.callback();
      }, options.timeout);
    };

    this.cancel = () => {
      (options.canceling || angular.noop)();
      $timeout.cancel(timer);
    };

    this.options(baseOptions);

    return this;
  };

  return delayFn;
}

factory.$inject = ['$timeout'];

mod.factory('modules/acc/factories/delayTimer', factory);
