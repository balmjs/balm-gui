export const templates = [{
  key: 1,
  value: 'simple',
},{
  key: 2,
  value: 'vue',
},{
  key: 3,
  value: 'vue-expert',
},{
  key: 4,
  value: 'vue-master',
},{
  key: 5,
  value: 'ng',
},{
  key: 6,
  value: 'react',
},{
  key: 7,
  value: 'react-expert',
},{
  key: 8,
  value: 'electron',
}];

export const appSubscribes = [
  'debug',
  'error',
  'startExec',
  'endExec',
  'execOnData',
  'execOnError',
  'execOnClose',
  'execOnEnd',
  'getProgramsDone',
  'getProgramsError',
  'setProgramsSuccess',
  'setProgramsError',
  'getSettingsDone',
  'getSettingsError',
  'setSettingsSuccess',
  'setSettingsError',
  'startInstallTpl',
  'installTplError',
  'tplDownloadError',
  'tplInstallCompleted',
  'tplDownloadFinished',
  'startInstallDepend',
  'dependInstalling',
  'dependInstallError',
  'dependInstallCompleted',
  'init'
];

export const PATH = {};

export default  {
  templates,
  appSubscribes,
  PATH
}
