if (!Array.prototype.forEach) {
  Array.prototype.myEach = function (callback, thisArg) {
    if (!this) {
      throw new TypeError("Array.prototype.myEach called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let thisContext, idx;
    let array = Object(this);
    let len = array.length >>> 0;
    if (arguments.length > 1) {
      thisContext = thisArg;
    }
    idx = 0;
    while (idx < len) {
      let kValue;
      if (idx in array) {
        kValue = array[idx];
        callback.call(thisContext, kValue, idx, array);
      }
      idx++;
    }
  };
}

let arr = [1, 2, 3, 4, 5];
arr.myEach((item) => {
  console.log(item);
});
