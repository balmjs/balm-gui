const {exec} = require('child_process');
const fs = require('fs');
const {commands, commandsMessage} = require('./commands');

const {dialog} = require('electron');

exports.execHandle = function (command, sender) {
  let ls = exec(command.cmd, command.options);

  try {

    sender.send('startExec', command);

    ls.stdout.on('data', (data)=>{
      sender.send('execOnData', data);
    });

    ls.stderr.on('data', (data)=>{
      sender.send('execOnError', data);
    });

    ls.on('close', ()=>{
      sender.send('execOnClose', command);
    });

    ls.stderr.on('end', (data)=>{
      sender.send('execOnEnd', data);
    });

  } catch (e) {
    sender.send('error', e);
  }

};

exports.parseCommand = function(command, options) {

  let l = commands.length;

  while (l--){

    let name = commands[l];

    let cmd, startMessage, endMessage, bin = name;

    if(name.indexOf('yarn') === 0 ){
      bin = 'yarn';

      if(name === 'yarn') {
        name = 'yarn install'
      }

    }

    if(command.indexOf(name) === 0){
      cmd = command.replace(bin, thirdModulePath[name]);
      startMessage = commandsMessage[name][0];
      endMessage = commandsMessage[name][1];

      command = {
        cmd,
        startMessage,
        endMessage,
        options,
      };

      break;
    }
  }


  return command;
};

exports.dbGet = function(dbName){
  return new Promise(function(resolve, reject) {
    fs.readFile(`${dbPath}/${dbName}.json`, 'utf8', function (err, data) {
      if(err){
        reject(err.toString());
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

exports.dbSet = function(dbName, data){
  return new Promise(function(resolve, reject) {
    let dataContent = JSON.stringify(data, null, 2);
    fs.writeFile(`${dbPath}/${dbName}.json`, dataContent, 'utf8', function (err) {
      if(err){
        reject(err.toString());
      } else {
        resolve();
      }
    });
  });
};
