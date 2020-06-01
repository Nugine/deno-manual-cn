# 运行时

包含所有运行时函数（Web API 与全局空间 `Deno`）的文档可以在 [doc.deno.land](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts) 找到。

## Web API

对于 web 标准中存在的 API，比如 `fetch`，Deno 使用它们，而不是自己发明新的。

已实现的 Web API 文档：[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.shared_globals.d.ts)

已实现的 Web API 的列表在 [这里](https://github.com/denoland/deno/blob/master/cli/js/web/README.md)。

已实现的 web API 的 TypeScript 定义：

- [lib.deno.shared_globals.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.shared_globals.d.ts)

- [lib.deno.window.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.window.d.ts)

worker 特定的 API 定义：[lib.deno.worker.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.worker.d.ts)

## 全局空间 `Deno`

所有非 web 标准的 API 位于全局命名空间 `Deno`。

这其中包含文件读取、打开 TCP sockets、运行子进程等。

Deno 命名空间 的 TypeScript 定义：[lib.deno.ns.d.ts](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.ns.d.ts)

Deno 特定的 API 定义：[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.ns.d.ts)
