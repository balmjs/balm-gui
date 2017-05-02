const exec = require('child_process').exec;

exports.installTpl = function ({path, tpl, id}, sender) {
  let ls = exec(`${thirdModulePath['balm init']} ${tpl} ${path}`);

  sender.send('startInstallTpl', {path, tpl, id});

  ls.stdout.on('data', (data)=>{
    sender.send('tplInstallIng', data);
  });

  ls.stderr.on('data', (data)=>{
    sender.send('tplInstallError', data);
  });

  ls.on('close', ()=>{
    sender.send('tplInstallCompleted', {path, tpl, id});
  });
};

exports.installDepend = function ({path, id}, sender) {
  let ls = exec(`${thirdModulePath['yarn']}`, {
    cwd: path
  });

  sender.send('startInstallDepend', {path, id});

  ls.stdout.on('data', (data)=>{
    sender.send('dependInstallIng', data);
  });

  ls.stderr.on('data', (data)=>{
    sender.send('dependInstallError', data);
  });

  ls.on('close', ()=>{
    sender.send('dependInstallCompleted', {path, id});
  });
};
