## Worker

Deno 支持 [Web Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker).

Worker 能够用来在多个线程中运行代码，`Worker` 的每个实例都会在一个单独的线程中运行，这个线程专属于它。

目前，Deno 只支持 `module` 类型的 worker，因此在创建新的 worker 时必须传递 `type: "module"` 选项。

```ts
// Good
new Worker("./worker.js", { type: "module" });

// Bad
new Worker("./worker.js");
new Worker("./worker.js", { type: "classic" });
```

### 权限

创建一个新的 `Worker` 实例的行为与动态导入类似，因此 Deno 需要适当的权限来做这个操作。

对于使用本地模块的 worker，Deno 需要读取 (`--allow-read`) 权限：

**main.ts**

```ts
new Worker("./worker.ts", { type: "module" });
```

**worker.ts**

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: read access to "./worker.ts", run again with the --allow-read flag

$ deno run --allow-read main.ts
hello world
```

对于使用远程模块的 worker，Deno 需要网络 (`--allow-net`) 权限：

**main.ts**

```ts
new Worker("https://example.com/worker.ts", { type: "module" });
```

**worker.ts**

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: net access to "https://example.com/worker.ts", run again with the --allow-net flag

$ deno run --allow-net main.ts
hello world
```

### 在 Worker 中使用 Deno

> 这是一个不稳定的 Deno 特性。
> 更多信息请查阅 [稳定性](stability.md)

默认情况下，`Deno` 命名空间在 worker 作用域中不可用。

要想启用 `Deno` 命名空间，在创建新的 worker 时传递 `deno: true` 选项：

**main.js**

```ts
const worker = new Worker("./worker.js", { type: "module", deno: true });
worker.postMessage({ filename: "./log.txt" });
```

**worker.js**

```ts
self.onmessage = async (e) => {
  const { filename } = e.data;
  const text = await Deno.readTextFile(filename);
  console.log(text);
  self.close();
};
```

**log.txt**

```
hello world
```

```shell
$ deno run --allow-read --unstable main.js
hello world
```
当 `Deno` 命名空间在 worker 作用域中启用时，此 worker 继承创建者的权限（使用类似 `--allow-*` 的选项指定的权限）。

我们计划提供 worker 权限的配置方法。
