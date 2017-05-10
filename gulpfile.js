const balm = require('balm');
const packager = require('electron-packager');
const packagerConfig = require('./config/packger');
const config = require('./config');

balm.config = config;

balm.config.scripts.alias = {
  'vue': balm.config.production ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
  'balm-ui': 'balm-ui/src/index.js'
};

balm.config.scripts.sourceMap = !balm.config.production;

balm.go(function (mix) {
  if(balm.config.production){

    mix.copy('./app/package.json', './dist');
    mix.copy('./app/db/**/*', './dist/db');
    mix.copy('./app/yarn/**/*', './dist/yarn');
    mix.copy('./app/balm-cli/**/*', './dist/balm-cli');
    mix.copy('./app/main/**/*', './dist/main');
    mix.copy('./app/node_modules/**/*', './dist/node_modules');

    mix.end(function () {
      packager(packagerConfig, function done_callback (err, appPaths) {
        console.log('done.');
      })
    });

  } else {

    mix.end(function () {
      require('child_process').exec('npm start');
    });

  }
});
