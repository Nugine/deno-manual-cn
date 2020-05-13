## 检查与放弃权限

> 这个程序使用了不稳定的 Deno 特性。更多信息请查阅
> [稳定性](../runtime/stability.md)

有时一个程序会放弃之前获得的权限，在此之后，需要该权限的操作将失败。

```ts
// 查找一个权限
const status = await Deno.permissions.query({ name: "write" });
if (status.state !== "granted") {
  throw new Error("need write permission");
}

const log = await Deno.open("request.log", "a+");

// 放弃一些权限
await Deno.permissions.revoke({ name: "read" });
await Deno.permissions.revoke({ name: "write" });

// 使用日志文件
const encoder = new TextEncoder();
await log.write(encoder.encode("hello\n"));

// 这将会失败
await Deno.remove("request.log");
```
