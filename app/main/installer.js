const path = require('path');
const fs = require('fs');
const got = require('got');
const Zip = require('adm-zip');
const home = require('user-home');
const {exec} = require('child_process');

const {createWriteStream, mkdirSync, existsSync} = fs;

const generate = function  (opts, ipc) {
  let template = opts.tpl, targetPath = opts.path;
  let tmp = path.join(home, '.balm-templates');

  if(!existsSync(tmp)){
    mkdirSync(tmp, { IS_HIDDEN: true });
  }

  let zip = new Zip(`${tmp}/template-${template}-master.zip`);


  zip.extractEntryTo(`template-${template}-master/templates/`, targetPath, false, true);
  ipc.send('tplInstallCompleted', opts);
};

const downloadAndGenerate = function  (opts, ipc) {
  let template = opts.tpl, to = opts.path;

  let tmp = path.join(home, '.balm-templates');

  let zipPath = `${tmp}/template-${template}-master.zip`;

  let zipFile = createWriteStream(zipPath);

  got.stream(`https://github.com/balmjs/template-${template}/archive/master.zip`)
    .pipe(zipFile)
    .on('finish', function () {
      ipc.send('tplDownloadFinished');
      generate(opts, ipc);
    })
    .on('error', function () {
      ipc.send('tplDownloadError', 'A failure occurred writing to the template file!');
    });
};

exports.installTpl = function(opts, ipc) {
  // check if template is local
  ipc.send('startInstallTpl');
  downloadAndGenerate(opts, ipc);
};

exports.installDepend = function (opts, ipc) {
  ipc.send('startInstallDepend');
  let ls = exec(`${thirdModulePath.yarn}`, {
    cwd: opts.path
  });
  ls.stdout.on('data', function (data) {
    ipc.send('dependInstalling', data);
  });

  ls.stderr.on('data', (data)=>{
    ipc.send('dependInstallError', data);
  });

  ls.on('close', function () {
    ipc.send('dependInstallCompleted', opts);
  });

};
