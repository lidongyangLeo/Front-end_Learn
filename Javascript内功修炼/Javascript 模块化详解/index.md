# JS 模块化

规范
项目
前端工程化

- 外部模块管理
- 内部模块管理
- 模块源码到目标代码的编译转换 (工程化章节 babel ast 等)

规范或者工具发展史

- CommonJS 服务端
- AMD CMD 浏览器
- browserify (Commonjs 允许在浏览器端)

## 前端模块化

对内: 按照规则 封装相关代码 内部数据方法
对外: 暴漏方法(接口) 外部数据 与其他模块进行通信

```javascript

```

### 模块化规范

#### commonjs 规范

node 应用 commonjs 规范 每个文件都是一个模块 模块中变量 函数等都是私有的

运用服务端 模块的加载都是运行时 同步加载

### AMD 规范

Asynchronous Module Definitiion
异步模块加载机制 允许指定回调函数

- define(id, dependencies, factory)
- id 模块标识
- dependencies 依赖的模块数组 可以忽略
- factory 模块的实现

#### 定义模块

define(function() {
return 模块
})

### CMD 规范
