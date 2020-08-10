# 管理依赖

在Deno中，没有包管理器的概念，因为外部模块直接导入到本地模块中。

这就提出了一个问题，即如何在没有包管理器的情况下管理远程依赖关系。在具有许多依赖性的大型项目中，如果将模块全部单独导入到单个模块中，则更新模块将变得很麻烦且耗时。

在 Deno 中解决此问题的标准做法是创建一个 `deps.ts` 文件。此文件中引用了所有必需的远程依赖关系，并且重新导出了所需的方法和类。本地模块从 `deps.ts` 导入所需方法和类，而不是远程依赖。

这样就可以轻松跨大型代码库更新模块，并解决“程序包管理器问题”（如果它存在的话）。开发依赖项也可以在单独的 `dev_deps.ts` 文件中进行管理。

**deps.ts 示例**

```ts
/**
 * deps.ts 从远程的 Ramda 模块中重新导出所需方法。
 **/
export {
  add,
  multiply,
} from "https://x.nest.land/ramda@0.27.0/source/index.js";
```

此示例中的功能与 [导入和导出模块](./import_export.md) 相同。但是在这种情况下，不是直接导入 Ramda 模块，而是从本地代理 `deps.ts` 模块中导入。

**命令：** `deno run dependencies.ts`

```ts
import {
  add,
  multiply,
} from "./deps.ts";

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(19, 31, 1.2));
console.log(totalCost(45, 27, 1.15));

/**
 * 输出：
 *
 * 60
 * 82.8
 */
```
