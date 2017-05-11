const packager = require('electron-packager');
const packagerConfig = require('./config/packger');
const x64 = Object.assign({arch: 'x64'}, packagerConfig);
const x32 = Object.assign({arch: 'ia32'}, packagerConfig);

packager(x64, function (err) {
  if(err){
    console.log(err);
  }
  packager(x32, function (err, appPaths) {
    if(err){
      console.log(err);
    }
    console.log('done.');
  });
});
