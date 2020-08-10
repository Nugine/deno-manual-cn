# Deno 风格指南

## 目录

## 版权标题

存储库中的大多数模块都应具有以下版权标题:

```ts
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
```

如果代码来源于其他地方，请确保文件拥有适当的版权拥有者。 我们只允许 MIT、BSD 和 Apache 许可代码。

## 在文件名中使用下划线，而不是破折号

例如: 将文件命名为 `file_server.ts` 而不是 `file-server.ts`。

## 为新特性添加测试

每个模块都应该包含或伴随着对其公共功能的测试。

## TODO 注释

TODO 注释通常应该将一个 issue 或者作者的 github 用户名放在括号中。例如:

```ts
// TODO(ry): Add tests.
// TODO(#123): Support Windows.
// FIXME(#349): Sometimes panics.
```

## 不建议使用元编程（Meta-programming），包括代理（Proxy）的使用

即使要写更多的代码，也要力求明确。

在某些情况下，使用这些技术可能是有意义的，但是在绝大多数情况下，它们是没有意义的。

## 包含代码（Inclusive code）

请遵循有关包含代码的准则，网址为：

<https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md>

## Rust

遵循 Rust 约定，并与现有代码保持一致。

## Typescript

代码库的 TypeScript 部分包括内置的 `cli/js` 和标准库 `std`。

### 使用 TypeScript 而不是 JavaScript

### 使用术语“模块（module）”，而不是“库（library）”或“包（package）”

为了保证明确性和一致性，避免使用术语 “library” 和 “package” ，而是使用 “module” 来引用一个 JS 或 TS 文件，或者一个 TS/JS 代码目录。

### 不要使用 `index.ts` 或 `index.js` 作为文件名

Deno 不会以特殊的方式处理 “index.js” 或 “index.ts” 文件。如果使用了这些名称，就意味着当它们需要模块说明符时，可能被排除在外。这会造成误解。

如果一个代码目录需要一个默认的入口点，使用文件名 `mod.ts`。 文件名 `mod.ts` 遵循 Rust 的约定，比 `index.ts` 短，并且没有任何关于它如何工作的先入为主的概念。

### 导出函数（Exported functions）: 最多 2 个参数，其余的放入一个选项对象（options object）

在设计函数接口时，请严格遵循以下规则：

1. 若某函数是公共 API 的一部分，则其可以接受 0~2 个参数，如果必要的话，可以外加一个选项对象，因此最大总数为 3 个。

2. 可选参数通常应放到选项对象中。

   如果只有一个可选参数，并且将来一般不会添加更多可选参数，那么该可选参数可以不放在选项对象中。

3. 选项参数是唯一一个常规对象参数

   其他参数可以是对象，但它们在运行时必须能区别于其他一般的对象（"plain" Object）。有以下两种方法进行区别：

   - 一个独特的原型（例如：`Array`，`Map`，`Date`，`class MyThing`）
   - 一个众所周知的符号属性（例如 `Symbol.iterator`）

   这允许 API 以向后兼容的方式发展，即使选项对象的位置发生了变化。

```ts
// 错误示例：可选参数不是选项对象的一部分 (#2)
export function resolve(
  hostname: string,
  family?: "ipv4" | "ipv6",
  timeout?: number,
): IPAddress[] {}

// 正确示例：
export interface ResolveOptions {
  family?: "ipv4" | "ipv6";
  timeout?: number;
}
export function resolve(
  hostname: string,
  options: ResolveOptions = {},
): IPAddress[] {}
```

```ts
export interface Environment {
  [key: string]: string;
}

// 错误示例：`env`可以是一个常规对象，因此无法与选项对象区分 (#3)
export function runShellWithEnv(cmdline: string, env: Environment): string {}

// 正确示例
export interface RunShellOptions {
  env: Environment;
}
export function runShellWithEnv(
  cmdline: string,
  options: RunShellOptions,
): string {}
```

```ts
// 错误示例：多于3个参数 (#1)，多个可选参数 (#2)。
export function renameSync(
  oldname: string,
  newname: string,
  replaceExisting?: boolean,
  followLinks?: boolean,
) {}

// 正确示例
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(
  oldname: string,
  newname: string,
  options: RenameOptions = {},
) {}
```

