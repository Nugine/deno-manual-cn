## 处理系统信号

> 这个程序使用了不稳定的 Deno 特性。更多信息请查阅
> [稳定性](../runtime/stability.md)

[API 参考手册](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.unstable.d.ts#Deno.signal)

您可以使用 `Deno.signal()` 函数来处理系统信号。

```ts
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("interrupted!");
}
```

`Deno.signal()` 也是一个 promise。

```ts
await Deno.signal(Deno.Signal.SIGINT);
console.log("interrupted!");
```

如果您想要停止监控信号，可以使用信号对象的 `dispose()` 方法。

```ts
const sig = Deno.signal(Deno.Signal.SIGINT);
setTimeout(() => {
  sig.dispose();
}, 5000);

for await (const _ of sig) {
  console.log("interrupted");
}
```

以上 for-await 循环将在 sig.dispose() 被调用时退出，运行时间为 5 秒。
