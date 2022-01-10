var sk8dp = {
  chunk: function (array, size) {
    size = Math.max(size, 0);
    const length = array == null ? 0 : array.length;
    if (!length || size < 1) {
      return [];
    }
    let index = 0;
    let resIndex = 0;
    const result = new Array(Math.ceil(length / size));
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size));
    }
    return result;
  },
  compact: function (array) {
    let resIndex = 0;
    const result = [];
    if (array == null) {
      return result;
    }
    for (const value of array) {
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },
}
