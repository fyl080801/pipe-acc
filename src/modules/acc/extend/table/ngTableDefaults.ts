import boot = require('modules/acc/configs');

// var settings = JSON.parse(
//   document.getElementById('seed-ui').getAttribute('data-site')
// );

var ngTableDefaults = {
  options: {},
  schema: {},
  params: {
    count: 10 //settings.pageSize
  },
  settings: {
    counts: [10, 25, 50] //settings.pageCounts.split(/[,?]/)
  }
};

boot.value('modules/acc/extend/table/ngTableDefaults', ngTableDefaults);
