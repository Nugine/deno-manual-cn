## 测试当前文件是否为主程序

当前脚本作为主程序的标志是 `import.meta.main`。

```ts
if (import.meta.main) {
  console.log("main");
}
```
