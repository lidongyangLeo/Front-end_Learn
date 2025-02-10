// function Person() {}

// const person = new Person();

// person.name = 'xiaoming';
// console.log(person.name);

function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = "xiaoming";

var person1 = new Person();
var person2 = new Person();

console.log(person1.name); // xiaoming
console.log(person2.name); // xiaoming

var value = 1;
function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();

// case 1

var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
checkscope()(); // local scope

// case 2

var scope = "global scope";
// 定义一个名为 checkscope 的函数
function checkscope() {
  // 在函数内部声明一个变量 scope，并赋值为 "local scope"
  var scope = "local scope";
  // 定义一个名为 f 的内部函数，该函数返回变量 scope 的值
  function f() {
    return scope;
  }
  // 调用内部函数 f 并返回其结果
  return f();
}
checkscope(); // local scope
