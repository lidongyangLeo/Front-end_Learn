class MyPromise {
  constructor(executor) {
    this.initValue();
    // 初始化this 指向
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  initValue() {
    this.PromiseResult = null;
    this.PromiseState = "pending";
    // 保存成功的回调
    this.onFulfilledCallbacks = [];
    // 保存失败的回调
    this.onRejectedCallbacks = [];
  }

  resolve(value) {
    // 状态修改
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;

    // 执行成功的回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }

  reject(reason) {
    // 状态修改
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    this.PromiseResult = reason;
    // 执行失败的回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    // 参数校验
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // if (this.PromiseState === "fulfilled") {
    //   onFulfilled(this.PromiseResult);
    // } else if (this.PromiseState === "rejected") {
    //   onRejected(this.PromiseResult);
    // } else if (this.PromiseState === "pending") {
    //   this.onFulfilledCallbacks.push(onFulfilled.bind(this));
    //   this.onRejectedCallbacks.push(onRejected.bind(this));
    // }

    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const x = cb(this.PromiseResult);
          // 判断x类型
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            resolve(x); // 把返回值传递给下一个then
          }
        } catch (error) {
          reject(error);
          throw new Error(error);
        }
      };

      if (this.PromiseState === "fulfilled") {
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === "rejected") {
        resolvePromise(onRejected);
      } else if (this.PromiseState === "pending") {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
      }
    });

    return thenPromise;
  }

  initBind() {
    // 避免调用的时候this指向发生变化
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  // 接收promise 数组 所有promise都成功 返回成功结果数组, 有一个失败 返回失败的结果
  // 并行处理请求
  static all(promises) {
    const result = [];
    let count = 0;

    return new MyPromise((resolve, reject) => {
      const addData = (index, data) => {
        result[index] = data;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      };

      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res);
            },
            (err) => reject(err)
          );
        } else {
          addData(index, promise);
        }
      });
    });
  }

  // 接收一个promise数组 哪个promise最快得到结果 就返回哪个结果 无论成功失败
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }

  // 把promise 每个结果 返回 无论成功失败
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      const res = [];
      let count = 0;
      const addData = (status, value, i) => {
        res[i] = {
          status,
          value,
        };
        count++;
        if (count === promises.length) {
          resolve(res);
        }
      };
      promises.forEach((promise, i) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData("fulfilled", res, i);
            },
            (err) => {
              addData("rejected", err, i);
            }
          );
        } else {
          addData("fulfilled", promise, i);
        }
      });
    });
  }

  // any  有一个成功 返回成功结果 所有都失败 则报错
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      promises.forEach((promise) => {
        promise.then(
          (val) => {
            resolve(val);
          },
          (err) => {
            count++;
            if (count === promises.length) {
              reject(new AggregateError("All promises were rejected"));
            }
          }
        );
      });
    });
  }
}

// 如果没有绑定this

// var p1 = new MyPromise((resolve, reject) => {});

// var resolve = p1.resolve;

// resolve(); // 这里的话this指向的是window

var p1 = new MyPromise((resolve, reject) => {
  resolve(100);
  //  reject("error");
  //   throw "error";
  // setTimeout(() => {
  //   resolve("success");
  // }, 1000);
})
  .then(
    (res) => new MyPromise((resolve, reject) => resolve(res * 3)),
    (err) => console.log("err", err)
  )
  .then(
    (res) => console.log("res", res),
    (err) => console.log("err", err)
  );

function fn(nums) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nums * 2);
    }, 1000);
  });
}

// async function generationFn() {
//   const num1 = await fn(1);
//   const num2 = await fn(num1);
//   const num3 = await fn(num2);
//   return num3;
// }

function asyncToPromise(generationFn) {
  const ge = generationFn();

  function handleResult(result) {
    if (result.done) {
      return Promise.resolve(result.value);
    }
    return Promise.resolve(result.value).then((res) =>
      handleResult(ge.next(res)).catch((err) => handleResult(ge.throw(err)))
    );
  }

  try {
    return handleResult(ge.next());
  } catch (err) {
    return Promise.reject(err);
  }
}
