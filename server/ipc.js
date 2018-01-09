const {execHandle, parseCommand, dbGet, dbSet} = require('./util');

const {installTpl, installDepend} = require('./installer');

module.exports = function (main, win) {

  main.on('exec', function (event, command, options) {
    execHandle(parseCommand(command, options || {}), event.sender);
  });

  main.on('installTpl', function (event, opts) {
    installTpl(opts, event.sender)
  });

  main.on('installDepend', function (event, opts) {
    installDepend(opts, event.sender)
  });

  ['programs', 'settings'].forEach((name)=>{

    let dbName = name.substr(0, 1).toUpperCase() + name.substr(1);

    main.on(`get${dbName}`, function (event) {
      dbGet(name).then(function (data) {
        event.sender.send(`get${dbName}Done`, data);
      }).catch(function (err) {
        event.sender.send(`get${dbName}Error`, err);
      });
    });

    main.on(`set${dbName}`, function (event, data) {
      dbSet(name, data).then(function () {
        event.sender.send(`set${dbName}Success`);
      }).catch(function (err) {
        event.sender.send(`set${dbName}Error`, err);
      });
    });
  });

};
