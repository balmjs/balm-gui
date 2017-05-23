export const templates = [{
  key: 1,
  value: 'electron',
},{
  key: 2,
  value: 'ng',
},{
  key: 3,
  value: 'react',
},{
  key: 4,
  value: 'react-expert',
},{
  key: 5,
  value: 'simple',
},{
  key: 6,
  value: 'vue',
},{
  key: 7,
  value: 'vue-expert',
},{
  key: 8,
  value: 'vue-master',
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
