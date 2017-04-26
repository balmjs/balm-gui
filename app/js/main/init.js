module.exports = function () {

  global.appPath = require('path').join(__dirname, '../../..');

  global.dbPath = `${appPath}/app/db`;

  global.thirdModulePath = {
    yarn: `${appPath}/yarn/bin/yarn`
  };

};
