## 导入映射（Import maps）

> 这是一个不稳定的特性。更多信息请查阅
> [unstable features](../runtime/unstable.md)

Deno 支持 [导入映射](https://github.com/WICG/import-maps)。

您可以通过 `--importmap=<FILE>` 的命令行选项使用导入映射。

目前的限制:

- 只支持单个导入映射
- 没有 fallback URL
- Deno 不支持 `std:` 命名空间
- 仅支持 `file:`，`http:` 和 `https:` 协议

示例：

```js
// import_map.json

{
   "imports": {
      "http/": "https://deno.land/std/http/"
   }
}
```

```ts
// hello_server.ts

import { serve } from "http/server.ts";

const body = new TextEncoder().encode("Hello World\n");
for await (const req of serve(":8000")) {
  req.respond({ body });
}
```

```shell
$ deno run --importmap=import_map.json hello_server.ts
```
