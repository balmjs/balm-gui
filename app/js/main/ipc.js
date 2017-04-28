const {execHandle, parseCommand, dbGet, dbSet} = require('./util');

module.exports = function (main, win) {

  main.on('toggleDevTools', function () {
    win.webContents.toggleDevTools();
  });

  main.on('exec', function (event, command, options) {
    execHandle(parseCommand(command, options || {}), event.sender);
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
