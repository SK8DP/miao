var sk8dp = {
  chunk: function chunk(array, size = 1) {
    var res = []
    var count = 0
    var temp = []
    for (var i = 0; i < array.length; i++) {
      temp.push(array[i])
      count++
      if (count == size || i == array.length - 1) {
        res.push(temp)
        temp = []
        count = 0
      }
    }
    return res
  }
}
