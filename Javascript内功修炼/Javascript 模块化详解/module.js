(function (window) {
  // 操作数据的函数
  let data = "hello js";
  function foo() {
    // 用于暴漏的函数
    console.log(`foo() ${data}`);
  }

  function bar() {
    // 用于暴漏的函数
    console.log(`bar() ${data}`);
    otherFun();
  }

  function otherFun() {
    // 内部私有的函数
    console.log("otherFun()");
  }

  // 暴漏行为
  window.myModule = {
    foo,
    bar,
  };
})(window);

// 模块依赖另外一个模块怎么处理？

(function (window, $) {
  let data = "www.baidu.com";

  console.log("$", $);
  function foo1() {
    console.log(`foo1() ${data}`);

    $(document).ready(function () {
      $("body").on({
        mouseenter: function () {
          $(this).css("background-color", "gray");
        },
        mouseleave: function () {
          $(this).css("background-color", "white");
        },
      });
    });
  }

  function bar1() {
    console.log(`bar1() ${data}`);
    $("body").css("background", "red");
    otherFun1();
  }

  function otherFun1() {
    console.log("otherFun1()");
  }

  window.myModule2 = {
    foo1,
    bar1,
  };
})(window, jQuery);

// 缺点：
// 1. 请求过多
// 2. 依赖模糊
// 3. 难以维护

// 需要升级 模块化规范解决问题
