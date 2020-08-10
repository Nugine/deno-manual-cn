## 断言

为了帮助开发者编写测试，Deno 标准库提供了内置的 [断言模块](https://deno.land/std@$STD_VERSION/testing/asserts.ts)，可从 `https://deno.land/std@$STD_VERSION/testing/asserts.ts` 导入。

```js
import { assert } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

Deno.test("Hello Test", () => {
  assert("Hello");
});
```

断言模块提供了九个断言函数：

- `assert(expr: unknown, msg = ""): asserts expr`
- `assertEquals(actual: unknown, expected: unknown, msg?: string): void`
- `assertNotEquals(actual: unknown, expected: unknown, msg?: string): void`
- `assertStrictEquals(actual: unknown, expected: unknown, msg?: string): void`
- `assertStringContains(actual: string, expected: string, msg?: string): void`
- `assertArrayContains(actual: unknown[], expected: unknown[], msg?: string): void`
- `assertMatch(actual: string, expected: RegExp, msg?: string): void`
- `assertThrows(fn: () => void, ErrorClass?: Constructor, msgIncludes = "", msg?: string): Error`
- `assertThrowsAsync(fn: () => Promise<void>, ErrorClass?: Constructor, msgIncludes = "", msg?: string): Promise<Error>`

### 断言

`assert` 方法是一个简单的“真值”断言，可用于断言任何可以推导为 `true` 的值。

```js
Deno.test("Test Assert", () => {
  assert(1);
  assert("Hello");
  assert(true);
});
```

### 相等性

可用的相等性断言有三个：`assertEquals()`，`assertNotEquals()` 和 `assertStrictEquals()`.

`assertEquals()` 和 `assertNotEquals()` 方法提供常规的相等性检查，并能够断言基本类型和对象的相等性。

```js
Deno.test("Test Assert Equals", () => {
  assertEquals(1, 1);
  assertEquals("Hello", "Hello");
  assertEquals(true, true);
  assertEquals(undefined, undefined);
  assertEquals(null, null);
  assertEquals(new Date(), new Date());
  assertEquals(new RegExp("abc"), new RegExp("abc"));

  class Foo {}
  const foo1 = new Foo();
  const foo2 = new Foo();

  assertEquals(foo1, foo2);
});

Deno.test("Test Assert Not Equals", () => {
  assertNotEquals(1, 2);
  assertNotEquals("Hello", "World");
  assertNotEquals(true, false);
  assertNotEquals(undefined, "");
  assertNotEquals(new Date(), Date.now());
  assertNotEquals(new RegExp("abc"), new RegExp("def"));
});
```

`assertStrictEquals()` 基于 `===` 运算符提供了更简单、严格的检查。相同对象的两个实例不会判断为相等，因为引用不相同。

```js
Deno.test("Test Assert Strict Equals", () => {
  assertStrictEquals(1, 1);
  assertStrictEquals("Hello", "Hello");
  assertStrictEquals(true, true);
  assertStrictEquals(undefined, undefined);
});
```

`assertStrictEquals()` 最好用于精确判断两个基本类型的相等性。

### 包含

`assertStringContains()` 和 `assertArrayContains()` 可用于断言包含关系。

`assertStringContains()` 方法检查一个字符串是否包含了预期的字符串。

```js
Deno.test("Test Assert String Contains", () => {
  assertStringContains("Hello World", "Hello");
});
```

`assertArrayContains()` 方法稍微高级一些，能够找到一个数组内的值，或是子数组。

```js
Deno.test("Test Assert Array Contains", () => {
  assertArrayContains([1, 2, 3], [1]);
  assertArrayContains([1, 2, 3], [1, 2]);
  assertArrayContains(Array.from("Hello World"), Array.from("Hello"));
});
```

### 正则表达式

通过 `assertMatch()` 方法断言正则匹配。

```js
Deno.test("Test Assert Match", () => {
  assertMatch("abcdefghi", new RegExp("def"));

  const basicUrl = new RegExp("^https?://[a-z.]+.com$");
  assertMatch("https://www.google.com", basicUrl);
  assertMatch("http://facebook.com", basicUrl);
});
```

### 抛出错误

在 Deno 中有两种方式断言抛出错误的行为：`assertThrows()` 和 `assertAsyncThrows()`。

两种方式都能检查抛出[错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error) 的类型和信息。

两种方式的区别是 `assertThrows()` 接收一个标准函数，而 `assertAsyncThrows()` 接收一个返回 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的函数。

`assertThrows()` 将检查抛出的错误，也可以检查所抛出的错误的类型是否正确，并判断错误消息是否符合预期。

```js
Deno.test("Test Assert Throws", () => {
  assertThrows(
    () => {
      throw new Error("Panic!");
    },
    Error,
    "Panic!",
  );
});
```

`assertAsyncThrows()` 稍微复杂一点，主要是因为它处理 Promise。它将捕获 Promise 中抛出的错误或 rejection。您还可以选择检查错误类型和错误消息。

```js
Deno.test("Test Assert Throws Async", () => {
  assertThrowsAsync(
    () => {
      return new Promise(() => {
        throw new Error("Panic! Threw Error");
      });
    },
    Error,
    "Panic! Threw Error",
  );

  assertThrowsAsync(
    () => {
      return Promise.reject(new Error("Panic! Reject Error"));
    },
    Error,
    "Panic! Reject Error",
  );
});
```

### 自定义消息

Deno 的每个内置断言都允许您覆盖标准 CLI 错误消息。

这个示例将输出 "Values Don't Match!"，而不是标准 CLI 错误消息。

```js
Deno.test("Test Assert Equal Fail Custom Message", () => {
  assertEquals(1, 2, "Values Don't Match!");
});
```
