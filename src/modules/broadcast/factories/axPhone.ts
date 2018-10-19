import mod = require('modules/broadcast/module');
import angular = require('angular');

factory.$inject = ['$playerOptions', 'modules/common/services/requestService'];

function factory(
  $playerOptions: broadcast.PlayerOptions,
  requestService: common.services.IRequestService
) {
  return new AxPhone($playerOptions, requestService);
}

class AxPhone implements broadcast.IAxPhone {
  private _instance: any;

  constructor(
    private options: broadcast.PlayerOptions,
    private requestService: common.services.IRequestService
  ) {
    this._instance = window['AxPhone'] || {
      Play: angular.noop,
      Stop: angular.noop
    };

    this.options = this.options || { port: 0, server: '' };
  }

  Play(ids: number[]) {
    this._instance.Play(this.options.server, this.options.port);
    this.requestService
      .url('/device/enmergencyBroad?deviceIds=' + ids.join(','))
      .get();
  }
  Stop(ids: number[]) {
    this._instance.Stop();
    this.requestService
      .url('/device/stopBroadCast?deviceIds=' + ids.join(','))
      .get();
  }
}

mod.factory('axPhone', factory);
