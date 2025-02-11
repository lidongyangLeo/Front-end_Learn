/**
 * 手写new 运算符的核心功能
 *
 * 1. 创建一个新对象
 * 2. 将对象的__proto__指向构造函数的prototype
 * 3. 执行构造函数，并将this指向新对象
 * 4. 返回新对象(如果构造函数没有返回对象, 则返回新创建的对象)
 *
 */

/**
 *
 * 手写步骤
 * 1. 创建一个空对象 obj
 * 2. 将obj的原型指向构造函数的prototype 使得新对象能继承构造函数的原型方法
 * 3. 执行构造函数，并将this指向新对象
 * 4. 返回新对象， 如果构造函数有返回对象，使用该返回值，否则返回新对象
 *
 *
 *
 */

function myNew() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments); // shift 会修改原数组
  console.log("Constructor", Constructor);
  obj.__proto__ = Constructor.prototype;
  const result = Constructor.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

myNew(Person);
