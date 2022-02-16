var sk8dp = {
  chunk: function (array, size) {
    size = Math.max(size, 0);
    let length = array == null ? 0 : array.length;
    if (!length || size < 1) {
      return [];
    }
    let index = 0;
    let resIndex = 0;
    let result = new Array(Math.ceil(length / size));
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size));
    }
    return result;
  },
  compact: function (array) {
    let resIndex = 0;
    let result = [];
    if (array == null) {
      return result;
    }
    for (let value of array) {
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },
  drop: function (array, n = 1) {
    let length = array == null ? 0 : array.length;
    return length > 0 ? array.slice(n) : [];
  },
  dropRight: function (array, n = 1) {
    let length = array == null ? 0 : array.length;
    return length > 0 ? array.slice(0, n == 0 ? length : -n) : [];
  }, 
  fill: function (array, val, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = val
    }
    return array
  },
  flatten: function (array) { //原理请见1.12代码
    return [].concat.apply([], array);
  },
  flattenDeep: function (array) {//原理请见1.12代码
    return array.reduce((result, item) => {
      if (Array.isArray(item)) {//如果元素是数组
        return result.concat(sk8dp["flattenDeep"](item))//括号里写成sk8dp.flattenDeep(item)也可以，或者写成this.flattenDeep(item)也可以，或者也可以把开头那里的函数声明加个名字即写成flattenDeep:function flattenDeep(array)，然后这里就直接写flattenDeep(item)也可以。除此以外，还有一些更好的写法，但得需要彻底更改这个sk8dp-lodash.js文件的结构，这里就不方便记录了，请见视频1.17-NO1前半部分。其实以上讲的这一堆写法都是JS对象写法的基础知识的灵活运用而已，如果不理解只能说明JS对象的基础知识学得太不扎实！  另外，刚才讲的这些都是在这个sk8dp-lodash.js文件的函数里通过递归调用自己的写法，现在我再补充讲解一下，在这个sk8dp-lodash.js文件的函数里调用其他以及实现了的函数的写法，比如：我想在这里调用之前写好的compact()函数，那不能直接写compact()，应该写成this.compact()，或者也可以写成sk8dp.compact()，除此以外，还有一些更好的写法，但得需要彻底更改这个sk8dp-lodash.js文件的结构，这里就不方便记录了，请见视频1.17-NO1前半部分。其实以上讲的这一堆写法都是JS对象写法的基础知识的灵活运用而已，如果不理解只能说明JS对象的基础知识学得太不扎实！
      }
      return result.concat(item)//如果元素是非数组
    }, [])
  },
  flattenDepth: function (array, n = 1) {
    if (n == 0) {
      return array.slice()
    }
    return array.reduce((result, item) => {
      if (Array.isArray(item)) {
        return result.concat(sk8dp["flattenDepth"](item, n - 1))
      }
      return result.concat(item)
    }, [])
  },
  negate: function (predicate) { // 求一个函数的反函数，即原函数返回真时，创建出的函数返回假
    return function (...args) {
      return !predicate(...args)
    }
  },
  mapValues: function (obj, mapper) {//需求：对对象的值进行某种运算得到新结果之后，让键映射到新的结果。详细笔记请见：1.12代码  //mapper函数负责实现你想对对象的值进行的某种运算
    if (arguments.length == 1) {//如果只传了一个参，即没传mapper，直接把obj返回即可
      return obj
    }
    if (typeof (mapper) != "function") {//如果mapper不是函数，而是一个key   
      let keyInThisValue = mapper;//那就先把mapper的值赋值给一个变量，这里我将这个变量命名为keyInThisValue
      mapper = function (objectAsValue) {//然后重新给mapper赋值，让mapper是个函数，函数的参数是个对象
        return objectAsValue[keyInThisValue];//然后从参数这个对象里读取到keyInThisValue对应的值并返回
      }
    }
    let result = {}
    for (let key in obj) {
      result[key] = mapper(obj[key]);
    }
    return result;
  }
}
