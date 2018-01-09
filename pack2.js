const packager = require('electron-packager');
const packagerConfig = require('./config/packger');
const config = Object.assign({arch: 'x64', platform: 'win32'}, packagerConfig);

packager(config, function (err) {
  if(err){
    console.log(err);
  }
  console.log('done.');
});
