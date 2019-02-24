# Deno 风格指南

[toc]

## 使用 TypeScript

## 使用术语"模块", 而不是"库"或"包"

为了清楚和一致, 请避免使用术语"库(`package`)"和"包(`library`)". 而是使用"模块(`module`)"来引用单个TS或JS文件, 或者是TS/JS代码的目录.

## 不要使用`index.ts`或`index.js`作为文件名

<!-- FIXME: -->
Deno不会以特殊方式处理`index.js`或`index.ts`. 通过使用这些文件名，它表明当它们不能时，它们可以被排除在模块说明符之外。 这令人困惑。

如果代码目录需要默认入口点，请使用文件名`mod.ts`.

文件名`mod.ts`遵循Rust的约定，比`index.ts`短，并且没有关于它如何工作的任何先入为主的概念。

## 在`deno_std`中，不要依赖外部代码

`deno_std`旨在成为所有Deno程序可以依赖的基础功能。我们希望向用户保证此代码不包含任何可能未经审核的第三方代码。

## 在`deno_std`中, 最小化模块的依赖, 不要做出循环导入

尽管`deno_std`是一个独立的代码库，我们仍然必须小心保持内部依赖关系的简单性和可管理性。特别注意不要引入"循环导入"。

## 为保持一致性，请在文件名中使用下划线，而不是破折号。

示例: 用 `file_server.ts` 替换 `file-server.ts`

## 格式化代码

更具体地说，代码长度应不大于80列, 使用2空格缩进, 使用驼峰式命名。 格式化功能位于`//format.ts`。

## 导出的函数：最多2个必需参数，将其余参数放入选项对象中。

设计函数接口时，请遵守以下规则。

1. 公共API函数有0~2个必需参数，加上一个选项对象, 总共最多3个参数。

2. 可选参数通常应该放入选项对象(`options`)。

    如果只有一个可选参数,并且将来不会添加更多可选参数，那么不在选项对象中的可选参数设计是可以接受的.

3. `options`参数是唯一的常规`Object`参数

    其他参数可以是对象，但它们必须与`plain object`区分开来，它们可以是：

    + 一个可区别的原型 (例如: `Array`, `Map`, `Date`, `class MyThing` )

    + 一个常见的符号属性 (例如: 一个拥有`Symbol.iterator`的可迭代对象)

    这允许API以向后兼容的方式发展，即使选项对象的位置发生变化也是如此。

```ts
// 坏的: 可选参数不是选项对象的一部分 (#2)
export function resolve(
  hostname: string,
  family?: "ipv4" | "ipv6",
  timeout?: number
): IPAddress[] {}

// 好的:
export interface ResolveOptions {
  family?: "ipv4" | "ipv6";
  timeout?: number;
}
export function resolve(
  hostname: string,
  options: ResolveOptions = {}
): IPAddress[] {}
```

```ts
export interface Environment {
  [key: string]: string;
}

// 坏的: `env` 可以是一个常规对象, 并且因此变得不可区分 (#3)
export function runShellWithEnv(cmdline: string, env: Environment): string {}

// 好的:
export interface RunShellOptions {
  env: Environment;
}
export function runShellWithEnv(
  cmdline: string,
  options: RunShellOptions
): string {}
```

```ts
// 坏的: 多于3个参数 (#1), 多个可选参数 (#2).
export function renameSync(
  oldname: string,
  newname: string,
  replaceExisting?: boolean,
  followLinks?: boolean
) {}

// 好的:
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(
  oldname: string,
  newname: string,
  options: RenameOptions = {}
) {}
```

```ts
// 坏的: 太多参数 (#1)
export function pwrite(
  fd: number,
  buffer: TypedArray,
  offset: number,
  length: number,
  position: number
) {}

// 更好的:
export interface PWrite {
  fd: number;
  buffer: TypedArray;
  offset: number;
  length: number;
  position: number;
}
export function pwrite(options: PWrite) {}
```

## TODO 注释

TODO注释应该在括号中包含一个issue, 或是作者的github用户名. 例如:

```ts
// TODO(ry) Add tests.
// TODO(#123) Support Windows.
```

## 版权申明

`deno_std`中的大多数文件都应具有以下版权申明：

```ts
// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
```

如果代码来自其他地方，请确保该文件具有适当的版权申明。我们只允许在`deno_std`中使用MIT，BSD和Apache许可代码。

## 顶级函数不应使用箭头语法

顶级函数应该使用`function`关键字。箭头语法应该限于闭包。

不要这样写：

```ts
export const foo(): string => {
  return "bar";
}
```

应该这样写：

```ts
export function foo(): string {
  return "bar";
}
```

## 不鼓励使用元编程，包括Proxy的应用。

即使它意味着更多的代码，也要明确代码的意图。

在某些情况下，使用这些技术可能有意义，但在绝大多数情况下则不然。

## 如果文件名以下划线开头，请不要连接到它： `_foo.ts`

有时可能会出现这种情况：内部模块是必要的，但它的API并不一定稳定。在这种情况下，使用下划线作为前缀。按照惯例，只有自己目录中的文件才能导入它。

## 使用JSDoc来记录导出的符号

我们力求完整的文档。理想情况下，每个导出的符号都应该有文档。
如果可能，请使用单行的JSDoc。例如：

```ts
/** foo does bar. */
export function foo() {
  // ...
}
```

文档很容易被人类阅读，这一点很重要，但尽管如此，也有必要提供额外的样式信息以确保生成的文档有更丰富的含义。因此，JSDoc通常应遵循markdown标记，以丰富文字的含义。

虽然markdown支持HTML标记，但在JSDoc块中禁止使用。

代码字符串文字应使用反引号（\`）括起来，而不是用引号。
例如：

```ts
/** Import something from the `deno` module. */
```

不要记录函数参数，除非它们的意图不明显。（当参数意图不明显时，应该考虑重新设计API）

因此，通常不应使用`@param`。

应尽可能减小垂直间距。因此单行注释应写为：

```ts
/** This is a good single line JSDoc */
```

不要写为：

```ts
/**
 * This is a bad single line JSDoc
 */
```

代码示例不应使用三个反引号（\`\`\`）标记。它们应该用缩进标记，这需要在块和示例的每一行的6个额外空格之前加入一个空行。比注释的第一列多4个空格。例如：

```ts
/** A straight forward comment and an example:
 *
 *       import { foo } from "deno";
 *       foo("bar");
 */
```

代码示例不应包含其他注释，它已经在注释里了。如果它需要进一步的注释，那意味着它不是一个很好的示例。
