require.config({
  removeCombined: true,
  fileExclusionRegExp: /^\./,
  paths: {
    //
    'es5-shim': '../bower_components/es5-shim/es5-shim.min',
    'es5-sham': '../bower_components/es5-shim/es5-sham.min',
    html5shiv: '../bower_components/html5shiv/dist/html5shiv.min',
    json2: '../bower_components/json2/json2',
    respond: '../bower_components/respond/dest/respond.min',
    //
    rcss: '../bower_components/require-css/css',
    angular: '../bower_components/angular/angular.min',
    'angular-gridster': 'js/angular-gridster',
    'angular-tree-control': 'js/angular-tree-control',
    jquery: '../bower_components/jquery/dist/jquery.min',
    'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    'angular-ui-bootstrap':
      '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-ui-router':
      '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-cookies':
      '../bower_components/angular-cookies/angular-cookies.min',
    'angular-sanitize':
      '../bower_components/angular-sanitize/angular-sanitize.min',
    //
    'angular-tree-control':
      '../bower_components/angular-tree-control/angular-tree-control',
    signalr: '../bower_components/signalr/jquery.signalR.min',
    'angular-signalr-hub':
      '../bower_components/angular-signalr-hub/signalr-hub.min',
    'schema-form':
      '../bower_components/angular-schema-form/dist/schema-form.min',
    'schema-form-bootstrap':
      '../bower_components/angular-schema-form-bootstrap/bootstrap-decorator.min',
    tv4: '../bower_components/tv4/tv4',
    objectpath: '../bower_components/objectpath/lib/ObjectPath',
    leaflet: '../bower_components/leaflet/dist/leaflet',
    proj4: '../bower_components/proj4/dist/proj4',
    proj4leaflet: '../bower_components/Proj4Leaflet/src/proj4leaflet',
    'app/application': '../src/js/app.application'
  },
  // shim: {
  //   'angular-signalr-hub': {
  //     deps: ['angular']
  //   }
  // },
  exclude: []
});
