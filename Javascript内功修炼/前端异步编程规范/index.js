// promise  特性

let p1 = new Promise((resolve, reject) => {
  resolve("success");
  reject("error");
});

console.log("p1", p1);

let p2 = new Promise((resolve, reject) => {
  reject("error");
});

console.log("p2", p2);

/**
 * promise  特点
 * 执行了resolve后，promise状态会变成fullfilled
 * 执行了 reject 后，promise状态会变成rejected
 * 状态不可逆
 * throw 报错 想执行reject
 *
 */
