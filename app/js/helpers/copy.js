import type from './type';

const copy = function (o) {
  if (!type.isArray(o) && !type.isObject(o)) {
    return o;
  }

  let result = type.isArray(o) ? [] : {};

  Object.keys(o).forEach((key) => {
    let item = o[key];
    result[key] = (type.isArray(item) || type.isObject(item)) ? copy(item) : item;
  });

  return result;
};

export default copy;
