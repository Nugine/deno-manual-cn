## 权限 API

## Permission APIs

> 这是一个不稳定的 Deno API。
> 更多信息请查阅 [稳定性](stability.md)

权限是在运行 `deno` 命令时从 CLI 授予的。用户代码通常会假定自己拥有一组必需的权限，但是在执行过程中不能保证 _已授予_ 的权限集合中包含所需权限。

在某些情况下，具有容错能力的程序需要一种在运行时与权限系统进行交互的方法。

### 权限描述符

在 CLI 中，`/foo/bar` 的读取权限表示为 `--allow-read=/foo/bar`。

在运行时，它表示为以下形式：

```ts
const desc = { name: "read", path: "/foo/bar" };
```

其他示例：

```ts
// 全局写入权限
const desc1 = { name: "write" };

// `$PWD/foo/bar` 的写入权限
const desc2 = { name: "write", path: "foo/bar" };

// 全局网络权限
const desc3 = { name: "net" };

// 访问 127.0.0.1:8000 的网络权限
const desc4 = { name: "net", url: "127.0.0.1:8000" };

// 高精度计时权限
const desc5 = { name: "hrtime" };
```

### 检查权限

检查一个权限是否已被授予：

```ts
// deno run --unstable --allow-read=/foo main.ts

const desc1 = { name: "read", path: "/foo" };
console.log(await Deno.permissions.query(desc1));
// PermissionStatus { state: "granted" }

const desc2 = { name: "read", path: "/foo/bar" };
console.log(await Deno.permissions.query(desc2));
// PermissionStatus { state: "granted" }

const desc3 = { name: "read", path: "/bar" };
console.log(await Deno.permissions.query(desc3));
// PermissionStatus { state: "prompt" }
```

### 权限状态

权限状态可以是以下之一：

+ granted (已授予)
+ prompt（提示）
+ denied（已禁止）

从 CLI 授予的权限是 `{ state: "granted" }`，其他未授予的权限默认为 `{ state: "prompt" }`，明确禁止的权限是 `{ state: "denied" }`。

相关说明在 [请求权限](#请求权限)。

### 权限强度

[检查权限](#检查权限) 中第二个查询的直观理解：读取权限授予到 `/foo`，`/foo/bar` 包含在 `/foo` 中，所以允许读取 `/foo/bar`。

我们也可以说 `desc1` _[强于](https://www.w3.org/TR/permissions/#ref-for-permissiondescriptor-stronger-than)_ `desc2`。这意味着对于任意从 CLI 授予的权限：

1. 如果 `desc1` 状态为 `{ state: "granted" }`，那么 `desc2` 也是。
2. 如果 `desc2` 状态为 `{ state: "denied" }`，那么 `desc1` 也是。

更多示例：

```ts
const desc1 = { name: "write" };
// 强于
const desc2 = { name: "write", path: "/foo" };

const desc3 = { name: "net" };
// 强于
const desc4 = { name: "net", url: "127.0.0.1:8000" };
```

### 请求权限

通过 CLI 提示来请求一个未授予的权限：

```ts
// deno run --unstable main.ts

const desc1 = { name: "read", path: "/foo" };
const status1 = await Deno.permissions.request(desc1);
// ⚠️ Deno requests read access to "/foo". Grant? [g/d (g = grant, d = deny)] g
console.log(status1);
// PermissionStatus { state: "granted" }

const desc2 = { name: "read", path: "/bar" };
const status2 = await Deno.permissions.request(desc2);
// ⚠️ Deno requests read access to "/bar". Grant? [g/d (g = grant, d = deny)] d
console.log(status2);
// PermissionStatus { state: "denied" }
```

如果当前权限状态是 "prompt"，用户终端中会出现一个提示来询问用户是否要授权。`desc1` 的授权请求通过，所以新的状态会返回，程序继续执行。`desc2` 的授权被禁止，权限状态会从 "prompt" 降级为 "denied"。

如果当前权限状态已经是 "granted" 或 "denied"，请求将表现为一个检查，直接返回当前权限状态，这会阻止多余的提示。

### 放弃权限

将权限状态从 "granted" 降级为 "prompt"：

```ts
// deno run --unstable --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo" };
console.log(await Deno.permissions.revoke(desc));
// PermissionStatus { state: "prompt" }
```

然而，当尝试放弃 _一部分_ 权限时，会发生什么？

```ts
// deno run --unstable --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo/bar" };
console.log(await Deno.permissions.revoke(desc));
// PermissionStatus { state: "granted" }
```

它不会被放弃。

想象 Deno 存储了一个 _明确授予的权限描述符_ 的内部集合。在 CLI 中指定 `--allow-read=/foo,/bar` 会把这一集合初始化为：

```ts
[
  { name: "read", path: "/foo" },
  { name: "read", path: "/bar" },
];
```

一个运行时授权 `{ name: "write", path: "/foo" }` 会更新这个集合：

```ts
[
  { name: "read", path: "/foo" },
  { name: "read", path: "/bar" },
  { name: "write", path: "/foo" },
];
```

Deno 的权限撤销算法将所有不强于参数权限描述符的元素从集合中移除。

要确保 `desc` 不再有效，您需要传递一个参数权限描述符，它必须 _强于_ 集合中所有 _强于_ `desc` 的 _显式授予的权限描述符_。

```ts
// deno run --unstable --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo/bar" };
console.log(await Deno.permissions.revoke(desc)); // 无效
// PermissionStatus { state: "granted" }

const strongDesc = { name: "read", path: "/foo" };
await Deno.permissions.revoke(strongDesc); // 正确

console.log(await Deno.permissions.query(desc));
// PermissionStatus { state: "prompt" }
```
