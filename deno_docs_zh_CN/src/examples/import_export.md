# 导入和导出模块

默认情况下，Deno标准化了在 JavaScript 和 TypeScript 中导入模块的方式。

它遵循 ECMAScript 6 `import/export` 标准，但有一个警告，文件类型（后缀名）必须包含在 import 语句的末尾。

```js
import {
  add,
  multiply,
} from "./arithmetic.ts";
```

依赖项也直接导入，没有包管理开销。本地模块的导入方式与远程模块完全相同。

如下面的示例所示，可以使用本地或远程模块以相同的方式产生相同的功能。

## 本地导入

在这个例子中，`add` 和 `multiply` 函数是从本地的 `arithmetic.ts` 模块导入的。

**命令：** `deno run local.ts`

```ts
import { add, multiply } from "./arithmetic.ts";

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

## 导出

在上面的示例中，`add` 和 `multiply` 函数是从本地存储的算术模块导入的。为此，必须导出存储在运算模块中的功能。

只需将关键字 `export` 添加到函数签名的开头，如下所示。

```ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

需要在外部模块中访问的所有函数、类、常量和变量都必须导出。可以在它们的前面加上 `export` 关键字，也可以将它们包括在文件底部的 export 语句中。

要了解有关 ECMAScript 导出功能的更多信息，请阅读 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export).

## 远程导入

在上面的本地导入示例中，从本地存储的算术模块中导入了 `add` 和 `multiply` 方法。 也可以通过从远程模块导入 `add` 和 `multiply` 方法来实现相同的功能。

在这种情况下，可以导入 Ramda 模块，包括版本号。Deno 可以处理 JavaScript 模块直接导入到 TypeSript 模块的情况。

**命令：** `deno run ./remote.ts`

```ts
import {
  add,
  multiply,
} from "https://x.nest.land/ramda@0.27.0/source/index.js";

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
