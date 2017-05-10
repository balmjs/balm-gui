module.exports = {
  server: {
    open: false,
    localOnly: true,
    port: 4567
  },
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'css',
      js: 'js',
      img: 'images',
      font: 'fonts'
    }
  },
  styles: {
    ext: 'scss'
  },
  html: {
    replacement: {
      begin: './'
    }
  },
  scripts: {
    entry: {
      'renderer': './app/js/index'
    },
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /balm-ui.src.*?js$/,
      loader: 'babel'
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    }],
    target: 'electron-renderer',
    extends: {
      node: {
        __dirname: false
      }
    }
  }
};
