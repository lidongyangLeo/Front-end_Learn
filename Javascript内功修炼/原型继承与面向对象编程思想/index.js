// var value = 1;

// function foo(v) {
//   v = 2;
//   console.log(v);
// }

// foo(value);
// console.log(value);

// var obj = {
//   value: 1,
// }

// function foo(obj) {
//   obj.value = 2;
//   console.log(obj.value);
// }

// foo(obj);
// console.log(obj.value);#

var foo = {
  value: 1,
};

function bar() {
  console.log(this.value);
}

bar.call(foo); // 1
bar(); // this 指向window

// - call 改变this 指向 指向foo
// - bar 函数执行了

var foo = {
  value: 1,
  bar: function () {
    console.log(this.value);
  },
};

foo.bar();

// 手写call
//1. 将函数设置为对象的属性
//2. 执行该函数
//3. 删除函数

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // 如果 context 为空，则默认为全局对象（严格模式下为 undefined）
  context = context || globalThis;

  // 给 context 添加一个唯一的属性，避免覆盖已有属性
  const fnKey = Symbol("fn");
  context[fnKey] = this;

  // 执行函数并获取返回值
  const result = context[fnKey](...args);

  // 删除临时属性
  delete context[fnKey];

  return result;
};

// 手写apply
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  // 如果 context 为空，则默认为全局对象（严格模式下为 undefined）
  context = context || globalThis;

  // 确保参数是数组或 `null/undefined`
  args = Array.isArray(args) ? args : [];

  // 生成唯一属性名，避免覆盖原有属性
  const fnKey = Symbol("fn");
  context[fnKey] = this;

  // 执行函数，并传入参数数组
  const result = context[fnKey](...args);

  // 删除临时属性
  delete context[fnKey];

  return result;
};
// 场景 判断类型
