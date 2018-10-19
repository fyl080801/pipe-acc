import cfg = require('modules/broadcast/configs');
import angular = require('angular');

function getJson(meta: string) {
  try {
    return new Function('return ' + meta + ';')();
  } catch (e) {
    (console.log || angular.noop)(e);
    return {};
  }
}

cfg.constant<broadcast.PlayerOptions>('$playerOptions', getJson(
  $('#app').attr('player-options')
) as broadcast.PlayerOptions);
