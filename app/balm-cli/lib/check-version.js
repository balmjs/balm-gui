let request = require('request')
let semver = require('semver')
let chalk = require('chalk')
let packageConfig = require('../package.json')

module.exports = function (done) {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use balm-cli'
    ))
  }

  request({
    url: 'https://registry.npmjs.org/balm-cli',
    timeout: 1000
  }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      let latestVersion = JSON.parse(body)['dist-tags'].latest
      let localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of balm-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}
