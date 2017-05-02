const {execHandle, parseCommand, dbGet, dbSet} = require('./util');

const {installTpl, installDepend} = require('./installer');

const {startDev, stopDev, startProd} = require('./dev-manager');

module.exports = function (main, win) {

  main.on('exec', function (event, command, options) {
    execHandle(parseCommand(command, options || {}), event.sender);
  });

  main.on('installTpl', function (event, opts) {
    installTpl(opts, event.sender);
  });

  main.on('installDepend', function (event, opts) {
    installDepend(opts, event.sender);
  });

  main.on('runDev', function (event, opts) {
    startDev(opts, event.sender);
  });

  main.on('stopDev', function (event, opts) {
    stopDev(opts, event.sender);
  });

  main.on('buildProgram', function (event, opts) {
    startProd(opts, event.sender);
  });

  main.on('getPrograms', function (event) {
    dbGet('programs').then(function (data) {
      event.sender.send('getProgramsDone', data);
    }).catch(function (err) {
      event.sender.send('getProgramsError', err);
    });
  });

  main.on('setPrograms', function (event, data) {
    dbSet('programs', data).then(function () {
      event.sender.send('setProgramsSuccess');
    }).catch(function (err) {
      event.sender.send('setProgramsError', err);
    });
  });
};