```ts
// 错误示例：参数过多 (#1)
export function pwrite(
  fd: number,
  buffer: TypedArray,
  offset: number,
  length: number,
  position: number,
) {}

// 正确示例：
export interface PWrite {
  fd: number;
  buffer: TypedArray;
  offset: number;
  length: number;
  position: number;
}
export function pwrite(options: PWrite) {}
```

### 尽量降低依赖性；不要进行循环导入

尽管 `cli/js` 和 `std` 没有外部依赖关系，但仍然必须注意保持内部依赖关系的简单性和可管理性。请尤为注意，不要引入循环导入。

### 不要连接到文件名以下划线开头的文件，如：`_foo.ts`

有时候可能需要一个内部模块，但是它的 API 并不稳定或者不被连接。这种情况下，在文件名前面加一个下划线。按照惯例，只有它自己目录中的文件才能导入它。

### 对导出的符号使用 JSDoc

我们力求文档的完整性。理想情况下，每个导出的文档符号都应该有一个文档行。

如果可能的话，最好写单行 JSDoc。例如:

```ts
/** foo does bar. */
export function foo() {
  // ...
}
```

文档易于阅读是很重要的，但是还需要提供额外的样式信息，以确保生成的文档有更丰富的含义。因此，JSDoc 通常应该遵循 markdown 标记来丰富文本。

虽然 markdown 支持 HTML 标记，但是在 JSDoc 块中是禁止的。

代码字符串文字应使用反引号（\`）括起来，而不是用引号。例如：

```ts
/** Import something from the `deno` module. */
```

不要记录函数参数，除非它们的意图不明显（当然，如果它们没有明显的意图，应该重新考虑 API 的设计）。因此，通常不应使用 `@param`。如果使用了 `@param`，则不应该包含 `type` ，因为 TypeScript 已经是强类型化的了。

```ts
/**
 * Function with non obvious param.
 * @param foo Description of non obvious parameter.
 */
```

应尽可能减小垂直间距。因此单行注释应写为：

```ts
/** 这样写单行 JSDoc 注释。 */
```

不要写为：

```ts
/**
 * 不要这样写单行 JSDoc 注释。
 */
```

代码示例不应使用三个反引号（\`\`\`）标记。它们应该用缩进标记，要求在示例代码块前加入一个空行，并且示例代码的每一行需要有 6 个额外空格。比注释的第一列多 4 个空格。例如：

```ts
/** A straight forward comment and an example:
 *
 *       import { foo } from "deno";
 *       foo("bar");
 */
```

既然代码示例已经是一个注释了，它就不应再包含其他注释。如果它需要进一步的注释，那意味着它不是一个很好的示例。

### 每个模块都应该附带一个测试模块

每个带有公共功能 `foo.ts` 的模块都应该附带一个测试模块 `foo_test.ts`。由于 `cli/js` 模块的上下文不同，它的测试应该放在 `cli/js/tests` 中，或者它应只是测试模块的同级模块。

### 单元测试应是明确的

为了更好地理解测试，函数应该在测试命令中按照提示正确命名，如:

```
test myTestFunction ... ok
```

测试示例:

```ts
import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
import { foo } from "./mod.ts";

Deno.test("myTestFunction", function() {
  assertEquals(foo(), { bar: "bar" });
});
```

## 顶级函数不应使用箭头语法

顶级函数应使用 `function` 关键字。箭头语法应限于闭包。

错误示例：

```ts
export const foo = (): string => {
  return "bar";
};
```

正确示例：

```ts
export function foo(): string {
  return "bar";
}
```

### `std`

#### 不要依赖外部代码

`https://deno.land/std/` 旨在成为所有 Deno 程序可以依赖的基础功能。我们希望向用户保证，此代码不包含任何可能未经审核的第三方代码。

#### 文档以及维护浏览器兼容性

如果一个模块兼容浏览器，在模块顶部的 JSDoc 中包含以下声明：

```ts
/** This module is browser compatible. */
```

为该模块维护浏览器兼容性，在代码和测试中都不要使用 `Deno` 命名空间，确保任何新的依赖都兼容浏览器。
