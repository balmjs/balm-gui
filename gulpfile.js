const balm = require('balm');
const packager = require('electron-packager');
const packagerConfig = require('./packager.config');
const { exec } = require('child_process');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Documentation - http://balmjs.com/docs/v2/config/
// 中文文档 - https://balmjs.com/docs/v2/zh/config/
balm.config = {
  server: {
    localOnly: true
  },
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'renderer'
    }
  },
  styles: {
    extname: 'scss'
  },
  scripts: {
    entry: {
      main: './app/main/index.js',
      renderer: './app/renderer/index.js'
    },
    target: 'electron-renderer',
    webpackOptions: {
      node: {
        __dirname: false
      }
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
    plugins: [new VueLoaderPlugin()],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'app/renderer'),
      '@app': path.resolve(__dirname, 'app'),
      '@node_modules': path.resolve(__dirname, 'node_modules'),
      '@root': path.resolve(__dirname)
    }
  }
  // More Config
};

async function bundleElectronApp(options) {
  const appPaths = await packager(options);
  console.log(`Electron app bundles created: ${appPaths.join('\n')}`);
}

balm.afterTask = () => {
  if (balm.config.env.isProd) {
    bundleElectronApp(packagerConfig);
  } else {
    exec('npm start');
    exec('npx vue-devtools');
  }
};

balm.go();
