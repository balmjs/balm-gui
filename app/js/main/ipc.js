const {execHandle, parseCommand, dbGet, dbSet} = require('./util');

module.exports = function (main, win) {

  main.on('toggleDevTools', function () {
    win.webContents.toggleDevTools();
  });

  main.on('exec', function (event, command) {
    execHandle(parseCommand(command), event.sender);
  });

  main.on('getPrograms', function () {
    dbGet('programs').then(function (data) {
      main.send('getProgramsDone', data);
    }).catch(function (err) {
      main.send('getProgramsError', err);
    });
  });

  main.on('setPrograms', function (event, data) {
    dbSet('programs', data).then(function () {
      main.send('setProgramsSuccess');
    }).catch(function (err) {
      main.send('setProgramsError', err);
    });
  });
};
