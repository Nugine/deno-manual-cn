# 介绍

> 中文翻译正在进行……

Deno 是一个 JavaScript/TypeScript 的运行时，默认使用安全环境执行代码，有着卓越的开发体验。

Deno 建立在 V8、Rust 和 Tokio 的基础上。

## 功能亮点

- 默认安全。外部代码没有文件系统、网络、环境的访问权限，除非显式开启。


- 支持开箱即用的 TypeScript 的环境。

- 只分发一个独立的可执行文件 (`deno`)。

- 有着内建的工具箱，比如一个依赖信息查看器 (`deno info`) 和一个代码格式化工具 (`deno fmt`)。

- 有一组经过审计的[标准模块](https://github.com/denoland/deno/tree/master/std)，保证能在 Deno 上工作。

- 脚本代码能被打包为一个单独的 JavaScript 文件。

## 哲学

Deno旨在为现代程序员提供高效、安全的脚本环境。

它将始终作为单个可执行文件分发，并且该可执行文件将能运行任何deno程序。给定一个 deno 程序的 URL，您应该能够用不超过 15MB 的压缩过的 deno 可执行文件运行它。

Deno明确地承担了运行时和包管理器的角色。它使用标准的浏览器兼容协议(URL)来加载模块。

对于过去用 bash 或 python 编写的工具脚本来说，Deno 是一个优秀的替代品。

## 目标

- 只分发一个独立的可执行文件 (`deno`)。

- 默认安全。外部代码没有文件系统、网络、环境的访问权限，除非显式开启。

- 浏览器兼容：完全用JavaScript编写且不使用全局`Deno`命名空间(或功能测试)的程序是Deno程序的子集，应该能够直接在现代浏览器中运行而无需更改。

- 提供内置工具来提升开发体验，比如单元测试、代码格式化、代码检查。

- 不把 V8 的概念泄露到用户空间。

- 能够高效地提供 HTTP 服务

## 与 Node.js 的比较

- Deno 不使用 `npm`
  - 它使用 URL 或文件路径引用模块
- Deno 在模块解析算法中不使用 `package.json`。
- Deno 中的所有异步操作返回 promise，因此 Deno 提供与 Node 不同的 API。
- Deno 需要显式指定文件、网络和环境权限。
- 当未捕获的错误发生时，Deno 总是会异常退出。
- 使用 ES 模块，不支持 `require()`。第三方模块通过 URL 导入。

  ```javascript
  import * as log from "https://deno.land/std/log/mod.ts";
  ```

## 其他关键行为

-  远程代码在第一次运行时获取并缓存，直到代码通过 `--reload` 选项运行。（所以它在飞机上也能工作）

- 从远程 URL 加载的模块或文件应当是不可变且可缓存的。

## 图标

这些 Deno 图标在 MIT 协议下分发（公共领域，免费使用），例如 Deno 软件。

- [手绘 by @ry](https://deno.land/images/deno_logo.png)

- [动画 by @hashrock](https://github.com/denolib/animated-deno-logo/)

- [高精度 SVG by @kevinkassimo](https://github.com/denolib/high-res-deno-logo)

- [像素动画 by @tanakaworld](https://deno.land/images/deno_logo_4.gif)
