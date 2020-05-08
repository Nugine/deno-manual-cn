## 第一步

这个页面包含一些简单的示例，您可以从中学到 Deno 的基本概念。

我们假设您已经对 JavaScript 有过预先的了解，特别是 `async`/`await`。如果您没有了解过 JavaScript，您可能先需要阅读这个指南：[JavaScript](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript).

### Hello World

Deno 是一个 JavaScript 和 TypeScript 的运行时，尽可能与浏览器兼容并使用现代的功能 (features)。

由于 Deno 具有浏览器兼容性，`Hello World` 程序与浏览器里的没什么不同。

```typescript
console.log("Welcome to Deno 🦕");
```

尝试一下：

```bash
deno run https://deno.land/std/examples/welcome.ts
```

### 发出一个 HTTP 请求

通过 HTTP 请求从服务器获取数据是一件很常见的事。让我们编写一个简单的程序来获取文件并打印到终端。

就像浏览器一样，您可以使用 web 标准的 [`fetch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) API 来发出请求。

```typescript
const url = Deno.args[0];
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
```

让我们看看它做了什么：

1. 我们取得了第一个命令行参数，存储到变量 `url`。

2. 我们向指定的地址发出请求，等待响应，然后存储到变量 `res`。

3. 我们把响应体解析为一个 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，等待接收完毕，将其转换为 [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)，最后存储到变量 `body`。

4. 我们把 `body` 的内容写入标准输出流 `stdout`。

尝试一下：

```bash
deno run https://deno.land/std/examples/curl.ts https://example.com
```

这个程序将会返回一个关于网络权限的错误，我们做错了什么？您可能会想起来，Deno 默认用安全环境执行代码。这意味着您需要显式赋予程序权限，允许它进行一些特权操作，比如网络访问。

You will see that this program returns an error regarding network access, so
what did we do wrong? You might remember from the introduction that Deno is a
runtime that is secure by default. This means that you need to explicitly give
programs the permission to do certain 'privledged' actions like network access.

用正确的权限选项再试一次：

```bash
deno run --allow-net=example.com https://deno.land/std/examples/curl.ts https://example.com
```

### 读取一个文件

Deno 也提供内置的 API，它们都位于全局变量 `Deno` 中。您可以在此找到相关文档：[doc.deno.land](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)。

文件系统 API 没有 web 标准形式，所以 Deno 提供了内置的 API。

示例：[Unix "cat" 程序的一个实现](../examples/unix_cat.md)


### 一个简单的 TCP 服务

示例：[TCP echo](../examples/tcp_echo.md)

### 更多示例

您可以在 [示例](../examples.md) 一章找到更多示例。
