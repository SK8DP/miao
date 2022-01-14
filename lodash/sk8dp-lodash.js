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
        return result.concat(sk8dp["flattenDeep"](item))//原理：在上面讲flatten的“reduce改进版(融合了concat)”时已经详细解释过了，故不赘述！
      }
      return result.concat(item)//如果元素是非数组
    }, [])
  }
}
