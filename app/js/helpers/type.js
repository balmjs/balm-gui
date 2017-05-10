const type = function (everything) {
  return ({}).toString.call(everything).replace(/\[object\s(.*)]/, '$1').toLowerCase();
};

[
  'String',
  'Object',
  'Number',
  'Boolean',
  'Function',
  'Array',
  'Undefined',
  'Null'
].forEach(function (typeString) {
  type[`is${typeString}`] = (n) => type(n) === typeString.toLowerCase();
});

export default type;
