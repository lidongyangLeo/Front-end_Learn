var example = require("./example.js");

console.log(example.counter); // 5
console.log(example.obj);
example.incCounter();

console.log(example.counter); // 5
console.log(example.obj);

console.log(example.getCounter()); // 6
