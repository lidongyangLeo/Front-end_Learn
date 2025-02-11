/**
 *  创建一个新函数
 *  改变this
 *  可以传递参数
 *
 */

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  // 保存this, 指向原始函数

  const self = this;
  // 判断 this 失效
  function boundFunction(...newArgs) {
    // 合并参数
    return self.apply(this instanceof boundFunction ? this : context, [
      ...args,
      ...newArgs,
    ]);
  }
  boundFunction.prototype = Object.create(self.prototype);
  return boundFunction;
};

// bind 特点 绑定函数可以使用new 操作符创建对象  this 值被忽略
// 传入的参数依然生效
