/**
 *
 * apply 特点
 * 主要用于改变this指向并指向函数，与call类似，区别在于参数为数组
 *
 */

Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply this is not a function");
  }

  context = context || window;
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

const foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value, name, age);
}

bar.myApply(foo, ["张三", 20]);
