import type from './type';

const equal = function(obj1, obj2){

  // 先比较类型
  if(type(obj1) !== type(obj2)){
    return false;
  }

  // 非数组非对象，直接返回比较结果
  if(!type.isArray(obj1) && !type.isObject(obj1)){

    return obj1 === obj2;

  } else { // 数组和对象 需要遍历检查每一项。如果子项是数组或对象，则需要递归。

    let result = true;
    let keys = Object.keys(obj1);
    let l = keys.length;

    while (l--){
      let key = keys[l];
      let res = equal(obj1[key], obj2[key]);
      if(!res){
        result = res;
        break ;
      }
    }

    return result;
  }

};

export default equal;
