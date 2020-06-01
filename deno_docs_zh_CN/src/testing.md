# 测试

Deno 有一个内置的测试器，可以用来测试 JavaScript 或 TypeScript 代码。

## 编写测试

要定义测试，需要使用要测试的名称和函数调用 `Deno.test`。

```ts
Deno.test("hello world", () => {
  const x = 1 + 2;
  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```

在 [https://deno.land/std/testing](https://deno.land/std/testing) 上有一些有用的断言实用程序，可以简化测试：

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
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

### 忽略测试

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

## 运行测试

要运行测试，请使用包含您测试函数的文件调用 `deno test` 。

```shell
deno test my_test.ts
```

您还可以省略文件名，在这种情况下，当前目录（递归）下所有与通配符 `{*_,}test.{js,ts,jsx,tsx}` 匹配的测试将会被运行。
如果传递一个目录，则该目录中与此 glob 匹配的所有文件将运行。
