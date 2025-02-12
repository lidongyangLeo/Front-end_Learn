# 前端异步编程规范

1. promise
2. promise A+
3. async await
4. generator

## 异步处理

## 异步处理场景

- 网络请求
- 定时任务
- 事件处理
- 大量数据处理

### 处理策略

- 回调函数
- Promise
- async/await
- 事件监听
- 发布订阅模式
- generator 函数 多步骤异步操作 转化为 同步代码执行模式
- Promise.all

## promise

### 手写 promise

### promise 有哪些特性

- 执行了 resolve 后，promise 状态会变成 fullfilled
- 执行了 reject 后，promise 状态会变成 rejected
- 状态不可逆
- throw 报错 想执行 reject
- 三个状态

  - pending 等待中 初始状态
  - fullfilled 成功
  - rejected 失败

- then 方法
- 链式调用
- all 方法 接收 promise 数组, 所有 promise 都成功 返回成功结果数组 有一个失败返回失败的结果。
- race 方法 接收 promise 数组, 返回第一个 promise 的结果。
- allSettled 方法 接收 promise 数组, 返回所有 promise 的结果数组，不管成功还是失败。

### async await

用同步的方式 执行异步操作

```javascript
function request(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  });
}

// 回调地狱
request(1).then((res1) => {
  console.log(res1); // 1秒收输出2

  request(2).then((res2) => {
    console.log(res2); // 2秒后输出4
  });
});

async function fn() {
  const res1 = await request(1);
  console.log(res1); // 1秒后输出2
  const res2 = await request(res1);
  console.log(res2);
}
```

- await 只能在 async 函数中使用 不然会报错
- async 函数返回值是一个 promise 对象 有没有返回值 看有没有 return
- await 最好接 promise
- async/await 同步方式 执行异步操作

- async await 语法糖 generator 函数

### generator 函数

- yield 暂停点
- generator 返回对象 包含一个 next 方法
- next 方法 返回对象 value done 状态
-

```js
function* gen() {
  // 中途暂停点
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true
```
