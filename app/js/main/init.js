const {app} = require('electron');

module.exports = function () {

  const arg = process.argv[2];

  global.isDev = arg === '--debug';

  global.appPath = app.getAppPath();

  global.dbPath = `${appPath}/db`;

  global.thirdModulePath = {
    yarn: `${appPath}/yarn/bin/yarn`,
    'balm init': `${appPath}/balm-cli/bin/balm-init`,
    'balm list': `${appPath}/balm-cli/bin/balm-list`
  };

};
