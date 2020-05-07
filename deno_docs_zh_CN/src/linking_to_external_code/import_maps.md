## 导入映射（Import maps）

> 这是一个不稳定功能。了解更多关于[不稳定功能](../../runtime/unstable)

Deno 支持[import maps](https://github.com/WICG/import-maps)

您可以通过 `--importmap=<FILE>` 的 CLI 开关使用 import map。

目前的局限性:

- 导入映射单一
- 没有后备 URL
- Deno 不支持 `std:` 命名空间
- 仅支持 `file:`，`http:` 和 `https:` 方法

例如：

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
