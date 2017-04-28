let chalk = require('chalk')
let format = require('util').format

/**
 * Prefix.
 */

let prefix = '   balm-cli'
let sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function () {
  let msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function (message) {
  if (message instanceof Error) message = message.message.trim()
  let msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function () {
  let msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}
