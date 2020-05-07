## 处理系统信号

> 这个程序使用了不稳定的 Deno 功能。更多信息请查阅
> [unstable features](../runtime/unstable.md)

[API 参考](https://deno.land/typedoc/index.html#signal)

您可以使用 `Deno.signal()` 函数来处理系统信号。

```
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("interrupted!");
}
```

`Deno.signal()` 也是一个 promise。

```
await Deno.signal(Deno.Singal.SIGINT);
console.log("interrupted!");
```

如果您想要停止监控信号，可以使用信号对象的 `dispose()` 方法。

```
const sig = Deno.signal(Deno.Signal.SIGINT);
setTimeout(() => { sig.dispose(); }, 5000);

for await (const _ of sig) {
  console.log("interrupted");
}
```

以上 for-await 循环将在 sig.dispose() 被调用时退出，运行时间为 5 秒。
