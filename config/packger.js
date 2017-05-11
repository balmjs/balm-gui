// [electron-packager Programmatic API]:
// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md

module.exports = {
  dir:'./dist',
  out: './build',
  // asar: true,
  icon: './balm',
  //arch: 'x64',
  packageManager: 'yarn',
  platform: 'all',
  overwrite: true
};
