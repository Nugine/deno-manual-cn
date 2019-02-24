## 版权申明

`deno_std`中的大多数文件都应具有以下版权申明：

```ts
// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
```

如果代码来自其他地方，请确保该文件具有适当的版权申明。我们只允许在`deno_std`中使用MIT，BSD和Apache许可代码。

## 顶级函数不应使用箭头语法

顶级函数应该使用`function`关键字。箭头语法应该限于闭包。

别这样：

```ts
export const foo(): string => {
  return "bar";
}
```

要这样：

```ts
export function foo(): string {
  return "bar";
}
```

## 不鼓励使用元编程，包括使用Proxy。

为了明确，是值得多写代码的。

在某些情况下，使用这些技术可能有意义，但在绝大多数情况下则不然。

## 如果文件名以下划线开头，请不要链接到它： `_foo.ts`

有时可能会出现内部模块是必要的，但它的API并不一定稳定或已经连接。在这种情况下，使用下划线作为前缀。按照惯例，只有自己目录中的文件才能导入它。

## 使用JSDoc来记录导出的符号

我们力求完整的文档。理想情况下，每个导出的符号都应该有文档行。
如果可能，请使用单行的JSDoc。例：

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

不要记录函数参数，除非它们的意图不明显（尽管如果它们是非显而易见的意图，则应该考虑API）。
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
