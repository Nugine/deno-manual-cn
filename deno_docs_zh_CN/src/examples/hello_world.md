# Hello World

Deno 是 JavaScript 和 TypeScript 的安全运行时。
以下 hello world 示例展示了 JavaScript 和 TypeScript 具有相同的能力，两者都可以被 Deno 执行。

## JavaScript

在这个 JavaScript 示例中，消息 `Hello [name]` 被打印到控制台，代码会保证名字的首字母是大写的。

**命令：** `deno run hello-world.js`

```js
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello(name) {
  return "Hello " + capitalize(name);
}

console.log(hello("john"));
console.log(hello("Sarah"));
console.log(hello("kai"));

/**
 * 输出：
 *
 * Hello John
 * Hello Sarah
 * Hello Kai
**/
```

## TypeScript

这个 TypeScript 示例和上面的 JavaScript 示例完全相同，这段代码包含了 TypeScript 支持的额外类型信息。

`deno run` 命令也完全相同，只把 `*.js` 改为 `*.ts`。

**命令：** `deno run hello-world.ts`

```ts
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello(name: string): string {
  return "Hello " + capitalize(name);
}

console.log(hello("john"));
console.log(hello("Sarah"));
console.log(hello("kai"));

/**
 * 输出：
 *
 * Hello John
 * Hello Sarah
 * Hello Kai
**/
```
