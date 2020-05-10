## 程序生命周期

Deno 支持浏览器兼容的生命周期事件 `load` 和 `unload`。您可以使用这些事件在程序中提供用于安装 (setup) 和清理 (cleanup) 的代码。

`load` 事件的侦听器 (listener) 可以是异步 (async) 的，将被等待 (await)。`unload` 事件的监听器需要是同步的。这两项事件都不能被取消。

示例：

```typescript
// main.ts
import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

window.addEventListener("load", handler);

window.addEventListener("unload", handler);

window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`);
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`);
};

// imported.ts
const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

window.addEventListener("load", handler);
window.addEventListener("unload", handler);

window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`);
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`);
};

console.log("log from imported script");
```

注意，您可以同时使用 `window.addEventListener` 和 `window.onload` / `window.onunload` 来定义事件的处理程序。它们之间有一个主要的区别，让我们运行示例：

```shell
$ deno run main.ts
log from imported script
log from main script
got load event in onload function (main)
got load event in event handler (imported)
got load event in event handler (main)
got unload event in onunload function (main)
got unload event in event handler (imported)
got unload event in event handler (main)
```

所有通过 `window.addEventListener` 添加的侦听器都被运行，但是在 `main.ts` 中定义的 `window.onload` 和 `window.onunload` 覆盖了 `imported.ts` 中定义的处理程序。