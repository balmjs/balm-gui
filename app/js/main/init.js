module.exports = function () {

  global.appPath = require('path').join(__dirname, '../../..');

  global.dbPath = `${appPath}/db`;

  global.thirdModulePath = {
    yarn: `${appPath}/yarn/bin/yarn`
  };

};
