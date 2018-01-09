const {app} = require('electron');

module.exports = function () {

  let platform = process.platform;
  switch (platform){
    case 'darwin':
      process.env.PATH = '/usr/local/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin';
      break;
  }

  const arg = process.argv[2];

  global.isDev = arg === '--debug';

  global.appPath = app.getAppPath();

  global.dbPath = `${appPath}/db`;

  global.thirdModulePath = {
    yarn: `${appPath}/node_modules/.bin/yarn`,
    'balm init': `${appPath}/balm-cli/bin/balm-init`,
    'balm list': `${appPath}/balm-cli/bin/balm-list`
  };

};
