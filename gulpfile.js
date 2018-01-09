const balm = require('balm');
const packager = require('electron-packager');
const packagerConfig = require('./config/packger');
const config = require('./config');
const x64 = Object.assign({arch: 'x64'}, packagerConfig);
const x32 = Object.assign({arch: 'ia32'}, packagerConfig);

balm.config = config;

balm.config.scripts.alias = {
  'vue': balm.config.production ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
  'balm-ui': 'balm-ui/src/index.js'
};

balm.config.scripts.sourceMap = !balm.config.production;

balm.afterTask = function () {
  console.log('endTask');
  require('child_process').exec('npm start');
};

balm.go(function (mix) {
  if(balm.config.production){

    mix.copy('./app/package.json', './dist');
    mix.copy('./app/db/**/*', './dist/db');
    mix.copy('./app/yarn/**/*', './dist/yarn');
    mix.copy('./app/balm-cli/**/*', './dist/balm-cli');
    mix.copy('./app/main/**/*', './dist/main');
    mix.copy('./app/node_modules/**/*', './dist/node_modules');

    mix.afterTask(function () {
      packager(x64, function () {
        packager(x32, function (err, appPaths) {
          if(err){
            console.log(err);
          }
          console.log('done.');
        });
      })
    });

  } else {

  }
});
