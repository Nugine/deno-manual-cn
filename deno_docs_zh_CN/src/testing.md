# 测试

Deno 有一个内置的测试器，可以用来测试 JavaScript 或 TypeScript 代码。

## 编写测试

要定义测试，需要使用要测试的名称和函数调用 `Deno.test`。

您可以使用两种风格：

```ts
// 传递名称和函数，紧凑的形式，但不能配置
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// 全面的测试定义，更长的形式，但可配置（请参见下文）
Deno.test({
  name: "hello world #2",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});
```


## 断言

在 [https://deno.land/std/testing](https://deno.land/std/testing#usage) 上有一些有用的断言实用程序，可以简化测试：

```ts
import {
  assertEquals,
  assertArrayContains,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
  assertArrayContains([1, 2, 3, 4, 5, 6], [3], "Expected 3 to be in the array");
});
```

### 异步函数

您还可以通过传递一个测试函数来测试异步代码，该函数返回一个 promise。
为此，您可以在定义函数时使用 `async` 关键字：

```ts
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(100);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```

### 资源和异步操作清理器

Deno 中的某些操作在资源表（[在此处了解更多](./contributing/architecture.md)）中创建资源。
这些资源应该在使用完后关闭。

对于每个测试定义，测试器会检查此测试中创建的所有资源是否已关闭，以防止资源“泄漏”。
默认情况下，这对所有测试都是启用的，但可以通过在测试定义中将 `sanitizeResources` 布尔值设置为 false 来禁用。

对于异步操作（如与文件系统交互）也是如此。测试器检查您在测试中启动的每个操作是否在测试结束之前完成。默认情况下，这对所有测试都是启用的，但可以通过在测试定义中将 `sanitizeps` 布尔值设置为 false 来禁用。

```ts
Deno.test({
  name: "leaky test",
  fn() {
    Deno.open("hello.txt");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```

## 运行测试

要运行测试，使用 `deno test` 命令，传入包含测试函数的文件。您也可以忽略文件名，这样当前目录树内所有符合通配符 `{*_,*.,}test.{js,mjs,ts,jsx,tsx}` 的测试都会被运行。如果您传入了一个目录，那么该目录下所有匹配的文件都会被运行。

```shell
# 运行当前目录树内的所有测试
deno test

# 运行 util 目录内的所有测试
deno test util/

# 只运行 my_test.ts
deno test my_test.ts
```

`deno test` 和 `deno run` 使用相同的权限模型，比如在测试期间有可能要求 `--allow-write` 来写入文件系统。

使用 `deno help test` 命令来查看相关选项。

## 过滤

有许多选项可以过滤要运行的测试。

### 命令行过滤

使用 `--filter` 选项可以单独或成组运行测试。

该选项接受一个字符串或一个模式作为值。

假设有以下测试：

```ts
Deno.test({ name: "my-test", fn: myTest });
Deno.test({ name: "test-1", fn: test1 });
Deno.test({ name: "test2", fn: test2 });
```

以下命令将会运行所有包含 "test" 的测试：

```shell
deno test --filter "test" tests/
```

以下命令将会运行匹配该模式的测试，即第二个和第三个：

```shell
deno test --filter "/test-*\d/" tests/
```

像 JavaScript 的正则表达式语法糖一样，Deno 会将用斜杠包裹的过滤字符串认为是模式。

### 测试定义过滤

在测试本身中，您有两个过滤选项。

#### 忽略测试

有时您希望忽略基于某种条件的测试（例如您只希望在 Windows 上运行测试）。
为此，您可以使用 `ignore` 测试定义中的布尔值。
如果它被设置为 true，则测试将被跳过。

```ts
Deno.test({
  name: "do macOS feature",
  ignore: Deno.build.os !== "darwin",
  fn() {
    doMacOSFeature();
  },
});
```

#### 启用测试

有时您可能会在大型测试中遇到问题，只想专注于有问题的测试，忽略其他测试。

为此您可以使用 `only` 选项来让测试框架只运行一部分测试。多个测试可以设置此选项。尽管测试框架将报告每个测试的成功或失败，但当任何一个测试标记为 `only` 时，总体测试将始终失败。因为这只是一种临时措施，几乎会禁用所有测试。

```ts
Deno.test({
  name: "Focus on this test only",
  only: true,
  fn() {
    testComplicatedStuff();
  },
});
```

## 快速失败

如果您有一个运行时间较长的测试，并希望它在第一次失败时停止运行，则可以在运行测试时指定 `--failfast` 选项。

```shell
deno test --failfast
```
