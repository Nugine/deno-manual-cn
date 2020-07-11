## 导入映射（Import maps）

> 这是一个不稳定的特性。
> 更多信息请查阅 [稳定性](../runtime/stability.md)

Deno 支持 [导入映射](https://github.com/WICG/import-maps)。

您可以通过 `--importmap=<FILE>` 的命令行选项使用导入映射。

目前的限制:

- 只支持单个导入映射
- 没有 fallback URL
- Deno 不支持 `std:` 命名空间
- 仅支持 `file:`，`http:` 和 `https:` 协议

示例：

**import_map.json**

```js
{
   "imports": {
      "fmt/": "https://deno.land/std@0.55.0/fmt/"
   }
}
```

**color.ts**

```ts
import { red } from "fmt/colors.ts";

console.log(red("hello world"));
```

运行：

```shell
$ deno run --importmap=import_map.json --unstable color.ts
```

为绝对导入使用起始目录：

```json
// import_map.json

{
  "imports": {
    "/": "./"
  }
}
```

```ts
// main.ts

import { MyUtil } from "/util.ts";
```

您可以映射一个不同的目录（比如 src）：

```json
// import_map.json

{
  "imports": {
    "/": "./src"
  }
}
```
