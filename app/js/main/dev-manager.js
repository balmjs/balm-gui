const exec = require('child_process').exec;

let lsArr = [];

exports.startDev = function ({path, id}, sender) {

  let item = lsArr.find((item)=> item.id === id);
  let ls = exec(`${thirdModulePath['yarn']} run dev`, {
    cwd: path
  });

  if(item){
    item.ls.kill(item.ls.pid);
    item.ls = ls;
  } else {
    lsArr.push({
      id,
      ls
    });
  }

  sender.send('startDev', {path, id});

  ls.stdout.on('data', (data)=>{
    sender.send('devOutput', data);
  });

  ls.stderr.on('data', (data)=>{
    sender.send('devError', data);
  });

  ls.on('close', ()=>{
    sender.send('devClosed', {path, id});
  });
};

exports.stopDev = function ({path, id}, sender) {

  let index = lsArr.findIndex((item)=> item.id = id), item = lsArr[index];

  if(item){
    item.ls.kill(item.ls.pid);
    lsArr.splice(index, 1);
  }

  sender.send('devStopped', {path, id});
};

exports.startProd = function ({path, id}, sender) {
  let item = lsArr.find((item)=> item.id === id);
  let ls = exec(`${thirdModulePath['yarn']} run prod`, {
    cwd: path
  });

  if(item){
    item.ls.kill(item.ls.pid);
    item.ls = ls;
  } else {
    lsArr.push({
      id,
      ls
    });
  }

  sender.send('startProd', {path, id});

  ls.stdout.on('data', (data)=>{
    sender.send('prodOutput', data);
  });

  ls.stderr.on('data', (data)=>{
    sender.send('prodError', data);
  });

  ls.on('close', ()=>{
    sender.send('prodCompleted', {path, id});
  });
};
