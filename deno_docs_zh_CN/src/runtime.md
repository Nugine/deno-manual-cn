# 运行时

所有运行时函数的文档在这里：[doc.deno.land](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)

这里包含 Web API 和全局空间 `Deno`。

## Web API

对于 web 标准中存在的 API，比如 `fetch`，Deno 使用它们，而不是自己发明新的。

Web API 文档：[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.shared_globals.d.ts)

已实现的 web API 的 TypeScript 定义：

+ [lib.deno.shared_globals.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.shared_globals.d.ts)

+ [lib.deno.window.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.window.d.ts)

worker 特定的 API 定义：[lib.deno.worker.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.worker.d.ts)


## 全局空间 `Deno`

所有非 web 标准的 API 位于全局命名空间 `Deno`。

这里包含从文件中读取、打开 TCP 套接字和运行子进程，还有更多 API。

Deno 命名空间 的 TypeScript 定义：[lib.deno.ns.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.ns.d.ts)

Deno 特定的 API 定义：[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.ns.d.ts)
