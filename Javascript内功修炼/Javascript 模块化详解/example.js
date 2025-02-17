var counter = 5;

var obj = {
  counter: 5,
};

function incCounter() {
  counter++;
  obj.counter++;
}

function getCounter() {
  return counter;
}

module.exports = {
  getCounter,
  obj,
  counter,
  incCounter,
};

// commonjs export 输出的是值的拷贝
// esmodule 输出的是值的引用
