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
