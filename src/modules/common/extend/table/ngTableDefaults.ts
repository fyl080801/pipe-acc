import boot = require('modules/common/configs');

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

boot.value('modules/common/extend/table/ngTableDefaults', ngTableDefaults);
