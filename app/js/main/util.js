const {exec} = require('child_process');
const fs = require('fs');

const utils = {
  execHandle (command, sender) {
    let ls = exec(command);

    try {

      sender.send('startExec', command);

      ls.stdout.on('data', (data)=>{
        sender.send('execOnData', data);
      });

      ls.stderr.on('data', (data)=>{
        sender.send('execOnError', data);
      });

      ls.stderr.on('close', (data)=>{
        sender.send('execOnClose', data);
      });

      ls.stderr.on('end', (data)=>{
        sender.send('execOnEnd', data);
      });

    } catch (e) {
      sender.send('error', e);
    }

  },
  parseCommand(command) {

    [
      'yarn'
    ].forEach((name)=>{
      command.indexOf(name) === 0 && (command = command.replace(name, thirdModulePath[name]));
    });

    return command;
  },
  dbGet(dbName){
    return new Promise(function(resolve, reject) {
      fs.readFile(`${dbPath}/${dbName}.json`, 'utf8', function (err, data) {
        if(err){
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },
  dbSet(dbName, data){
    return new Promise(function(resolve, reject) {
      let dataContent = JSON.stringify(data, null, 2);
      fs.writeFile(`${dbPath}/${dbName}.json`, dataContent, 'utf8', function (err) {
        if(err){
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};

module.exports = utils;
