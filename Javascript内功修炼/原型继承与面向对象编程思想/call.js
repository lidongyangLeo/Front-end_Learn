/**
 *
 * call 函数特点 主要用于改变this指向并执行函数
 *
 * 1. 立即执行
 * 2. 改变this指向
 * 3. 传递参数  call 传递参数时 参数用逗号分隔， 不像apply需要数组。
 * 4. 继承  可以借助call 让一个对象使用另一个对象的方法
 *
 */

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // 先判断 context 是否存在，不存在则指向 window
  context = context || globalThis;

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

bar.myCall(foo, "小明", 20);
